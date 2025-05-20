import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'My Books',
        short_name: 'MyBooks',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#42b883',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // @ işaretinin doğru şekilde src klasörünü işaret ettiğinden emin olun
    },
  },
  server: {
    open: true, // Uygulama başlatıldığında tarayıcıda otomatik olarak açılacak
  },
  build: {
    outDir: 'dist', // Uygulama derlendikten sonra çıkış klasörü
  },
})
