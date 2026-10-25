"use client";

import { lazy, Suspense } from "react";
import { render } from "@repro/heavy-1";
import { parse } from "@repro/shared";
import { C16 } from "@repro/ui/c16";
import { C17 } from "@repro/ui/c17";
import { C21 } from "@repro/ui/c21";
import { C46 } from "@repro/ui/c46";
import { C57 } from "@repro/ui/c57";
import { C67 } from "@repro/ui/c67";
import { C80 } from "@repro/ui/c80";
import { C83 } from "@repro/ui/c83";
import { C101 } from "@repro/ui/c101";
import { C107 } from "@repro/ui/c107";
import { C115 } from "@repro/ui/c115";
import { C148 } from "@repro/ui/c148";
import { C151 } from "@repro/ui/c151";
import { C152 } from "@repro/ui/c152";
import { C154 } from "@repro/ui/c154";
import { C155 } from "@repro/ui/c155";
import { C159 } from "@repro/ui/c159";
import { C177 } from "@repro/ui/c177";
import { C186 } from "@repro/ui/c186";
import { C190 } from "@repro/ui/c190";
import { C197 } from "@repro/ui/c197";
import { C203 } from "@repro/ui/c203";
import { C207 } from "@repro/ui/c207";
import { C219 } from "@repro/ui/c219";
import { C229 } from "@repro/ui/c229";
import { C233 } from "@repro/ui/c233";
import { C234 } from "@repro/ui/c234";
import { C258 } from "@repro/ui/c258";
import { C263 } from "@repro/ui/c263";
import { C280 } from "@repro/ui/c280";
import { C281 } from "@repro/ui/c281";
import { C288 } from "@repro/ui/c288";

const Inner = lazy(() => import("./h7-inner"));

export default function H7() {
  return (
    <div data-heavy="h7">
      <p>{render(parse("h7").value)}</p>
      <C16 label="h7 / c16" />
      <C17 label="h7 / c17" />
      <C21 label="h7 / c21" />
      <C46 label="h7 / c46" />
      <C57 label="h7 / c57" />
      <C67 label="h7 / c67" />
      <C80 label="h7 / c80" />
      <C83 label="h7 / c83" />
      <C101 label="h7 / c101" />
      <C107 label="h7 / c107" />
      <C115 label="h7 / c115" />
      <C148 label="h7 / c148" />
      <C151 label="h7 / c151" />
      <C152 label="h7 / c152" />
      <C154 label="h7 / c154" />
      <C155 label="h7 / c155" />
      <C159 label="h7 / c159" />
      <C177 label="h7 / c177" />
      <C186 label="h7 / c186" />
      <C190 label="h7 / c190" />
      <C197 label="h7 / c197" />
      <C203 label="h7 / c203" />
      <C207 label="h7 / c207" />
      <C219 label="h7 / c219" />
      <C229 label="h7 / c229" />
      <C233 label="h7 / c233" />
      <C234 label="h7 / c234" />
      <C258 label="h7 / c258" />
      <C263 label="h7 / c263" />
      <C280 label="h7 / c280" />
      <C281 label="h7 / c281" />
      <C288 label="h7 / c288" />
      <Suspense fallback={null}>
        <Inner />
      </Suspense>
    </div>
  );
}
