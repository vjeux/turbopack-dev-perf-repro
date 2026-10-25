"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { parse } from "@repro/shared";
import { C17 } from "@repro/ui/c17";
import { C37 } from "@repro/ui/c37";
import { C74 } from "@repro/ui/c74";
import { C157 } from "@repro/ui/c157";
import { C187 } from "@repro/ui/c187";
import { C206 } from "@repro/ui/c206";
import { C245 } from "@repro/ui/c245";
import { C263 } from "@repro/ui/c263";

const Heavy3 = dynamic(() => import("../heavy/h3"));

export default function F9({ title }) {
  const [open, setOpen] = useState(false);
  const [OnDemand, setOnDemand] = useState(null);
  async function load() {
    const mod = await import("../heavy/h2");
    setOnDemand(() => mod.default);
  }
  return (
    <section data-feature="f9">
      <h2>{title ?? parse("f9").value}</h2>
      <C17 label="f9 / c17" />
      <C37 label="f9 / c37" />
      <C74 label="f9 / c74" />
      <C157 label="f9 / c157" />
      <C187 label="f9 / c187" />
      <C206 label="f9 / c206" />
      <C245 label="f9 / c245" />
      <C263 label="f9 / c263" />
      <button onClick={() => setOpen((v) => !v)}>open</button>
      <button onClick={load}>load</button>
      {open ? <Heavy3 /> : null}
      {OnDemand ? <OnDemand /> : null}
    </section>
  );
}
