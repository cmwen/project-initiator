import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/project-initiator/',
  plugins: [preact()],
  server: { port: 3000 },
  build: { outDir: 'dist' },
  test: {
  environment: 'jsdom',
  setupFiles: ['./tests/setup.ts']
  }
});
