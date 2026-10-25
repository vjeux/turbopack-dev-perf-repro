import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { tokens } from "./tokens.js";
import { C6 } from "./c6.js";
import { C8 } from "./c8.js";
import { C36 } from "./c36.js";

const styles = {
  root: { display: "flex", gap: tokens.space[4], padding: "4px 8px", borderRadius: tokens.radius[5], alignItems: "center" },
  label: { fontSize: 15, lineHeight: "18px", color: tokens.color.text },
  hint: { fontSize: 11, color: tokens.color.muted },
  item: { padding: "2px 4px", borderBottom: "1px solid " + tokens.color.border },
};

function formatC41(value) {
  return String(value ?? "").trim().slice(0, 79);
}

export function C41({ label = "c41", hint, items = 6, children }) {
  const [hover, setHover] = useState(false);
  const text = useMemo(() => formatC41(label), [label]);
  const rows = [];
  for (let i = 0; i < items; i++) {
    rows.push(jsx("li", { style: styles.item, children: text + " #" + i }, i));
  }
  return jsxs("div", {
    "data-ui": "c41",
    style: { ...styles.root, opacity: hover ? 0.9 : 1 },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    children: [
      jsx("span", { style: styles.label, children: text }),
      hint ? jsx("span", { style: styles.hint, children: hint }) : null,
      jsx(C6, { label: text + " / c6" }),
      jsx(C8, { label: text + " / c8" }),
      jsx(C36, { label: text + " / c36" }),
      jsx("ul", { children: rows }),
      children,
    ],
  });
}
