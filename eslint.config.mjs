export default {
  extends: [
    "next",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "react/no-unescaped-entities": "off",

    "@typescript-eslint/no-unused-vars": "off",

    "@typescript-eslint/no-explicit-any": "off",
  },
  ignorePatterns: [
    "node_modules/**",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ],
};
