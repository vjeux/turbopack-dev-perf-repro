"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { parse } from "@repro/shared";
import { C20 } from "@repro/ui/c20";
import { C72 } from "@repro/ui/c72";
import { C97 } from "@repro/ui/c97";
import { C110 } from "@repro/ui/c110";
import { C166 } from "@repro/ui/c166";
import { C167 } from "@repro/ui/c167";
import { C191 } from "@repro/ui/c191";
import { C196 } from "@repro/ui/c196";
import { C205 } from "@repro/ui/c205";
import { C219 } from "@repro/ui/c219";
import { C246 } from "@repro/ui/c246";
import { C254 } from "@repro/ui/c254";
import { C265 } from "@repro/ui/c265";
import { C275 } from "@repro/ui/c275";

const Heavy1 = dynamic(() => import("../heavy/h1"));
const Heavy10 = dynamic(() => import("../heavy/h10"));

export default function F12({ title }) {
  const [open, setOpen] = useState(false);
  const [OnDemand, setOnDemand] = useState(null);
  async function load() {
    const mod = await import("../heavy/h4");
    setOnDemand(() => mod.default);
  }
  return (
    <section data-feature="f12">
      <h2>{title ?? parse("f12").value}</h2>
      <C20 label="f12 / c20" />
      <C72 label="f12 / c72" />
      <C97 label="f12 / c97" />
      <C110 label="f12 / c110" />
      <C166 label="f12 / c166" />
      <C167 label="f12 / c167" />
      <C191 label="f12 / c191" />
      <C196 label="f12 / c196" />
      <C205 label="f12 / c205" />
      <C219 label="f12 / c219" />
      <C246 label="f12 / c246" />
      <C254 label="f12 / c254" />
      <C265 label="f12 / c265" />
      <C275 label="f12 / c275" />
      <button onClick={() => setOpen((v) => !v)}>open</button>
      <button onClick={load}>load</button>
      {open ? <Heavy1 /> : null}
      {open ? <Heavy10 /> : null}
      {OnDemand ? <OnDemand /> : null}
    </section>
  );
}
