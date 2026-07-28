import assert from "node:assert";
import { spawnSync } from "node:child_process";
import { describe, test } from "node:test";

const entrypoints = [
  "./index.ts",
  "./arr/index.ts",
  "./css/index.ts",
  "./date/index.ts",
  "./dom/index.ts",
  "./evt/index.ts",
  "./fn/index.ts",
  "./json/index.ts",
  "./net/index.ts",
  "./num/index.ts",
  "./obj/index.ts",
  "./str/index.ts",
  "./user/index.ts",
].map((relativePath) => new URL(relativePath, import.meta.url).href);

const ssrScript = `
  if (typeof document !== "undefined" || typeof window !== "undefined") {
    throw new Error("The SSR check must run without DOM globals");
  }

  const [ domKit, userKit ] = await Promise.all([
    import(${JSON.stringify(new URL("./dom/index.ts", import.meta.url).href)}),
    import(${JSON.stringify(new URL("./user/index.ts", import.meta.url).href)}),
    ...${JSON.stringify(entrypoints)}.map((entrypoint) => import(entrypoint)),
  ]);

  if (domKit.isNode(null) !== false || userKit.isMobileDevice() !== false) {
    throw new Error("SSR-safe helpers returned an unexpected value");
  }

  const nodes = await domKit.getHTMLFromStr("<span>SSR</span>");
  if (nodes.length !== 1) {
    throw new Error("SSR HTML parser returned an unexpected result");
  }
`;

describe("SSR compatibility", () => {

  test("Loads every source entrypoint and runs SSR-safe helpers without DOM globals", () => {
    const result = spawnSync(process.execPath, [ "--input-type=module", "--eval", ssrScript ], {
      encoding: "utf8",
      env: {
        ...process.env,
        NODE_OPTIONS: "",
      },
    });

    assert.strictEqual(result.status, 0, result.stderr);
  });

});
