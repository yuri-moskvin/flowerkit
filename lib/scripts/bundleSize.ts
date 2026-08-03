import { nodeResolve } from "@rollup/plugin-node-resolve";
import * as terserModule from "@rollup/plugin-terser";
import { rollup } from "rollup";
import type { OutputChunk, Plugin } from "rollup";
import path from "path";
import { gzipSync } from "zlib";
import { getFactory } from "../utils/index.ts";

type TBundleCase = {
  exportName: string;
  importPath: string;
  label: string;
  maxGzipSize: number;
};

const terser = getFactory(terserModule);
const projectDir = process.cwd();
const isCheck = process.argv.includes("--check");
const bundleCases: TBundleCase[] = [
  {
    exportName: "getDebouncedFn",
    importPath: "./dist/fn/index.mjs",
    label: "getDebouncedFn",
    maxGzipSize: 500,
  },
  {
    exportName: "onClickOutside",
    importPath: "./dist/evt/index.mjs",
    label: "onClickOutside",
    maxGzipSize: 1_100,
  },
  {
    exportName: "createStorage",
    importPath: "./dist/user/index.mjs",
    label: "createStorage",
    maxGzipSize: 850,
  },
  {
    exportName: "getFromServer",
    importPath: "./dist/net/index.mjs",
    label: "getFromServer",
    maxGzipSize: 3_500,
  },
];

const getVirtualPlugin = (bundleCase: TBundleCase): Plugin => {
  const entryId = "\0flowerkit-size-entry";
  return {
    name: "flowerkit-size-entry",
    resolveId(source) {
      if (source === entryId) {
        return entryId;
      }
      if (source === bundleCase.importPath) {
        return path.resolve(projectDir, bundleCase.importPath);
      }
      return null;
    },
    load(id) {
      if (id !== entryId) {
        return null;
      }
      return [
        `import { ${bundleCase.exportName} } from ${JSON.stringify(bundleCase.importPath)};`,
        `export { ${bundleCase.exportName} };`,
      ].join("\n");
    },
  };
};

const getBundleSize = async (bundleCase: TBundleCase): Promise<{
  gzipSize: number;
  minifiedSize: number;
}> => {
  const bundle = await rollup({
    input: "\0flowerkit-size-entry",
    plugins: [
      getVirtualPlugin(bundleCase),
      nodeResolve({ browser: true }),
      terser({
        format: { comments: false },
      }),
    ],
    treeshake: true,
  });
  const { output } = await bundle.generate({
    format: "es",
    inlineDynamicImports: true,
  });
  await bundle.close();
  const code = output
    .filter((item): item is OutputChunk => item.type === "chunk")
    .map((item) => item.code)
    .join("\n");
  return {
    gzipSize: gzipSync(code).byteLength,
    minifiedSize: Buffer.byteLength(code),
  };
};

const formatSize = (bytes: number): string => `${(bytes / 1024).toFixed(2)} kB`;
const rows = await Promise.all(bundleCases.map(async (bundleCase) => {
  return {
    ...bundleCase,
    ...await getBundleSize(bundleCase),
  };
}));

console.table(rows.map((row) => ({
  Utility: row.label,
  "Minified": formatSize(row.minifiedSize),
  "Minified + gzip": formatSize(row.gzipSize),
  "Budget (gzip)": formatSize(row.maxGzipSize),
})));

if (isCheck) {
  const exceeded = rows.filter((row) => row.gzipSize > row.maxGzipSize);
  if (exceeded.length > 0) {
    throw new Error(`Bundle size budget exceeded: ${exceeded.map((row) => row.label).join(", ")}`);
  }
}
