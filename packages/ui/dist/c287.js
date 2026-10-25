import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { tokens } from "./tokens.js";
import { C258 } from "./c258.js";
import { C262 } from "./c262.js";
import { C284 } from "./c284.js";

const styles = {
  root: { display: "flex", gap: tokens.space[2], padding: "4px 8px", borderRadius: tokens.radius[5], alignItems: "center" },
  label: { fontSize: 12, lineHeight: "18px", color: tokens.color.text },
  hint: { fontSize: 11, color: tokens.color.muted },
  item: { padding: "2px 4px", borderBottom: "1px solid " + tokens.color.border },
};

function formatC287(value) {
  return String(value ?? "").trim().slice(0, 47);
}

export function C287({ label = "c287", hint, items = 10, children }) {
  const [hover, setHover] = useState(false);
  const text = useMemo(() => formatC287(label), [label]);
  const rows = [];
  for (let i = 0; i < items; i++) {
    rows.push(jsx("li", { style: styles.item, children: text + " #" + i }, i));
  }
  return jsxs("div", {
    "data-ui": "c287",
    style: { ...styles.root, opacity: hover ? 0.9 : 1 },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    children: [
      jsx("span", { style: styles.label, children: text }),
      hint ? jsx("span", { style: styles.hint, children: hint }) : null,
      jsx(C258, { label: text + " / c258" }),
      jsx(C262, { label: text + " / c262" }),
      jsx(C284, { label: text + " / c284" }),
      jsx("ul", { children: rows }),
      children,
    ],
  });
}
