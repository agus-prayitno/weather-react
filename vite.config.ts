import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import sass from 'sass'

export default defineConfig({
  root: process.cwd(),
  plugins: [
    react(),
    {
      name: 'suppress-sass-warning',
      apply: 'build',
      enforce: 'post',
      configResolved() {
        // Suppress Sass legacy-js-api deprecation warning at stderr level
        const originalWarn = console.warn
        console.warn = function (...args: any[]) {
          const message = args[0]?.toString() || ''
          if (message.includes('legacy-js-api') || message.includes('The legacy JS API')) {
            return
          }
          originalWarn.apply(console, args)
        }
      },
    },
  ],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
        api: 'modern',
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
