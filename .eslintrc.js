module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
  ],
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
  },
  env: { browser: true, node: true, es6: true },
  rules: {
    complexity: ["warn", 10],
    semi: ["error", "always"],
  },
  // https://keepinguptodate.com/pages/2019/12/gradually-migrating-to-typescript/
  overrides: [
    {
      extends: ["plugin:@typescript-eslint/recommended"],
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
      },
      plugins: ["@typescript-eslint"],
      rules: {
        "@typescript-eslint/no-unused-vars": ["error"],
        "@typescript-eslint/no-use-before-define": [
          "error",
          { functions: false },
        ],
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "react/prop-types": "off",
        "no-invalid-this": "off",
      },
    },
  ],
};
