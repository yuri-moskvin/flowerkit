import stylisticPlugin from "@stylistic/eslint-plugin";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import type { Linter, ESLint } from "eslint";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import { createNodeResolver, importX } from "eslint-plugin-import-x";
import jsdocPlugin from "eslint-plugin-jsdoc";
import perfectionistPlugin from "eslint-plugin-perfectionist";
import promisePlugin from "eslint-plugin-promise";
import securityPlugin from "eslint-plugin-security";
import globals from "globals";

// Plugins
const plugins: Linter.Config["plugins"] = {
  "@stylistic": stylisticPlugin,
  "jsdoc": jsdocPlugin,
  "import-x": importX,
  "perfectionist": perfectionistPlugin,
  "promise": promisePlugin,
  "security": securityPlugin,
};

// Rules
const customTreeShakingRules: Linter.RulesRecord = {
  "no-restricted-imports": "error",
  "import-x/no-namespace": "off",
  "import-x/no-duplicates": "error",
};

const typescriptTreeShakingRules: Linter.RulesRecord = {
  "@typescript-eslint/consistent-type-imports": [
    "error",
    {
      prefer: "type-imports",
      disallowTypeAnnotations: false,
      fixStyle: "separate-type-imports",
    },
  ],
  "@typescript-eslint/no-import-type-side-effects": "error",
  "@typescript-eslint/no-restricted-imports": "error",
};

const customExportsRules: Linter.RulesRecord = {
  "perfectionist/sort-named-exports": [ "error", {
    groups: [ "type-export", "value-export" ],
    ignoreCase: true,
    order: "asc",
    type: "alphabetical",
  } ],
};

const customJSDocRules: Linter.RulesRecord = {
  "jsdoc/require-description": 1,
  "jsdoc/require-returns": 1,
  "jsdoc/require-jsdoc": [ 1, {
    publicOnly: true,
    require: {
      ArrowFunctionExpression: true,
      ClassDeclaration: true,
      ClassExpression: true,
      FunctionDeclaration: true,
      MethodDefinition: false,
    },
  } ],
};

const customImportRules: Linter.RulesRecord = {
  "import-x/first": "error",
  "import-x/order": [
    2, {
      "groups": [
        "external",
        "builtin",
        "internal",
        "sibling",
        "parent",
        "index",
      ],
      "pathGroups": [
        {
          "pattern": "components",
          "group": "internal",
        },
        {
          "pattern": "common",
          "group": "internal",
        },
        {
          "pattern": "routes/ **",
          "group": "internal",
        },
        {
          "pattern": "assets/**",
          "group": "internal",
          "position": "after",
        },
      ],
      "pathGroupsExcludedImportTypes": [ "internal" ],
      "alphabetize": {
        "order": "asc",
        "caseInsensitive": true,
      },
    },
  ],
  "import-x/no-cycle": "error",
  "import-x/no-unresolved": "off",
  "import-x/namespace": "off",
  "import-x/no-named-as-default": "off",
  "import-x/consistent-type-specifier-style": [ "error", "prefer-top-level" ],
  "import-x/no-duplicates": "error",
  "import-x/newline-after-import": [ "error", { "count": 1 } ],
};

const customStylisticRules: Linter.RulesRecord = {
  "@stylistic/function-call-argument-newline": [ "error", "consistent" ],
  "@stylistic/function-call-spacing": [ "error", "never" ],
  "@stylistic/semi": "error",
  "@stylistic/semi-spacing": "error",
  "@stylistic/computed-property-spacing": [ "error", "never" ],
  "@stylistic/switch-colon-spacing": "error",
  "@stylistic/jsx-quotes": [ "error", "prefer-double" ],
  "@stylistic/comma-spacing": [ "error", { "before": false, "after": true } ],
  "@stylistic/padded-blocks": [ "error", {
    "classes": "always",
    "switches": "never",
  }, { allowSingleLineBlocks: false } ],
  "@stylistic/indent": [ "error", 2, {
    "ImportDeclaration": 1,
    "ObjectExpression": "first",
    "ArrayExpression": 1,
    "SwitchCase": 1,
    "StaticBlock": { "body": 1 },
    "MemberExpression": 1,
    "FunctionExpression": { "parameters": "first", "body": 1 },
    "FunctionDeclaration": { "parameters": "first", "body": 1 },
    "CallExpression": { "arguments": "first" },
  } ],
  "@stylistic/keyword-spacing": [ "error", { "before": true, "after": true } ],
  "@stylistic/key-spacing": [ "error", { "beforeColon": false, "afterColon": true, "mode": "strict" } ],
  "@stylistic/new-parens": "error",
  "@stylistic/no-multi-spaces": "error",
  "@stylistic/no-whitespace-before-property": "error",
  "@stylistic/rest-spread-spacing": [ "error", "never" ],
  "@stylistic/template-curly-spacing": [ "error", "never" ],
  "@stylistic/space-infix-ops": "error",
  "@stylistic/arrow-parens": [ "error", "always" ],
  "@stylistic/object-curly-newline": [ "error", {
    "ObjectExpression": {
      "multiline": true,
      "minProperties": 4,
      "consistent": true,
    },
    "ObjectPattern": {
      "multiline": true,
      "minProperties": 4,
      "consistent": true,
    },
    "ImportDeclaration": {
      "multiline": true,
      "minProperties": 4,
      "consistent": true,
    },
    "ExportDeclaration": {
      "multiline": true,
      "minProperties": 4,
      "consistent": true,
    },
  } ],
  "@stylistic/object-property-newline": [ "error", {
    "allowAllPropertiesOnSameLine": true,
  } ],
  "@stylistic/type-annotation-spacing": [ "error", {
    "overrides": {
      "colon": { "before": false, "after": true },
    },
  } ],
  "@stylistic/arrow-spacing": [ "error", { "before": true, "after": true } ],
  "@stylistic/brace-style": [ "error", "1tbs", {
    "allowSingleLine": false,
  } ],
  "@stylistic/block-spacing": [ "error", "always" ],
  "@stylistic/jsx-wrap-multilines": [
    "error",
    {
      "return": "parens-new-line",
      "arrow": "ignore",
      "declaration": "ignore",
      "assignment": "ignore",
      "condition": "ignore",
    },
  ],
};

