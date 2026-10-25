import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { tokens } from "./tokens.js";
import { C101 } from "./c101.js";
import { C111 } from "./c111.js";
import { C114 } from "./c114.js";

const styles = {
  root: { display: "flex", gap: tokens.space[1], padding: "4px 8px", borderRadius: tokens.radius[4], alignItems: "center" },
  label: { fontSize: 13, lineHeight: "18px", color: tokens.color.text },
  hint: { fontSize: 11, color: tokens.color.muted },
  item: { padding: "2px 4px", borderBottom: "1px solid " + tokens.color.border },
};

function formatC129(value) {
  return String(value ?? "").trim().slice(0, 83);
}

export function C129({ label = "c129", hint, items = 5, children }) {
  const [hover, setHover] = useState(false);
  const text = useMemo(() => formatC129(label), [label]);
  const rows = [];
  for (let i = 0; i < items; i++) {
    rows.push(jsx("li", { style: styles.item, children: text + " #" + i }, i));
  }
  return jsxs("div", {
    "data-ui": "c129",
    style: { ...styles.root, opacity: hover ? 0.9 : 1 },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    children: [
      jsx("span", { style: styles.label, children: text }),
      hint ? jsx("span", { style: styles.hint, children: hint }) : null,
      jsx(C101, { label: text + " / c101" }),
      jsx(C111, { label: text + " / c111" }),
      jsx(C114, { label: text + " / c114" }),
      jsx("ul", { children: rows }),
      children,
    ],
  });
}
