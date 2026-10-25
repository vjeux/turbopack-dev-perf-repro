import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { tokens } from "./tokens.js";
import { C27 } from "./c27.js";
import { C36 } from "./c36.js";

const styles = {
  root: { display: "flex", gap: tokens.space[2], padding: "4px 8px", borderRadius: tokens.radius[2], alignItems: "center" },
  label: { fontSize: 16, lineHeight: "18px", color: tokens.color.text },
  hint: { fontSize: 11, color: tokens.color.muted },
  item: { padding: "2px 4px", borderBottom: "1px solid " + tokens.color.border },
};

function formatC58(value) {
  return String(value ?? "").trim().slice(0, 94);
}

export function C58({ label = "c58", hint, items = 4, children }) {
  const [hover, setHover] = useState(false);
  const text = useMemo(() => formatC58(label), [label]);
  const rows = [];
  for (let i = 0; i < items; i++) {
    rows.push(jsx("li", { style: styles.item, children: text + " #" + i }, i));
  }
  return jsxs("div", {
    "data-ui": "c58",
    style: { ...styles.root, opacity: hover ? 0.9 : 1 },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    children: [
      jsx("span", { style: styles.label, children: text }),
      hint ? jsx("span", { style: styles.hint, children: hint }) : null,
      jsx(C27, { label: text + " / c27" }),
      jsx(C36, { label: text + " / c36" }),
      jsx("ul", { children: rows }),
      children,
    ],
  });
}
