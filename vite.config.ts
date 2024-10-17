import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "node:path";
import { readdirSync } from "node:fs";

function detectHtmlFiles() {
  const htmlFiles = readdirSync(__dirname).filter((file) =>
    file.endsWith(".html")
  );

  const modes = htmlFiles.reduce((acc, file) => {
    const mode = file.replace(".html", "");
    acc[mode] = file;
    return acc;
  }, {} as Record<string, string>);

  return modes;
}

const files = detectHtmlFiles();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const defaultFile = "index.html";
  const htmlFile = files[mode] || defaultFile;

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
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
