import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const BASE_SRC = "src/assets/pwa/"
const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: "prompt",
  includeAssets: [`${BASE_SRC}favicon-196.png`,`${BASE_SRC}maskable.png`],
  manifest: {
    name: "More",
    short_name: "More",
    description: "An app that can grade the quality of fruits",
    icons: [
      {
        src: `${BASE_SRC}android-chrome-192.png`,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: `${BASE_SRC}maskable.png`,
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: `${BASE_SRC}apple-icon-180.png`,
        sizes: "180x180",
        type: "image/png",
        purpose: "apple touch icon"
      },
      {
        src: `${BASE_SRC}maskable.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable"
      },

    ],
    theme_color: "#171717",
    background_color: "#e8d83d",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  }

}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
});
