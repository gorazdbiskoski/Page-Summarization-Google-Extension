import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'path'
import tailwindcss from '@tailwindcss/vite'

//sidepanel: resolve(__dirname, 'sidepanel.html'),
   // popup: resolve(__dirname, 'popup.html')

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "popup.html"),
        sidepanel: resolve(__dirname, "sidepanel.html"),
        content: resolve(__dirname, "contentScript.ts"),
      },
      output: {
        entryFileNames: assetInfo => {
          if (assetInfo.name === "content") return "contentScript.js";
          return "[name].js";
        },
      },
    },
    outDir: "dist",
    emptyOutDir: true,
  },
  optimizeDeps: {
    include: ['@mozilla/readability'],
  }
})
