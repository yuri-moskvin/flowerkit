import { parseCircular, parseDependencyTree, prettyCircular } from "dpdm";
import ts from "typescript";
import fs from "fs";
import assert from "node:assert";
import { describe, test } from "node:test";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.resolve(__dirname);
const PROJECT_DIR = path.resolve(SRC_DIR, "..");
const ROOT_INDEX_FILE = path.join(SRC_DIR, "index.ts");
const TEST_FILE_RE = /\.(?:spec|test)\.ts$/u;

const hasIndexTs = (dirPath: string): boolean =>
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  fs.existsSync(path.join(dirPath, "index.ts"));

const getSubdirs = (dirPath: string): string[] => {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"))
    .map((entry) => path.join(dirPath, entry.name))
    .sort((a, b) => a.localeCompare(b));
};

const getSourceFiles = (dirPath: string): string[] => {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  return entries
    .flatMap((entry) => {
      const entryPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        return getSourceFiles(entryPath);
      }

      if (entry.isFile() && entry.name.endsWith(".ts") && !TEST_FILE_RE.test(entry.name)) {
        return [ entryPath ];
      }

      return [];
    })
    .sort((a, b) => a.localeCompare(b));
};

const getUtilityDirs = (dirPath: string): string[] =>
  getSubdirs(dirPath).flatMap((subdirPath) => {
    const nestedUtilityDirs = getUtilityDirs(subdirPath);

    if (nestedUtilityDirs.length > 0) {
      return nestedUtilityDirs;
    }

    return hasIndexTs(subdirPath) ? [ subdirPath ] : [];
  });

const getFileExports = (indexFilePath: string) => {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const content = fs.readFileSync(indexFilePath, "utf8");
  const sourceFile = ts.createSourceFile(indexFilePath, content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const namespaceExports: string[] = [];
  const runtimeNames: string[] = [];
  const typeNames: string[] = [];

  for (const statement of sourceFile.statements) {
    if (!ts.isExportDeclaration(statement) || !statement.exportClause) {
      continue;
    }

    const moduleSpecifier = statement.moduleSpecifier && ts.isStringLiteral(statement.moduleSpecifier)
      ? statement.moduleSpecifier.text
      : "";

    if (ts.isNamespaceExport(statement.exportClause)) {
      namespaceExports.push(`${statement.exportClause.name.text}:${moduleSpecifier}`);
      continue;
    }

    for (const element of statement.exportClause.elements) {
      if (statement.isTypeOnly || element.isTypeOnly) {
        typeNames.push(element.name.text);
      } else {
        runtimeNames.push(element.name.text);
      }
    }
  }

  return {
    namespaceExports: namespaceExports.sort((a, b) => a.localeCompare(b)),
    runtimeNames: runtimeNames.sort((a, b) => a.localeCompare(b)),
    typeNames: typeNames.sort((a, b) => a.localeCompare(b)),
  };
};

const getExpectedTypeNames = (functionNames: string[]): string[] =>
  functionNames
    .flatMap((functionName) => {
      const typeBaseName = `${functionName[0].toUpperCase()}${functionName.slice(1)}`;
      return [ `T${typeBaseName}Args`, `T${typeBaseName}Return` ];
    })
    .sort((a, b) => a.localeCompare(b));

const getComparisonMessage = (
  label: string,
  expected: string[],
  actual: string[]
): string => {
  const missing = expected.filter((name) => !actual.includes(name));
  const unexpected = actual.filter((name) => !expected.includes(name));

  return [
    `${label} mismatch.`,
    `Missing: ${missing.join(", ") || "none"}.`,
    `Unexpected: ${unexpected.join(", ") || "none"}.`,
  ].join("\n");
};

const KIT_DIRS = getSubdirs(SRC_DIR).filter(hasIndexTs);
const KIT_NAMES = KIT_DIRS.map((kitDir) => path.basename(kitDir));
const SOURCE_FILES = getSourceFiles(SRC_DIR);

describe("Cyclic dependencies", () => {
  test("Production source has no cyclic dependencies", async () => {
    assert.ok(SOURCE_FILES.length > 0, "No production TypeScript files were found for dependency analysis.");

    const tree = await parseDependencyTree(SOURCE_FILES, {
      context: PROJECT_DIR,
      cwd: PROJECT_DIR,
      tsconfig: path.join(PROJECT_DIR, "tsconfig.json"),
    });

    assert.ok(Object.keys(tree).length > 0, "dpdm produced an empty dependency tree.");

    const circulars = parseCircular(tree);
    assert.deepStrictEqual(circulars, [], `Circular dependencies found:\n${prettyCircular(circulars)}`);
  });
});

describe("Public exports", () => {
  test("Root entrypoint exports every kit namespace", () => {
    const actual = getFileExports(ROOT_INDEX_FILE).namespaceExports;
    const expected = KIT_NAMES
      .map((kitName) => `${kitName}Kit:./${kitName}/index.ts`)
      .sort((a, b) => a.localeCompare(b));

    assert.deepStrictEqual(actual, expected, getComparisonMessage("Root namespace exports", expected, actual));
  });

  for (const kitDir of KIT_DIRS) {
    const kitName = path.basename(kitDir);

    test(`Kit "${kitName}" exports every utility and its required types`, () => {
      const expectedRuntimeNames = getUtilityDirs(kitDir)
        .map((utilityDir) => path.basename(utilityDir))
        .sort((a, b) => a.localeCompare(b));
      const expectedTypeNames = getExpectedTypeNames(expectedRuntimeNames);
      const actual = getFileExports(path.join(kitDir, "index.ts"));
      const missingTypeNames = expectedTypeNames.filter((typeName) => !actual.typeNames.includes(typeName));

      assert.deepStrictEqual(
        actual.runtimeNames,
        expectedRuntimeNames,
        getComparisonMessage(`${kitName} runtime exports`, expectedRuntimeNames, actual.runtimeNames)
      );
      assert.deepStrictEqual(
        missingTypeNames,
        [],
        `${kitName} is missing required type exports: ${missingTypeNames.join(", ")}.`
      );
    });
  }
});
