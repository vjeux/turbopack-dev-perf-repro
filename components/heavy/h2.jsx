"use client";

import { lazy, Suspense } from "react";
import { render } from "@repro/heavy-2";
import { parse } from "@repro/shared";
import { C14 } from "@repro/ui/c14";
import { C16 } from "@repro/ui/c16";
import { C18 } from "@repro/ui/c18";
import { C27 } from "@repro/ui/c27";
import { C30 } from "@repro/ui/c30";
import { C56 } from "@repro/ui/c56";
import { C66 } from "@repro/ui/c66";
import { C84 } from "@repro/ui/c84";
import { C89 } from "@repro/ui/c89";
import { C129 } from "@repro/ui/c129";
import { C151 } from "@repro/ui/c151";
import { C153 } from "@repro/ui/c153";
import { C158 } from "@repro/ui/c158";
import { C161 } from "@repro/ui/c161";
import { C169 } from "@repro/ui/c169";
import { C170 } from "@repro/ui/c170";
import { C175 } from "@repro/ui/c175";
import { C177 } from "@repro/ui/c177";
import { C180 } from "@repro/ui/c180";
import { C204 } from "@repro/ui/c204";
import { C217 } from "@repro/ui/c217";
import { C231 } from "@repro/ui/c231";
import { C241 } from "@repro/ui/c241";
import { C243 } from "@repro/ui/c243";
import { C248 } from "@repro/ui/c248";
import { C255 } from "@repro/ui/c255";
import { C260 } from "@repro/ui/c260";
import { C263 } from "@repro/ui/c263";
import { C267 } from "@repro/ui/c267";
import { C275 } from "@repro/ui/c275";
import { C287 } from "@repro/ui/c287";
import { C289 } from "@repro/ui/c289";
import { C296 } from "@repro/ui/c296";

const Inner = lazy(() => import("./h2-inner"));

export default function H2() {
  return (
    <div data-heavy="h2">
      <p>{render(parse("h2").value)}</p>
      <C14 label="h2 / c14" />
      <C16 label="h2 / c16" />
      <C18 label="h2 / c18" />
      <C27 label="h2 / c27" />
      <C30 label="h2 / c30" />
      <C56 label="h2 / c56" />
      <C66 label="h2 / c66" />
      <C84 label="h2 / c84" />
      <C89 label="h2 / c89" />
      <C129 label="h2 / c129" />
      <C151 label="h2 / c151" />
      <C153 label="h2 / c153" />
      <C158 label="h2 / c158" />
      <C161 label="h2 / c161" />
      <C169 label="h2 / c169" />
      <C170 label="h2 / c170" />
      <C175 label="h2 / c175" />
      <C177 label="h2 / c177" />
      <C180 label="h2 / c180" />
      <C204 label="h2 / c204" />
      <C217 label="h2 / c217" />
      <C231 label="h2 / c231" />
      <C241 label="h2 / c241" />
      <C243 label="h2 / c243" />
      <C248 label="h2 / c248" />
      <C255 label="h2 / c255" />
      <C260 label="h2 / c260" />
      <C263 label="h2 / c263" />
      <C267 label="h2 / c267" />
      <C275 label="h2 / c275" />
      <C287 label="h2 / c287" />
      <C289 label="h2 / c289" />
      <C296 label="h2 / c296" />
      <Suspense fallback={null}>
        <Inner />
      </Suspense>
    </div>
  );
}
