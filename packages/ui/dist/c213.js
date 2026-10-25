import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { tokens } from "./tokens.js";
import { C173 } from "./c173.js";
import { C177 } from "./c177.js";
import { C180 } from "./c180.js";

const styles = {
  root: { display: "flex", gap: tokens.space[2], padding: "4px 8px", borderRadius: tokens.radius[3], alignItems: "center" },
  label: { fontSize: 11, lineHeight: "18px", color: tokens.color.text },
  hint: { fontSize: 11, color: tokens.color.muted },
  item: { padding: "2px 4px", borderBottom: "1px solid " + tokens.color.border },
};

function formatC213(value) {
  return String(value ?? "").trim().slice(0, 62);
}

export function C213({ label = "c213", hint, items = 4, children }) {
  const [hover, setHover] = useState(false);
  const text = useMemo(() => formatC213(label), [label]);
  const rows = [];
  for (let i = 0; i < items; i++) {
    rows.push(jsx("li", { style: styles.item, children: text + " #" + i }, i));
  }
  return jsxs("div", {
    "data-ui": "c213",
    style: { ...styles.root, opacity: hover ? 0.9 : 1 },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    children: [
      jsx("span", { style: styles.label, children: text }),
      hint ? jsx("span", { style: styles.hint, children: hint }) : null,
      jsx(C173, { label: text + " / c173" }),
      jsx(C177, { label: text + " / c177" }),
      jsx(C180, { label: text + " / c180" }),
      jsx("ul", { children: rows }),
      children,
    ],
  });
}
