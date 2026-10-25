"use client";

import { lazy, Suspense } from "react";
import { render } from "@repro/heavy-2";
import { parse } from "@repro/shared";
import { C9 } from "@repro/ui/c9";
import { C13 } from "@repro/ui/c13";
import { C18 } from "@repro/ui/c18";
import { C19 } from "@repro/ui/c19";
import { C22 } from "@repro/ui/c22";
import { C26 } from "@repro/ui/c26";
import { C31 } from "@repro/ui/c31";
import { C43 } from "@repro/ui/c43";
import { C47 } from "@repro/ui/c47";
import { C56 } from "@repro/ui/c56";
import { C71 } from "@repro/ui/c71";
import { C72 } from "@repro/ui/c72";
import { C81 } from "@repro/ui/c81";
import { C85 } from "@repro/ui/c85";
import { C91 } from "@repro/ui/c91";
import { C95 } from "@repro/ui/c95";
import { C96 } from "@repro/ui/c96";
import { C102 } from "@repro/ui/c102";
import { C103 } from "@repro/ui/c103";
import { C115 } from "@repro/ui/c115";
import { C129 } from "@repro/ui/c129";
import { C130 } from "@repro/ui/c130";
import { C134 } from "@repro/ui/c134";
import { C144 } from "@repro/ui/c144";
import { C150 } from "@repro/ui/c150";
import { C156 } from "@repro/ui/c156";
import { C174 } from "@repro/ui/c174";
import { C176 } from "@repro/ui/c176";
import { C195 } from "@repro/ui/c195";
import { C198 } from "@repro/ui/c198";
import { C216 } from "@repro/ui/c216";
import { C226 } from "@repro/ui/c226";
import { C228 } from "@repro/ui/c228";
import { C278 } from "@repro/ui/c278";
import { C279 } from "@repro/ui/c279";
import { C280 } from "@repro/ui/c280";
import { C282 } from "@repro/ui/c282";
import { C289 } from "@repro/ui/c289";
import { C291 } from "@repro/ui/c291";
import { C293 } from "@repro/ui/c293";

const Inner = lazy(() => import("./h8-inner"));

export default function H8() {
  return (
    <div data-heavy="h8">
      <p>{render(parse("h8").value)}</p>
      <C9 label="h8 / c9" />
      <C13 label="h8 / c13" />
      <C18 label="h8 / c18" />
      <C19 label="h8 / c19" />
      <C22 label="h8 / c22" />
      <C26 label="h8 / c26" />
      <C31 label="h8 / c31" />
      <C43 label="h8 / c43" />
      <C47 label="h8 / c47" />
      <C56 label="h8 / c56" />
      <C71 label="h8 / c71" />
      <C72 label="h8 / c72" />
      <C81 label="h8 / c81" />
      <C85 label="h8 / c85" />
      <C91 label="h8 / c91" />
      <C95 label="h8 / c95" />
      <C96 label="h8 / c96" />
      <C102 label="h8 / c102" />
      <C103 label="h8 / c103" />
      <C115 label="h8 / c115" />
      <C129 label="h8 / c129" />
      <C130 label="h8 / c130" />
      <C134 label="h8 / c134" />
      <C144 label="h8 / c144" />
      <C150 label="h8 / c150" />
      <C156 label="h8 / c156" />
      <C174 label="h8 / c174" />
      <C176 label="h8 / c176" />
      <C195 label="h8 / c195" />
      <C198 label="h8 / c198" />
      <C216 label="h8 / c216" />
      <C226 label="h8 / c226" />
      <C228 label="h8 / c228" />
      <C278 label="h8 / c278" />
      <C279 label="h8 / c279" />
      <C280 label="h8 / c280" />
      <C282 label="h8 / c282" />
      <C289 label="h8 / c289" />
      <C291 label="h8 / c291" />
      <C293 label="h8 / c293" />
      <Suspense fallback={null}>
        <Inner />
      </Suspense>
    </div>
  );
}
