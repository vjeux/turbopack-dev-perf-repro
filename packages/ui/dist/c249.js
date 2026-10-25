import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { tokens } from "./tokens.js";
import { C210 } from "./c210.js";
import { C229 } from "./c229.js";
import { C231 } from "./c231.js";

const styles = {
  root: { display: "flex", gap: tokens.space[6], padding: "4px 8px", borderRadius: tokens.radius[3], alignItems: "center" },
  label: { fontSize: 12, lineHeight: "18px", color: tokens.color.text },
  hint: { fontSize: 11, color: tokens.color.muted },
  item: { padding: "2px 4px", borderBottom: "1px solid " + tokens.color.border },
};

function formatC249(value) {
  return String(value ?? "").trim().slice(0, 48);
}

export function C249({ label = "c249", hint, items = 8, children }) {
  const [hover, setHover] = useState(false);
  const text = useMemo(() => formatC249(label), [label]);
  const rows = [];
  for (let i = 0; i < items; i++) {
    rows.push(jsx("li", { style: styles.item, children: text + " #" + i }, i));
  }
  return jsxs("div", {
    "data-ui": "c249",
    style: { ...styles.root, opacity: hover ? 0.9 : 1 },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    children: [
      jsx("span", { style: styles.label, children: text }),
      hint ? jsx("span", { style: styles.hint, children: hint }) : null,
      jsx(C210, { label: text + " / c210" }),
      jsx(C229, { label: text + " / c229" }),
      jsx(C231, { label: text + " / c231" }),
      jsx("ul", { children: rows }),
      children,
    ],
  });
}
