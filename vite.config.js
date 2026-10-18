import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import mobileQrPlugin from './scripts/mobile-qr-plugin.mjs'

// base 使用相对路径，保证 `npm run build` 产物可直接用本地静态服务器/双击打开
export default defineConfig({
  base: './',
  // 最后一个插件：服务器就绪后在终端打印局域网地址与二维码，手机扫码即可打开
  plugins: [vue(), mobileQrPlugin()],
  server: {
    port: 5173,
    // 监听所有网卡，手机（同一 Wi-Fi）才能访问；仅开发环境生效
    host: true,
    open: false,
  },
  preview: {
    // 预览构建产物时同样允许手机访问（端口默认 4173）
    host: true,
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1500,
  },
})
