import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the client preview subject to Next's production type checks.
  poweredByHeader: false,
};

export default nextConfig;
