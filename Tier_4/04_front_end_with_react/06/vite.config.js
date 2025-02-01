import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true, // for comfortable browsing in browser developer tools
  },
  resolve: {
    alias: {
      components: "/src/components",
      styles: "/src/styles",
      reduxx: "/src/redux",
    } // custom alias for components and styles folders
  }
})
