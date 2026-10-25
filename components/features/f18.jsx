"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { C34 } from "@repro/ui/c34";
import { C82 } from "@repro/ui/c82";
import { C83 } from "@repro/ui/c83";
import { C116 } from "@repro/ui/c116";
import { C146 } from "@repro/ui/c146";
import { C187 } from "@repro/ui/c187";
import { C188 } from "@repro/ui/c188";
import { C212 } from "@repro/ui/c212";
import { C219 } from "@repro/ui/c219";
import { C223 } from "@repro/ui/c223";
import { C224 } from "@repro/ui/c224";
import { C277 } from "@repro/ui/c277";

const Heavy11 = dynamic(() => import("../heavy/h11"));

export default function F18({ title }) {
  const [open, setOpen] = useState(false);
  const [OnDemand, setOnDemand] = useState(null);
  async function load() {
    const mod = await import("../heavy/h4");
    setOnDemand(() => mod.default);
  }
  return (
    <section data-feature="f18">
      <h2>{title ?? "f18"}</h2>
      <C34 label="f18 / c34" />
      <C82 label="f18 / c82" />
      <C83 label="f18 / c83" />
      <C116 label="f18 / c116" />
      <C146 label="f18 / c146" />
      <C187 label="f18 / c187" />
      <C188 label="f18 / c188" />
      <C212 label="f18 / c212" />
      <C219 label="f18 / c219" />
      <C223 label="f18 / c223" />
      <C224 label="f18 / c224" />
      <C277 label="f18 / c277" />
      <button onClick={() => setOpen((v) => !v)}>open</button>
      <button onClick={load}>load</button>
      {open ? <Heavy11 /> : null}
      {OnDemand ? <OnDemand /> : null}
    </section>
  );
}
