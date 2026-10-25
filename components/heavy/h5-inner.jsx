"use client";

import * as part from "@repro/heavy-5/part4";
import { C51 } from "@repro/ui/c51";
import { C157 } from "@repro/ui/c157";
import { C178 } from "@repro/ui/c178";

export default function H5Inner() {
  return (
    <div data-heavy-inner="h5">
      <p>{Object.keys(part).length}</p>
      <C51 label="h5-inner / c51" />
      <C157 label="h5-inner / c157" />
      <C178 label="h5-inner / c178" />
    </div>
  );
}
