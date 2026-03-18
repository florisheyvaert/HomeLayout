import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const haUrl = env.VITE_HA_URL || "http://localhost:8123";

  return {
    plugins: [react()],
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
    server: {
      proxy: {
        // Proxy camera and other HA API calls to avoid CORS in dev
        "/api": {
          target: haUrl,
          changeOrigin: true,
        },
      },
    },
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
  };
});
