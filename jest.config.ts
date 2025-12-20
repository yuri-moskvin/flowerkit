import type { Config } from "jest";
import packageFile from "./package.json" with { type: "json" };

const esModules = Object.keys(packageFile.dependencies).join("|");

const config: Config = {
  setupFilesAfterEnv: [
    "<rootDir>/src/jest.setup.ts",
  ],
  moduleNameMapper: {
    ".+\\.(png|mp3|mp4|jpeg|svg|jpg|gif|webp|ttf|woff|woff2)$": "jest-transform-stub",
  },
  transform: {
    "\\.[jt]sx?$": "jest-esbuild",
  },
  testEnvironmentOptions: {
    url: "http://localhost",
  },
  automock: false,
  testEnvironment: "jsdom",
  transformIgnorePatterns: [
    `!node_modules/(?!${esModules})`,
  ],
};

export default config;
