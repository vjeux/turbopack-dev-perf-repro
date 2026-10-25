"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { parse } from "@repro/shared";
import { C108 } from "@repro/ui/c108";
import { C185 } from "@repro/ui/c185";
import { C214 } from "@repro/ui/c214";
import { C225 } from "@repro/ui/c225";
import { C245 } from "@repro/ui/c245";
import { C278 } from "@repro/ui/c278";

const Heavy3 = dynamic(() => import("../heavy/h3"));
const Heavy4 = dynamic(() => import("../heavy/h4"));

export default function F1({ title }) {
  const [open, setOpen] = useState(false);
  const [OnDemand, setOnDemand] = useState(null);
  async function load() {
    const mod = await import("../heavy/h2");
    setOnDemand(() => mod.default);
  }
  return (
    <section data-feature="f1">
      <h2>{title ?? parse("f1").value}</h2>
      <C108 label="f1 / c108" />
      <C185 label="f1 / c185" />
      <C214 label="f1 / c214" />
      <C225 label="f1 / c225" />
      <C245 label="f1 / c245" />
      <C278 label="f1 / c278" />
      <button onClick={() => setOpen((v) => !v)}>open</button>
      <button onClick={load}>load</button>
      {open ? <Heavy3 /> : null}
      {open ? <Heavy4 /> : null}
      {OnDemand ? <OnDemand /> : null}
    </section>
  );
}
