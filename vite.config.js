import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    historyApiFallback: true,
    open: '/auth/signin',
    proxy: {
      '/api/v1': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        pathRewrite: { '^/api/v1': '' },
      },
    },
  },
});
