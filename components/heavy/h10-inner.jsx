"use client";

import * as part from "@repro/heavy-4/part23";
import { C1 } from "@repro/ui/c1";
import { C44 } from "@repro/ui/c44";
import { C95 } from "@repro/ui/c95";
import { C128 } from "@repro/ui/c128";
import { C174 } from "@repro/ui/c174";
import { C231 } from "@repro/ui/c231";
import { C250 } from "@repro/ui/c250";
import { C265 } from "@repro/ui/c265";

export default function H10Inner() {
  return (
    <div data-heavy-inner="h10">
      <p>{Object.keys(part).length}</p>
      <C1 label="h10-inner / c1" />
      <C44 label="h10-inner / c44" />
      <C95 label="h10-inner / c95" />
      <C128 label="h10-inner / c128" />
      <C174 label="h10-inner / c174" />
      <C231 label="h10-inner / c231" />
      <C250 label="h10-inner / c250" />
      <C265 label="h10-inner / c265" />
    </div>
  );
}
