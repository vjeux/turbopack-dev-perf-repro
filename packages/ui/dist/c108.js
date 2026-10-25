import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { tokens } from "./tokens.js";
import { C83 } from "./c83.js";
import { C93 } from "./c93.js";
import { C106 } from "./c106.js";

const styles = {
  root: { display: "flex", gap: tokens.space[5], padding: "4px 8px", borderRadius: tokens.radius[1], alignItems: "center" },
  label: { fontSize: 13, lineHeight: "18px", color: tokens.color.text },
  hint: { fontSize: 11, color: tokens.color.muted },
  item: { padding: "2px 4px", borderBottom: "1px solid " + tokens.color.border },
};

function formatC108(value) {
  return String(value ?? "").trim().slice(0, 62);
}

export function C108({ label = "c108", hint, items = 8, children }) {
  const [hover, setHover] = useState(false);
  const text = useMemo(() => formatC108(label), [label]);
  const rows = [];
  for (let i = 0; i < items; i++) {
    rows.push(jsx("li", { style: styles.item, children: text + " #" + i }, i));
  }
  return jsxs("div", {
    "data-ui": "c108",
    style: { ...styles.root, opacity: hover ? 0.9 : 1 },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    children: [
      jsx("span", { style: styles.label, children: text }),
      hint ? jsx("span", { style: styles.hint, children: hint }) : null,
      jsx(C83, { label: text + " / c83" }),
      jsx(C93, { label: text + " / c93" }),
      jsx(C106, { label: text + " / c106" }),
      jsx("ul", { children: rows }),
      children,
    ],
  });
}
