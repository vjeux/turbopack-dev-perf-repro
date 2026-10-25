"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { parse } from "@repro/shared";
import { C22 } from "@repro/ui/c22";
import { C28 } from "@repro/ui/c28";
import { C41 } from "@repro/ui/c41";
import { C47 } from "@repro/ui/c47";
import { C82 } from "@repro/ui/c82";
import { C124 } from "@repro/ui/c124";
import { C148 } from "@repro/ui/c148";
import { C172 } from "@repro/ui/c172";
import { C177 } from "@repro/ui/c177";
import { C223 } from "@repro/ui/c223";
import { C244 } from "@repro/ui/c244";

const Heavy6 = dynamic(() => import("../heavy/h6"));

export default function F13({ title }) {
  const [open, setOpen] = useState(false);
  const [OnDemand, setOnDemand] = useState(null);
  async function load() {
    const mod = await import("../heavy/h1");
    setOnDemand(() => mod.default);
  }
  return (
    <section data-feature="f13">
      <h2>{title ?? parse("f13").value}</h2>
      <C22 label="f13 / c22" />
      <C28 label="f13 / c28" />
      <C41 label="f13 / c41" />
      <C47 label="f13 / c47" />
      <C82 label="f13 / c82" />
      <C124 label="f13 / c124" />
      <C148 label="f13 / c148" />
      <C172 label="f13 / c172" />
      <C177 label="f13 / c177" />
      <C223 label="f13 / c223" />
      <C244 label="f13 / c244" />
      <button onClick={() => setOpen((v) => !v)}>open</button>
      <button onClick={load}>load</button>
      {open ? <Heavy6 /> : null}
      {OnDemand ? <OnDemand /> : null}
    </section>
  );
}
