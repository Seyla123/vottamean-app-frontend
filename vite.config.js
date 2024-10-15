import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 5173,
      historyApiFallback: true,
      open: '/auth/signin',
      proxy: {
        '/api/v1': {
          target: 'http://localhost:8000',
          changeOrigin: true,
          pathRewrite: { '^/api/v1': '' },
        },
      },
    },
    build: {
      // Optimize memory usage by reducing chunk splitting
      rollupOptions: {
        output: {
          // Reduces chunking to avoid memory spikes
          manualChunks: undefined,
        },
      },
      // Disable source maps in production to reduce memory usage
      sourcemap: mode === 'development',
      minify: mode === 'production',
      cssCodeSplit: true,
      // Lower target environment to reduce the complexity of generated code
      target: 'es2015',
    },
  };
});
