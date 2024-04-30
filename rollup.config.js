import { babel } from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import del from "rollup-plugin-delete";
import filesize from "rollup-plugin-filesize";
import path from "path";
import packageFile from "./package.json" with { type: "json" };

const plugins = [
  del({
    targets: "dist/*",
    runOnce: true,
  }),
  json(),
  babel({
    babelHelpers: "runtime",
    plugins: [ "@babel/plugin-transform-runtime" ],
  }),
  terser({
    mangle: false,
    compress: {
      collapse_vars: false,
      arrows: false,
      defaults: false,
      ecma: 2023,
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
  filesize(),
];

const inputData = Object.keys(packageFile.exports)
  .map(item => path.join("./src", item, "index.js"));

const config = inputData.map(input => {
  return {
    input,
    treeshake: {
      moduleSideEffects: true,
      propertyReadSideEffects: "always",
      unknownGlobalSideEffects: true,
    },
    output: {
      dir: "dist/",
      preserveModules: true,
      preserveModulesRoot: "src",
      sourcemap: true,
      strict: true,
      format: "es",
      exports: "named",
    },
    plugins,
    external: Object.keys(packageFile.dependencies),
  };
});

export default config;
