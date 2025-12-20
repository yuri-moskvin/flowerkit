import { getDiff } from "./index.ts";

describe(getDiff.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getDiff(null as any, null as any)).toThrow();
    expect(() => getDiff([], false as any)).toThrow();
  });

  test("Checks for empty arr", () => {
    expect(getDiff([], [])).toStrictEqual([]);
  });

  test("Checks for diffs", () => {
    expect(getDiff([ undefined, null ], [ undefined, 1, null ])).toStrictEqual([ 1 ]);
    expect(getDiff([ 1, 2, 3 ], [ 2, 3, 4 ])).toStrictEqual([ 1, 4 ]);
  });

});
