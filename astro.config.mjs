import { defineConfig } from 'astro/config';
import markdoc from '@astrojs/markdoc';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';

const keystaticMode = process.env.KEYSTATIC_MODE ?? (process.env.NODE_ENV === 'production' ? 'github' : 'local');
const enableKeystatic = keystaticMode !== 'disabled';

export default defineConfig({
  integrations: [react(), markdoc(), ...(enableKeystatic ? [keystatic()] : [])],
  output: 'server',
  adapter: vercel(),
});
