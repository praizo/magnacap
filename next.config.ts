import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // Let phones on the local network load dev assets (e.g. http://192.168.x.x:3000);
  // otherwise the page renders but never hydrates, so menus and forms don't respond.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*"],
  partialPrefetching: true,
  experimental: {
    // Lets `next upgrade --agent` apply security patches by default.
    agentUpgrade: "security",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
