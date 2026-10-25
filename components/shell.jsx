"use client";

import { C10 } from "@repro/ui/c10";
import { C35 } from "@repro/ui/c35";
import { C110 } from "@repro/ui/c110";
import { C123 } from "@repro/ui/c123";
import { C140 } from "@repro/ui/c140";
import { C181 } from "@repro/ui/c181";
import { C215 } from "@repro/ui/c215";
import { C225 } from "@repro/ui/c225";
import { C238 } from "@repro/ui/c238";
import { C243 } from "@repro/ui/c243";
import { C273 } from "@repro/ui/c273";
import { C277 } from "@repro/ui/c277";

export default function Shell({ children, aside }) {
  return (
    <div data-shell>
      <nav>
        <C10 label="shell / c10" />
        <C35 label="shell / c35" />
        <C110 label="shell / c110" />
        <C123 label="shell / c123" />
        <C140 label="shell / c140" />
        <C181 label="shell / c181" />
        <C215 label="shell / c215" />
        <C225 label="shell / c225" />
        <C238 label="shell / c238" />
        <C243 label="shell / c243" />
        <C273 label="shell / c273" />
        <C277 label="shell / c277" />
      </nav>
      <main>{children}</main>
      <aside>{aside}</aside>
    </div>
  );
}