const customRules: Linter.RulesRecord = {
  "array-bracket-spacing": [ 2, "always" ],
  "quotes": [
    "error",
    "double",
    {
      "avoidEscape": true,
      "allowTemplateLiterals": true,
    },
  ],
  "block-spacing": "error",
  "constructor-super": 2,
  "for-direction": 2,
  "getter-return": 2,
  "no-async-promise-executor": "off",
  "no-class-assign": 2,
  "no-compare-neg-zero": 2,
  "no-cond-assign": 2,
  "no-useless-escape": "off",
  "no-const-assign": 2,
  "no-constant-condition": 2,
  "no-control-regex": 2,
  "no-debugger": 2,
  "no-delete-var": 2,
  "no-dupe-args": 2,
  "no-dupe-class-members": 2,
  "no-dupe-else-if": 2,
  "no-dupe-keys": 2,
  "no-duplicate-case": 2,
  "no-empty": 2,
  "no-empty-character-class": 2,
  "no-empty-pattern": 2,
  "no-ex-assign": 2,
  "no-extra-boolean-cast": 0,
  "no-extra-semi": 2,
  "no-fallthrough": 2,
  "no-prototype-builtins": 2,
  "no-func-assign": 2,
  "no-global-assign": 2,
  "no-import-assign": 2,
  "no-inner-declarations": 2,
  "no-invalid-regexp": 2,
  "no-irregular-whitespace": 2,
  "no-misleading-character-class": 2,
  "no-mixed-spaces-and-tabs": 2,
  "no-new-symbol": 2,
  "no-obj-calls": 2,
  "no-octal": 2,
  "no-redeclare": 2,
  "no-regex-spaces": 2,
  "no-self-assign": 2,
  "no-setter-return": 2,
  "no-shadow-restricted-names": 2,
  "no-sparse-arrays": 2,
  "no-this-before-super": 2,
  "no-undef": 2,
  "no-unexpected-multiline": 2,
  "no-unreachable": 2,
  "no-unsafe-finally": 2,
  "no-unsafe-negation": 2,
  "no-unused-labels": 2,
  "no-with": 2,
  "require-yield": 2,
  "use-isnan": 2,
  "valid-typeof": 2,
  "no-restricted-exports": 2,
  "no-restricted-globals": 2,
  "no-restricted-modules": 2,
  "no-script-url": 2,
  "no-multiple-empty-lines": 2,
  "no-console": [
    "error",
    {
      "allow": [
        "warn",
        "error",
        "debug",
        "asset",
        "table",
        "time",
        "timeEnd",
      ],
    },
  ],
  "no-unused-vars": [ "error", { "args": "none" } ],
  "key-spacing": [
    "error",
    {
      "mode": "strict",
    },
  ],
  "curly": [ "error", "all" ],
  "object-curly-spacing": [ "error", "always" ],
  "no-case-declarations": "error",
  "no-extra-boolean-case": 0,
  "no-duplicate-imports": "off",
  "eqeqeq": [ "error", "always" ],
  "lines-between-class-members": "error",
  "space-in-parens": [ "error", "never" ],
  "no-restricted-imports": [ "error", {
    "patterns": [
      {
        regex: "^#(widgets|features|entities)\\/[a-zA-Z0-9_]+\\/(?!index(\\.(js|ts|tsx|jsx))$).+$",
        message: "You can't directly import something from widgets, features or entities without accessing it's API entry point. Please export required objects.",
      },
    ],
  } ],
  "comma-dangle": [
    "error",
    {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "always-multiline",
      "exports": "always-multiline",
    },
  ],
  "object-curly-newline": [ "error", {
    "ImportDeclaration": {
      "multiline": true,
      "minProperties": 4,
      "consistent": true,
    },
  } ],
  "prefer-const": "warn",
  "no-nested-ternary": "error",
};

