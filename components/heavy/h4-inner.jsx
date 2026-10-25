"use client";

import * as part from "@repro/heavy-4/part21";
import { C22 } from "@repro/ui/c22";
import { C81 } from "@repro/ui/c81";
import { C142 } from "@repro/ui/c142";
import { C192 } from "@repro/ui/c192";
import { C235 } from "@repro/ui/c235";

export default function H4Inner() {
  return (
    <div data-heavy-inner="h4">
      <p>{Object.keys(part).length}</p>
      <C22 label="h4-inner / c22" />
      <C81 label="h4-inner / c81" />
      <C142 label="h4-inner / c142" />
      <C192 label="h4-inner / c192" />
      <C235 label="h4-inner / c235" />
    </div>
  );
}
