"use client";

import * as part from "@repro/heavy-1/part8";
import { C85 } from "@repro/ui/c85";
import { C98 } from "@repro/ui/c98";
import { C257 } from "@repro/ui/c257";

export default function H1Inner() {
  return (
    <div data-heavy-inner="h1">
      <p>{Object.keys(part).length}</p>
      <C85 label="h1-inner / c85" />
      <C98 label="h1-inner / c98" />
      <C257 label="h1-inner / c257" />
    </div>
  );
}
