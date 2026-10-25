import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { tokens } from "./tokens.js";
import { C33 } from "./c33.js";
import { C37 } from "./c37.js";

const styles = {
  root: { display: "flex", gap: tokens.space[1], padding: "4px 8px", borderRadius: tokens.radius[5], alignItems: "center" },
  label: { fontSize: 13, lineHeight: "18px", color: tokens.color.text },
  hint: { fontSize: 11, color: tokens.color.muted },
  item: { padding: "2px 4px", borderBottom: "1px solid " + tokens.color.border },
};

function formatC62(value) {
  return String(value ?? "").trim().slice(0, 29);
}

export function C62({ label = "c62", hint, items = 4, children }) {
  const [hover, setHover] = useState(false);
  const text = useMemo(() => formatC62(label), [label]);
  const rows = [];
  for (let i = 0; i < items; i++) {
    rows.push(jsx("li", { style: styles.item, children: text + " #" + i }, i));
  }
  return jsxs("div", {
    "data-ui": "c62",
    style: { ...styles.root, opacity: hover ? 0.9 : 1 },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    children: [
      jsx("span", { style: styles.label, children: text }),
      hint ? jsx("span", { style: styles.hint, children: hint }) : null,
      jsx(C33, { label: text + " / c33" }),
      jsx(C37, { label: text + " / c37" }),
      jsx("ul", { children: rows }),
      children,
    ],
  });
}
