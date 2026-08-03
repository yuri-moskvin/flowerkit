import assert from "node:assert";
import { describe, test } from "node:test";
import { getCopyOfObj } from "./index.ts";

describe(getCopyOfObj.name, () => {

  test("Checks for Date instance", () => {
    const stamp = new Date();
    const copy = getCopyOfObj(stamp as any);
    assert.notStrictEqual(stamp, copy);
    assert.strictEqual(stamp.getTime(), copy.getTime());
  });

  test("Checks for other types", () => {
    const number = 1;
    const str = "1";
    assert.strictEqual(number === getCopyOfObj(number as any), true);
    assert.strictEqual(str === getCopyOfObj(str as any), true);
  });

  test("Checks for nested objects", () => {
    const obj1 = {
      a: "moo",
      b: {
        foo: "1",
      },
    };
    const copy1 = getCopyOfObj(obj1 as any);
    (copy1 as any).a = "foo";

    const obj2 = {
      a: "doo",
    };
    const copy2: any = obj2;
    copy2.a = "boo";

    assert.notStrictEqual((obj1 as any).a, (copy1 as any).a);
    assert.strictEqual(obj2.a, copy2.a);
  });

  test("Clones collections and circular references", () => {
    const source: {
      date: Date;
      map: Map<string, { value: number; }>;
      self?: unknown;
      set: Set<{ value: number; }>;
    } = {
      date: new Date("2024-01-01T00:00:00Z"),
      map: new Map([ [ "item", { value: 1 } ] ]),
      set: new Set([ { value: 2 } ]),
    };
    source.self = source;

    const copy = getCopyOfObj(source);
    assert.notStrictEqual(copy, source);
    assert.strictEqual(copy.self, copy);
    assert.ok(copy.map instanceof Map);
    assert.ok(copy.set instanceof Set);
    assert.notStrictEqual(copy.date, source.date);
    assert.notStrictEqual(copy.map.get("item"), source.map.get("item"));
    assert.notStrictEqual([ ...copy.set ][0], [ ...source.set ][0]);
  });

  test("Clones URL values with working internal state", () => {
    const source = {
      url: new URL("https://example.com/path?tag=one"),
      params: new URLSearchParams("tag=one&tag=two"),
    };
    const copy = getCopyOfObj(source);

    assert.notStrictEqual(copy.url, source.url);
    assert.notStrictEqual(copy.params, source.params);
    assert.strictEqual(copy.url.href, source.url.href);
    assert.deepStrictEqual(copy.params.getAll("tag"), [ "one", "two" ]);
  });

});
