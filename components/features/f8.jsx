"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { parse } from "@repro/shared";
import { C26 } from "@repro/ui/c26";
import { C96 } from "@repro/ui/c96";
import { C101 } from "@repro/ui/c101";
import { C106 } from "@repro/ui/c106";
import { C136 } from "@repro/ui/c136";
import { C208 } from "@repro/ui/c208";
import { C221 } from "@repro/ui/c221";
import { C256 } from "@repro/ui/c256";

const Heavy8 = dynamic(() => import("../heavy/h8"));

export default function F8({ title }) {
  const [open, setOpen] = useState(false);
  const [OnDemand, setOnDemand] = useState(null);
  async function load() {
    const mod = await import("../heavy/h6");
    setOnDemand(() => mod.default);
  }
  return (
    <section data-feature="f8">
      <h2>{title ?? parse("f8").value}</h2>
      <C26 label="f8 / c26" />
      <C96 label="f8 / c96" />
      <C101 label="f8 / c101" />
      <C106 label="f8 / c106" />
      <C136 label="f8 / c136" />
      <C208 label="f8 / c208" />
      <C221 label="f8 / c221" />
      <C256 label="f8 / c256" />
      <button onClick={() => setOpen((v) => !v)}>open</button>
      <button onClick={load}>load</button>
      {open ? <Heavy8 /> : null}
      {OnDemand ? <OnDemand /> : null}
    </section>
  );
}
