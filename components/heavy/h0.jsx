"use client";

import { lazy, Suspense } from "react";
import { render } from "@repro/heavy-0";
import { parse } from "@repro/shared";
import { C3 } from "@repro/ui/c3";
import { C5 } from "@repro/ui/c5";
import { C7 } from "@repro/ui/c7";
import { C19 } from "@repro/ui/c19";
import { C31 } from "@repro/ui/c31";
import { C32 } from "@repro/ui/c32";
import { C34 } from "@repro/ui/c34";
import { C65 } from "@repro/ui/c65";
import { C96 } from "@repro/ui/c96";
import { C99 } from "@repro/ui/c99";
import { C107 } from "@repro/ui/c107";
import { C125 } from "@repro/ui/c125";
import { C131 } from "@repro/ui/c131";
import { C146 } from "@repro/ui/c146";
import { C147 } from "@repro/ui/c147";
import { C203 } from "@repro/ui/c203";
import { C204 } from "@repro/ui/c204";
import { C211 } from "@repro/ui/c211";
import { C220 } from "@repro/ui/c220";
import { C224 } from "@repro/ui/c224";
import { C226 } from "@repro/ui/c226";
import { C244 } from "@repro/ui/c244";
import { C251 } from "@repro/ui/c251";
import { C258 } from "@repro/ui/c258";

const Inner = lazy(() => import("./h0-inner"));

export default function H0() {
  return (
    <div data-heavy="h0">
      <p>{render(parse("h0").value)}</p>
      <C3 label="h0 / c3" />
      <C5 label="h0 / c5" />
      <C7 label="h0 / c7" />
      <C19 label="h0 / c19" />
      <C31 label="h0 / c31" />
      <C32 label="h0 / c32" />
      <C34 label="h0 / c34" />
      <C65 label="h0 / c65" />
      <C96 label="h0 / c96" />
      <C99 label="h0 / c99" />
      <C107 label="h0 / c107" />
      <C125 label="h0 / c125" />
      <C131 label="h0 / c131" />
      <C146 label="h0 / c146" />
      <C147 label="h0 / c147" />
      <C203 label="h0 / c203" />
      <C204 label="h0 / c204" />
      <C211 label="h0 / c211" />
      <C220 label="h0 / c220" />
      <C224 label="h0 / c224" />
      <C226 label="h0 / c226" />
      <C244 label="h0 / c244" />
      <C251 label="h0 / c251" />
      <C258 label="h0 / c258" />
      <Suspense fallback={null}>
        <Inner />
      </Suspense>
    </div>
  );
}
