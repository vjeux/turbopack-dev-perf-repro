import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { tokens } from "./tokens.js";
import { C83 } from "./c83.js";
import { C95 } from "./c95.js";
import { C97 } from "./c97.js";

const styles = {
  root: { display: "flex", gap: tokens.space[6], padding: "4px 8px", borderRadius: tokens.radius[1], alignItems: "center" },
  label: { fontSize: 16, lineHeight: "18px", color: tokens.color.text },
  hint: { fontSize: 11, color: tokens.color.muted },
  item: { padding: "2px 4px", borderBottom: "1px solid " + tokens.color.border },
};

function formatC109(value) {
  return String(value ?? "").trim().slice(0, 25);
}

export function C109({ label = "c109", hint, items = 5, children }) {
  const [hover, setHover] = useState(false);
  const text = useMemo(() => formatC109(label), [label]);
  const rows = [];
  for (let i = 0; i < items; i++) {
    rows.push(jsx("li", { style: styles.item, children: text + " #" + i }, i));
  }
  return jsxs("div", {
    "data-ui": "c109",
    style: { ...styles.root, opacity: hover ? 0.9 : 1 },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    children: [
      jsx("span", { style: styles.label, children: text }),
      hint ? jsx("span", { style: styles.hint, children: hint }) : null,
      jsx(C83, { label: text + " / c83" }),
      jsx(C95, { label: text + " / c95" }),
      jsx(C97, { label: text + " / c97" }),
      jsx("ul", { children: rows }),
      children,
    ],
  });
}
