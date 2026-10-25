"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { C17 } from "@repro/ui/c17";
import { C20 } from "@repro/ui/c20";
import { C51 } from "@repro/ui/c51";
import { C76 } from "@repro/ui/c76";
import { C102 } from "@repro/ui/c102";
import { C120 } from "@repro/ui/c120";
import { C123 } from "@repro/ui/c123";
import { C137 } from "@repro/ui/c137";
import { C159 } from "@repro/ui/c159";
import { C164 } from "@repro/ui/c164";
import { C229 } from "@repro/ui/c229";
import { C251 } from "@repro/ui/c251";
import { C276 } from "@repro/ui/c276";
import { C281 } from "@repro/ui/c281";
import { C289 } from "@repro/ui/c289";

const Heavy9 = dynamic(() => import("../heavy/h9"));

export default function F17({ title }) {
  const [open, setOpen] = useState(false);
  const [OnDemand, setOnDemand] = useState(null);
  async function load() {
    const mod = await import("../heavy/h11");
    setOnDemand(() => mod.default);
  }
  return (
    <section data-feature="f17">
      <h2>{title ?? "f17"}</h2>
      <C17 label="f17 / c17" />
      <C20 label="f17 / c20" />
      <C51 label="f17 / c51" />
      <C76 label="f17 / c76" />
      <C102 label="f17 / c102" />
      <C120 label="f17 / c120" />
      <C123 label="f17 / c123" />
      <C137 label="f17 / c137" />
      <C159 label="f17 / c159" />
      <C164 label="f17 / c164" />
      <C229 label="f17 / c229" />
      <C251 label="f17 / c251" />
      <C276 label="f17 / c276" />
      <C281 label="f17 / c281" />
      <C289 label="f17 / c289" />
      <button onClick={() => setOpen((v) => !v)}>open</button>
      <button onClick={load}>load</button>
      {open ? <Heavy9 /> : null}
      {OnDemand ? <OnDemand /> : null}
    </section>
  );
}
