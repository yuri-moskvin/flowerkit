import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import ts from "@rollup/plugin-typescript";
import type {
  RollupOptions, OutputOptions, InputOption, Plugin,
} from "rollup";
import copy from "rollup-plugin-copy";
import del from "rollup-plugin-delete";
import path from "path";
import { fileURLToPath } from "url";
import pkg from "./package.json" with { type: "json" };

// Current dir
const __dirname = fileURLToPath(new URL(".", import.meta.url));

// Dist dir
const dist = "dist/";

// File ext
const extensions = [ ".ts" ];

// Packages
const regexesOfPackages = [
  ...Object.keys(pkg.dependencies || {}),
]
  // eslint-disable-next-line security/detect-non-literal-regexp
  .map((packageName) => new RegExp(`^${packageName}(/.*)?`));

// Input
const inputData: {
  input: InputOption;
  output?: OutputOptions;
  excludedPlugins?: string[];
}[] = [
  { // ESM
    input: path.resolve("src/index.ts"),
    excludedPlugins: [],
    output: {
      format: "es",
      entryFileNames: "[name].mjs",
      chunkFileNames: "[name].[hash].mjs",
    },
  },
  { // CJS
    input: path.resolve("src/index.ts"),
    excludedPlugins: [],
    output: {
      format: "cjs",
      entryFileNames: "[name].cjs",
      chunkFileNames: "[name].[hash].cjs",
    },
  },
];

// Plugins
const plugins: Plugin[] = [
  del({
    runOnce: true,
    targets: `${dist}/*`,
  }),
  json(),
  resolve({
    extensions,
    browser: true,
    preferBuiltins: true,
    resolveOnly: regexesOfPackages,
  }),
  commonjs({
    transformMixedEsModules: true,
    esmExternals: true,
  }),
  ts({
    include: inputData.map(({ input }) => input as string),
    tsconfig: path.resolve(__dirname, "./tsconfig.json"),
    noEmitOnError: false,
    compilerOptions: {
      declaration: true,
      declarationDir: dist,
    },
  }),
  copy({
    verbose: false,
    flatten: true,
    copySync: true,
    targets: [
      { // существующие src/package/**/*.d.ts => dist/**/*.d.mts
        src: "src/package/**/*.d.ts",
        dest: "dist",
        rename: (name, extension, fullPath) => {
          return fullPath.replaceAll("src\/package\/", "");
        },
        transform: (contents) => contents.toString().replaceAll(".d.ts", ".d.mts"),
      },
    ],
  }),
  copy({
    verbose: false,
    flatten: false,
    copySync: true,
    targets: [
      { // генерируемые dist/**/*.d.ts => dist/**/*.d.mts
        src: "dist/**/*.d.ts",
        dest: "dist",
        rename: (name) => `${name}.mts`,
        transform: (contents) => contents.toString().replaceAll(".d.ts", ".d.mts"),
      },
    ],
  }),
  babel({
    targets: pkg.browserslist,
    minified: false,
    babelHelpers: "runtime",
    plugins: [
      [
        "@babel/plugin-transform-runtime", {
          useESModules: true,
        },
      ],
    ],
    exclude: [ "node_modules/**" ],
    presets: [
      "@babel/preset-typescript",
      [ "@babel/preset-env", { targets: pkg.browserslist } ],
    ],
    extensions,
  }),
  terser({
    mangle: false,
    compress: {
      collapse_vars: false,
      arrows: false,
      defaults: false,
      ecma: 2020,
      evaluate: false,
      keep_classnames: true,
      keep_fnames: true,
      keep_fargs: true,
      keep_infinity: true,
      reduce_funcs: false,
      hoist_funs: false,
      join_vars: false,
      hoist_props: false,
      hoist_vars: false,
    },
    format: {
      comments: "all",
      keep_numbers: true,
    },
  }),
];

// Output
const outputData: { plugins?: Plugin[]; input?: InputOption; output?: OutputOptions[]; }[] = inputData
  .map(({
    input,
    output = {},
    excludedPlugins = [],
  }) => {
    const activePlugins = excludedPlugins.length ? plugins.filter(({ name }) => {
      return !excludedPlugins.includes(name);
    }) : plugins;
    return {
      plugins: activePlugins,
      output: [
        {
          ...output,
        },
      ],
      input,
    };
  });

/**
 * Gets config for `rollup`
 * @returns {Promise<RollupOptions | RollupOptions[]>}
 */
export default async function getConfig(
  command: Record<string, unknown>
): Promise<RollupOptions | RollupOptions[]> {

  return outputData.map(({
    input = "",
    output = [],
    plugins = [],
  }) => {


    const outputData: OutputOptions[] = output.map((item) => {
      return {
        dir: dist,
        esModule: true,
        preserveModules: true,
        preserveModulesRoot: "src/package",
        strict: false,
        sourcemap: true,
        sourcemapPathTransform: () => "",
        exports: "named",
        ...item,
      };
    });

    return {
      cache: false,
      input,
      treeshake: {
        moduleSideEffects: true,
        propertyReadSideEffects: "always",
        unknownGlobalSideEffects: true,
      },
      output: outputData,
      plugins,
      external: regexesOfPackages,
    };
  });

}
