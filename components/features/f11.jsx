"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { C6 } from "@repro/ui/c6";
import { C29 } from "@repro/ui/c29";
import { C48 } from "@repro/ui/c48";
import { C72 } from "@repro/ui/c72";
import { C136 } from "@repro/ui/c136";
import { C189 } from "@repro/ui/c189";
import { C200 } from "@repro/ui/c200";
import { C212 } from "@repro/ui/c212";
import { C214 } from "@repro/ui/c214";
import { C229 } from "@repro/ui/c229";
import { C243 } from "@repro/ui/c243";
import { C292 } from "@repro/ui/c292";

const Heavy1 = dynamic(() => import("../heavy/h1"));
const Heavy9 = dynamic(() => import("../heavy/h9"));

export default function F11({ title }) {
  const [open, setOpen] = useState(false);
  const [OnDemand, setOnDemand] = useState(null);
  async function load() {
    const mod = await import("../heavy/h4");
    setOnDemand(() => mod.default);
  }
  return (
    <section data-feature="f11">
      <h2>{title ?? "f11"}</h2>
      <C6 label="f11 / c6" />
      <C29 label="f11 / c29" />
      <C48 label="f11 / c48" />
      <C72 label="f11 / c72" />
      <C136 label="f11 / c136" />
      <C189 label="f11 / c189" />
      <C200 label="f11 / c200" />
      <C212 label="f11 / c212" />
      <C214 label="f11 / c214" />
      <C229 label="f11 / c229" />
      <C243 label="f11 / c243" />
      <C292 label="f11 / c292" />
      <button onClick={() => setOpen((v) => !v)}>open</button>
      <button onClick={load}>load</button>
      {open ? <Heavy1 /> : null}
      {open ? <Heavy9 /> : null}
      {OnDemand ? <OnDemand /> : null}
    </section>
  );
}
