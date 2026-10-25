"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { C10 } from "@repro/ui/c10";
import { C14 } from "@repro/ui/c14";
import { C25 } from "@repro/ui/c25";
import { C30 } from "@repro/ui/c30";
import { C34 } from "@repro/ui/c34";
import { C72 } from "@repro/ui/c72";
import { C77 } from "@repro/ui/c77";
import { C78 } from "@repro/ui/c78";
import { C94 } from "@repro/ui/c94";
import { C111 } from "@repro/ui/c111";
import { C141 } from "@repro/ui/c141";
import { C144 } from "@repro/ui/c144";
import { C153 } from "@repro/ui/c153";
import { C218 } from "@repro/ui/c218";
import { C221 } from "@repro/ui/c221";
import { C236 } from "@repro/ui/c236";
import { C237 } from "@repro/ui/c237";
import { C261 } from "@repro/ui/c261";

const Heavy0 = dynamic(() => import("../heavy/h0"));

export default function F22({ title }) {
  const [open, setOpen] = useState(false);
  const [OnDemand, setOnDemand] = useState(null);
  async function load() {
    const mod = await import("../heavy/h10");
    setOnDemand(() => mod.default);
  }
  return (
    <section data-feature="f22">
      <h2>{title ?? "f22"}</h2>
      <C10 label="f22 / c10" />
      <C14 label="f22 / c14" />
      <C25 label="f22 / c25" />
      <C30 label="f22 / c30" />
      <C34 label="f22 / c34" />
      <C72 label="f22 / c72" />
      <C77 label="f22 / c77" />
      <C78 label="f22 / c78" />
      <C94 label="f22 / c94" />
      <C111 label="f22 / c111" />
      <C141 label="f22 / c141" />
      <C144 label="f22 / c144" />
      <C153 label="f22 / c153" />
      <C218 label="f22 / c218" />
      <C221 label="f22 / c221" />
      <C236 label="f22 / c236" />
      <C237 label="f22 / c237" />
      <C261 label="f22 / c261" />
      <button onClick={() => setOpen((v) => !v)}>open</button>
      <button onClick={load}>load</button>
      {open ? <Heavy0 /> : null}
      {OnDemand ? <OnDemand /> : null}
    </section>
  );
}
