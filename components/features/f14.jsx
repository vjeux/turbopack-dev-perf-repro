"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { parse } from "@repro/shared";
import { C4 } from "@repro/ui/c4";
import { C43 } from "@repro/ui/c43";
import { C74 } from "@repro/ui/c74";
import { C76 } from "@repro/ui/c76";
import { C98 } from "@repro/ui/c98";
import { C189 } from "@repro/ui/c189";

const Heavy0 = dynamic(() => import("../heavy/h0"));
const Heavy7 = dynamic(() => import("../heavy/h7"));

export default function F14({ title }) {
  const [open, setOpen] = useState(false);
  const [OnDemand, setOnDemand] = useState(null);
  async function load() {
    const mod = await import("../heavy/h3");
    setOnDemand(() => mod.default);
  }
  return (
    <section data-feature="f14">
      <h2>{title ?? parse("f14").value}</h2>
      <C4 label="f14 / c4" />
      <C43 label="f14 / c43" />
      <C74 label="f14 / c74" />
      <C76 label="f14 / c76" />
      <C98 label="f14 / c98" />
      <C189 label="f14 / c189" />
      <button onClick={() => setOpen((v) => !v)}>open</button>
      <button onClick={load}>load</button>
      {open ? <Heavy0 /> : null}
      {open ? <Heavy7 /> : null}
      {OnDemand ? <OnDemand /> : null}
    </section>
  );
}
