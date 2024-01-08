import parser from "@babel/eslint-parser";
import babelImportsAttrPlugin from "@babel/plugin-syntax-import-attributes";
import babelPresetEnv from "@babel/preset-env";
import stylisticPlugin from "@stylistic/eslint-plugin-js";
import importPlugin from "eslint-plugin-import";
import jsdocPlugin from "eslint-plugin-jsdoc";
import globals from "globals";

const customJSDocRules = {
  "jsdoc/require-description": 2,
  "jsdoc/require-returns": 2,
  "jsdoc/require-example": 2,
  "jsdoc/require-jsdoc": [ 2, {
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

const customImportRules = {
  "import/first": "error",
  "import/order": [
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
      "pathGroupsExcludedImportTypes":
        [ "internal" ],
      "alphabetize": {
        "order": "asc",
        "caseInsensitive": true,
      },
    },
  ],
  "import/no-cycle": "error",
  "import/no-unresolved": "off",
  "import/namespace": "off",
  "import/no-named-as-default": "off",
};

const customStylisticRules = {
  "@stylistic/js/semi": "error",
  "@stylistic/js/semi-spacing": "error",
  "@stylistic/js/computed-property-spacing": [ "error", "never" ],
  "@stylistic/js/arrow-spacing": "error",
  "@stylistic/js/switch-colon-spacing": "error",
  "@stylistic/js/jsx-quotes": [ "error", "prefer-double" ],
  "@stylistic/js/comma-spacing": [ "error", { "before": false, "after": true } ],
  "@stylistic/js/padded-blocks": [ "error", {
    "classes": "always",
    "switches": "never",
  }, { allowSingleLineBlocks: false } ],
  "@stylistic/js/indent": [ "error", 2, {
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
  "@stylistic/js/keyword-spacing": [ "error", { "before": true, "after": true } ],
};

const customRules = {
  "array-bracket-spacing": [
    2,
    "always",
  ],
  "quotes": [
    "error",
    "double",
    {
      "avoidEscape": true,
      "allowTemplateLiterals": true,
    },
  ],
  "function-call-argument-newline": [
    "error",
    "never",
  ],
  "block-spacing": "error",
  "arrow-spacing": "error",
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
  "no-restricted-imports": 2,
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
  "curly": "error",
  "object-curly-spacing": [
    "error",
    "always",
  ],
  "no-case-declarations": 0,
  "no-extra-boolean-case": 0,
  "no-duplicate-imports": "error",
  "eqeqeq": [ "error", "always" ],
  "lines-between-class-members": "error",
};

const ignores = [
  "**/node_modules/",
  "/**/node_modules/*",
  "node_modules/",
  "dist/**/*.js",
];

const files = [ "**/*.js" ];

const plugins = {
  "@stylistic/js": stylisticPlugin,
  "jsdoc": jsdocPlugin,
  "import": importPlugin,
};

const settings = {
  "jsdoc": {
    "mode": "closure",
    "ignorePrivate": true,
    "ignoreInternal": true,
    "tagNamePreference": {
      "param": "param",
      "returns": "return",
    },
  },
};

const languageOptions = {
  "ecmaVersion": "latest",
  "globals": {
    ...globals.browser,
    ...globals.jest,
    ...globals.builtin,
    ...globals.serviceworker,
    ...globals.webextensions,
    ...globals.node,
    ...globals.nodeBuiltin,
    ...globals.es2021,
  },
  "parser": parser,
  "parserOptions": {
    "requireConfigFile": false,
    "babelOptions": {
      "babelrc": false,
      "configFile": false,
      "presets": [ babelPresetEnv ],
      "plugins": [
        [ babelImportsAttrPlugin, { deprecatedAssertSyntax: true } ],
      ],
    },
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
    },
    "ecmaVersion": 2022,
    "sourceType": "module",
  },
};

const linterOptions = {
  reportUnusedDisableDirectives: "off"
};

export default [
  {
    plugins,
    files,
    languageOptions,
    linterOptions,
    settings,
    ignores,
    rules: {
      ...customRules,
      ...customImportRules,
      ...customStylisticRules,
      ...customJSDocRules
    },
  },
];
