"use client";

import * as part from "@repro/heavy-0/part9";
import { C12 } from "@repro/ui/c12";
import { C31 } from "@repro/ui/c31";
import { C42 } from "@repro/ui/c42";
import { C53 } from "@repro/ui/c53";
import { C145 } from "@repro/ui/c145";
import { C179 } from "@repro/ui/c179";

export default function H0Inner() {
  return (
    <div data-heavy-inner="h0">
      <p>{Object.keys(part).length}</p>
      <C12 label="h0-inner / c12" />
      <C31 label="h0-inner / c31" />
      <C42 label="h0-inner / c42" />
      <C53 label="h0-inner / c53" />
      <C145 label="h0-inner / c145" />
      <C179 label="h0-inner / c179" />
    </div>
  );
}
