import { defineConfig } from 'astro/config';
import markdoc from '@astrojs/markdoc';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

const keystaticMode =
  process.env.KEYSTATIC_MODE ?? (process.env.NODE_ENV === 'production' ? 'disabled' : 'local');

export default defineConfig({
  // P0: local in dev, disabled in production. P9 can set KEYSTATIC_MODE=github.
  integrations: [react(), markdoc(), ...(keystaticMode === 'disabled' ? [] : [keystatic()])],
  output: 'static',
});
