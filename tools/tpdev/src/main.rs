//! tpdev: a reproducer and measurement kit for Turbopack dev-server performance.
//!
//! ```text
//! tpdev gen     --out DIR [--next VERSION] [--routes N] [--features N] [--ui N]
//!               [--heavy N] [--heavy-kb N] [--seed N]
//! tpdev bench   --app DIR --dist DIST --port N --out PREFIX [--env NAME=VALUE]...
//!               [--cookie VALUE] [--wait-secs N] [--label TEXT] ROUTE...
//! tpdev probe   --base URL --dist DIR --out FILE [--cookie VALUE] [--wait-secs N] ROUTE...
//! tpdev analyze --dist DIR [--top N] [--json]
//! tpdev where   --dist DIR --module SUBSTRING
//! ```
//!
//! `bench` starts `next dev` in an app, requests the routes in order (see `probe`), stops the
//! server and analyzes the dist dir (see `analyze`). `probe` times each route's first request,
//! then fetches every script the HTML names, and records how much the dist dir grew.
//!
//! `analyze` parses every `.js` file under `<dist>/dev/static/chunks` and
//! `<dist>/dev/server/chunks` into module registrations
//! (`\n"[project]/<path> [<layer>] (<type>)…", ((__turbopack_context__`). A
//! registration's bytes run from its key to its factory's closing `\n}),\n`.
//! A module is identified by its full key (path, layer and type, so an async
//! loader stub is not confused with the module it loads). A module is a
//! duplicate when its key appears in more than one chunk file; its duplicate
//! bytes are the bytes of every copy but the largest. Import identifier bytes are
//! the matches of `__TURBOPACK__imported__module__[A-Za-z0-9_$]+`.
//!
//! `analyze` also reports the duplicate share the way a key of (path, layer)
//! with one size per key counts it ("path+layer method"), for comparison with
//! measurements taken that way.

mod gen;

use std::{
    collections::{BTreeMap, HashMap, HashSet},
    fs,
    io::Read,
    path::{Path, PathBuf},
    sync::Arc,
    thread,
    time::{Duration, Instant},
};

use regex::bytes::Regex;
use serde_json::{json, Value};

pub struct Args {
    flags: HashMap<String, Vec<String>>,
    positional: Vec<String>,
}

const BOOLEAN_FLAGS: &[&str] = &["json"];

impl Args {
    fn parse(raw: &[String]) -> Args {
        let mut flags: HashMap<String, Vec<String>> = HashMap::new();
        let mut positional = Vec::new();
        let mut i = 0;
        while i < raw.len() {
            let a = &raw[i];
            if let Some(name) = a.strip_prefix("--") {
                if let Some((k, v)) = name.split_once('=') {
                    flags.entry(k.to_string()).or_default().push(v.to_string());
                } else if BOOLEAN_FLAGS.contains(&name) || i + 1 >= raw.len() {
                    flags
                        .entry(name.to_string())
                        .or_default()
                        .push("true".into());
                } else {
                    flags
                        .entry(name.to_string())
                        .or_default()
                        .push(raw[i + 1].clone());
                    i += 1;
                }
            } else {
                positional.push(a.clone());
            }
            i += 1;
        }
        Args { flags, positional }
    }

    pub fn get(&self, name: &str) -> Option<&str> {
        self.flags
            .get(name)
            .and_then(|v| v.last())
            .map(|s| s.as_str())
    }

    pub fn req(&self, name: &str) -> String {
        match self.get(name) {
            Some(v) => v.to_string(),
            None => die(&format!("missing required flag --{name}")),
        }
    }

    pub fn num(&self, name: &str, default: usize) -> usize {
        match self.get(name) {
            Some(v) => v
                .parse()
                .unwrap_or_else(|_| die(&format!("--{name} expects a number, got {v}"))),
            None => default,
        }
    }

    pub fn has(&self, name: &str) -> bool {
        self.flags.contains_key(name)
    }
}

pub fn die(msg: &str) -> ! {
    eprintln!("tpdev: {msg}");
    std::process::exit(2)
}

