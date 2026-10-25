import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { tokens } from "./tokens.js";
import { C177 } from "./c177.js";

const styles = {
  root: { display: "flex", gap: tokens.space[3], padding: "4px 8px", borderRadius: tokens.radius[3], alignItems: "center" },
  label: { fontSize: 14, lineHeight: "18px", color: tokens.color.text },
  hint: { fontSize: 11, color: tokens.color.muted },
  item: { padding: "2px 4px", borderBottom: "1px solid " + tokens.color.border },
};

function formatC205(value) {
  return String(value ?? "").trim().slice(0, 38);
}

export function C205({ label = "c205", hint, items = 7, children }) {
  const [hover, setHover] = useState(false);
  const text = useMemo(() => formatC205(label), [label]);
  const rows = [];
  for (let i = 0; i < items; i++) {
    rows.push(jsx("li", { style: styles.item, children: text + " #" + i }, i));
  }
  return jsxs("div", {
    "data-ui": "c205",
    style: { ...styles.root, opacity: hover ? 0.9 : 1 },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    children: [
      jsx("span", { style: styles.label, children: text }),
      hint ? jsx("span", { style: styles.hint, children: hint }) : null,
      jsx(C177, { label: text + " / c177" }),
      jsx("ul", { children: rows }),
      children,
    ],
  });
}
