import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../custom_components/homelayout/frontend",
    emptyOutDir: true,
    lib: {
      entry: "src/main.tsx",
      formats: ["es"],
      fileName: () => "homelayout.js",
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
