"use client";

import * as part from "@repro/heavy-3/part0";
import { C53 } from "@repro/ui/c53";
import { C74 } from "@repro/ui/c74";
import { C117 } from "@repro/ui/c117";
import { C169 } from "@repro/ui/c169";
import { C170 } from "@repro/ui/c170";
import { C244 } from "@repro/ui/c244";
import { C261 } from "@repro/ui/c261";

export default function H9Inner() {
  return (
    <div data-heavy-inner="h9">
      <p>{Object.keys(part).length}</p>
      <C53 label="h9-inner / c53" />
      <C74 label="h9-inner / c74" />
      <C117 label="h9-inner / c117" />
      <C169 label="h9-inner / c169" />
      <C170 label="h9-inner / c170" />
      <C244 label="h9-inner / c244" />
      <C261 label="h9-inner / c261" />
    </div>
  );
}
