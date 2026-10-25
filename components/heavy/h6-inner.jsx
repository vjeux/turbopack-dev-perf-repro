"use client";

import * as part from "@repro/heavy-0/part13";
import { C28 } from "@repro/ui/c28";
import { C124 } from "@repro/ui/c124";
import { C174 } from "@repro/ui/c174";
import { C193 } from "@repro/ui/c193";
import { C294 } from "@repro/ui/c294";

export default function H6Inner() {
  return (
    <div data-heavy-inner="h6">
      <p>{Object.keys(part).length}</p>
      <C28 label="h6-inner / c28" />
      <C124 label="h6-inner / c124" />
      <C174 label="h6-inner / c174" />
      <C193 label="h6-inner / c193" />
      <C294 label="h6-inner / c294" />
    </div>
  );
}
