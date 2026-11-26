import type { NextConfig } from "next";

// `npm run build:static` writes a plain HTML/CSS/JS site to `out/` for static
// hosting (e.g. cPanel). Images are served as-is there, since optimization
// needs a running Node server.
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  // trailingSlash writes `about/index.html`, which Apache serves without rewrite rules.
  ...(staticExport && { output: "export", trailingSlash: true, images: { unoptimized: true } }),
  // Let phones on the local network load dev assets (e.g. http://192.168.x.x:3000);
  // otherwise the page renders but never hydrates, so menus and forms don't respond.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*"],
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
