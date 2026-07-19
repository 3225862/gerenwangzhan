import { spawnSync } from 'node:child_process';

const result = spawnSync('astro', ['check'], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
  env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' },
});

process.exit(result.status ?? 1);
