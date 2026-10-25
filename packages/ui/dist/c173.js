import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { tokens } from "./tokens.js";
import { C144 } from "./c144.js";
import { C147 } from "./c147.js";
import { C153 } from "./c153.js";

const styles = {
  root: { display: "flex", gap: tokens.space[6], padding: "4px 8px", borderRadius: tokens.radius[4], alignItems: "center" },
  label: { fontSize: 16, lineHeight: "18px", color: tokens.color.text },
  hint: { fontSize: 11, color: tokens.color.muted },
  item: { padding: "2px 4px", borderBottom: "1px solid " + tokens.color.border },
};

function formatC173(value) {
  return String(value ?? "").trim().slice(0, 85);
}

export function C173({ label = "c173", hint, items = 8, children }) {
  const [hover, setHover] = useState(false);
  const text = useMemo(() => formatC173(label), [label]);
  const rows = [];
  for (let i = 0; i < items; i++) {
    rows.push(jsx("li", { style: styles.item, children: text + " #" + i }, i));
  }
  return jsxs("div", {
    "data-ui": "c173",
    style: { ...styles.root, opacity: hover ? 0.9 : 1 },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    children: [
      jsx("span", { style: styles.label, children: text }),
      hint ? jsx("span", { style: styles.hint, children: hint }) : null,
      jsx(C144, { label: text + " / c144" }),
      jsx(C147, { label: text + " / c147" }),
      jsx(C153, { label: text + " / c153" }),
      jsx("ul", { children: rows }),
      children,
    ],
  });
}
