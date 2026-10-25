import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { tokens } from "./tokens.js";
import { C109 } from "./c109.js";
import { C110 } from "./c110.js";
import { C129 } from "./c129.js";

const styles = {
  root: { display: "flex", gap: tokens.space[3], padding: "4px 8px", borderRadius: tokens.radius[1], alignItems: "center" },
  label: { fontSize: 14, lineHeight: "18px", color: tokens.color.text },
  hint: { fontSize: 11, color: tokens.color.muted },
  item: { padding: "2px 4px", borderBottom: "1px solid " + tokens.color.border },
};

function formatC141(value) {
  return String(value ?? "").trim().slice(0, 61);
}

export function C141({ label = "c141", hint, items = 6, children }) {
  const [hover, setHover] = useState(false);
  const text = useMemo(() => formatC141(label), [label]);
  const rows = [];
  for (let i = 0; i < items; i++) {
    rows.push(jsx("li", { style: styles.item, children: text + " #" + i }, i));
  }
  return jsxs("div", {
    "data-ui": "c141",
    style: { ...styles.root, opacity: hover ? 0.9 : 1 },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    children: [
      jsx("span", { style: styles.label, children: text }),
      hint ? jsx("span", { style: styles.hint, children: hint }) : null,
      jsx(C109, { label: text + " / c109" }),
      jsx(C110, { label: text + " / c110" }),
      jsx(C129, { label: text + " / c129" }),
      jsx("ul", { children: rows }),
      children,
    ],
  });
}
