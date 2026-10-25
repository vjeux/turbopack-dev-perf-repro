"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { C39 } from "@repro/ui/c39";
import { C40 } from "@repro/ui/c40";
import { C61 } from "@repro/ui/c61";
import { C99 } from "@repro/ui/c99";
import { C122 } from "@repro/ui/c122";
import { C196 } from "@repro/ui/c196";
import { C223 } from "@repro/ui/c223";
import { C250 } from "@repro/ui/c250";
import { C255 } from "@repro/ui/c255";
import { C281 } from "@repro/ui/c281";
import { C293 } from "@repro/ui/c293";

const Heavy2 = dynamic(() => import("../heavy/h2"));
const Heavy8 = dynamic(() => import("../heavy/h8"));

export default function F5({ title }) {
  const [open, setOpen] = useState(false);
  const [OnDemand, setOnDemand] = useState(null);
  async function load() {
    const mod = await import("../heavy/h2");
    setOnDemand(() => mod.default);
  }
  return (
    <section data-feature="f5">
      <h2>{title ?? "f5"}</h2>
      <C39 label="f5 / c39" />
      <C40 label="f5 / c40" />
      <C61 label="f5 / c61" />
      <C99 label="f5 / c99" />
      <C122 label="f5 / c122" />
      <C196 label="f5 / c196" />
      <C223 label="f5 / c223" />
      <C250 label="f5 / c250" />
      <C255 label="f5 / c255" />
      <C281 label="f5 / c281" />
      <C293 label="f5 / c293" />
      <button onClick={() => setOpen((v) => !v)}>open</button>
      <button onClick={load}>load</button>
      {open ? <Heavy2 /> : null}
      {open ? <Heavy8 /> : null}
      {OnDemand ? <OnDemand /> : null}
    </section>
  );
}
