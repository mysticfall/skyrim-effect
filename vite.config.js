import {defineConfig} from "vite"
import path from "path"
import tsconfigPaths from "vite-tsconfig-paths"
import {globSync} from "glob"
import {fileURLToPath} from "node:url"

export default defineConfig({
    plugins: [tsconfigPaths()],
    build: {
        rollupOptions: {
            input: Object.fromEntries(
                globSync("src/**/*.ts").map(file => [
                    path.relative(
                        "src",
                        file.slice(0, file.length - path.extname(file).length)
                    ),
                    fileURLToPath(new URL(file, import.meta.url))
                ])
            ),
            output: [
                {
                    entryFileNames: "[name].js",
                    chunkFileNames: "[name]-[hash].js",
                    format: "esm",
                    dir: "dist/esm"
                },
                {
                    entryFileNames: "[name].js",
                    chunkFileNames: "[name]-[hash].js",
                    format: "cjs",
                    dir: "dist/cjs"
                }
            ],
            external: ["@skyrim-platform/skyrim-platform"],
            preserveEntrySignatures: "allow-extension"
        }
    }
})
