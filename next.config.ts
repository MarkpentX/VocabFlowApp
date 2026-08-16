import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // New in Next.js 16.3 — auto-generates AGENTS.md/CLAUDE.md at the project root.
  // Disabled: not something this project asked for, and this repo already has its
  // own conventions/docs.
  agentRules: false,
};

export default withNextIntl(nextConfig);
