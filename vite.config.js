import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "app/frontend/src") } },
  esbuild: { loader: "jsx", include: /app\/frontend\/src\/.*\.jsx?$/ },
  optimizeDeps: { esbuildOptions: { loader: { ".js": "jsx" } } },
  define: { "process.env.REACT_APP_BACKEND_URL": JSON.stringify(process.env.REACT_APP_BACKEND_URL || "") },
  server: { host: true },
  build: { outDir: "dist", emptyOutDir: true },
});
