"use client";

import { lazy, Suspense } from "react";
import { render } from "@repro/heavy-1";
import { parse } from "@repro/shared";
import { C14 } from "@repro/ui/c14";
import { C17 } from "@repro/ui/c17";
import { C47 } from "@repro/ui/c47";
import { C49 } from "@repro/ui/c49";
import { C58 } from "@repro/ui/c58";
import { C70 } from "@repro/ui/c70";
import { C76 } from "@repro/ui/c76";
import { C78 } from "@repro/ui/c78";
import { C81 } from "@repro/ui/c81";
import { C91 } from "@repro/ui/c91";
import { C127 } from "@repro/ui/c127";
import { C130 } from "@repro/ui/c130";
import { C144 } from "@repro/ui/c144";
import { C161 } from "@repro/ui/c161";
import { C164 } from "@repro/ui/c164";
import { C168 } from "@repro/ui/c168";
import { C172 } from "@repro/ui/c172";
import { C174 } from "@repro/ui/c174";
import { C189 } from "@repro/ui/c189";
import { C191 } from "@repro/ui/c191";
import { C195 } from "@repro/ui/c195";
import { C202 } from "@repro/ui/c202";
import { C212 } from "@repro/ui/c212";
import { C219 } from "@repro/ui/c219";
import { C221 } from "@repro/ui/c221";
import { C224 } from "@repro/ui/c224";
import { C226 } from "@repro/ui/c226";
import { C236 } from "@repro/ui/c236";
import { C242 } from "@repro/ui/c242";
import { C249 } from "@repro/ui/c249";
import { C256 } from "@repro/ui/c256";
import { C265 } from "@repro/ui/c265";
import { C271 } from "@repro/ui/c271";
import { C274 } from "@repro/ui/c274";
import { C279 } from "@repro/ui/c279";
import { C291 } from "@repro/ui/c291";
import { C296 } from "@repro/ui/c296";

const Inner = lazy(() => import("./h1-inner"));

export default function H1() {
  return (
    <div data-heavy="h1">
      <p>{render(parse("h1").value)}</p>
      <C14 label="h1 / c14" />
      <C17 label="h1 / c17" />
      <C47 label="h1 / c47" />
      <C49 label="h1 / c49" />
      <C58 label="h1 / c58" />
      <C70 label="h1 / c70" />
      <C76 label="h1 / c76" />
      <C78 label="h1 / c78" />
      <C81 label="h1 / c81" />
      <C91 label="h1 / c91" />
      <C127 label="h1 / c127" />
      <C130 label="h1 / c130" />
      <C144 label="h1 / c144" />
      <C161 label="h1 / c161" />
      <C164 label="h1 / c164" />
      <C168 label="h1 / c168" />
      <C172 label="h1 / c172" />
      <C174 label="h1 / c174" />
      <C189 label="h1 / c189" />
      <C191 label="h1 / c191" />
      <C195 label="h1 / c195" />
      <C202 label="h1 / c202" />
      <C212 label="h1 / c212" />
      <C219 label="h1 / c219" />
      <C221 label="h1 / c221" />
      <C224 label="h1 / c224" />
      <C226 label="h1 / c226" />
      <C236 label="h1 / c236" />
      <C242 label="h1 / c242" />
      <C249 label="h1 / c249" />
      <C256 label="h1 / c256" />
      <C265 label="h1 / c265" />
      <C271 label="h1 / c271" />
      <C274 label="h1 / c274" />
      <C279 label="h1 / c279" />
      <C291 label="h1 / c291" />
      <C296 label="h1 / c296" />
      <Suspense fallback={null}>
        <Inner />
      </Suspense>
    </div>
  );
}
