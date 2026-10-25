import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { tokens } from "./tokens.js";
import { C130 } from "./c130.js";
import { C150 } from "./c150.js";

const styles = {
  root: { display: "flex", gap: tokens.space[3], padding: "4px 8px", borderRadius: tokens.radius[1], alignItems: "center" },
  label: { fontSize: 11, lineHeight: "18px", color: tokens.color.text },
  hint: { fontSize: 11, color: tokens.color.muted },
  item: { padding: "2px 4px", borderBottom: "1px solid " + tokens.color.border },
};

function formatC156(value) {
  return String(value ?? "").trim().slice(0, 60);
}

export function C156({ label = "c156", hint, items = 5, children }) {
  const [hover, setHover] = useState(false);
  const text = useMemo(() => formatC156(label), [label]);
  const rows = [];
  for (let i = 0; i < items; i++) {
    rows.push(jsx("li", { style: styles.item, children: text + " #" + i }, i));
  }
  return jsxs("div", {
    "data-ui": "c156",
    style: { ...styles.root, opacity: hover ? 0.9 : 1 },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    children: [
      jsx("span", { style: styles.label, children: text }),
      hint ? jsx("span", { style: styles.hint, children: hint }) : null,
      jsx(C130, { label: text + " / c130" }),
      jsx(C150, { label: text + " / c150" }),
      jsx("ul", { children: rows }),
      children,
    ],
  });
}
