"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { C11 } from "@repro/ui/c11";
import { C12 } from "@repro/ui/c12";
import { C29 } from "@repro/ui/c29";
import { C49 } from "@repro/ui/c49";
import { C157 } from "@repro/ui/c157";
import { C180 } from "@repro/ui/c180";
import { C204 } from "@repro/ui/c204";
import { C223 } from "@repro/ui/c223";

const Heavy6 = dynamic(() => import("../heavy/h6"));

export default function F23({ title }) {
  const [open, setOpen] = useState(false);
  const [OnDemand, setOnDemand] = useState(null);
  async function load() {
    const mod = await import("../heavy/h7");
    setOnDemand(() => mod.default);
  }
  return (
    <section data-feature="f23">
      <h2>{title ?? "f23"}</h2>
      <C11 label="f23 / c11" />
      <C12 label="f23 / c12" />
      <C29 label="f23 / c29" />
      <C49 label="f23 / c49" />
      <C157 label="f23 / c157" />
      <C180 label="f23 / c180" />
      <C204 label="f23 / c204" />
      <C223 label="f23 / c223" />
      <button onClick={() => setOpen((v) => !v)}>open</button>
      <button onClick={load}>load</button>
      {open ? <Heavy6 /> : null}
      {OnDemand ? <OnDemand /> : null}
    </section>
  );
}
