const {
    defineConfig,
} = require("eslint/config");

const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([{
    rules: {
        "prettier/prettier": ["error", {
            trailingComma: "es5",
        }],
    },

    extends: compat.extends(
        "@cybozu/eslint-config/presets/typescript",
        "@cybozu/eslint-config/presets/typescript-prettier",
    ),
}]);
