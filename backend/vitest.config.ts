import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./src/tests/setup.ts'],
    testTimeout: 10000,
    poolOptions: {
      threads: {
        singleThread: true
      }
    },
    fileParallelism: false,
    include: ['src/**/*.test.ts'],
  },
});
