"use client";

import { lazy, Suspense } from "react";
import { render } from "@repro/heavy-4";
import { parse } from "@repro/shared";
import { C0 } from "@repro/ui/c0";
import { C15 } from "@repro/ui/c15";
import { C23 } from "@repro/ui/c23";
import { C29 } from "@repro/ui/c29";
import { C31 } from "@repro/ui/c31";
import { C33 } from "@repro/ui/c33";
import { C44 } from "@repro/ui/c44";
import { C50 } from "@repro/ui/c50";
import { C54 } from "@repro/ui/c54";
import { C65 } from "@repro/ui/c65";
import { C74 } from "@repro/ui/c74";
import { C80 } from "@repro/ui/c80";
import { C115 } from "@repro/ui/c115";
import { C117 } from "@repro/ui/c117";
import { C142 } from "@repro/ui/c142";
import { C156 } from "@repro/ui/c156";
import { C180 } from "@repro/ui/c180";
import { C193 } from "@repro/ui/c193";
import { C202 } from "@repro/ui/c202";
import { C222 } from "@repro/ui/c222";
import { C230 } from "@repro/ui/c230";
import { C236 } from "@repro/ui/c236";
import { C242 } from "@repro/ui/c242";
import { C249 } from "@repro/ui/c249";
import { C250 } from "@repro/ui/c250";
import { C267 } from "@repro/ui/c267";
import { C275 } from "@repro/ui/c275";

const Inner = lazy(() => import("./h4-inner"));

export default function H4() {
  return (
    <div data-heavy="h4">
      <p>{render(parse("h4").value)}</p>
      <C0 label="h4 / c0" />
      <C15 label="h4 / c15" />
      <C23 label="h4 / c23" />
      <C29 label="h4 / c29" />
      <C31 label="h4 / c31" />
      <C33 label="h4 / c33" />
      <C44 label="h4 / c44" />
      <C50 label="h4 / c50" />
      <C54 label="h4 / c54" />
      <C65 label="h4 / c65" />
      <C74 label="h4 / c74" />
      <C80 label="h4 / c80" />
      <C115 label="h4 / c115" />
      <C117 label="h4 / c117" />
      <C142 label="h4 / c142" />
      <C156 label="h4 / c156" />
      <C180 label="h4 / c180" />
      <C193 label="h4 / c193" />
      <C202 label="h4 / c202" />
      <C222 label="h4 / c222" />
      <C230 label="h4 / c230" />
      <C236 label="h4 / c236" />
      <C242 label="h4 / c242" />
      <C249 label="h4 / c249" />
      <C250 label="h4 / c250" />
      <C267 label="h4 / c267" />
      <C275 label="h4 / c275" />
      <Suspense fallback={null}>
        <Inner />
      </Suspense>
    </div>
  );
}
