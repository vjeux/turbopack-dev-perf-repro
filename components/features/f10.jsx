"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { C2 } from "@repro/ui/c2";
import { C39 } from "@repro/ui/c39";
import { C48 } from "@repro/ui/c48";
import { C182 } from "@repro/ui/c182";
import { C210 } from "@repro/ui/c210";
import { C249 } from "@repro/ui/c249";
import { C281 } from "@repro/ui/c281";

const Heavy0 = dynamic(() => import("../heavy/h0"));
const Heavy11 = dynamic(() => import("../heavy/h11"));

export default function F10({ title }) {
  const [open, setOpen] = useState(false);
  const [OnDemand, setOnDemand] = useState(null);
  async function load() {
    const mod = await import("../heavy/h11");
    setOnDemand(() => mod.default);
  }
  return (
    <section data-feature="f10">
      <h2>{title ?? "f10"}</h2>
      <C2 label="f10 / c2" />
      <C39 label="f10 / c39" />
      <C48 label="f10 / c48" />
      <C182 label="f10 / c182" />
      <C210 label="f10 / c210" />
      <C249 label="f10 / c249" />
      <C281 label="f10 / c281" />
      <button onClick={() => setOpen((v) => !v)}>open</button>
      <button onClick={load}>load</button>
      {open ? <Heavy0 /> : null}
      {open ? <Heavy11 /> : null}
      {OnDemand ? <OnDemand /> : null}
    </section>
  );
}
