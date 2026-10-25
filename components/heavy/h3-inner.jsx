"use client";

import * as part from "@repro/heavy-3/part2";
import { C5 } from "@repro/ui/c5";
import { C32 } from "@repro/ui/c32";
import { C34 } from "@repro/ui/c34";
import { C188 } from "@repro/ui/c188";
import { C203 } from "@repro/ui/c203";
import { C210 } from "@repro/ui/c210";
import { C257 } from "@repro/ui/c257";

export default function H3Inner() {
  return (
    <div data-heavy-inner="h3">
      <p>{Object.keys(part).length}</p>
      <C5 label="h3-inner / c5" />
      <C32 label="h3-inner / c32" />
      <C34 label="h3-inner / c34" />
      <C188 label="h3-inner / c188" />
      <C203 label="h3-inner / c203" />
      <C210 label="h3-inner / c210" />
      <C257 label="h3-inner / c257" />
    </div>
  );
}
