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
          // Group common dependencies to reduce the number of chunks
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
      // Disable source maps in production to reduce memory usage
      sourcemap: mode === 'development',
      minify: mode === 'production',
      cssCodeSplit: true,
      target: 'es2015',

      // Improve performance by reducing the number of parallel jobs during build
      // Helpful for environments with limited CPU resources like AWS free tier
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production',
        },
      },
      chunkSizeWarningLimit: 1500,
    },
    // Configure the memory settings for the build process
    esbuild: {
      minify: mode === 'production',
      target: 'es2015',
    },
  };
});
