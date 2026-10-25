"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { parse } from "@repro/shared";
import { C23 } from "@repro/ui/c23";
import { C25 } from "@repro/ui/c25";
import { C26 } from "@repro/ui/c26";
import { C49 } from "@repro/ui/c49";
import { C87 } from "@repro/ui/c87";
import { C107 } from "@repro/ui/c107";
import { C138 } from "@repro/ui/c138";
import { C237 } from "@repro/ui/c237";
import { C253 } from "@repro/ui/c253";
import { C257 } from "@repro/ui/c257";
import { C285 } from "@repro/ui/c285";

const Heavy6 = dynamic(() => import("../heavy/h6"));

export default function F0({ title }) {
  const [open, setOpen] = useState(false);
  const [OnDemand, setOnDemand] = useState(null);
  async function load() {
    const mod = await import("../heavy/h6");
    setOnDemand(() => mod.default);
  }
  return (
    <section data-feature="f0">
      <h2>{title ?? parse("f0").value}</h2>
      <C23 label="f0 / c23" />
      <C25 label="f0 / c25" />
      <C26 label="f0 / c26" />
      <C49 label="f0 / c49" />
      <C87 label="f0 / c87" />
      <C107 label="f0 / c107" />
      <C138 label="f0 / c138" />
      <C237 label="f0 / c237" />
      <C253 label="f0 / c253" />
      <C257 label="f0 / c257" />
      <C285 label="f0 / c285" />
      <button onClick={() => setOpen((v) => !v)}>open</button>
      <button onClick={load}>load</button>
      {open ? <Heavy6 /> : null}
      {OnDemand ? <OnDemand /> : null}
    </section>
  );
}
