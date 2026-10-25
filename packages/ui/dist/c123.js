import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { tokens } from "./tokens.js";
import { C83 } from "./c83.js";
import { C89 } from "./c89.js";

const styles = {
  root: { display: "flex", gap: tokens.space[4], padding: "4px 8px", borderRadius: tokens.radius[4], alignItems: "center" },
  label: { fontSize: 14, lineHeight: "18px", color: tokens.color.text },
  hint: { fontSize: 11, color: tokens.color.muted },
  item: { padding: "2px 4px", borderBottom: "1px solid " + tokens.color.border },
};

function formatC123(value) {
  return String(value ?? "").trim().slice(0, 91);
}

export function C123({ label = "c123", hint, items = 4, children }) {
  const [hover, setHover] = useState(false);
  const text = useMemo(() => formatC123(label), [label]);
  const rows = [];
  for (let i = 0; i < items; i++) {
    rows.push(jsx("li", { style: styles.item, children: text + " #" + i }, i));
  }
  return jsxs("div", {
    "data-ui": "c123",
    style: { ...styles.root, opacity: hover ? 0.9 : 1 },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    children: [
      jsx("span", { style: styles.label, children: text }),
      hint ? jsx("span", { style: styles.hint, children: hint }) : null,
      jsx(C83, { label: text + " / c83" }),
      jsx(C89, { label: text + " / c89" }),
      jsx("ul", { children: rows }),
      children,
    ],
  });
}
