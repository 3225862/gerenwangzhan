import { defineConfig } from 'astro/config';
import markdoc from '@astrojs/markdoc';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel/serverless';

const keystaticMode = process.env.KEYSTATIC_MODE ?? (process.env.NODE_ENV === 'production' ? 'github' : 'local');
const githubConfigReady = Boolean(
  process.env.KEYSTATIC_GITHUB_REPO &&
    process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
    process.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
    process.env.KEYSTATIC_SECRET,
);
const enableKeystatic = keystaticMode === 'local' || (keystaticMode === 'github' && githubConfigReady);

export default defineConfig({
  integrations: [react(), markdoc(), ...(enableKeystatic ? [keystatic()] : [])],
  output: 'server',
  adapter: vercel(),
});
