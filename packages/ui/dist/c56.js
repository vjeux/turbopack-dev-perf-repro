import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { tokens } from "./tokens.js";
import { C26 } from "./c26.js";
import { C27 } from "./c27.js";
import { C55 } from "./c55.js";

const styles = {
  root: { display: "flex", gap: tokens.space[5], padding: "4px 8px", borderRadius: tokens.radius[5], alignItems: "center" },
  label: { fontSize: 12, lineHeight: "18px", color: tokens.color.text },
  hint: { fontSize: 11, color: tokens.color.muted },
  item: { padding: "2px 4px", borderBottom: "1px solid " + tokens.color.border },
};

function formatC56(value) {
  return String(value ?? "").trim().slice(0, 48);
}

export function C56({ label = "c56", hint, items = 4, children }) {
  const [hover, setHover] = useState(false);
  const text = useMemo(() => formatC56(label), [label]);
  const rows = [];
  for (let i = 0; i < items; i++) {
    rows.push(jsx("li", { style: styles.item, children: text + " #" + i }, i));
  }
  return jsxs("div", {
    "data-ui": "c56",
    style: { ...styles.root, opacity: hover ? 0.9 : 1 },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    children: [
      jsx("span", { style: styles.label, children: text }),
      hint ? jsx("span", { style: styles.hint, children: hint }) : null,
      jsx(C26, { label: text + " / c26" }),
      jsx(C27, { label: text + " / c27" }),
      jsx(C55, { label: text + " / c55" }),
      jsx("ul", { children: rows }),
      children,
    ],
  });
}
