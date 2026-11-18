import type { NextConfig } from "next";

/**
 * This is a fully static marketing site, so it uses classic static generation
 * (no `cacheComponents`). That lets dynamic routes declare `dynamicParams = false`,
 * which makes unknown service or city URLs return a real 404 status instead of a soft one.
 */
const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75, 85],
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1440, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  /**
   * 301s for the URLs of the previous website (speedyyards.com, a static HTML template).
   * They only matter if the new site launches on that same domain.
   */
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/services.html", destination: "/services", permanent: true },
      { source: "/tree-cutting.html", destination: "/services/tree-service", permanent: true },
      { source: "/landscape-design.html", destination: "/services/landscape-design", permanent: true },
    ];
  },
};

export default nextConfig;