fn main() {
    let raw: Vec<String> = std::env::args().skip(1).collect();
    let Some((cmd, rest)) = raw.split_first() else {
        die("usage: tpdev <gen|bench|probe|analyze|where> [flags]");
    };
    let args = Args::parse(rest);
    match cmd.as_str() {
        "gen" => gen::run(&args),
        "probe" => probe(&args),
        "analyze" => analyze(&args),
        "where" => where_module(&args),
        "bench" => bench(&args),
        other => die(&format!("unknown subcommand {other}")),
    }
}

// ---------------------------------------------------------------------------
// Directory walking
// ---------------------------------------------------------------------------

fn walk_files(root: &Path, out: &mut Vec<PathBuf>) {
    let Ok(entries) = fs::read_dir(root) else {
        return;
    };
    for entry in entries.flatten() {
        let Ok(ft) = entry.file_type() else { continue };
        let path = entry.path();
        if ft.is_dir() {
            walk_files(&path, out);
        } else if ft.is_file() {
            out.push(path);
        }
    }
}

#[derive(Clone, Copy, Default)]
struct DirSize {
    files: u64,
    bytes: u64,
}

fn dir_size(root: &Path) -> DirSize {
    let mut files = Vec::new();
    walk_files(root, &mut files);
    let mut s = DirSize::default();
    for f in files {
        if let Ok(m) = fs::metadata(&f) {
            s.files += 1;
            s.bytes += m.len();
        }
    }
    s
}

fn delta(a: DirSize, b: DirSize) -> Value {
    json!({
        "files": b.files as i64 - a.files as i64,
        "mb": ((b.bytes as f64 - a.bytes as f64) / 1048576.0 * 10.0).round() / 10.0,
    })
}

// ---------------------------------------------------------------------------
// analyze / where
// ---------------------------------------------------------------------------

fn module_regex() -> Regex {
    Regex::new(
        r#"\n"(\[[a-z-]+\]/[^"]+?) \[([a-z-]+)\] \(([^)]+)\)([^"]*)", \(\(__turbopack_context__"#,
    )
    .unwrap()
}

fn ident_regex() -> Regex {
    Regex::new(r"__TURBOPACK__imported__module__[A-Za-z0-9_$]+").unwrap()
}

struct Registration {
    /// `<path> [<layer>] (<type>)<suffix>`
    key: String,
    /// `<path> [<layer>]`
    path_layer: String,
    start: usize,
    end: usize,
}

/// The module registrations in one chunk file.
fn registrations(data: &[u8], re: &Regex) -> Vec<Registration> {
    let finder = memchr::memmem::Finder::new(b"\n}),\n");
    let caps: Vec<_> = re.captures_iter(data).collect();
    let mut out = Vec::with_capacity(caps.len());
    for (i, c) in caps.iter().enumerate() {
        let m = c.get(0).unwrap();
        let start = m.start();
        let next = caps
            .get(i + 1)
            .map(|n| n.get(0).unwrap().start())
            .unwrap_or(data.len());
        let end = match finder.find(&data[start..]) {
            Some(off) => (start + off + 5).min(next),
            None => next,
        };
        let path = String::from_utf8_lossy(&c[1]);
        let layer = String::from_utf8_lossy(&c[2]);
        let ty = String::from_utf8_lossy(&c[3]);
        let suffix = String::from_utf8_lossy(&c[4]);
        out.push(Registration {
            key: format!("{path} [{layer}] ({ty}){suffix}"),
            path_layer: format!("{path} [{layer}]"),
            start,
            end,
        });
    }
    out
}

#[derive(Default)]
struct ModuleStat {
    /// chunk file index -> bytes of the copy in that file
    copies: HashMap<u32, usize>,
}

impl ModuleStat {
    fn total(&self) -> usize {
        self.copies.values().sum()
    }
    fn largest(&self) -> usize {
        self.copies.values().copied().max().unwrap_or(0)
    }
}

#[derive(Default)]
struct PathLayerStat {
    last_size: usize,
    files: HashSet<u32>,
}

#[derive(Default)]
struct ScanResult {
    files: Vec<(PathBuf, u64)>,
    total_bytes: u64,
    ident_bytes: u64,
    ident_count: u64,
    modules: HashMap<String, ModuleStat>,
    path_layer: HashMap<String, PathLayerStat>,
}

