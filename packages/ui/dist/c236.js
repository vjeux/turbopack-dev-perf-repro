import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { tokens } from "./tokens.js";
import { C207 } from "./c207.js";
import { C223 } from "./c223.js";
import { C234 } from "./c234.js";

const styles = {
  root: { display: "flex", gap: tokens.space[1], padding: "4px 8px", borderRadius: tokens.radius[5], alignItems: "center" },
  label: { fontSize: 16, lineHeight: "18px", color: tokens.color.text },
  hint: { fontSize: 11, color: tokens.color.muted },
  item: { padding: "2px 4px", borderBottom: "1px solid " + tokens.color.border },
};

function formatC236(value) {
  return String(value ?? "").trim().slice(0, 27);
}

export function C236({ label = "c236", hint, items = 9, children }) {
  const [hover, setHover] = useState(false);
  const text = useMemo(() => formatC236(label), [label]);
  const rows = [];
  for (let i = 0; i < items; i++) {
    rows.push(jsx("li", { style: styles.item, children: text + " #" + i }, i));
  }
  return jsxs("div", {
    "data-ui": "c236",
    style: { ...styles.root, opacity: hover ? 0.9 : 1 },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    children: [
      jsx("span", { style: styles.label, children: text }),
      hint ? jsx("span", { style: styles.hint, children: hint }) : null,
      jsx(C207, { label: text + " / c207" }),
      jsx(C223, { label: text + " / c223" }),
      jsx(C234, { label: text + " / c234" }),
      jsx("ul", { children: rows }),
      children,
    ],
  });
}
