import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/cgroup82/tar1/",

  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      manifestFilename: "manifest.json",
      manifest: {
        short_name: "HomeChef",
        name: "HomeChef Recipes App",
        start_url: "/cgroup82/tar1/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/cgroup82/tar1/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "/cgroup82/tar1/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            form_factor: "wide",
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10 MB limit
        runtimeCaching: [
          {
            urlPattern: ({ request }) =>
              request.destination === "document" ||
              request.destination === "script" ||
              request.destination === "style" ||
              request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "homechef-cache",
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 7 * 24 * 60 * 60, // שבוע
              },
            },
          },
        ],
      },
    }),
  ],
});
