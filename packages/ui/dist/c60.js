import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { tokens } from "./tokens.js";
import { C46 } from "./c46.js";
import { C53 } from "./c53.js";

const styles = {
  root: { display: "flex", gap: tokens.space[4], padding: "4px 8px", borderRadius: tokens.radius[5], alignItems: "center" },
  label: { fontSize: 11, lineHeight: "18px", color: tokens.color.text },
  hint: { fontSize: 11, color: tokens.color.muted },
  item: { padding: "2px 4px", borderBottom: "1px solid " + tokens.color.border },
};

function formatC60(value) {
  return String(value ?? "").trim().slice(0, 83);
}

export function C60({ label = "c60", hint, items = 10, children }) {
  const [hover, setHover] = useState(false);
  const text = useMemo(() => formatC60(label), [label]);
  const rows = [];
  for (let i = 0; i < items; i++) {
    rows.push(jsx("li", { style: styles.item, children: text + " #" + i }, i));
  }
  return jsxs("div", {
    "data-ui": "c60",
    style: { ...styles.root, opacity: hover ? 0.9 : 1 },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    children: [
      jsx("span", { style: styles.label, children: text }),
      hint ? jsx("span", { style: styles.hint, children: hint }) : null,
      jsx(C46, { label: text + " / c46" }),
      jsx(C53, { label: text + " / c53" }),
      jsx("ul", { children: rows }),
      children,
    ],
  });
}
