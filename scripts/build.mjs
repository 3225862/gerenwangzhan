import { spawnSync } from 'node:child_process';

const run = (command, args, env = {}) => {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: { ...process.env, ...env },
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
};

run('node', ['scripts/validate-content.mjs'], { ASTRO_TELEMETRY_DISABLED: '1' });

// Keystatic local mode is a development-only admin surface in P0.
run('astro', ['build'], {
  ASTRO_TELEMETRY_DISABLED: '1',
  KEYSTATIC_MODE: process.env.KEYSTATIC_MODE ?? 'disabled',
});
