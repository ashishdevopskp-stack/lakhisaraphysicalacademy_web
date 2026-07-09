import type { NextConfig } from "next";

// allow custom config properties by widening the type
const nextConfig: NextConfig & Record<string, any> = {
  allowedRegion: ["192.168.1.5"],
};

export default nextConfig;
