import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { tokens } from "./tokens.js";
import { C154 } from "./c154.js";

const styles = {
  root: { display: "flex", gap: tokens.space[5], padding: "4px 8px", borderRadius: tokens.radius[4], alignItems: "center" },
  label: { fontSize: 15, lineHeight: "18px", color: tokens.color.text },
  hint: { fontSize: 11, color: tokens.color.muted },
  item: { padding: "2px 4px", borderBottom: "1px solid " + tokens.color.border },
};

function formatC161(value) {
  return String(value ?? "").trim().slice(0, 55);
}

export function C161({ label = "c161", hint, items = 5, children }) {
  const [hover, setHover] = useState(false);
  const text = useMemo(() => formatC161(label), [label]);
  const rows = [];
  for (let i = 0; i < items; i++) {
    rows.push(jsx("li", { style: styles.item, children: text + " #" + i }, i));
  }
  return jsxs("div", {
    "data-ui": "c161",
    style: { ...styles.root, opacity: hover ? 0.9 : 1 },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    children: [
      jsx("span", { style: styles.label, children: text }),
      hint ? jsx("span", { style: styles.hint, children: hint }) : null,
      jsx(C154, { label: text + " / c154" }),
      jsx("ul", { children: rows }),
      children,
    ],
  });
}
