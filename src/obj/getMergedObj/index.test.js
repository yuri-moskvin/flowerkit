import { getMergedObj } from "./index.js";

describe(getMergedObj.name, () => {

  test("Checks for non-object", () => {
    expect(getMergedObj(123, {})).toStrictEqual({});
    expect(getMergedObj(123, "1")).toStrictEqual("1");
  });

  test("Checks for empty object", () => {
    expect(getMergedObj({}, {})).toStrictEqual({});
  });

  test("Checks for nested objects", () => {
    expect(getMergedObj({
      hello: "world!",
      deeply: {
        hello: "world"
      }
    }, {
      deeply: {
        world: "hello"
      }
    })).toStrictEqual({
      hello: "world!",
      deeply: {
        hello: "world",
        world: "hello"
      }
    });
    expect(getMergedObj({
      first: 1,
      next: 2
    }, {
      first: 1,
      next: 3
    })).toStrictEqual({
      first: 1,
      next: 3
    });
    expect(getMergedObj({
      first: [ "foo" ],
    }, {
      first: [ "moo" ],
      boo: 12
    })).toStrictEqual({
      first: [ "foo", "moo" ],
      boo: 12
    });
  });

  test("Checks for nested arrays", () => {
    expect(getMergedObj({
      hello: "world!",
      deeply: {
        hello: "world",
        arr: [ 1, 2, 3 ]
      }
    }, {
      deeply: {
        arr: [ 4, 5, 6 ]
      }
    })).toStrictEqual({
      hello: "world!",
      deeply: {
        hello: "world",
        arr: [ 1, 2, 3, 4, 5, 6 ]
      }
    });

    expect(getMergedObj({
      hello: [ "a", "b", "c" ]
    }, {
      hello: [ "d", "e", "f" ]
    }, {
      isMergeArrays: false
    })).toStrictEqual({
      hello: [ "a", "b", "c" ]
    });
  });

});
