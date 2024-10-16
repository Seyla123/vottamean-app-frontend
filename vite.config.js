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
      minify: 'terser',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
      sourcemap: mode === 'development',
      cssCodeSplit: true,
      target: 'es2015',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production',
        },
      },
      chunkSizeWarningLimit: 1500,
    },
    esbuild: {
      minify: mode === 'production',
      target: 'es2015',
    },
  };
});
