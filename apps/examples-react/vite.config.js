import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      '@componentry/react',
      '@componentry/stencil/loader',
    ],
  },
  build: {
    rollupOptions: {
      external: [],
    },
  },
});