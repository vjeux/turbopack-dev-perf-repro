"use client";

import * as part from "@repro/heavy-1/part21";
import { C204 } from "@repro/ui/c204";
import { C213 } from "@repro/ui/c213";
import { C242 } from "@repro/ui/c242";
import { C282 } from "@repro/ui/c282";

export default function H7Inner() {
  return (
    <div data-heavy-inner="h7">
      <p>{Object.keys(part).length}</p>
      <C204 label="h7-inner / c204" />
      <C213 label="h7-inner / c213" />
      <C242 label="h7-inner / c242" />
      <C282 label="h7-inner / c282" />
    </div>
  );
}
