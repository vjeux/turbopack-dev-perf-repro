//! `tpdev gen`: writes a pnpm Next.js App Router app with the shapes that make
//! Turbopack dev slow on large apps:
//!
//! - many routes, each rendering a different subset of shared client "features";
//! - every feature `next/dynamic`-imports one or two heavy client components, so
//!   the same dynamic import targets are reachable from many routes, and loads one
//!   more on demand with a plain `import()` in an event handler;
//! - a design-system package (`@repro/ui`) used statically by routes and by the
//!   heavy components alike, installed by pnpm with peer dependencies, so its
//!   module paths are long (`node_modules/.pnpm/@repro+ui@file+..._react@.../...`);
//! - heavy vendor packages (`@repro/heavy-N`, like diagram/math/codec libraries)
//!   and a shared utility package (`@repro/shared`, like a schema library);
//! - a parallel route slot whose page also reaches the heavy targets, and a nested
//!   `React.lazy` inside each heavy component.
//!
//! Everything is generated: the app has no dependencies besides next/react.

use std::{
    collections::BTreeSet,
    fmt::Write as _,
    fs,
    path::{Path, PathBuf},
};

use crate::{die, Args};

struct Rng(u64);

impl Rng {
    fn next(&mut self) -> u64 {
        // splitmix64
        self.0 = self.0.wrapping_add(0x9E37_79B9_7F4A_7C15);
        let mut z = self.0;
        z = (z ^ (z >> 30)).wrapping_mul(0xBF58_476D_1CE4_E5B9);
        z = (z ^ (z >> 27)).wrapping_mul(0x94D0_49BB_1331_11EB);
        z ^ (z >> 31)
    }

    /// Uniform in `lo..=hi`.
    fn range(&mut self, lo: usize, hi: usize) -> usize {
        if hi <= lo {
            return lo;
        }
        lo + (self.next() % ((hi - lo + 1) as u64)) as usize
    }

    /// `k` distinct values from `lo..hi`, sorted.
    fn sample(&mut self, lo: usize, hi: usize, k: usize) -> Vec<usize> {
        let n = hi.saturating_sub(lo);
        let k = k.min(n);
        let mut picked = BTreeSet::new();
        while picked.len() < k {
            picked.insert(self.range(lo, hi - 1));
        }
        picked.into_iter().collect()
    }
}

struct Config {
    out: PathBuf,
    next: String,
    react: String,
    routes: usize,
    features: usize,
    ui: usize,
    heavy: usize,
    heavy_kb: usize,
    heavy_parts: usize,
    shared_kb: usize,
    home_features: usize,
    route_features: (usize, usize),
    feature_ui: (usize, usize),
    feature_heavy: (usize, usize),
    heavy_ui: (usize, usize),
    shell_ui: usize,
    seed: u64,
}

fn range_flag(args: &Args, name: &str, default: (usize, usize)) -> (usize, usize) {
    match args.get(name) {
        None => default,
        Some(v) => {
            let (a, b) = v
                .split_once("..")
                .unwrap_or_else(|| die(&format!("--{name} expects LO..HI, got {v}")));
            let lo = a.parse().unwrap_or_else(|_| die(&format!("bad --{name}")));
            let hi = b.parse().unwrap_or_else(|_| die(&format!("bad --{name}")));
            (lo, hi)
        }
    }
}

fn write(root: &Path, rel: &str, content: &str) {
    let p = root.join(rel);
    if let Some(parent) = p.parent() {
        fs::create_dir_all(parent).unwrap_or_else(|e| die(&format!("mkdir {parent:?}: {e}")));
    }
    fs::write(&p, content).unwrap_or_else(|e| die(&format!("write {p:?}: {e}")));
}

