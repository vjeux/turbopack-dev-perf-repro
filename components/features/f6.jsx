"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { C4 } from "@repro/ui/c4";
import { C17 } from "@repro/ui/c17";
import { C46 } from "@repro/ui/c46";
import { C77 } from "@repro/ui/c77";
import { C99 } from "@repro/ui/c99";
import { C124 } from "@repro/ui/c124";
import { C132 } from "@repro/ui/c132";
import { C171 } from "@repro/ui/c171";
import { C212 } from "@repro/ui/c212";
import { C215 } from "@repro/ui/c215";
import { C226 } from "@repro/ui/c226";
import { C241 } from "@repro/ui/c241";
import { C247 } from "@repro/ui/c247";

const Heavy7 = dynamic(() => import("../heavy/h7"));
const Heavy9 = dynamic(() => import("../heavy/h9"));

export default function F6({ title }) {
  const [open, setOpen] = useState(false);
  const [OnDemand, setOnDemand] = useState(null);
  async function load() {
    const mod = await import("../heavy/h4");
    setOnDemand(() => mod.default);
  }
  return (
    <section data-feature="f6">
      <h2>{title ?? "f6"}</h2>
      <C4 label="f6 / c4" />
      <C17 label="f6 / c17" />
      <C46 label="f6 / c46" />
      <C77 label="f6 / c77" />
      <C99 label="f6 / c99" />
      <C124 label="f6 / c124" />
      <C132 label="f6 / c132" />
      <C171 label="f6 / c171" />
      <C212 label="f6 / c212" />
      <C215 label="f6 / c215" />
      <C226 label="f6 / c226" />
      <C241 label="f6 / c241" />
      <C247 label="f6 / c247" />
      <button onClick={() => setOpen((v) => !v)}>open</button>
      <button onClick={load}>load</button>
      {open ? <Heavy7 /> : null}
      {open ? <Heavy9 /> : null}
      {OnDemand ? <OnDemand /> : null}
    </section>
  );
}
