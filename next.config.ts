import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure client-only pages are not statically prerendered
  output: undefined,
};

export default nextConfig;
