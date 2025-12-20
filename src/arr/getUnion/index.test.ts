import { getUnion } from "./index.ts";

describe(getUnion.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getUnion(null as any, [])).toThrow();
    expect(() => getUnion([], "" as any)).toThrow();
  });

  test("Checks for union values", () => {
    expect(getUnion([ 1, 2, 3 ], [ 4, 5, 6, 7 ])).toStrictEqual([ 1, 2, 3, 4, 5, 6, 7 ]);
    expect(getUnion([ null, undefined, 0 ], [ null, undefined, 0 ])).toStrictEqual([ null, undefined, 0 ]);
  });

  test("Checks empty arrays", () => {
    expect(getUnion([], [])).toStrictEqual([]);
  });


});
