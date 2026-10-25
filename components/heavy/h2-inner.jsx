"use client";

import * as part from "@repro/heavy-2/part8";
import { C15 } from "@repro/ui/c15";
import { C87 } from "@repro/ui/c87";
import { C143 } from "@repro/ui/c143";
import { C156 } from "@repro/ui/c156";
import { C183 } from "@repro/ui/c183";
import { C250 } from "@repro/ui/c250";
import { C264 } from "@repro/ui/c264";
import { C273 } from "@repro/ui/c273";

export default function H2Inner() {
  return (
    <div data-heavy-inner="h2">
      <p>{Object.keys(part).length}</p>
      <C15 label="h2-inner / c15" />
      <C87 label="h2-inner / c87" />
      <C143 label="h2-inner / c143" />
      <C156 label="h2-inner / c156" />
      <C183 label="h2-inner / c183" />
      <C250 label="h2-inner / c250" />
      <C264 label="h2-inner / c264" />
      <C273 label="h2-inner / c273" />
    </div>
  );
}
