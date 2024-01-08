import { getUnion } from "./index.js";

describe(getUnion.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getUnion(null)).toThrow();
    expect(() => getUnion([], "")).toThrow();
  });

  test("Checks for union values", () => {
    expect(getUnion([ 1, 2, 3 ], [ 4, 5, 6, 7 ])).toStrictEqual([ 1, 2, 3, 4, 5, 6, 7 ]);
    expect(getUnion([ null, undefined, 0 ], [ null, undefined, 0 ])).toStrictEqual([ null, undefined, 0 ]);
  });

  test("Checks empty arrays", () => {
    expect(getUnion([], [])).toStrictEqual([]);
  });


});
