import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const isDev = command === 'serve';
  const isProd = mode === 'production';

  return {
    plugins: [react(), tailwindcss()],

    // Optimization to avoid CSP eval issues
    optimizeDeps: {
      esbuildOptions: {
        target: 'es2020'
      }
    },

    // Build configuration
    build: {
      outDir: 'dist',
      sourcemap: false, // Completely disable sourcemaps to avoid CSP eval issues
      minify: isProd ? 'terser' : false, // Minify only in production
      rollupOptions: {
        output: {
          manualChunks: {
            // Code splitting for better performance
            vendor: ['react', 'react-dom'],
            antd: ['antd'],
            utils: ['zustand', 'react-router-dom']
          }
        }
      }
    },

    // Server configuration for development
    server: {
      hmr: {
        overlay: false // Disable error overlay that might use eval
      },
      proxy: {
        '/api': {
          target: 'https://localhost:7000',
          changeOrigin: true,
          secure: false, // Allow self-signed certificates
          rewrite: (path) => path.replace(/^\/api/, '/api')
        }
      }
    },

    // ESBuild configuration - no eval
    esbuild: {
      sourcemap: false, // Completely disable to avoid CSP eval issues
      target: 'es2020'
    },

    // Define global constants
    define: {
      __DEV__: JSON.stringify(isDev),
      __PROD__: JSON.stringify(isProd)
    }
  };
})
