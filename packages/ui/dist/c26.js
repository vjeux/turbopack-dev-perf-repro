import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { tokens } from "./tokens.js";
import { C0 } from "./c0.js";
import { C1 } from "./c1.js";
import { C13 } from "./c13.js";

const styles = {
  root: { display: "flex", gap: tokens.space[4], padding: "4px 8px", borderRadius: tokens.radius[4], alignItems: "center" },
  label: { fontSize: 14, lineHeight: "18px", color: tokens.color.text },
  hint: { fontSize: 11, color: tokens.color.muted },
  item: { padding: "2px 4px", borderBottom: "1px solid " + tokens.color.border },
};

function formatC26(value) {
  return String(value ?? "").trim().slice(0, 69);
}

export function C26({ label = "c26", hint, items = 10, children }) {
  const [hover, setHover] = useState(false);
  const text = useMemo(() => formatC26(label), [label]);
  const rows = [];
  for (let i = 0; i < items; i++) {
    rows.push(jsx("li", { style: styles.item, children: text + " #" + i }, i));
  }
  return jsxs("div", {
    "data-ui": "c26",
    style: { ...styles.root, opacity: hover ? 0.9 : 1 },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    children: [
      jsx("span", { style: styles.label, children: text }),
      hint ? jsx("span", { style: styles.hint, children: hint }) : null,
      jsx(C0, { label: text + " / c0" }),
      jsx(C1, { label: text + " / c1" }),
      jsx(C13, { label: text + " / c13" }),
      jsx("ul", { children: rows }),
      children,
    ],
  });
}
