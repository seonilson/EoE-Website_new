import type { NextConfig } from "next";

const nextConfig: NextConfig = {

   trailingSlash: true,

  // ── Image Optimization ────────────────────────────────────────
  images: {
    // Tells Hostinger NOT to use CPU to resize images on the fly
    unoptimized: true, 
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // ── Security Headers ──────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          { key: "X-XSS-Protection", value: "1; mode=block" },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/fonts/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },

  // ── Redirects ─────────────────────────────────────────────────
  async redirects() {
    return [
      {
        source: "/blogs",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blogs/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
    ];
  },

  // ── Compiler options ──────────────────────────────────────────
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
};

export default nextConfig;