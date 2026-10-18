import type { NextConfig } from 'next';

// PREVIEW_EXPORT=1 erzeugt eine rein statische Version (nur für Vorschauen).
const nextConfig: NextConfig = process.env.PREVIEW_EXPORT
  ? { output: 'export', trailingSlash: true, images: { unoptimized: true }, assetPrefix: process.env.PREVIEW_ASSET_PREFIX }
  : {};

export default nextConfig;
