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

function buildFileName(mode: string, ext = "js") {
  const isStaging = mode !== "production";

  return `plugin-${isStaging ? "staging-" : ""}${
    process.env.npm_package_version
  }.${ext}`;
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const defaultFile = "index.html";
  const files = detectHtmlFiles();
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
          entryFileNames: () => buildFileName(mode),
          assetFileNames: () => buildFileName(mode, "css"),
          manualChunks: undefined,
        },
      },
    },
    server: {
      open: `./${htmlFile}`,
    },
  };
});
