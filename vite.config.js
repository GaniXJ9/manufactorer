import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/manufacturer",
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    // minify: "terser",

    terserOptions: {
      compress: {
        // drop_console: true,
        drop_debugger: true,
      },
      format: {
        comments: false,
      },
    },
    lib: {
      entry: "src/main.jsx",
      formats: ["iife"],
      name: "ManufacturerApp",
      fileName: () => "index.js",
      cssFileName: "index",
    },
  },
});
