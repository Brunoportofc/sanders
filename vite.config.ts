import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8081,
    headers: mode === 'production' ? {
      // Cache de longa duração APENAS em produção
      'Cache-Control': 'public, max-age=31536000, immutable',
    } : {
      // SEM cache em desenvolvimento
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    }
  },
  plugins: [
    react(),
    // Plugin para configurar headers de cache APENAS EM PRODUÇÃO
    {
      name: 'configure-cache-headers',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (mode === 'production') {
            // Cache agressivo para modelos GLB (apenas produção)
            if (req.url?.endsWith('.glb')) {
              res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
            }
            // Cache para imagens e vídeos (apenas produção)
            if (req.url?.match(/\.(webp|mp4|png|jpg|jpeg|gif|svg)$/)) {
              res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
            }
            // Cache para fontes (apenas produção)
            if (req.url?.match(/\.(woff|woff2|ttf|otf)$/)) {
              res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
            }
          } else {
            // DESENVOLVIMENTO: sem cache!
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');
          }
          next();
        });
      }
    }
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Forçar uma única instância do React e Three.js
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      'three': path.resolve(__dirname, './node_modules/three'),
    },
    dedupe: ['react', 'react-dom', 'three'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'ui-vendor': ['lucide-react', 'framer-motion'],
          'animation-vendor': ['animejs', 'unicornstudio-react'],
          'radix-vendor': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-tooltip'
          ]
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
        passes: 2,
      },
      mangle: {
        safari10: true,
      },
    },
    assetsInlineLimit: 4096,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'three', '@react-three/fiber', '@react-three/drei'],
    exclude: [],
  },
}));
