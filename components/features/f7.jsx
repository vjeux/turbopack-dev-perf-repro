"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { C17 } from "@repro/ui/c17";
import { C33 } from "@repro/ui/c33";
import { C56 } from "@repro/ui/c56";
import { C72 } from "@repro/ui/c72";
import { C76 } from "@repro/ui/c76";
import { C85 } from "@repro/ui/c85";
import { C90 } from "@repro/ui/c90";
import { C114 } from "@repro/ui/c114";
import { C131 } from "@repro/ui/c131";
import { C158 } from "@repro/ui/c158";
import { C184 } from "@repro/ui/c184";
import { C200 } from "@repro/ui/c200";
import { C205 } from "@repro/ui/c205";
import { C216 } from "@repro/ui/c216";
import { C293 } from "@repro/ui/c293";

const Heavy9 = dynamic(() => import("../heavy/h9"));
const Heavy11 = dynamic(() => import("../heavy/h11"));

export default function F7({ title }) {
  const [open, setOpen] = useState(false);
  const [OnDemand, setOnDemand] = useState(null);
  async function load() {
    const mod = await import("../heavy/h9");
    setOnDemand(() => mod.default);
  }
  return (
    <section data-feature="f7">
      <h2>{title ?? "f7"}</h2>
      <C17 label="f7 / c17" />
      <C33 label="f7 / c33" />
      <C56 label="f7 / c56" />
      <C72 label="f7 / c72" />
      <C76 label="f7 / c76" />
      <C85 label="f7 / c85" />
      <C90 label="f7 / c90" />
      <C114 label="f7 / c114" />
      <C131 label="f7 / c131" />
      <C158 label="f7 / c158" />
      <C184 label="f7 / c184" />
      <C200 label="f7 / c200" />
      <C205 label="f7 / c205" />
      <C216 label="f7 / c216" />
      <C293 label="f7 / c293" />
      <button onClick={() => setOpen((v) => !v)}>open</button>
      <button onClick={load}>load</button>
      {open ? <Heavy9 /> : null}
      {open ? <Heavy11 /> : null}
      {OnDemand ? <OnDemand /> : null}
    </section>
  );
}