pub fn run(args: &Args) {
    let features = args.num("features", 24);
    let cfg = Config {
        out: PathBuf::from(args.req("out")),
        next: args.get("next").unwrap_or("16.4.0").to_string(),
        react: args.get("react").unwrap_or("19.2.0").to_string(),
        routes: args.num("routes", 40),
        features,
        ui: args.num("ui", 300),
        heavy: args.num("heavy", 6),
        heavy_kb: args.num("heavy-kb", 1200),
        heavy_parts: args.num("heavy-parts", 24),
        shared_kb: args.num("shared-kb", 160),
        home_features: args.num("home-features", features / 2),
        route_features: range_flag(args, "route-features", (3, 8)),
        feature_ui: range_flag(args, "feature-ui", (6, 18)),
        feature_heavy: range_flag(args, "feature-heavy", (1, 2)),
        heavy_ui: range_flag(args, "heavy-ui", (15, 40)),
        shell_ui: args.num("shell-ui", 12),
        seed: args.num("seed", 1) as u64,
    };
    if cfg.out.exists()
        && fs::read_dir(&cfg.out)
            .map(|mut d| d.next().is_some())
            .unwrap_or(false)
    {
        die(&format!("{} exists and is not empty", cfg.out.display()));
    }
    let mut rng = Rng(cfg.seed);
    gen_ui(&cfg, &mut rng);
    gen_shared(&cfg, &mut rng);
    for m in 0..cfg.heavy {
        gen_heavy_pkg(&cfg, &mut rng, m);
    }
    gen_app(&cfg, &mut rng);
    println!(
        "generated {}: {} routes, {} features, {} ui modules, {} heavy packages x {} KB, next {}",
        cfg.out.display(),
        cfg.routes,
        cfg.features,
        cfg.ui,
        cfg.heavy,
        cfg.heavy_kb,
        cfg.next
    );
}

// ---------------------------------------------------------------------------
// @repro/ui: a design-system package with peer deps on react
// ---------------------------------------------------------------------------

