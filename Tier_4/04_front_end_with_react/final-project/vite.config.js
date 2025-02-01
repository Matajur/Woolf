import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true, // for comfortable browsing in browser developer tools
  },
  resolve: {
    alias: {
      api: "/src/api",
      components: "/src/components",
      guards: "/src/guards",
      pages: "/src/pages",
      styles: "/src/styles",
      reduxstore: "/src/redux",
    },
  },
});
