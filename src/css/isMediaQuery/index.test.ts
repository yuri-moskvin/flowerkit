import assert from "node:assert";
import { describe, test } from "node:test";
import { isMediaQuery } from "./index.ts";

describe(isMediaQuery.name, () => {
  test("Checks for invalid args", () => {
    assert.throws(() =>
      // @ts-expect-error testing invalid query argument
      isMediaQuery(0)
    );
    assert.throws(() =>
      // @ts-expect-error testing invalid query argument
      isMediaQuery(null)
    );
  });

  test("Preserves complete media queries and wraps bare features", () => {
    const descriptor = Object.getOwnPropertyDescriptor(window, "matchMedia");
    const queries: string[] = [];
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: (query: string) => {
        queries.push(query);
        return { matches: true } as MediaQueryList;
      },
    });
    try {
      assert.strictEqual(isMediaQuery("screen and (min-width: 600px)"), true);
      assert.strictEqual(isMediaQuery("min-width: 600px"), true);
      assert.deepStrictEqual(queries, [
        "screen and (min-width: 600px)",
        "(min-width: 600px)",
      ]);
    } finally {
      if (descriptor) {
        Object.defineProperty(window, "matchMedia", descriptor);
      } else {
        Reflect.deleteProperty(window, "matchMedia");
      }
    }
  });
});