fn scan(root: &Path) -> ScanResult {
    let re = module_regex();
    let ident = ident_regex();
    let mut paths = Vec::new();
    walk_files(root, &mut paths);
    paths.retain(|p| p.extension().map(|e| e == "js").unwrap_or(false));
    paths.sort();
    let mut res = ScanResult::default();
    for (idx, p) in paths.iter().enumerate() {
        let Ok(data) = fs::read(p) else { continue };
        res.total_bytes += data.len() as u64;
        res.files.push((p.clone(), data.len() as u64));
        for m in ident.find_iter(&data) {
            res.ident_bytes += m.len() as u64;
            res.ident_count += 1;
        }
        for r in registrations(&data, &re) {
            let size = r.end - r.start;
            let e = res.modules.entry(r.key).or_default();
            let slot = e.copies.entry(idx as u32).or_insert(0);
            *slot = (*slot).max(size);
            let pl = res.path_layer.entry(r.path_layer).or_default();
            pl.last_size = size;
            pl.files.insert(idx as u32);
        }
    }
    res
}

fn mb(b: u64) -> f64 {
    (b as f64 / 1048576.0 * 10.0).round() / 10.0
}

fn pct(a: u64, b: u64) -> f64 {
    if b == 0 {
        0.0
    } else {
        (a as f64 * 1000.0 / b as f64).round() / 10.0
    }
}

fn summarize(res: &ScanResult, top: usize) -> Value {
    let mut dup_modules = 0u64;
    let mut dup_bytes = 0u64;
    let mut module_bytes = 0u64;
    let mut hist: BTreeMap<usize, u64> = BTreeMap::new();
    for m in res.modules.values() {
        let copies = m.copies.len();
        let total = m.total() as u64;
        module_bytes += total;
        *hist.entry(copies).or_default() += 1;
        if copies > 1 {
            dup_modules += 1;
            dup_bytes += total - m.largest() as u64;
        }
    }
    let mut pl_dup = 0u64;
    for s in res.path_layer.values() {
        if s.files.len() > 1 {
            pl_dup += (s.last_size * (s.files.len() - 1)) as u64;
        }
    }
    let mut rows: Vec<(&String, &ModuleStat)> = res.modules.iter().collect();
    rows.sort_by(|a, b| b.1.total().cmp(&a.1.total()).then(a.0.cmp(b.0)));
    let top_rows: Vec<Value> = rows
        .iter()
        .take(top)
        .map(|(k, m)| {
            json!({
                "total_mb": mb(m.total() as u64),
                "kb": (m.largest() as f64 / 1024.0).round(),
                "copies": m.copies.len(),
                "module": k,
            })
        })
        .collect();
    let hist_json: Value = hist
        .iter()
        .take(16)
        .map(|(k, v)| (k.to_string(), json!(v)))
        .collect::<serde_json::Map<_, _>>()
        .into();
    json!({
        "files": res.files.len(),
        "mb": mb(res.total_bytes),
        "modules": res.modules.len(),
        "modules_in_more_than_one_file": dup_modules,
        "module_mb": mb(module_bytes),
        "duplicate_mb": mb(dup_bytes),
        "duplicate_pct_of_bytes": pct(dup_bytes, res.total_bytes),
        "path_layer_method_duplicate_mb": mb(pl_dup),
        "path_layer_method_duplicate_pct_of_bytes": pct(pl_dup, res.total_bytes),
        "import_identifier_mb": mb(res.ident_bytes),
        "import_identifier_pct_of_bytes": pct(res.ident_bytes, res.total_bytes),
        "import_identifier_count": res.ident_count,
        "import_identifier_avg_len": res.ident_bytes.checked_div(res.ident_count).unwrap_or(0),
        "copies_histogram": hist_json,
        "top": top_rows,
    })
}

