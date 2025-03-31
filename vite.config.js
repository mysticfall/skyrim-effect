import {defineConfig} from "vite"
import path from "path"
import tsconfigPaths from "vite-tsconfig-paths"
import {globSync} from "glob"
import {fileURLToPath} from "node:url"
import externalGlobals from "rollup-plugin-external-globals"
import nodeExternals from "rollup-plugin-node-externals"
import nodeResolve from "@rollup/plugin-node-resolve"

export default defineConfig(({mode}) => {
    const isDebug = mode === "development"

    return {
        plugins: [
            tsconfigPaths(),
            nodeExternals({
                deps: false,
                peerDeps: true
            }),
            externalGlobals({
                "@skyrim-platform/skyrim-platform": "skyrimPlatform"
            })
        ],
        build: {
            rollupOptions: {
                input: Object.fromEntries(
                    globSync("src/**/*.ts").map(file => [
                        path.relative(
                            "src",
                            file.slice(
                                0,
                                file.length - path.extname(file).length
                            )
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
                external: ["skyrimPlatform", "effect"],
                preserveEntrySignatures: "allow-extension",
                plugins: [nodeResolve()]
            },
            minify: !isDebug,
            sourcemap: isDebug,
            target: "esnext"
        },
        test: {
            include: ["./test/**/*.test.ts"],
            coverage: {
                provider: "v8",
                reporter: ["json-summary", "html"],
                exclude: ["docs"]
            }
        }
    }
})
