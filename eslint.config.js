const typescript = require("@cybozu/eslint-config/flat/presets/typescript");
const typescriptPrettier = require("@cybozu/eslint-config/flat/presets/typescript-prettier");

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