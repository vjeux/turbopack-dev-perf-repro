"use client";

import { lazy, Suspense } from "react";
import { render } from "@repro/heavy-0";
import { parse } from "@repro/shared";
import { C2 } from "@repro/ui/c2";
import { C9 } from "@repro/ui/c9";
import { C22 } from "@repro/ui/c22";
import { C24 } from "@repro/ui/c24";
import { C27 } from "@repro/ui/c27";
import { C39 } from "@repro/ui/c39";
import { C52 } from "@repro/ui/c52";
import { C53 } from "@repro/ui/c53";
import { C60 } from "@repro/ui/c60";
import { C70 } from "@repro/ui/c70";
import { C82 } from "@repro/ui/c82";
import { C97 } from "@repro/ui/c97";
import { C110 } from "@repro/ui/c110";
import { C119 } from "@repro/ui/c119";
import { C134 } from "@repro/ui/c134";
import { C143 } from "@repro/ui/c143";
import { C152 } from "@repro/ui/c152";
import { C158 } from "@repro/ui/c158";
import { C171 } from "@repro/ui/c171";
import { C181 } from "@repro/ui/c181";
import { C196 } from "@repro/ui/c196";
import { C198 } from "@repro/ui/c198";
import { C210 } from "@repro/ui/c210";
import { C219 } from "@repro/ui/c219";
import { C233 } from "@repro/ui/c233";
import { C247 } from "@repro/ui/c247";
import { C248 } from "@repro/ui/c248";
import { C249 } from "@repro/ui/c249";
import { C271 } from "@repro/ui/c271";
import { C277 } from "@repro/ui/c277";
import { C287 } from "@repro/ui/c287";
import { C298 } from "@repro/ui/c298";
import { C299 } from "@repro/ui/c299";

const Inner = lazy(() => import("./h6-inner"));

export default function H6() {
  return (
    <div data-heavy="h6">
      <p>{render(parse("h6").value)}</p>
      <C2 label="h6 / c2" />
      <C9 label="h6 / c9" />
      <C22 label="h6 / c22" />
      <C24 label="h6 / c24" />
      <C27 label="h6 / c27" />
      <C39 label="h6 / c39" />
      <C52 label="h6 / c52" />
      <C53 label="h6 / c53" />
      <C60 label="h6 / c60" />
      <C70 label="h6 / c70" />
      <C82 label="h6 / c82" />
      <C97 label="h6 / c97" />
      <C110 label="h6 / c110" />
      <C119 label="h6 / c119" />
      <C134 label="h6 / c134" />
      <C143 label="h6 / c143" />
      <C152 label="h6 / c152" />
      <C158 label="h6 / c158" />
      <C171 label="h6 / c171" />
      <C181 label="h6 / c181" />
      <C196 label="h6 / c196" />
      <C198 label="h6 / c198" />
      <C210 label="h6 / c210" />
      <C219 label="h6 / c219" />
      <C233 label="h6 / c233" />
      <C247 label="h6 / c247" />
      <C248 label="h6 / c248" />
      <C249 label="h6 / c249" />
      <C271 label="h6 / c271" />
      <C277 label="h6 / c277" />
      <C287 label="h6 / c287" />
      <C298 label="h6 / c298" />
      <C299 label="h6 / c299" />
      <Suspense fallback={null}>
        <Inner />
      </Suspense>
    </div>
  );
}
