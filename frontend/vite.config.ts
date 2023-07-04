import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";


const BASE_SRC = "pwa/"
const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: "prompt",
  includeAssets: [`${BASE_SRC}favicon-196.png`,`${BASE_SRC}maskable.png`],
  manifest: 
    {
      "name": "More",
      "short_name": "More",
      "start_url": "More",
      "display": "standalone",
      "description": "A description for your application",
      "lang": "An app that can grade the quality of fruits",
      "dir": "ltr",
      "theme_color": "#171717",
      "background_color": "#e8d83d",
      "orientation": "any",
      "icons": [
          {
              "src": `${BASE_SRC}manifest-icon-512.maskable.png`,
              "sizes": "512x512",
              "type": "image/png",
              "purpose": "maskable"
          },
          {
              "src": `${BASE_SRC}apple-icon-180.png`,
              "sizes": "192x192",
              "type": "image/png",
              "purpose": "any"
          }
      ],
      "screenshots": [
          {
              "src": "https://www.pwabuilder.com/assets/screenshots/screen1.png",
              "sizes": "2880x1800",
              "type": "image/png",
          }
      ],
      "prefer_related_applications": false,
      "shortcuts": [
          {
              "name":"More",
              "url":"/",
              "description":"An app to grade the quality of fruits"
          }
      ]    
  }

}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
});
