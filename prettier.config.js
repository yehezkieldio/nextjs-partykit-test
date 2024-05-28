/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  semi: true,
  trailingComma: "es5",
  tabWidth: 4,
  bracketSpacing: true,
  singleQuote: false,
  arrowParens: "always",
  quoteProps: "consistent",
  printWidth: 120,
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  importOrder: [
    "",
    "^react$",
    "^next(-[^/]+)?(/.*)?$",
    "",
    "<TYPES>",
    "<TYPES>^[.]",
    "",
    "<BUILTIN_MODULES>",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/(.*)$",
    "",
    "^[./]",
    "",
    "^(?!.*[.]css$)[./].*$",
    ".css$",
  ],
  importOrderTypeScriptVersion: "5.4.5",
};

export default config;
