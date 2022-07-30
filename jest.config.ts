/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

import nextJestConfig from "next/jest";

const config = nextJestConfig({ dir: "./src" });

export default config({
  clearMocks: true,
  verbose: true,

  collectCoverage: true,

  coverageDirectory: "<rootDir>/__tests__/coverage",

  coverageProvider: "v8",
  rootDir: "./src",

  roots: [
    "<rootDir>/components",
    "<rootDir>/contexts",
    "<rootDir>/__tests__/integration",
  ],

  setupFilesAfterEnv: ["<rootDir>/__tests__/setup.ts"],
  testEnvironment: "jsdom",

  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
});
