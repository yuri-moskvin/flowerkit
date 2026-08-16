import assert from "node:assert";
import { describe, mock, test } from "node:test";
import { getArrSortedBy } from "./index.ts";

describe(getArrSortedBy.name, () => {
  test("Checks validation", () => {
    // @ts-expect-error testing invalid array argument
    assert.throws(() => getArrSortedBy(null, (value) => value), TypeError);
    // @ts-expect-error testing invalid selector argument
    assert.throws(() => getArrSortedBy([], null), TypeError);
    // @ts-expect-error testing invalid options argument
    assert.throws(() => getArrSortedBy([], (value) => value, null), TypeError);
    assert.throws(() => getArrSortedBy([], (value) => value, {
      // @ts-expect-error testing invalid direction
      direction: "up",
    }), TypeError);
    assert.throws(() => getArrSortedBy([], (value) => value, {
      // @ts-expect-error testing invalid empty-value placement
      nulls: "middle",
    }), TypeError);
  });

  test("Returns an immutable stable sort", () => {
    const source = [
      { group: 2, id: "third" },
      { group: 1, id: "first" },
      { group: 1, id: "second" },
    ];
    const result = getArrSortedBy(source, ({ group }) => group);

    assert.notStrictEqual(result, source);
    assert.deepStrictEqual(result.map(({ id }) => id), [ "first", "second", "third" ]);
    assert.deepStrictEqual(source.map(({ id }) => id), [ "third", "first", "second" ]);
  });

  test("Supports descending dates and explicit empty-value placement", () => {
    const result = getArrSortedBy([
      { date: new Date("2024-01-01"), id: "old" },
      { date: null, id: "missing" },
      { date: new Date("2024-02-01"), id: "new" },
    ], ({ date }) => date, { direction: "desc", nulls: "first" });

    assert.deepStrictEqual(result.map(({ id }) => id), [ "missing", "new", "old" ]);
  });

  test("Computes sort values once and supports a custom comparator", () => {
    const getValue = mock.fn((value: string) => value);
    const result = getArrSortedBy([ "bbb", "a", "cc" ], getValue, {
      compare: (left, right) => left.length - right.length,
    });

    assert.deepStrictEqual(result, [ "a", "cc", "bbb" ]);
    assert.strictEqual(getValue.mock.callCount(), 3);
  });

  test("Rejects an invalid custom comparator result", () => {
    assert.throws(() => getArrSortedBy([ 2, 1 ], (value) => value, {
      compare: () => Number.NaN,
    }), TypeError);
  });
});
