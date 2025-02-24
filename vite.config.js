import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://file-upload-server-mc26.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});