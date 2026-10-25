import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { tokens } from "./tokens.js";
import { C30 } from "./c30.js";
import { C45 } from "./c45.js";

const styles = {
  root: { display: "flex", gap: tokens.space[6], padding: "4px 8px", borderRadius: tokens.radius[2], alignItems: "center" },
  label: { fontSize: 14, lineHeight: "18px", color: tokens.color.text },
  hint: { fontSize: 11, color: tokens.color.muted },
  item: { padding: "2px 4px", borderBottom: "1px solid " + tokens.color.border },
};

function formatC59(value) {
  return String(value ?? "").trim().slice(0, 27);
}

export function C59({ label = "c59", hint, items = 5, children }) {
  const [hover, setHover] = useState(false);
  const text = useMemo(() => formatC59(label), [label]);
  const rows = [];
  for (let i = 0; i < items; i++) {
    rows.push(jsx("li", { style: styles.item, children: text + " #" + i }, i));
  }
  return jsxs("div", {
    "data-ui": "c59",
    style: { ...styles.root, opacity: hover ? 0.9 : 1 },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    children: [
      jsx("span", { style: styles.label, children: text }),
      hint ? jsx("span", { style: styles.hint, children: hint }) : null,
      jsx(C30, { label: text + " / c30" }),
      jsx(C45, { label: text + " / c45" }),
      jsx("ul", { children: rows }),
      children,
    ],
  });
}
