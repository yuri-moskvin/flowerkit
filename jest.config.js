import packageFile from "./package.json" with { type: "json" };

const esModules = Object.keys(packageFile.dependencies).join("|");

export default {
  transform: {
    "\\.[jt]sx?$": "jest-esbuild"
  },
  testEnvironmentOptions: {
    "url": "http://localhost"
  },
  automock: false,
  testEnvironment: "jsdom",
  transformIgnorePatterns: [ `!node_modules/(?!${esModules})` ]
};
