import type { UserConfig } from "@commitlint/types";

const Configuration: UserConfig = {
  extends: [ "@commitlint/config-conventional" ],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "feature",
        "fix",
        "fixed",
        "docs",
        "chore",
        "style",
        "styles",
        "refactor",
        "ref",
        "ci",
        "test",
        "revert",
        "perf",
        "build",
      ],
    ],
  },
};

export default Configuration;
