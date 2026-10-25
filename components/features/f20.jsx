"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { C56 } from "@repro/ui/c56";
import { C115 } from "@repro/ui/c115";
import { C130 } from "@repro/ui/c130";
import { C166 } from "@repro/ui/c166";
import { C213 } from "@repro/ui/c213";
import { C214 } from "@repro/ui/c214";
import { C234 } from "@repro/ui/c234";
import { C241 } from "@repro/ui/c241";
import { C259 } from "@repro/ui/c259";
import { C294 } from "@repro/ui/c294";

const Heavy7 = dynamic(() => import("../heavy/h7"));
const Heavy10 = dynamic(() => import("../heavy/h10"));

export default function F20({ title }) {
  const [open, setOpen] = useState(false);
  const [OnDemand, setOnDemand] = useState(null);
  async function load() {
    const mod = await import("../heavy/h1");
    setOnDemand(() => mod.default);
  }
  return (
    <section data-feature="f20">
      <h2>{title ?? "f20"}</h2>
      <C56 label="f20 / c56" />
      <C115 label="f20 / c115" />
      <C130 label="f20 / c130" />
      <C166 label="f20 / c166" />
      <C213 label="f20 / c213" />
      <C214 label="f20 / c214" />
      <C234 label="f20 / c234" />
      <C241 label="f20 / c241" />
      <C259 label="f20 / c259" />
      <C294 label="f20 / c294" />
      <button onClick={() => setOpen((v) => !v)}>open</button>
      <button onClick={load}>load</button>
      {open ? <Heavy7 /> : null}
      {open ? <Heavy10 /> : null}
      {OnDemand ? <OnDemand /> : null}
    </section>
  );
}
