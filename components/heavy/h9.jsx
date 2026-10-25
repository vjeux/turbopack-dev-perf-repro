"use client";

import { lazy, Suspense } from "react";
import { render } from "@repro/heavy-3";
import { parse } from "@repro/shared";
import { C23 } from "@repro/ui/c23";
import { C29 } from "@repro/ui/c29";
import { C64 } from "@repro/ui/c64";
import { C139 } from "@repro/ui/c139";
import { C156 } from "@repro/ui/c156";
import { C162 } from "@repro/ui/c162";
import { C185 } from "@repro/ui/c185";
import { C192 } from "@repro/ui/c192";
import { C211 } from "@repro/ui/c211";
import { C221 } from "@repro/ui/c221";
import { C254 } from "@repro/ui/c254";
import { C255 } from "@repro/ui/c255";
import { C256 } from "@repro/ui/c256";
import { C284 } from "@repro/ui/c284";
import { C288 } from "@repro/ui/c288";
import { C289 } from "@repro/ui/c289";

const Inner = lazy(() => import("./h9-inner"));

export default function H9() {
  return (
    <div data-heavy="h9">
      <p>{render(parse("h9").value)}</p>
      <C23 label="h9 / c23" />
      <C29 label="h9 / c29" />
      <C64 label="h9 / c64" />
      <C139 label="h9 / c139" />
      <C156 label="h9 / c156" />
      <C162 label="h9 / c162" />
      <C185 label="h9 / c185" />
      <C192 label="h9 / c192" />
      <C211 label="h9 / c211" />
      <C221 label="h9 / c221" />
      <C254 label="h9 / c254" />
      <C255 label="h9 / c255" />
      <C256 label="h9 / c256" />
      <C284 label="h9 / c284" />
      <C288 label="h9 / c288" />
      <C289 label="h9 / c289" />
      <Suspense fallback={null}>
        <Inner />
      </Suspense>
    </div>
  );
}
