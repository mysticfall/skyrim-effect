import eslint from "@eslint/js"
import tseslint from "typescript-eslint"
import prettierConfig from "eslint-plugin-prettier/recommended"

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.strict,
    tseslint.configs.stylistic,
    prettierConfig,
    {
        ignores: [
            "coverage/",
            "dist/",
            "docs/",
            "mock/",
            "node_modules/",
            "*.config.js",
            "*.config.mjs"
        ]
    }
)
