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

});
