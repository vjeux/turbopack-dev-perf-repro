"use client";

import { lazy, Suspense } from "react";
import { render } from "@repro/heavy-5";
import { parse } from "@repro/shared";
import { C1 } from "@repro/ui/c1";
import { C7 } from "@repro/ui/c7";
import { C9 } from "@repro/ui/c9";
import { C17 } from "@repro/ui/c17";
import { C18 } from "@repro/ui/c18";
import { C22 } from "@repro/ui/c22";
import { C30 } from "@repro/ui/c30";
import { C34 } from "@repro/ui/c34";
import { C58 } from "@repro/ui/c58";
import { C61 } from "@repro/ui/c61";
import { C63 } from "@repro/ui/c63";
import { C119 } from "@repro/ui/c119";
import { C123 } from "@repro/ui/c123";
import { C124 } from "@repro/ui/c124";
import { C137 } from "@repro/ui/c137";
import { C165 } from "@repro/ui/c165";
import { C169 } from "@repro/ui/c169";
import { C178 } from "@repro/ui/c178";
import { C201 } from "@repro/ui/c201";
import { C225 } from "@repro/ui/c225";
import { C231 } from "@repro/ui/c231";
import { C239 } from "@repro/ui/c239";
import { C247 } from "@repro/ui/c247";
import { C248 } from "@repro/ui/c248";
import { C254 } from "@repro/ui/c254";
import { C263 } from "@repro/ui/c263";
import { C272 } from "@repro/ui/c272";
import { C274 } from "@repro/ui/c274";
import { C279 } from "@repro/ui/c279";
import { C297 } from "@repro/ui/c297";
import { C298 } from "@repro/ui/c298";

const Inner = lazy(() => import("./h5-inner"));

export default function H5() {
  return (
    <div data-heavy="h5">
      <p>{render(parse("h5").value)}</p>
      <C1 label="h5 / c1" />
      <C7 label="h5 / c7" />
      <C9 label="h5 / c9" />
      <C17 label="h5 / c17" />
      <C18 label="h5 / c18" />
      <C22 label="h5 / c22" />
      <C30 label="h5 / c30" />
      <C34 label="h5 / c34" />
      <C58 label="h5 / c58" />
      <C61 label="h5 / c61" />
      <C63 label="h5 / c63" />
      <C119 label="h5 / c119" />
      <C123 label="h5 / c123" />
      <C124 label="h5 / c124" />
      <C137 label="h5 / c137" />
      <C165 label="h5 / c165" />
      <C169 label="h5 / c169" />
      <C178 label="h5 / c178" />
      <C201 label="h5 / c201" />
      <C225 label="h5 / c225" />
      <C231 label="h5 / c231" />
      <C239 label="h5 / c239" />
      <C247 label="h5 / c247" />
      <C248 label="h5 / c248" />
      <C254 label="h5 / c254" />
      <C263 label="h5 / c263" />
      <C272 label="h5 / c272" />
      <C274 label="h5 / c274" />
      <C279 label="h5 / c279" />
      <C297 label="h5 / c297" />
      <C298 label="h5 / c298" />
      <Suspense fallback={null}>
        <Inner />
      </Suspense>
    </div>
  );
}
