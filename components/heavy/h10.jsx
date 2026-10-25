"use client";

import { lazy, Suspense } from "react";
import { render } from "@repro/heavy-4";
import { parse } from "@repro/shared";
import { C4 } from "@repro/ui/c4";
import { C37 } from "@repro/ui/c37";
import { C40 } from "@repro/ui/c40";
import { C44 } from "@repro/ui/c44";
import { C48 } from "@repro/ui/c48";
import { C58 } from "@repro/ui/c58";
import { C71 } from "@repro/ui/c71";
import { C119 } from "@repro/ui/c119";
import { C130 } from "@repro/ui/c130";
import { C132 } from "@repro/ui/c132";
import { C134 } from "@repro/ui/c134";
import { C185 } from "@repro/ui/c185";
import { C194 } from "@repro/ui/c194";
import { C220 } from "@repro/ui/c220";
import { C223 } from "@repro/ui/c223";
import { C271 } from "@repro/ui/c271";
import { C274 } from "@repro/ui/c274";
import { C275 } from "@repro/ui/c275";

const Inner = lazy(() => import("./h10-inner"));

export default function H10() {
  return (
    <div data-heavy="h10">
      <p>{render(parse("h10").value)}</p>
      <C4 label="h10 / c4" />
      <C37 label="h10 / c37" />
      <C40 label="h10 / c40" />
      <C44 label="h10 / c44" />
      <C48 label="h10 / c48" />
      <C58 label="h10 / c58" />
      <C71 label="h10 / c71" />
      <C119 label="h10 / c119" />
      <C130 label="h10 / c130" />
      <C132 label="h10 / c132" />
      <C134 label="h10 / c134" />
      <C185 label="h10 / c185" />
      <C194 label="h10 / c194" />
      <C220 label="h10 / c220" />
      <C223 label="h10 / c223" />
      <C271 label="h10 / c271" />
      <C274 label="h10 / c274" />
      <C275 label="h10 / c275" />
      <Suspense fallback={null}>
        <Inner />
      </Suspense>
    </div>
  );
}
