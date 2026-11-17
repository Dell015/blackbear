import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prototype: type errors don't block a demo build (see playbook section 4).
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
