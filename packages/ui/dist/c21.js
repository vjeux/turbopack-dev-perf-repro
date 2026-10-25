import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { tokens } from "./tokens.js";
import { C9 } from "./c9.js";
import { C14 } from "./c14.js";
import { C15 } from "./c15.js";

const styles = {
  root: { display: "flex", gap: tokens.space[4], padding: "4px 8px", borderRadius: tokens.radius[5], alignItems: "center" },
  label: { fontSize: 11, lineHeight: "18px", color: tokens.color.text },
  hint: { fontSize: 11, color: tokens.color.muted },
  item: { padding: "2px 4px", borderBottom: "1px solid " + tokens.color.border },
};

function formatC21(value) {
  return String(value ?? "").trim().slice(0, 36);
}

export function C21({ label = "c21", hint, items = 4, children }) {
  const [hover, setHover] = useState(false);
  const text = useMemo(() => formatC21(label), [label]);
  const rows = [];
  for (let i = 0; i < items; i++) {
    rows.push(jsx("li", { style: styles.item, children: text + " #" + i }, i));
  }
  return jsxs("div", {
    "data-ui": "c21",
    style: { ...styles.root, opacity: hover ? 0.9 : 1 },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    children: [
      jsx("span", { style: styles.label, children: text }),
      hint ? jsx("span", { style: styles.hint, children: hint }) : null,
      jsx(C9, { label: text + " / c9" }),
      jsx(C14, { label: text + " / c14" }),
      jsx(C15, { label: text + " / c15" }),
      jsx("ul", { children: rows }),
      children,
    ],
  });
}
