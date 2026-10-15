const typescript = require("@cybozu/eslint-config/presets/typescript").default;
const typescriptPrettier = require("@cybozu/eslint-config/presets/typescript-prettier").default;

/**
 * @type { import("eslint").Linter.Config[] }
 */
module.exports = [
  ...typescript,
  ...typescriptPrettier,
  {
    rules: {
      "prettier/prettier": ["error", {
        trailingComma: "es5",
      }],
    },
  }
];