// TP_LAZY=1 turns on Turbopack's lazy dynamic imports (client and SSR).
// TP_DIST_DIR picks the dist dir so runs never share a cache.
const lazy = process.env.TP_LAZY === "1";

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.TP_DIST_DIR || ".next",
  turbopack: { root: import.meta.dirname },
  experimental: lazy
    ? { turbopackLazyDynamicImports: true, turbopackLazyDynamicImportsSSR: true }
    : {},
};

export default nextConfig;
