import fs from "fs";
import assert from "node:assert";
import { describe, test } from "node:test";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.resolve(__dirname);

const FOLDERS = [
  "arr",
  "css",
  "date",
  "dom",
  "evt",
  "fn",
  "json",
  "net",
  "num",
  "obj",
  "str",
  "user",
] as const;

const hasIndexTs = (dirPath: string): boolean =>
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  fs.existsSync(path.join(dirPath, "index.ts"));

const getSubdirs = (dirPath: string): string[] => {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  if (!fs.existsSync(dirPath)) {
    return [];
  }
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  return fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => path.join(dirPath, d.name));
};

const getExpectedFunctionsCount = (folderPath: string): number => {
  let count = 0;
  const subdirs = getSubdirs(folderPath);

  for (const sd of subdirs) {
    const childDirsWithIndex = getSubdirs(sd).filter(hasIndexTs);
    if (childDirsWithIndex.length > 0) {
      count += childDirsWithIndex.length;
    } else if (hasIndexTs(sd)) {
      count += 1;
    }
  }

  return count;
};

const getActualExportCount = (indexFilePath: string): number => {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const content = fs.readFileSync(indexFilePath, "utf8");
  const exportRe = /export\s*\{\s*([^}]+)\s*\}\s*from\s*["'][^"']+["']/gm;

  let match: RegExpExecArray | null;
  let total = 0;

  while ((match = exportRe.exec(content)) !== null) {
    const inside = match[1];
    const names = inside
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    total += names.length;
  }

  return total;
};

describe("Exports coverage for src folders", () => {
  for (const folder of FOLDERS) {
    test(`Folder "${folder}" has all functions exported`, () => {
      const folderPath = path.join(SRC_DIR, folder);
      const indexFilePath = path.join(folderPath, "index.ts");

      // eslint-disable-next-line security/detect-non-literal-fs-filename
      assert.strictEqual(fs.existsSync(folderPath), true);
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      assert.strictEqual(fs.existsSync(indexFilePath), true);

      const expected = getExpectedFunctionsCount(folderPath);
      const actual = getActualExportCount(indexFilePath);

      assert.strictEqual(actual, expected);
    });
  }
});
