import {defineConfig} from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        include: ["./test/**/*.test.ts"],
        coverage: {
            provider: "v8",
            reporter: ["json-summary", "html"],
            exclude: ["docs"]
        }
    }
})
