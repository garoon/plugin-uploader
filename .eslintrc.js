module.exports = {
  rules: {
    // change trailingComma value back to es5
    "prettier/prettier": [
      "error",
      {
        trailingComma: "es5",
      },
    ],
  },
  extends: [
    "@cybozu/eslint-config/presets/typescript",
    "@cybozu/eslint-config/presets/typescript-prettier",
  ],
};
