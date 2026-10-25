"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { parse } from "@repro/shared";
import { C27 } from "@repro/ui/c27";
import { C34 } from "@repro/ui/c34";
import { C114 } from "@repro/ui/c114";
import { C170 } from "@repro/ui/c170";
import { C221 } from "@repro/ui/c221";
import { C262 } from "@repro/ui/c262";
import { C283 } from "@repro/ui/c283";

const Heavy0 = dynamic(() => import("../heavy/h0"));
const Heavy10 = dynamic(() => import("../heavy/h10"));

export default function F3({ title }) {
  const [open, setOpen] = useState(false);
  const [OnDemand, setOnDemand] = useState(null);
  async function load() {
    const mod = await import("../heavy/h6");
    setOnDemand(() => mod.default);
  }
  return (
    <section data-feature="f3">
      <h2>{title ?? parse("f3").value}</h2>
      <C27 label="f3 / c27" />
      <C34 label="f3 / c34" />
      <C114 label="f3 / c114" />
      <C170 label="f3 / c170" />
      <C221 label="f3 / c221" />
      <C262 label="f3 / c262" />
      <C283 label="f3 / c283" />
      <button onClick={() => setOpen((v) => !v)}>open</button>
      <button onClick={load}>load</button>
      {open ? <Heavy0 /> : null}
      {open ? <Heavy10 /> : null}
      {OnDemand ? <OnDemand /> : null}
    </section>
  );
}
