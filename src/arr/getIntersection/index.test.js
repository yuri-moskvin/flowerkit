import { getIntersection } from "./index.js";

describe(getIntersection.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getIntersection(null)).toThrow();
    expect(() => getIntersection([], false)).toThrow();
  });

  test("Checks for empty arr", () => {
    expect(getIntersection([], [])).toStrictEqual([]);
  });

  test("Checks for intersections", () => {
    expect(getIntersection([ 1, 2, 3 ], [ 2, 3, 4 ])).toStrictEqual([ 2, 3 ]);
    expect(getIntersection([ null, 1, undefined ], [ "1", null, 1, null ])).toStrictEqual([ null, 1 ]);
  });

});
