/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/building/*.test.ts'],
    globals: true,
    testTimeout: 120000,
    threads: false
  }
});