fn analyze(args: &Args) {
    let dist = PathBuf::from(args.req("dist"));
    let top = args.num("top", 15);
    let client = scan(&dist.join("dev/static/chunks"));
    let server = scan(&dist.join("dev/server/chunks"));
    let out = json!({
        "dist": dist.display().to_string(),
        "client": summarize(&client, top),
        "server": summarize(&server, top),
    });
    if args.has("json") {
        println!("{}", serde_json::to_string(&out).unwrap());
        return;
    }
    for side in ["client", "server"] {
        let s = &out[side];
        println!(
            "{side}: {} files, {} MB; {} modules, {} in >1 file; duplicate {} MB ({}% of bytes; \
             path+layer method {}%); import identifiers {} MB ({}% of bytes, {} uses, avg {} chars)",
            s["files"],
            s["mb"],
            s["modules"],
            s["modules_in_more_than_one_file"],
            s["duplicate_mb"],
            s["duplicate_pct_of_bytes"],
            s["path_layer_method_duplicate_pct_of_bytes"],
            s["import_identifier_mb"],
            s["import_identifier_pct_of_bytes"],
            s["import_identifier_count"],
            s["import_identifier_avg_len"],
        );
        println!("  copies histogram: {}", s["copies_histogram"]);
        for r in s["top"].as_array().unwrap() {
            println!(
                "  {:>8.1} MB = {:>6} KB x {:>3}  {}",
                r["total_mb"].as_f64().unwrap(),
                r["kb"],
                r["copies"],
                r["module"].as_str().unwrap()
            );
        }
    }
}

fn where_module(args: &Args) {
    let dist = PathBuf::from(args.req("dist"));
    let needle = args.req("module");
    let re = module_regex();
    for sub in ["dev/static/chunks", "dev/server/chunks"] {
        let mut paths = Vec::new();
        walk_files(&dist.join(sub), &mut paths);
        paths.retain(|p| p.extension().map(|e| e == "js").unwrap_or(false));
        paths.sort();
        for p in paths {
            let Ok(data) = fs::read(&p) else { continue };
            let regs = registrations(&data, &re);
            let hits: Vec<String> = regs
                .iter()
                .filter(|r| r.key.contains(&needle))
                .map(|r| format!("{} ({} B)", r.key, r.end - r.start))
                .collect();
            if hits.is_empty() {
                continue;
            }
            println!(
                "{} ({} KB, {} modules): {}",
                p.strip_prefix(&dist).unwrap_or(&p).display(),
                data.len() / 1024,
                regs.len(),
                hits.join(", ")
            );
        }
    }
}

// ---------------------------------------------------------------------------
// probe
// ---------------------------------------------------------------------------

struct Snap {
    client: DirSize,
    server: DirSize,
    total: DirSize,
}

fn snap(dist: &Path) -> Snap {
    Snap {
        client: dir_size(&dist.join("dev/static")),
        server: dir_size(&dist.join("dev/server")),
        total: dir_size(dist),
    }
}

fn snap_delta(a: &Snap, b: &Snap) -> Value {
    json!({
        "server": delta(a.server, b.server),
        "client": delta(a.client, b.client),
        "total": delta(a.total, b.total),
    })
}

fn fetch(agent: &ureq::Agent, url: &str, cookie: Option<&str>) -> (i64, Vec<u8>) {
    let mut req = agent.get(url);
    if let Some(c) = cookie {
        req = req.set("cookie", c);
    }
    let resp = match req.call() {
        Ok(r) => r,
        Err(ureq::Error::Status(_, r)) => r,
        Err(e) => return (-1, e.to_string().into_bytes()),
    };
    let status = resp.status() as i64;
    let mut body = Vec::new();
    let _ = resp.into_reader().take(1 << 30).read_to_end(&mut body);
    (status, body)
}

fn probe(args: &Args) {
    let routes = &args.positional;
    if routes.is_empty() {
        die("probe needs at least one route");
    }
    run_probe(
        &args.req("base"),
        &PathBuf::from(args.req("dist")),
        &args.req("out"),
        args.get("cookie"),
        args.num("wait-secs", 0),
        routes,
    );
}

/// Waits until `base` accepts connections (any HTTP status counts). Returns false on timeout.
fn wait_for_server(base: &str, wait_secs: usize) -> bool {
    let deadline = Instant::now() + Duration::from_secs(wait_secs as u64);
    let agent = ureq::AgentBuilder::new()
        .redirects(0)
        .timeout(Duration::from_secs(5))
        .build();
    loop {
        match agent.head(&format!("{base}/__tpdev_wait")).call() {
            Ok(_) | Err(ureq::Error::Status(..)) => return true,
            Err(_) if Instant::now() < deadline => thread::sleep(Duration::from_millis(500)),
            Err(_) => return false,
        }
    }
}

