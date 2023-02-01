/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    globals: true,
    exclude: ['**/node_modules/**', 'tests/building/*.test.ts']
  }
});
