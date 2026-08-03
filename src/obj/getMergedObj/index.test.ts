import assert from "node:assert";
import { describe, test } from "node:test";
import { getMergedObj } from "./index.ts";

describe(getMergedObj.name, () => {

  test("Checks for non-object", () => {
    assert.deepStrictEqual(getMergedObj(123 as any, {} as any), {});
    assert.deepStrictEqual(getMergedObj(123 as any, "1" as any), "1");
  });

  test("Checks for empty object", () => {
    assert.deepStrictEqual(getMergedObj({}, {}), {});
  });

  test("Checks for nested objects", () => {
    assert.deepStrictEqual(getMergedObj({
      hello: "world!",
      deeply: {
        hello: "world",
      },
    }, {
      deeply: {
        world: "hello",
      },
    }), {
      hello: "world!",
      deeply: {
        hello: "world",
        world: "hello",
      },
    });
    assert.deepStrictEqual(getMergedObj({
      first: 1,
      next: 2,
    }, {
      first: 1,
      next: 3,
    }), {
      first: 1,
      next: 3,
    });
    assert.deepStrictEqual(getMergedObj({
      first: [ "foo" ],
    }, {
      first: [ "moo" ],
      boo: 12,
    }), {
      first: [ "foo", "moo" ],
      boo: 12,
    });
  });

  test("Checks for nested arrays", () => {
    assert.deepStrictEqual(getMergedObj({
      hello: "world!",
      deeply: {
        hello: "world",
        arr: [ 1, 2, 3 ],
      },
    }, {
      deeply: {
        arr: [ 4, 5, 6 ],
      },
    }), {
      hello: "world!",
      deeply: {
        hello: "world",
        arr: [ 1, 2, 3, 4, 5, 6 ],
      },
    });

    assert.deepStrictEqual(getMergedObj({
      hi: 1,
      hello: [ "a", "b", "c" ],
      deepArray: {
        arr: [ 1, 2, 3, 4, 5, 6 ],
      },
    }, {
      hello: [ "d", "e", "f" ],
      deepArray: {
        arr: [ 0 ],
      },
    }, {
      isMergeArrays: false,
    }), {
      hi: 1,
      hello: [ "a", "b", "c" ],
      deepArray: {
        arr: [ 1, 2, 3, 4, 5, 6 ],
      },
    });

    assert.deepStrictEqual(getMergedObj({
      arr: [ 1, 2, 3 ],
    }, {
      arr: [ 0 ],
    }, {
      isMergeArrays: false,
    }), {
      arr: [ 1, 2, 3 ],
    });

    assert.deepStrictEqual(getMergedObj({
      arr: [ 1, 2, 3 ],
    }, {
      arr: [ 0 ],
    }, {
      isMergeArrays: true,
    }), {
      arr: [ 1, 2, 3, 0 ],
    });

  });

  test("Preserves circular references while cloning", () => {
    const circular: Record<string, unknown> = {};
    circular.self = circular;
    const merged = getMergedObj({}, { circular });

    assert.notStrictEqual(merged.circular, circular);
    assert.strictEqual(merged.circular.self, merged.circular);
  });

  test("Preserves cycles that point to merged roots", () => {
    const source: Record<string, unknown> = { source: true };
    source.self = source;
    const sourceMerged = getMergedObj({}, source);
    assert.strictEqual(sourceMerged.self, sourceMerged);

    const target: Record<string, unknown> = { target: true };
    target.self = target;
    const overlay: Record<string, unknown> = { source: true };
    overlay.self = overlay;
    const merged = getMergedObj(target, overlay);
    assert.deepStrictEqual({ target: merged.target, source: merged.source }, {
      target: true,
      source: true,
    });
    assert.strictEqual(merged.self, merged);
  });

  test("Clones built-ins and applies explicit array strategies", () => {
    const mapKey = { id: 1 };
    const source = {
      buffer: Uint8Array.from([ 1, 2 ]).buffer,
      date: new Date("2024-01-01T00:00:00Z"),
      map: new Map([ [ mapKey, { value: 1 } ] ]),
      regexp: /flower/gi,
      set: new Set([ { value: 2 } ]),
      view: new Uint8Array([ 3, 4 ]),
    };
    const merged = getMergedObj({}, source);

    assert.notStrictEqual(merged.date, source.date);
    assert.notStrictEqual(merged.map, source.map);
    assert.notStrictEqual([ ...merged.map.keys() ][0], mapKey);
    assert.notStrictEqual(merged.set, source.set);
    assert.notStrictEqual(merged.buffer, source.buffer);
    assert.notStrictEqual(merged.view, source.view);
    assert.deepStrictEqual([ ...new Uint8Array(merged.buffer) ], [ 1, 2 ]);
    assert.deepStrictEqual([ ...merged.view ], [ 3, 4 ]);
    assert.strictEqual(merged.regexp.source, "flower");
    assert.strictEqual(merged.regexp.flags, "gi");

    assert.deepStrictEqual(
      getMergedObj({ items: [ 1, 2 ] }, { items: [ 2, 3 ] }, { arrayStrategy: "replace" }).items,
      [ 2, 3 ]
    );
    assert.deepStrictEqual(
      getMergedObj({ items: [ 1, 2 ] }, { items: [ 2, 3 ] }, { arrayStrategy: "unique" }).items,
      [ 1, 2, 3 ]
    );
  });

  test("Preserves shared source references and property descriptors", () => {
    const shared = [ 1 ];
    const source: Record<PropertyKey, unknown> = {
      first: shared,
      second: shared,
    };
    const symbol = Symbol("value");
    Object.defineProperty(source, symbol, {
      enumerable: true,
      get: () => 3,
    });
    const merged = getMergedObj({ first: [], second: [] }, source);

    assert.strictEqual(merged.first, merged.second);
    assert.strictEqual(merged[symbol], 3);
    assert.strictEqual(Object.getOwnPropertyDescriptor(merged, symbol)?.get instanceof Function, true);
  });

});
