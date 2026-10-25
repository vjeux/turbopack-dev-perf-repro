"use client";

import * as part from "@repro/heavy-2/part15";
import { C58 } from "@repro/ui/c58";
import { C153 } from "@repro/ui/c153";
import { C165 } from "@repro/ui/c165";
import { C172 } from "@repro/ui/c172";

export default function H8Inner() {
  return (
    <div data-heavy-inner="h8">
      <p>{Object.keys(part).length}</p>
      <C58 label="h8-inner / c58" />
      <C153 label="h8-inner / c153" />
      <C165 label="h8-inner / c165" />
      <C172 label="h8-inner / c172" />
    </div>
  );
}
