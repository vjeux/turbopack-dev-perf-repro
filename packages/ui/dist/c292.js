import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { tokens } from "./tokens.js";
import { C262 } from "./c262.js";
import { C273 } from "./c273.js";
import { C275 } from "./c275.js";

const styles = {
  root: { display: "flex", gap: tokens.space[1], padding: "4px 8px", borderRadius: tokens.radius[2], alignItems: "center" },
  label: { fontSize: 15, lineHeight: "18px", color: tokens.color.text },
  hint: { fontSize: 11, color: tokens.color.muted },
  item: { padding: "2px 4px", borderBottom: "1px solid " + tokens.color.border },
};

function formatC292(value) {
  return String(value ?? "").trim().slice(0, 90);
}

export function C292({ label = "c292", hint, items = 8, children }) {
  const [hover, setHover] = useState(false);
  const text = useMemo(() => formatC292(label), [label]);
  const rows = [];
  for (let i = 0; i < items; i++) {
    rows.push(jsx("li", { style: styles.item, children: text + " #" + i }, i));
  }
  return jsxs("div", {
    "data-ui": "c292",
    style: { ...styles.root, opacity: hover ? 0.9 : 1 },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    children: [
      jsx("span", { style: styles.label, children: text }),
      hint ? jsx("span", { style: styles.hint, children: hint }) : null,
      jsx(C262, { label: text + " / c262" }),
      jsx(C273, { label: text + " / c273" }),
      jsx(C275, { label: text + " / c275" }),
      jsx("ul", { children: rows }),
      children,
    ],
  });
}
