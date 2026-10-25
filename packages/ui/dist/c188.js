import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { tokens } from "./tokens.js";
import { C148 } from "./c148.js";
import { C171 } from "./c171.js";
import { C175 } from "./c175.js";

const styles = {
  root: { display: "flex", gap: tokens.space[6], padding: "4px 8px", borderRadius: tokens.radius[2], alignItems: "center" },
  label: { fontSize: 13, lineHeight: "18px", color: tokens.color.text },
  hint: { fontSize: 11, color: tokens.color.muted },
  item: { padding: "2px 4px", borderBottom: "1px solid " + tokens.color.border },
};

function formatC188(value) {
  return String(value ?? "").trim().slice(0, 83);
}

export function C188({ label = "c188", hint, items = 10, children }) {
  const [hover, setHover] = useState(false);
  const text = useMemo(() => formatC188(label), [label]);
  const rows = [];
  for (let i = 0; i < items; i++) {
    rows.push(jsx("li", { style: styles.item, children: text + " #" + i }, i));
  }
  return jsxs("div", {
    "data-ui": "c188",
    style: { ...styles.root, opacity: hover ? 0.9 : 1 },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    children: [
      jsx("span", { style: styles.label, children: text }),
      hint ? jsx("span", { style: styles.hint, children: hint }) : null,
      jsx(C148, { label: text + " / c148" }),
      jsx(C171, { label: text + " / c171" }),
      jsx(C175, { label: text + " / c175" }),
      jsx("ul", { children: rows }),
      children,
    ],
  });
}
