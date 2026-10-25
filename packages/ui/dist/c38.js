import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { tokens } from "./tokens.js";
import { C5 } from "./c5.js";
import { C13 } from "./c13.js";
import { C23 } from "./c23.js";

const styles = {
  root: { display: "flex", gap: tokens.space[6], padding: "4px 8px", borderRadius: tokens.radius[5], alignItems: "center" },
  label: { fontSize: 15, lineHeight: "18px", color: tokens.color.text },
  hint: { fontSize: 11, color: tokens.color.muted },
  item: { padding: "2px 4px", borderBottom: "1px solid " + tokens.color.border },
};

function formatC38(value) {
  return String(value ?? "").trim().slice(0, 42);
}

export function C38({ label = "c38", hint, items = 6, children }) {
  const [hover, setHover] = useState(false);
  const text = useMemo(() => formatC38(label), [label]);
  const rows = [];
  for (let i = 0; i < items; i++) {
    rows.push(jsx("li", { style: styles.item, children: text + " #" + i }, i));
  }
  return jsxs("div", {
    "data-ui": "c38",
    style: { ...styles.root, opacity: hover ? 0.9 : 1 },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    children: [
      jsx("span", { style: styles.label, children: text }),
      hint ? jsx("span", { style: styles.hint, children: hint }) : null,
      jsx(C5, { label: text + " / c5" }),
      jsx(C13, { label: text + " / c13" }),
      jsx(C23, { label: text + " / c23" }),
      jsx("ul", { children: rows }),
      children,
    ],
  });
}
