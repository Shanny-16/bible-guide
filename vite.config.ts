import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'icon.svg', 'apple-touch-icon-180x180.png'],
      manifest: {
        name: 'Bible Notes',
        short_name: 'Bible Notes',
        description:
          "A simple guide to help you read God's Word: all 66 books with context, characters and key passages.",
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#FBF8F2',
        theme_color: '#FBF8F2',
        lang: 'en',
        categories: ['education', 'books'],
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        // People/Places pictures are cached as they are viewed, not pre-downloaded on install.
        globIgnores: ['**/img/**'],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === 'https://fonts.googleapis.com',
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-stylesheets',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: ({ url }) => url.origin === 'https://fonts.gstatic.com',
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: ({ url, sameOrigin }) => sameOrigin && url.pathname.startsWith('/img/'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'pictures',
              expiration: { maxEntries: 120, maxAgeSeconds: 60 * 60 * 24 * 60 },
              cacheableResponse: { statuses: [0, 200] },
              plugins: [
                {
                  // Only keep real pictures: never cache an error page or a non-image response.
                  cacheWillUpdate: async ({ response }) =>
                    response.status === 200 && (response.headers.get('content-type') ?? '').startsWith('image/')
                      ? response
                      : null,
                },
              ],
            },
          },
          {
            urlPattern: ({ url }) => url.origin === 'https://bible-api.com',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'bible-api-passages',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
  // `vite preview` serves the same security headers as production (vercel.json),
  // so the Content-Security-Policy can be tested locally before deploying.
  preview: { headers: productionHeaders() },
})

function productionHeaders(): Record<string, string> {
  const config = JSON.parse(readFileSync(new URL('./vercel.json', import.meta.url), 'utf8')) as {
    headers?: Array<{ headers: Array<{ key: string; value: string }> }>
  }
  return Object.fromEntries((config.headers?.[0]?.headers ?? []).map((h) => [h.key, h.value]))
}
