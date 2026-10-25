"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { parse } from "@repro/shared";
import { C4 } from "@repro/ui/c4";
import { C5 } from "@repro/ui/c5";
import { C64 } from "@repro/ui/c64";
import { C73 } from "@repro/ui/c73";
import { C91 } from "@repro/ui/c91";
import { C107 } from "@repro/ui/c107";
import { C108 } from "@repro/ui/c108";
import { C128 } from "@repro/ui/c128";
import { C204 } from "@repro/ui/c204";
import { C211 } from "@repro/ui/c211";
import { C262 } from "@repro/ui/c262";
import { C267 } from "@repro/ui/c267";

const Heavy9 = dynamic(() => import("../heavy/h9"));

export default function F21({ title }) {
  const [open, setOpen] = useState(false);
  const [OnDemand, setOnDemand] = useState(null);
  async function load() {
    const mod = await import("../heavy/h8");
    setOnDemand(() => mod.default);
  }
  return (
    <section data-feature="f21">
      <h2>{title ?? parse("f21").value}</h2>
      <C4 label="f21 / c4" />
      <C5 label="f21 / c5" />
      <C64 label="f21 / c64" />
      <C73 label="f21 / c73" />
      <C91 label="f21 / c91" />
      <C107 label="f21 / c107" />
      <C108 label="f21 / c108" />
      <C128 label="f21 / c128" />
      <C204 label="f21 / c204" />
      <C211 label="f21 / c211" />
      <C262 label="f21 / c262" />
      <C267 label="f21 / c267" />
      <button onClick={() => setOpen((v) => !v)}>open</button>
      <button onClick={load}>load</button>
      {open ? <Heavy9 /> : null}
      {OnDemand ? <OnDemand /> : null}
    </section>
  );
}
