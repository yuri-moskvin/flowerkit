import { execFile } from "child_process";
import {
  mkdtemp, readFile, rm, writeFile,
} from "fs/promises";
import { tmpdir } from "os";
import path from "path";
import { promisify } from "util";

interface IPackageJson {
  name: string;
  exports: Record<string, {
    types: string;
    import: string;
    default: string;
    require: string;
  }>;
}

interface IPackResult {
  entryCount: number;
  filename: string;
  files: {
    path: string;
  }[];
  size: number;
  unpackedSize: number;
}

const execFileAsync = promisify(execFile);
const projectDir = process.cwd();
const npmCli = process.env.npm_execpath;
const tscCli = path.join(projectDir, "node_modules", "typescript", "bin", "tsc");
const packageBudgets = {
  entryCount: 655,
  size: 280_000,
  unpackedSize: 1_050_000,
};

const run = async (command: string, args: string[], cwd: string): Promise<string> => {
  const { stdout } = await execFileAsync(command, args, {
    cwd,
    encoding: "utf8",
  });
  return stdout.toString();
};

const runNpm = async (args: string[], cwd: string): Promise<string> => {
  if (!npmCli) {
    throw new Error("verify:package must be run through npm");
  }

  return await run(process.execPath, [ npmCli, ...args ], cwd);
};

const getPackageSpecifiers = (pkg: IPackageJson): string[] => {
  return [
    pkg.name,
    ...Object.keys(pkg.exports)
      .filter((exportPath) => exportPath !== ".")
      .map((exportPath) => `${pkg.name}/${exportPath.slice(2)}`),
  ];
};

const verifyPackedFiles = (pkg: IPackageJson, pack: IPackResult): void => {
  const packedPaths = new Set(pack.files.map(({ path: filePath }) => filePath));
  const exportedFiles = Object.values(pkg.exports)
    .flatMap(({
      types, import: esm, default: fallback, require: cjs,
    }) => [ types, esm, cjs, fallback ])
    .map((filePath) => filePath.slice(2));
  const missingFiles = exportedFiles.filter((filePath) => !packedPaths.has(filePath));
  const forbiddenFiles = [ ...packedPaths ].filter((filePath) => {
    return [ ".github/", "lib/", "node_modules/", "src/" ].some((prefix) => filePath.startsWith(prefix));
  });

  if (missingFiles.length > 0) {
    throw new Error(`Package tarball misses exported files: ${missingFiles.join(", ")}`);
  }

  if (forbiddenFiles.length > 0) {
    throw new Error(`Package tarball contains development files: ${forbiddenFiles.join(", ")}`);
  }

  const exceededBudgets = (Object.keys(packageBudgets) as (keyof typeof packageBudgets)[])
    .filter((key) => pack[key] > packageBudgets[key]);
  if (exceededBudgets.length > 0) {
    throw new Error(`Package tarball exceeds budgets: ${exceededBudgets.join(", ")}`);
  }
};

const verifyRuntimeImports = async (pkg: IPackageJson, consumerDir: string): Promise<void> => {
  const specifiers = getPackageSpecifiers(pkg);
  const esmCheck = [
    `const specifiers = ${JSON.stringify(specifiers)};`,
    "const resolved = specifiers.map((specifier) => import.meta.resolve(specifier));",
    "if (resolved.some((url) => !url.endsWith('.mjs'))) process.exit(1);",
    "const modules = await Promise.all(specifiers.map((specifier) => import(specifier)));",
    "if (modules.some((module) => Object.keys(module).length === 0)) process.exit(1);",
  ].join("\n");
  const cjsCheck = [
    `const specifiers = ${JSON.stringify(specifiers)};`,
    "const resolved = specifiers.map((specifier) => require.resolve(specifier));",
    "if (resolved.some((filePath) => !filePath.endsWith('.cjs'))) process.exit(1);",
    "const modules = specifiers.map((specifier) => require(specifier));",
    "if (modules.some((module) => Object.keys(module).length === 0)) process.exit(1);",
  ].join("\n");

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  await writeFile(path.join(consumerDir, "esm-check.mjs"), esmCheck, "utf8");
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  await writeFile(path.join(consumerDir, "cjs-check.cjs"), cjsCheck, "utf8");
  await run(process.execPath, [ "esm-check.mjs" ], consumerDir);
  await run(process.execPath, [ "cjs-check.cjs" ], consumerDir);
};

const verifyTypes = async (pkg: IPackageJson, consumerDir: string): Promise<void> => {
  const source = [
    `import { getUnion } from "${pkg.name}/arr";`,
    `import type { TGetUnionArgs } from "${pkg.name}/arr";`,
    "",
    "const args: TGetUnionArgs = [ [ 1 ], [ 2 ] ];",
    "getUnion(...args);",
  ].join("\n");

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  await writeFile(path.join(consumerDir, "index.ts"), source, "utf8");
  await run(process.execPath, [ tscCli,
    "--noEmit",
    "--strict",
    "--module", "NodeNext",
    "--moduleResolution", "NodeNext",
    "--target", "ESNext",
    "--skipLibCheck",
    "index.ts",
  ], consumerDir);
};

const pkg = JSON.parse(await readFile(path.join(projectDir, "package.json"), "utf8")) as IPackageJson;
let tarballPath: string | undefined;
let consumerDir: string | undefined;

try {
  const packOutput = await runNpm([ "pack", "--json", "--ignore-scripts" ], projectDir);
  const [ pack ] = JSON.parse(packOutput) as IPackResult[];

  if (!pack) {
    throw new Error("npm pack did not return tarball metadata");
  }

  verifyPackedFiles(pkg, pack);
  console.table({
    package: {
      files: pack.entryCount,
      "packed bytes": pack.size,
      "unpacked bytes": pack.unpackedSize,
    },
  });
  tarballPath = path.join(projectDir, pack.filename);
  consumerDir = await mkdtemp(path.join(tmpdir(), "flowerkit-package-smoke-"));

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  await writeFile(path.join(consumerDir, "package.json"), JSON.stringify({ private: true }), "utf8");
  await runNpm([ "install", "--ignore-scripts", "--no-package-lock", tarballPath ], consumerDir);
  await verifyRuntimeImports(pkg, consumerDir);
  await verifyTypes(pkg, consumerDir);
} finally {
  await Promise.all([
    tarballPath ? rm(tarballPath, { force: true }) : Promise.resolve(),
    consumerDir ? rm(consumerDir, { recursive: true, force: true }) : Promise.resolve(),
  ]);
}
