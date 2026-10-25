"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { parse } from "@repro/shared";
import { C9 } from "@repro/ui/c9";
import { C10 } from "@repro/ui/c10";
import { C34 } from "@repro/ui/c34";
import { C57 } from "@repro/ui/c57";
import { C60 } from "@repro/ui/c60";
import { C77 } from "@repro/ui/c77";
import { C151 } from "@repro/ui/c151";
import { C164 } from "@repro/ui/c164";
import { C176 } from "@repro/ui/c176";
import { C197 } from "@repro/ui/c197";
import { C218 } from "@repro/ui/c218";
import { C237 } from "@repro/ui/c237";
import { C240 } from "@repro/ui/c240";
import { C267 } from "@repro/ui/c267";
import { C272 } from "@repro/ui/c272";
import { C290 } from "@repro/ui/c290";

const Heavy3 = dynamic(() => import("../heavy/h3"));
const Heavy8 = dynamic(() => import("../heavy/h8"));

export default function F16({ title }) {
  const [open, setOpen] = useState(false);
  const [OnDemand, setOnDemand] = useState(null);
  async function load() {
    const mod = await import("../heavy/h4");
    setOnDemand(() => mod.default);
  }
  return (
    <section data-feature="f16">
      <h2>{title ?? parse("f16").value}</h2>
      <C9 label="f16 / c9" />
      <C10 label="f16 / c10" />
      <C34 label="f16 / c34" />
      <C57 label="f16 / c57" />
      <C60 label="f16 / c60" />
      <C77 label="f16 / c77" />
      <C151 label="f16 / c151" />
      <C164 label="f16 / c164" />
      <C176 label="f16 / c176" />
      <C197 label="f16 / c197" />
      <C218 label="f16 / c218" />
      <C237 label="f16 / c237" />
      <C240 label="f16 / c240" />
      <C267 label="f16 / c267" />
      <C272 label="f16 / c272" />
      <C290 label="f16 / c290" />
      <button onClick={() => setOpen((v) => !v)}>open</button>
      <button onClick={load}>load</button>
      {open ? <Heavy3 /> : null}
      {open ? <Heavy8 /> : null}
      {OnDemand ? <OnDemand /> : null}
    </section>
  );
}
