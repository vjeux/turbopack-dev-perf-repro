import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { tokens } from "./tokens.js";
import { C119 } from "./c119.js";
import { C130 } from "./c130.js";
import { C155 } from "./c155.js";

const styles = {
  root: { display: "flex", gap: tokens.space[6], padding: "4px 8px", borderRadius: tokens.radius[3], alignItems: "center" },
  label: { fontSize: 11, lineHeight: "18px", color: tokens.color.text },
  hint: { fontSize: 11, color: tokens.color.muted },
  item: { padding: "2px 4px", borderBottom: "1px solid " + tokens.color.border },
};

function formatC158(value) {
  return String(value ?? "").trim().slice(0, 28);
}

export function C158({ label = "c158", hint, items = 9, children }) {
  const [hover, setHover] = useState(false);
  const text = useMemo(() => formatC158(label), [label]);
  const rows = [];
  for (let i = 0; i < items; i++) {
    rows.push(jsx("li", { style: styles.item, children: text + " #" + i }, i));
  }
  return jsxs("div", {
    "data-ui": "c158",
    style: { ...styles.root, opacity: hover ? 0.9 : 1 },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    children: [
      jsx("span", { style: styles.label, children: text }),
      hint ? jsx("span", { style: styles.hint, children: hint }) : null,
      jsx(C119, { label: text + " / c119" }),
      jsx(C130, { label: text + " / c130" }),
      jsx(C155, { label: text + " / c155" }),
      jsx("ul", { children: rows }),
      children,
    ],
  });
}
