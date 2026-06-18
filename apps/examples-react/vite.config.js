import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      '@componentry-ui/react',
      '@componentry-ui/stencil/loader',
    ],
  },
  build: {
    rollupOptions: {
      external: [],
    },
  },
});