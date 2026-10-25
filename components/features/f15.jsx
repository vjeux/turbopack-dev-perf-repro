"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { C2 } from "@repro/ui/c2";
import { C4 } from "@repro/ui/c4";
import { C28 } from "@repro/ui/c28";
import { C44 } from "@repro/ui/c44";
import { C52 } from "@repro/ui/c52";
import { C62 } from "@repro/ui/c62";
import { C63 } from "@repro/ui/c63";
import { C103 } from "@repro/ui/c103";
import { C149 } from "@repro/ui/c149";
import { C178 } from "@repro/ui/c178";
import { C179 } from "@repro/ui/c179";
import { C195 } from "@repro/ui/c195";
import { C207 } from "@repro/ui/c207";
import { C213 } from "@repro/ui/c213";
import { C235 } from "@repro/ui/c235";
import { C282 } from "@repro/ui/c282";

const Heavy7 = dynamic(() => import("../heavy/h7"));

export default function F15({ title }) {
  const [open, setOpen] = useState(false);
  const [OnDemand, setOnDemand] = useState(null);
  async function load() {
    const mod = await import("../heavy/h7");
    setOnDemand(() => mod.default);
  }
  return (
    <section data-feature="f15">
      <h2>{title ?? "f15"}</h2>
      <C2 label="f15 / c2" />
      <C4 label="f15 / c4" />
      <C28 label="f15 / c28" />
      <C44 label="f15 / c44" />
      <C52 label="f15 / c52" />
      <C62 label="f15 / c62" />
      <C63 label="f15 / c63" />
      <C103 label="f15 / c103" />
      <C149 label="f15 / c149" />
      <C178 label="f15 / c178" />
      <C179 label="f15 / c179" />
      <C195 label="f15 / c195" />
      <C207 label="f15 / c207" />
      <C213 label="f15 / c213" />
      <C235 label="f15 / c235" />
      <C282 label="f15 / c282" />
      <button onClick={() => setOpen((v) => !v)}>open</button>
      <button onClick={load}>load</button>
      {open ? <Heavy7 /> : null}
      {OnDemand ? <OnDemand /> : null}
    </section>
  );
}
