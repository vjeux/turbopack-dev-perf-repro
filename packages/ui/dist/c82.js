import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { tokens } from "./tokens.js";
import { C48 } from "./c48.js";
import { C57 } from "./c57.js";
import { C81 } from "./c81.js";

const styles = {
  root: { display: "flex", gap: tokens.space[3], padding: "4px 8px", borderRadius: tokens.radius[2], alignItems: "center" },
  label: { fontSize: 16, lineHeight: "18px", color: tokens.color.text },
  hint: { fontSize: 11, color: tokens.color.muted },
  item: { padding: "2px 4px", borderBottom: "1px solid " + tokens.color.border },
};

function formatC82(value) {
  return String(value ?? "").trim().slice(0, 29);
}

export function C82({ label = "c82", hint, items = 6, children }) {
  const [hover, setHover] = useState(false);
  const text = useMemo(() => formatC82(label), [label]);
  const rows = [];
  for (let i = 0; i < items; i++) {
    rows.push(jsx("li", { style: styles.item, children: text + " #" + i }, i));
  }
  return jsxs("div", {
    "data-ui": "c82",
    style: { ...styles.root, opacity: hover ? 0.9 : 1 },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    children: [
      jsx("span", { style: styles.label, children: text }),
      hint ? jsx("span", { style: styles.hint, children: hint }) : null,
      jsx(C48, { label: text + " / c48" }),
      jsx(C57, { label: text + " / c57" }),
      jsx(C81, { label: text + " / c81" }),
      jsx("ul", { children: rows }),
      children,
    ],
  });
}
