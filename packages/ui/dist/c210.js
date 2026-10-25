import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { tokens } from "./tokens.js";
import { C178 } from "./c178.js";
import { C193 } from "./c193.js";
import { C207 } from "./c207.js";

const styles = {
  root: { display: "flex", gap: tokens.space[4], padding: "4px 8px", borderRadius: tokens.radius[3], alignItems: "center" },
  label: { fontSize: 11, lineHeight: "18px", color: tokens.color.text },
  hint: { fontSize: 11, color: tokens.color.muted },
  item: { padding: "2px 4px", borderBottom: "1px solid " + tokens.color.border },
};

function formatC210(value) {
  return String(value ?? "").trim().slice(0, 89);
}

export function C210({ label = "c210", hint, items = 7, children }) {
  const [hover, setHover] = useState(false);
  const text = useMemo(() => formatC210(label), [label]);
  const rows = [];
  for (let i = 0; i < items; i++) {
    rows.push(jsx("li", { style: styles.item, children: text + " #" + i }, i));
  }
  return jsxs("div", {
    "data-ui": "c210",
    style: { ...styles.root, opacity: hover ? 0.9 : 1 },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    children: [
      jsx("span", { style: styles.label, children: text }),
      hint ? jsx("span", { style: styles.hint, children: hint }) : null,
      jsx(C178, { label: text + " / c178" }),
      jsx(C193, { label: text + " / c193" }),
      jsx(C207, { label: text + " / c207" }),
      jsx("ul", { children: rows }),
      children,
    ],
  });
}
