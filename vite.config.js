import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// base 使用相对路径，保证 `npm run build` 产物可直接用本地静态服务器/双击打开
export default defineConfig({
  base: './',
  plugins: [vue()],
  server: {
    port: 5173,
    host: '127.0.0.1',
    open: false,
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1500,
  },
})
