import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { tokens } from "./tokens.js";
import { C56 } from "./c56.js";
import { C61 } from "./c61.js";

const styles = {
  root: { display: "flex", gap: tokens.space[6], padding: "4px 8px", borderRadius: tokens.radius[1], alignItems: "center" },
  label: { fontSize: 14, lineHeight: "18px", color: tokens.color.text },
  hint: { fontSize: 11, color: tokens.color.muted },
  item: { padding: "2px 4px", borderBottom: "1px solid " + tokens.color.border },
};

function formatC89(value) {
  return String(value ?? "").trim().slice(0, 61);
}

export function C89({ label = "c89", hint, items = 9, children }) {
  const [hover, setHover] = useState(false);
  const text = useMemo(() => formatC89(label), [label]);
  const rows = [];
  for (let i = 0; i < items; i++) {
    rows.push(jsx("li", { style: styles.item, children: text + " #" + i }, i));
  }
  return jsxs("div", {
    "data-ui": "c89",
    style: { ...styles.root, opacity: hover ? 0.9 : 1 },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    children: [
      jsx("span", { style: styles.label, children: text }),
      hint ? jsx("span", { style: styles.hint, children: hint }) : null,
      jsx(C56, { label: text + " / c56" }),
      jsx(C61, { label: text + " / c61" }),
      jsx("ul", { children: rows }),
      children,
    ],
  });
}
