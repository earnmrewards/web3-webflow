import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  let htmlFile = "index.html";

  if (mode === "sales") {
    htmlFile = "sales.html";
  } else if (mode === "partner-dashboard") {
    htmlFile = "partner-dashboard.html";
  }

  return {
    plugins: [react()],
    build: {
      rollupOptions: {
        output: {
          entryFileNames: "plugin.js",
          assetFileNames: "plugin.css",
          manualChunks: undefined,
        },
      },
    },
    server: {
      open: `./${htmlFile}`,
    },
  };
});
