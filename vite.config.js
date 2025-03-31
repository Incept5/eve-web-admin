import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // This will be the base path for GitHub Pages
  plugins: [vue()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})