const customPromiseRules: Linter.RulesRecord = {
  "promise/always-return": "error",
  "promise/no-return-in-finally": "error",
  "promise/param-names": "error",
  "promise/catch-or-return": [ "error", {
    "allowThen": true,
    "allowFinally": true,
    "terminationMethod": [ "catch", "finally" ],
  } ],
};

const customSecurityRules: Linter.RulesRecord = {
  ...securityPlugin.configs.recommended.rules,
  "security/detect-object-injection": "off",
  "security/detect-unsafe-regex": "warn",
};

// Base
const baseConfig: Linter.Config = {
  plugins,
  settings: {
    jsdoc: {
      "mode": "closure",
      "ignorePrivate": true,
      "ignoreInternal": true,
      "tagNamePreference": {
        returns: "returns",
        param: "param",
      },
    },
  },
  rules: {
    ...customRules,
    ...customImportRules,
    ...customExportsRules,
    ...customStylisticRules,
    ...customJSDocRules,
    ...customPromiseRules,
    ...customTreeShakingRules,
    ...customSecurityRules,
  },
};

// Globals
const commonGlobals = {
  ...globals.browser,
  ...globals.jest,
  ...globals.builtin,
  ...globals.serviceworker,
  ...globals.webextensions,
  ...globals.node,
  ...globals.nodeBuiltin,
  ...globals.es2021,
};

// Parser
const commonParserOptions = {
  ecmaFeatures: {
    jsx: false,
    experimentalObjectRestSpread: true,
  },
  ecmaVersion: "latest" as const,
  sourceType: "module" as const,
};

// Ignores
const getIgnoreFolders = (folders: string[] = [
  "node_modules",
  "dist",
  ".husky",
]): string[] => {
  const maskName = "%mask%";
  const ignoreMasks = [ `**/${maskName}/`, `/**/${maskName}/*`, `${maskName}/` ];
  return folders
    .map((folder) => ignoreMasks.map((item) => item.replace(maskName, folder)))
    .flat();
};

// TS
const tsConfig: Linter.Config = {
  ...baseConfig,
  files: [ "**/*.{ts,tsx,mts,cts}" ],
  languageOptions: {
    globals: commonGlobals,
    parser: tsParser,
    parserOptions: commonParserOptions,
  },
  plugins: {
    ...baseConfig.plugins,
    "@typescript-eslint": tsPlugin as unknown as ESLint.Plugin,
  },
  settings: {
    ...baseConfig.settings,
    "import-x/internal-regex": "^~/",
    "import-x/resolver-next": [
      createTypeScriptImportResolver({ alwaysTryTypes: true }),
      createNodeResolver({
        extensions: [ ".ts", ".tsx", ".mts", ".cts", ".js", ".jsx", ".mjs", ".cjs" ],
      }),
    ],
  },
  rules: {
    ...baseConfig.rules,
    "no-undef": "off",
    "no-dupe-class-members": "off",
    "@typescript-eslint/no-dupe-class-members": "error",
    "@stylistic/member-delimiter-style": [
      "error",
      {
        multiline: { delimiter: "semi", requireLast: true },
        singleline: { delimiter: "semi", requireLast: true },
      },
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "typeAlias",
        "format": [ "PascalCase" ],
        "custom": { "regex": "^T[A-Z]", "match": true },
      },
      {
        "selector": "interface",
        "format": [ "PascalCase" ],
        "custom": { "regex": "^I[A-Z]", "match": true },
      },
    ],
    "@typescript-eslint/ban-ts-comment": [
      "error",
      { "ts-ignore": true },
    ],
    "@typescript-eslint/no-explicit-any": "off",
    "@stylistic/block-spacing": [ "error", "always" ],
    "@stylistic/space-before-blocks": [ "error", "always" ],
    "@stylistic/keyword-spacing": [ "error", {
      "before": true,
      "after": true,
      "overrides": {
        "interface": { "after": true },
      },
    } ],
    ...typescriptTreeShakingRules,
  },
};

// Cache
const cacheStrategy: Linter.Config = {
  linterOptions: {
    reportUnusedDisableDirectives: "error",
    noInlineConfig: false,
  },
};

const config: Linter.Config[] = [
  cacheStrategy,
  {
    ignores: getIgnoreFolders(),
  },
  tsConfig,
];

export default config;
