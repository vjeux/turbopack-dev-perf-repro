"use client";

import { lazy, Suspense } from "react";
import { render } from "@repro/heavy-5";
import { parse } from "@repro/shared";
import { C10 } from "@repro/ui/c10";
import { C43 } from "@repro/ui/c43";
import { C49 } from "@repro/ui/c49";
import { C51 } from "@repro/ui/c51";
import { C52 } from "@repro/ui/c52";
import { C56 } from "@repro/ui/c56";
import { C57 } from "@repro/ui/c57";
import { C58 } from "@repro/ui/c58";
import { C64 } from "@repro/ui/c64";
import { C66 } from "@repro/ui/c66";
import { C71 } from "@repro/ui/c71";
import { C101 } from "@repro/ui/c101";
import { C118 } from "@repro/ui/c118";
import { C124 } from "@repro/ui/c124";
import { C125 } from "@repro/ui/c125";
import { C159 } from "@repro/ui/c159";
import { C162 } from "@repro/ui/c162";
import { C173 } from "@repro/ui/c173";
import { C217 } from "@repro/ui/c217";
import { C245 } from "@repro/ui/c245";
import { C246 } from "@repro/ui/c246";
import { C249 } from "@repro/ui/c249";
import { C279 } from "@repro/ui/c279";
import { C291 } from "@repro/ui/c291";

const Inner = lazy(() => import("./h11-inner"));

export default function H11() {
  return (
    <div data-heavy="h11">
      <p>{render(parse("h11").value)}</p>
      <C10 label="h11 / c10" />
      <C43 label="h11 / c43" />
      <C49 label="h11 / c49" />
      <C51 label="h11 / c51" />
      <C52 label="h11 / c52" />
      <C56 label="h11 / c56" />
      <C57 label="h11 / c57" />
      <C58 label="h11 / c58" />
      <C64 label="h11 / c64" />
      <C66 label="h11 / c66" />
      <C71 label="h11 / c71" />
      <C101 label="h11 / c101" />
      <C118 label="h11 / c118" />
      <C124 label="h11 / c124" />
      <C125 label="h11 / c125" />
      <C159 label="h11 / c159" />
      <C162 label="h11 / c162" />
      <C173 label="h11 / c173" />
      <C217 label="h11 / c217" />
      <C245 label="h11 / c245" />
      <C246 label="h11 / c246" />
      <C249 label="h11 / c249" />
      <C279 label="h11 / c279" />
      <C291 label="h11 / c291" />
      <Suspense fallback={null}>
        <Inner />
      </Suspense>
    </div>
  );
}