/// Requests each route in order: times the SSR request, then fetches every script chunk the
/// HTML names at once, and records the growth of the dist dir over each step. Writes one JSON
/// line per route to `out_path` and returns them.
fn run_probe(
    base: &str,
    dist: &Path,
    out_path: &str,
    cookie: Option<&str>,
    wait_secs: usize,
    routes: &[String],
) -> Vec<Value> {
    let cookie = cookie.map(|s| s.to_string());
    let agent = ureq::AgentBuilder::new()
        .redirects(0)
        .timeout(Duration::from_secs(3600))
        .build();
    if wait_secs > 0 && !wait_for_server(base, wait_secs) {
        die(&format!(
            "server at {base} not reachable after {wait_secs} s"
        ));
    }
    let script_re = Regex::new(r#"(?:src|href)="(/_next/static/[^"]+?\.js)""#).unwrap();
    let mut lines = String::new();
    let mut out = Vec::new();
    for route in routes {
        let before = snap(dist);
        let t0 = Instant::now();
        let (status, html) = fetch(&agent, &format!("{base}{route}"), cookie.as_deref());
        let ssr = t0.elapsed().as_secs_f64();
        let mid = snap(dist);
        let mut scripts: Vec<String> = script_re
            .captures_iter(&html)
            .map(|c| String::from_utf8_lossy(&c[1]).into_owned())
            .collect();
        scripts.sort();
        scripts.dedup();
        let t1 = Instant::now();
        let shared = Arc::new(agent.clone());
        let handles: Vec<_> = scripts
            .iter()
            .map(|src| {
                let agent = shared.clone();
                let url = format!("{base}{src}");
                let cookie = cookie.clone();
                thread::spawn(move || {
                    let (status, body) = fetch(&agent, &url, cookie.as_deref());
                    (status, body.len() as u64)
                })
            })
            .collect();
        let results: Vec<(i64, u64)> = handles.into_iter().map(|h| h.join().unwrap()).collect();
        let client = t1.elapsed().as_secs_f64();
        let after = snap(dist);
        let line = json!({
            "route": route,
            "status": status,
            "ssr_s": (ssr * 10.0).round() / 10.0,
            "client_s": (client * 10.0).round() / 10.0,
            "scripts": scripts.len(),
            "script_mb": mb(results.iter().map(|r| r.1).sum()),
            "script_fail": results.iter().filter(|r| !(200..300).contains(&r.0)).count(),
            "ssr_new": snap_delta(&before, &mid),
            "client_new": snap_delta(&mid, &after),
        });
        println!(
            "{route}: status {status}, ssr {:.1} s, client {:.1} s, {} scripts ({} MB, {} failed); \
             new: client {} files / {} MB, server {} files / {} MB",
            ssr,
            client,
            scripts.len(),
            line["script_mb"],
            line["script_fail"],
            line["ssr_new"]["client"]["files"],
            line["ssr_new"]["client"]["mb"],
            line["ssr_new"]["server"]["files"],
            line["ssr_new"]["server"]["mb"],
        );
        lines.push_str(&line.to_string());
        lines.push('\n');
        fs::write(out_path, &lines).unwrap_or_else(|e| die(&format!("write {out_path}: {e}")));
        out.push(line);
    }
    out
}

// ---------------------------------------------------------------------------
// bench: start `next dev`, probe, stop it, analyze the dist dir
// ---------------------------------------------------------------------------

/// ```text
/// tpdev bench --app DIR --dist DIST --port N --out PREFIX [--env NAME=VALUE]...
///             [--cookie VALUE] [--wait-secs N] [--label TEXT] ROUTE...
/// ```
///
/// Starts `node node_modules/next/dist/bin/next dev --port N` in `--app` (with each `--env`
/// set, and `--dist` removed first), waits for it, probes the routes, stops the server, then
/// analyzes `--dist`. Writes `PREFIX.server.log`, `PREFIX.routes.ndjson` and
/// `PREFIX.summary.json` (routes, chunk composition, and the count of server log lines that
/// mention a failed server HMR update or an output path conflict).
fn bench(args: &Args) {
    use std::os::unix::process::CommandExt;

    let app = PathBuf::from(args.req("app"));
    let dist_rel = args.req("dist");
    let dist = app.join(&dist_rel);
    let port = args.num("port", 3990);
    let prefix = args.req("out");
    let label = args.get("label").unwrap_or("").to_string();
    let routes = &args.positional;
    if routes.is_empty() {
        die("bench needs at least one route");
    }
    if dist.exists() {
        fs::remove_dir_all(&dist).unwrap_or_else(|e| die(&format!("rm {dist:?}: {e}")));
    }
    let log_path = format!("{prefix}.server.log");
    let log = fs::File::create(&log_path).unwrap_or_else(|e| die(&format!("{log_path}: {e}")));
    let mut cmd = std::process::Command::new("node");
    cmd.current_dir(&app)
        .arg("node_modules/next/dist/bin/next")
        .arg("dev")
        .arg("--port")
        .arg(port.to_string())
        .stdout(log.try_clone().unwrap())
        .stderr(log)
        .process_group(0);
    for kv in args.flags.get("env").into_iter().flatten() {
        let (k, v) = kv
            .split_once('=')
            .unwrap_or_else(|| die(&format!("--env expects NAME=VALUE, got {kv}")));
        cmd.env(k, v);
    }
    let started = Instant::now();
    let mut child = cmd
        .spawn()
        .unwrap_or_else(|e| die(&format!("spawn next dev: {e}")));
    let pgid = child.id();
    let base = format!("http://localhost:{port}");
    let ready = wait_for_server(&base, args.num("wait-secs", 600));
    let ready_s = started.elapsed().as_secs_f64();
    let route_lines = if ready {
        run_probe(
            &base,
            &dist,
            &format!("{prefix}.routes.ndjson"),
            args.get("cookie"),
            0,
            routes,
        )
    } else {
        eprintln!("tpdev: server did not come up; see {log_path}");
        Vec::new()
    };
    // Stop the whole process group (next dev forks workers).
    let _ = std::process::Command::new("kill")
        .arg("-TERM")
        .arg(format!("-{pgid}"))
        .status();
    let deadline = Instant::now() + Duration::from_secs(20);
    loop {
        match child.try_wait() {
            Ok(Some(_)) => break,
            _ if Instant::now() > deadline => {
                let _ = std::process::Command::new("kill")
                    .arg("-KILL")
                    .arg(format!("-{pgid}"))
                    .status();
                let _ = child.wait();
                break;
            }
            _ => thread::sleep(Duration::from_millis(200)),
        }
    }
    let server_log = fs::read_to_string(&log_path).unwrap_or_default();
    let count = |needle: &str| server_log.matches(needle).count();
    let client = scan(&dist.join("dev/static/chunks"));
    let server = scan(&dist.join("dev/server/chunks"));
    let summary = json!({
        "label": label,
        "app": app.display().to_string(),
        "dist": dist_rel,
        "env": args.flags.get("env").cloned().unwrap_or_default(),
        "server_ready_s": (ready_s * 10.0).round() / 10.0,
        "routes": route_lines,
        "total_ssr_s": (route_lines.iter().map(|l| l["ssr_s"].as_f64().unwrap_or(0.0)).sum::<f64>() * 10.0).round() / 10.0,
        "server_hmr_update_failed_lines": count("[Server HMR] Update failed"),
        "conflicting_effects_lines": count("conflicting effects for the same key"),
        "output_path_conflict_lines": count("Two or more assets with different content were emitted to the same output path"),
        "client": summarize(&client, 10),
        "server": summarize(&server, 10),
    });
    let summary_path = format!("{prefix}.summary.json");
    fs::write(
        &summary_path,
        serde_json::to_string_pretty(&summary).unwrap(),
    )
    .unwrap_or_else(|e| die(&format!("write {summary_path}: {e}")));
    println!(
        "{label}: ready {:.1} s, total ssr {} s; client {} MB ({}% duplicate, {}% import identifiers); \
         server {} MB ({}% duplicate, {}% import identifiers); conflicting effects {}, output path conflicts {}",
        ready_s,
        summary["total_ssr_s"],
        summary["client"]["mb"],
        summary["client"]["duplicate_pct_of_bytes"],
        summary["client"]["import_identifier_pct_of_bytes"],
        summary["server"]["mb"],
        summary["server"]["duplicate_pct_of_bytes"],
        summary["server"]["import_identifier_pct_of_bytes"],
        summary["conflicting_effects_lines"],
        summary["output_path_conflict_lines"],
    );
}