fn gen_ui(cfg: &Config, rng: &mut Rng) {
    let root = cfg.out.join("packages/ui");
    write(
        &root,
        "package.json",
        r#"{
  "name": "@repro/ui",
  "version": "1.0.0",
  "type": "module",
  "sideEffects": false,
  "exports": {
    "./*": "./dist/*.js"
  },
  "peerDependencies": {
    "react": ">=19",
    "react-dom": ">=19"
  }
}
"#,
    );
    write(
        &root,
        "dist/tokens.js",
        r##"export const tokens = {
  space: [0, 2, 4, 8, 12, 16, 24, 32],
  radius: [0, 2, 4, 6, 8, 12],
  color: {
    text: "#1c1e21",
    muted: "#65676b",
    accent: "#0866ff",
    surface: "#ffffff",
    border: "#ced0d4",
  },
};
"##,
    );
    for j in 0..cfg.ui {
        let lo = j.saturating_sub(40);
        let deps = if j == 0 {
            Vec::new()
        } else {
            let k = rng.range(0, 3);
            rng.sample(lo, j, k)
        };
        let items = rng.range(4, 10);
        let mut s = String::new();
        writeln!(s, "import {{ jsx, jsxs }} from \"react/jsx-runtime\";").unwrap();
        writeln!(s, "import {{ useMemo, useState }} from \"react\";").unwrap();
        writeln!(s, "import {{ tokens }} from \"./tokens.js\";").unwrap();
        for d in &deps {
            writeln!(s, "import {{ C{d} }} from \"./c{d}.js\";").unwrap();
        }
        writeln!(
            s,
            r#"
const styles = {{
  root: {{ display: "flex", gap: tokens.space[{g}], padding: "4px 8px", borderRadius: tokens.radius[{r}], alignItems: "center" }},
  label: {{ fontSize: {fs}, lineHeight: "18px", color: tokens.color.text }},
  hint: {{ fontSize: 11, color: tokens.color.muted }},
  item: {{ padding: "2px 4px", borderBottom: "1px solid " + tokens.color.border }},
}};

function formatC{j}(value) {{
  return String(value ?? "").trim().slice(0, {cut});
}}

export function C{j}({{ label = "c{j}", hint, items = {items}, children }}) {{
  const [hover, setHover] = useState(false);
  const text = useMemo(() => formatC{j}(label), [label]);
  const rows = [];
  for (let i = 0; i < items; i++) {{
    rows.push(jsx("li", {{ style: styles.item, children: text + " #" + i }}, i));
  }}
  return jsxs("div", {{
    "data-ui": "c{j}",
    style: {{ ...styles.root, opacity: hover ? 0.9 : 1 }},
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    children: ["#,
            g = rng.range(1, 6),
            r = rng.range(1, 5),
            fs = rng.range(11, 16),
            cut = rng.range(24, 96),
        )
        .unwrap();
        writeln!(
            s,
            "      jsx(\"span\", {{ style: styles.label, children: text }}),"
        )
        .unwrap();
        writeln!(
            s,
            "      hint ? jsx(\"span\", {{ style: styles.hint, children: hint }}) : null,"
        )
        .unwrap();
        for d in &deps {
            writeln!(s, "      jsx(C{d}, {{ label: text + \" / c{d}\" }}),").unwrap();
        }
        writeln!(s, "      jsx(\"ul\", {{ children: rows }}),").unwrap();
        writeln!(s, "      children,").unwrap();
        writeln!(s, "    ],\n  }});\n}}").unwrap();
        write(&root, &format!("dist/c{j}.js"), &s);
    }
}

// ---------------------------------------------------------------------------
// @repro/shared: one big utility module plus a few helpers (a schema library)
// ---------------------------------------------------------------------------

fn filler_module(rng: &mut Rng, prefix: &str, target_bytes: usize) -> String {
    let mut s = String::new();
    let mut n = 0;
    while s.len() < target_bytes {
        if n % 3 == 0 {
            write!(s, "export const {prefix}_table_{n} = [").unwrap();
            for _ in 0..48 {
                write!(s, "{},", rng.next() % 100_000).unwrap();
            }
            s.push_str("];\n");
        } else {
            writeln!(
                s,
                "export function {prefix}_op_{n}(x, y = {b}) {{\n  const k = (x * {a} + y) % {c};\n  if (k > {d}) {{\n    return \"{prefix}-\" + k.toString(36);\n  }}\n  return k;\n}}",
                a = rng.range(3, 997),
                b = rng.range(1, 97),
                c = rng.range(1009, 65521),
                d = rng.range(100, 900),
            )
            .unwrap();
        }
        n += 1;
    }
    s
}

fn gen_shared(cfg: &Config, rng: &mut Rng) {
    let root = cfg.out.join("packages/shared");
    write(
        &root,
        "package.json",
        r#"{
  "name": "@repro/shared",
  "version": "1.0.0",
  "type": "module",
  "sideEffects": false,
  "exports": {
    ".": "./dist/index.js",
    "./*": "./dist/*.js"
  }
}
"#,
    );
    let core = filler_module(rng, "core", cfg.shared_kb * 1024);
    write(&root, "dist/core.js", &core);
    write(
        &root,
        "dist/index.js",
        "import * as core from \"./core.js\";\n\nexport function parse(value) {\n  return { value: String(value), size: Object.keys(core).length };\n}\n\nexport { core };\n",
    );
}

// ---------------------------------------------------------------------------
// @repro/heavy-N: big vendor packages (diagram / math / codec libraries)
// ---------------------------------------------------------------------------

fn gen_heavy_pkg(cfg: &Config, rng: &mut Rng, m: usize) {
    let root = cfg.out.join(format!("packages/heavy-{m}"));
    write(
        &root,
        "package.json",
        &format!(
            r#"{{
  "name": "@repro/heavy-{m}",
  "version": "2.{m}.0",
  "type": "module",
  "sideEffects": false,
  "exports": {{
    ".": "./dist/index.js",
    "./*": "./dist/*.js"
  }},
  "dependencies": {{
    "@repro/shared": "file:../shared"
  }}
}}
"#
        ),
    );
    let per_part = cfg.heavy_kb * 1024 / cfg.heavy_parts.max(1);
    let mut index = String::new();
    writeln!(index, "import {{ parse }} from \"@repro/shared\";").unwrap();
    for p in 0..cfg.heavy_parts {
        writeln!(index, "import * as part{p} from \"./part{p}.js\";").unwrap();
        let body = filler_module(rng, &format!("h{m}p{p}"), per_part);
        write(&root, &format!("dist/part{p}.js"), &body);
    }
    write!(index, "\nconst parts = [").unwrap();
    for p in 0..cfg.heavy_parts {
        write!(index, "part{p}, ").unwrap();
    }
    writeln!(
        index,
        "];\n\nexport function render(input) {{\n  const parsed = parse(input);\n  let n = 0;\n  for (const part of parts) n += Object.keys(part).length;\n  return \"heavy-{m}:\" + parsed.value + \":\" + n;\n}}"
    )
    .unwrap();
    write(&root, "dist/index.js", &index);
}

// ---------------------------------------------------------------------------
// The app
// ---------------------------------------------------------------------------

fn ui_imports(s: &mut String, ids: &[usize]) {
    for c in ids {
        writeln!(s, "import {{ C{c} }} from \"@repro/ui/c{c}\";").unwrap();
    }
}

fn ui_elements(s: &mut String, ids: &[usize], indent: &str, tag: &str) {
    for c in ids {
        writeln!(s, "{indent}<C{c} label=\"{tag} / c{c}\" />").unwrap();
    }
}

fn gen_app(cfg: &Config, rng: &mut Rng) {
    let root = &cfg.out;
    let mut deps = String::new();
    writeln!(deps, "    \"next\": \"{}\",", cfg.next).unwrap();
    writeln!(deps, "    \"react\": \"{}\",", cfg.react).unwrap();
    writeln!(deps, "    \"react-dom\": \"{}\",", cfg.react).unwrap();
    writeln!(deps, "    \"@repro/ui\": \"file:./packages/ui\",").unwrap();
    writeln!(deps, "    \"@repro/shared\": \"file:./packages/shared\",").unwrap();
    for m in 0..cfg.heavy {
        let comma = if m + 1 == cfg.heavy { "" } else { "," };
        writeln!(
            deps,
            "    \"@repro/heavy-{m}\": \"file:./packages/heavy-{m}\"{comma}"
        )
        .unwrap();
    }
    write(
        root,
        "package.json",
        &format!(
            "{{\n  \"name\": \"turbopack-dev-perf-repro\",\n  \"private\": true,\n  \"scripts\": {{\n    \"dev\": \"next dev\"\n  }},\n  \"dependencies\": {{\n{deps}  }}\n}}\n"
        ),
    );
    write(
        root,
        "next.config.mjs",
        r#"// TP_LAZY=1 turns on Turbopack's lazy dynamic imports (client and SSR).
// TP_DIST_DIR picks the dist dir so runs never share a cache.
const lazy = process.env.TP_LAZY === "1";

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.TP_DIST_DIR || ".next",
  turbopack: { root: import.meta.dirname },
  experimental: lazy
    ? { turbopackLazyDynamicImports: true, turbopackLazyDynamicImportsSSR: true }
    : {},
};

export default nextConfig;
"#,
    );
    write(root, ".gitignore", "node_modules\n.next*\n");

    // Heavy client components: each imports its vendor package, the shared
    // utility, many ui components, and a nested React.lazy.
    let heavy_count = cfg.heavy * 2;
    for h in 0..heavy_count {
        let pkg = h % cfg.heavy;
        let k = rng.range(cfg.heavy_ui.0, cfg.heavy_ui.1);
        let ui = rng.sample(0, cfg.ui, k);
        let mut s = String::new();
        writeln!(s, "\"use client\";\n").unwrap();
        writeln!(s, "import {{ lazy, Suspense }} from \"react\";").unwrap();
        writeln!(s, "import {{ render }} from \"@repro/heavy-{pkg}\";").unwrap();
        writeln!(s, "import {{ parse }} from \"@repro/shared\";").unwrap();
        ui_imports(&mut s, &ui);
        writeln!(s, "\nconst Inner = lazy(() => import(\"./h{h}-inner\"));\n").unwrap();
        writeln!(
            s,
            "export default function H{h}() {{\n  return (\n    <div data-heavy=\"h{h}\">"
        )
        .unwrap();
        writeln!(s, "      <p>{{render(parse(\"h{h}\").value)}}</p>").unwrap();
        ui_elements(&mut s, &ui, "      ", &format!("h{h}"));
        writeln!(
            s,
            "      <Suspense fallback={{null}}>\n        <Inner />\n      </Suspense>\n    </div>\n  );\n}}"
        )
        .unwrap();
        write(root, &format!("components/heavy/h{h}.jsx"), &s);

        let inner_k = rng.range(3, 8);
        let inner_ui = rng.sample(0, cfg.ui, inner_k);
        let part = rng.range(0, cfg.heavy_parts.max(1) - 1);
        let mut s = String::new();
        writeln!(s, "\"use client\";\n").unwrap();
        writeln!(
            s,
            "import * as part from \"@repro/heavy-{pkg}/part{part}\";"
        )
        .unwrap();
        ui_imports(&mut s, &inner_ui);
        writeln!(
            s,
            "\nexport default function H{h}Inner() {{\n  return (\n    <div data-heavy-inner=\"h{h}\">\n      <p>{{Object.keys(part).length}}</p>"
        )
        .unwrap();
        ui_elements(&mut s, &inner_ui, "      ", &format!("h{h}-inner"));
        writeln!(s, "    </div>\n  );\n}}").unwrap();
        write(root, &format!("components/heavy/h{h}-inner.jsx"), &s);
    }

    // Features: client components with static ui imports and next/dynamic heavy imports.
    for f in 0..cfg.features {
        let ui_k = rng.range(cfg.feature_ui.0, cfg.feature_ui.1);
        let ui = rng.sample(0, cfg.ui, ui_k);
        let heavy_k = rng.range(cfg.feature_heavy.0, cfg.feature_heavy.1);
        let heavies = rng.sample(0, heavy_count, heavy_k);
        let uses_shared = rng.range(0, 2) == 0;
        // A plain `import()` in an event handler, loaded only on demand (an image codec, a
        // diagram renderer): Turbopack's lazy dynamic imports defer these, not next/dynamic.
        let on_demand = rng.range(0, heavy_count - 1);
        let mut s = String::new();
        writeln!(s, "\"use client\";\n").unwrap();
        writeln!(s, "import dynamic from \"next/dynamic\";").unwrap();
        writeln!(s, "import {{ useState }} from \"react\";").unwrap();
        if uses_shared {
            writeln!(s, "import {{ parse }} from \"@repro/shared\";").unwrap();
        }
        ui_imports(&mut s, &ui);
        writeln!(s).unwrap();
        for h in &heavies {
            writeln!(
                s,
                "const Heavy{h} = dynamic(() => import(\"../heavy/h{h}\"));"
            )
            .unwrap();
        }
        writeln!(
            s,
            "\nexport default function F{f}({{ title }}) {{\n  const [open, setOpen] = useState(false);\n  const [OnDemand, setOnDemand] = useState(null);\n  async function load() {{\n    const mod = await import(\"../heavy/h{on_demand}\");\n    setOnDemand(() => mod.default);\n  }}\n  return (\n    <section data-feature=\"f{f}\">"
        )
        .unwrap();
        if uses_shared {
            writeln!(s, "      <h2>{{title ?? parse(\"f{f}\").value}}</h2>").unwrap();
        } else {
            writeln!(s, "      <h2>{{title ?? \"f{f}\"}}</h2>").unwrap();
        }
        ui_elements(&mut s, &ui, "      ", &format!("f{f}"));
        writeln!(
            s,
            "      <button onClick={{() => setOpen((v) => !v)}}>open</button>"
        )
        .unwrap();
        writeln!(s, "      <button onClick={{load}}>load</button>").unwrap();
        for h in &heavies {
            writeln!(s, "      {{open ? <Heavy{h} /> : null}}").unwrap();
        }
        writeln!(s, "      {{OnDemand ? <OnDemand /> : null}}").unwrap();
        writeln!(s, "    </section>\n  );\n}}").unwrap();
        write(root, &format!("components/features/f{f}.jsx"), &s);
    }

    // Shell (client) used by the root layout.
    let shell_ui = rng.sample(0, cfg.ui, cfg.shell_ui);
    let mut s = String::new();
    writeln!(s, "\"use client\";\n").unwrap();
    ui_imports(&mut s, &shell_ui);
    writeln!(
        s,
        "\nexport default function Shell({{ children, aside }}) {{\n  return (\n    <div data-shell>\n      <nav>"
    )
    .unwrap();
    ui_elements(&mut s, &shell_ui, "        ", "shell");
    writeln!(
        s,
        "      </nav>\n      <main>{{children}}</main>\n      <aside>{{aside}}</aside>\n    </div>\n  );\n}}"
    )
    .unwrap();
    write(root, "components/shell.jsx", &s);

    write(
        root,
        "app/layout.jsx",
        "import Shell from \"../components/shell\";\n\nexport default function RootLayout({ children, aside }) {\n  return (\n    <html lang=\"en\">\n      <body>\n        <Shell aside={aside}>{children}</Shell>\n      </body>\n    </html>\n  );\n}\n",
    );

    // Parallel slot: matches "/" with a page that reaches heavy targets, `default` elsewhere.
    let aside_features = rng.sample(0, cfg.features, 2);
    let mut s = String::new();
    for f in &aside_features {
        writeln!(s, "import F{f} from \"../../components/features/f{f}\";").unwrap();
    }
    writeln!(
        s,
        "\nexport default function AsidePage() {{\n  return (\n    <div data-slot=\"aside\">"
    )
    .unwrap();
    for f in &aside_features {
        writeln!(s, "      <F{f} title=\"aside f{f}\" />").unwrap();
    }
    writeln!(s, "    </div>\n  );\n}}").unwrap();
    write(root, "app/@aside/page.jsx", &s);
    write(
        root,
        "app/@aside/default.jsx",
        "export default function AsideDefault() {\n  return null;\n}\n",
    );

    // Home: many features plus links to every route.
    let home = rng.sample(0, cfg.features, cfg.home_features);
    let mut s = String::new();
    writeln!(s, "import Link from \"next/link\";").unwrap();
    for f in &home {
        writeln!(s, "import F{f} from \"../components/features/f{f}\";").unwrap();
    }
    writeln!(
        s,
        "\nexport default function Home() {{\n  return (\n    <div>\n      <ul>"
    )
    .unwrap();
    for r in 0..cfg.routes {
        writeln!(s, "        <li><Link href=\"/r{r}\">r{r}</Link></li>").unwrap();
    }
    writeln!(s, "      </ul>").unwrap();
    for f in &home {
        writeln!(s, "      <F{f} />").unwrap();
    }
    writeln!(s, "    </div>\n  );\n}}").unwrap();
    write(root, "app/page.jsx", &s);

    for r in 0..cfg.routes {
        let route_k = rng.range(cfg.route_features.0, cfg.route_features.1);
        let fs_ = rng.sample(0, cfg.features, route_k);
        let mut s = String::new();
        for f in &fs_ {
            writeln!(s, "import F{f} from \"../../components/features/f{f}\";").unwrap();
        }
        writeln!(
            s,
            "\nexport default function Route{r}() {{\n  return (\n    <div data-route=\"r{r}\">"
        )
        .unwrap();
        for f in &fs_ {
            writeln!(s, "      <F{f} title=\"r{r} f{f}\" />").unwrap();
        }
        writeln!(s, "    </div>\n  );\n}}").unwrap();
        write(root, &format!("app/r{r}/page.jsx"), &s);
    }
}
