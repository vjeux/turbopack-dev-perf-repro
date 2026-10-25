"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { C21 } from "@repro/ui/c21";
import { C50 } from "@repro/ui/c50";
import { C129 } from "@repro/ui/c129";
import { C235 } from "@repro/ui/c235";
import { C238 } from "@repro/ui/c238";
import { C247 } from "@repro/ui/c247";
import { C252 } from "@repro/ui/c252";

const Heavy6 = dynamic(() => import("../heavy/h6"));
const Heavy9 = dynamic(() => import("../heavy/h9"));

export default function F4({ title }) {
  const [open, setOpen] = useState(false);
  const [OnDemand, setOnDemand] = useState(null);
  async function load() {
    const mod = await import("../heavy/h10");
    setOnDemand(() => mod.default);
  }
  return (
    <section data-feature="f4">
      <h2>{title ?? "f4"}</h2>
      <C21 label="f4 / c21" />
      <C50 label="f4 / c50" />
      <C129 label="f4 / c129" />
      <C235 label="f4 / c235" />
      <C238 label="f4 / c238" />
      <C247 label="f4 / c247" />
      <C252 label="f4 / c252" />
      <button onClick={() => setOpen((v) => !v)}>open</button>
      <button onClick={load}>load</button>
      {open ? <Heavy6 /> : null}
      {open ? <Heavy9 /> : null}
      {OnDemand ? <OnDemand /> : null}
    </section>
  );
}
