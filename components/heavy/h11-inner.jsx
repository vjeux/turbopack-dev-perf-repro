"use client";

import * as part from "@repro/heavy-5/part9";
import { C87 } from "@repro/ui/c87";
import { C189 } from "@repro/ui/c189";
import { C209 } from "@repro/ui/c209";
import { C233 } from "@repro/ui/c233";
import { C292 } from "@repro/ui/c292";

export default function H11Inner() {
  return (
    <div data-heavy-inner="h11">
      <p>{Object.keys(part).length}</p>
      <C87 label="h11-inner / c87" />
      <C189 label="h11-inner / c189" />
      <C209 label="h11-inner / c209" />
      <C233 label="h11-inner / c233" />
      <C292 label="h11-inner / c292" />
    </div>
  );
}
