import eslintConfig from "@delement/eslint-config-master";
import { browser } from "globals";

export default [
  ...eslintConfig,
  {
    ignores: [
      "dist/**",
      "node_modules/**",
    ],
    languageOptions: {
      globals: {
        ...browser,
        ChildNode: "readonly",
        ParentNode: "readonly",
        DOMParserSupportedType: "readonly",
        CustomEventInit: "readonly",
        EventListener: "readonly",
        RequestInit: "readonly",
        RequestMode: "readonly",
        RequestCredentials: "readonly",
        RequestRedirect: "readonly",
        RequestCache: "readonly",
        ReferrerPolicy: "readonly",
        BodyInit: "readonly",
      },
    },
  },
];
