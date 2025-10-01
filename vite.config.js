import { defineConfig } from "vite";
import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "./",
  plugins: [tailwindcss()],
  css: {
    devSourcemap: true,
  },
  build: {
    target: "esnext",
    minify: "esbuild",
    emptyOutDir: true,
    cssCodeSplit: false,
    outDir: "build",
    lib: {
      entry: resolve(__dirname, "assets/main.ts"),
      name: "KillaKitElements",
      fileName: (format) => `killakit-elements.${format}.js`,
      formats: ["es"],
    },
    rollupOptions: {
      output: {
        assetFileNames: "killakit-elements.[ext]",
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "assets"),
    },
  },
});
