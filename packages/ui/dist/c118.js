import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { tokens } from "./tokens.js";
import { C81 } from "./c81.js";
import { C90 } from "./c90.js";
import { C114 } from "./c114.js";

const styles = {
  root: { display: "flex", gap: tokens.space[6], padding: "4px 8px", borderRadius: tokens.radius[3], alignItems: "center" },
  label: { fontSize: 14, lineHeight: "18px", color: tokens.color.text },
  hint: { fontSize: 11, color: tokens.color.muted },
  item: { padding: "2px 4px", borderBottom: "1px solid " + tokens.color.border },
};

function formatC118(value) {
  return String(value ?? "").trim().slice(0, 85);
}

export function C118({ label = "c118", hint, items = 10, children }) {
  const [hover, setHover] = useState(false);
  const text = useMemo(() => formatC118(label), [label]);
  const rows = [];
  for (let i = 0; i < items; i++) {
    rows.push(jsx("li", { style: styles.item, children: text + " #" + i }, i));
  }
  return jsxs("div", {
    "data-ui": "c118",
    style: { ...styles.root, opacity: hover ? 0.9 : 1 },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    children: [
      jsx("span", { style: styles.label, children: text }),
      hint ? jsx("span", { style: styles.hint, children: hint }) : null,
      jsx(C81, { label: text + " / c81" }),
      jsx(C90, { label: text + " / c90" }),
      jsx(C114, { label: text + " / c114" }),
      jsx("ul", { children: rows }),
      children,
    ],
  });
}
