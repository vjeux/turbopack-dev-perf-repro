"use client";

import { lazy, Suspense } from "react";
import { render } from "@repro/heavy-3";
import { parse } from "@repro/shared";
import { C6 } from "@repro/ui/c6";
import { C7 } from "@repro/ui/c7";
import { C10 } from "@repro/ui/c10";
import { C12 } from "@repro/ui/c12";
import { C18 } from "@repro/ui/c18";
import { C21 } from "@repro/ui/c21";
import { C25 } from "@repro/ui/c25";
import { C30 } from "@repro/ui/c30";
import { C36 } from "@repro/ui/c36";
import { C69 } from "@repro/ui/c69";
import { C102 } from "@repro/ui/c102";
import { C130 } from "@repro/ui/c130";
import { C132 } from "@repro/ui/c132";
import { C136 } from "@repro/ui/c136";
import { C164 } from "@repro/ui/c164";
import { C258 } from "@repro/ui/c258";
import { C263 } from "@repro/ui/c263";
import { C272 } from "@repro/ui/c272";
import { C291 } from "@repro/ui/c291";

const Inner = lazy(() => import("./h3-inner"));

export default function H3() {
  return (
    <div data-heavy="h3">
      <p>{render(parse("h3").value)}</p>
      <C6 label="h3 / c6" />
      <C7 label="h3 / c7" />
      <C10 label="h3 / c10" />
      <C12 label="h3 / c12" />
      <C18 label="h3 / c18" />
      <C21 label="h3 / c21" />
      <C25 label="h3 / c25" />
      <C30 label="h3 / c30" />
      <C36 label="h3 / c36" />
      <C69 label="h3 / c69" />
      <C102 label="h3 / c102" />
      <C130 label="h3 / c130" />
      <C132 label="h3 / c132" />
      <C136 label="h3 / c136" />
      <C164 label="h3 / c164" />
      <C258 label="h3 / c258" />
      <C263 label="h3 / c263" />
      <C272 label="h3 / c272" />
      <C291 label="h3 / c291" />
      <Suspense fallback={null}>
        <Inner />
      </Suspense>
    </div>
  );
}
