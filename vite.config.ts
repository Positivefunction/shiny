import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'VANI AI - Speech Assessment',
        short_name: 'VANI AI',
        description: 'Multilingual Speech-Language Assessment Platform',
        theme_color: '#14b8a6',
        background_color: '#f8fafc',
        display: 'standalone',
        start_url: '/',
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
