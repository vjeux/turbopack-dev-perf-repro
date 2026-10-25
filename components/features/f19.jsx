"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { parse } from "@repro/shared";
import { C2 } from "@repro/ui/c2";
import { C97 } from "@repro/ui/c97";
import { C133 } from "@repro/ui/c133";
import { C151 } from "@repro/ui/c151";
import { C155 } from "@repro/ui/c155";
import { C193 } from "@repro/ui/c193";
import { C200 } from "@repro/ui/c200";
import { C222 } from "@repro/ui/c222";

const Heavy5 = dynamic(() => import("../heavy/h5"));

export default function F19({ title }) {
  const [open, setOpen] = useState(false);
  const [OnDemand, setOnDemand] = useState(null);
  async function load() {
    const mod = await import("../heavy/h1");
    setOnDemand(() => mod.default);
  }
  return (
    <section data-feature="f19">
      <h2>{title ?? parse("f19").value}</h2>
      <C2 label="f19 / c2" />
      <C97 label="f19 / c97" />
      <C133 label="f19 / c133" />
      <C151 label="f19 / c151" />
      <C155 label="f19 / c155" />
      <C193 label="f19 / c193" />
      <C200 label="f19 / c200" />
      <C222 label="f19 / c222" />
      <button onClick={() => setOpen((v) => !v)}>open</button>
      <button onClick={load}>load</button>
      {open ? <Heavy5 /> : null}
      {OnDemand ? <OnDemand /> : null}
    </section>
  );
}
