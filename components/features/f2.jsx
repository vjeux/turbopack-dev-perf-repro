"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { C94 } from "@repro/ui/c94";
import { C133 } from "@repro/ui/c133";
import { C229 } from "@repro/ui/c229";
import { C242 } from "@repro/ui/c242";
import { C243 } from "@repro/ui/c243";
import { C295 } from "@repro/ui/c295";

const Heavy0 = dynamic(() => import("../heavy/h0"));
const Heavy9 = dynamic(() => import("../heavy/h9"));

export default function F2({ title }) {
  const [open, setOpen] = useState(false);
  const [OnDemand, setOnDemand] = useState(null);
  async function load() {
    const mod = await import("../heavy/h4");
    setOnDemand(() => mod.default);
  }
  return (
    <section data-feature="f2">
      <h2>{title ?? "f2"}</h2>
      <C94 label="f2 / c94" />
      <C133 label="f2 / c133" />
      <C229 label="f2 / c229" />
      <C242 label="f2 / c242" />
      <C243 label="f2 / c243" />
      <C295 label="f2 / c295" />
      <button onClick={() => setOpen((v) => !v)}>open</button>
      <button onClick={load}>load</button>
      {open ? <Heavy0 /> : null}
      {open ? <Heavy9 /> : null}
      {OnDemand ? <OnDemand /> : null}
    </section>
  );
}
