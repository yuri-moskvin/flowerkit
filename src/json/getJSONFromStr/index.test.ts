import assert from "node:assert";
import { describe, test } from "node:test";
import { getJSONFromStr } from "./index.ts";

describe(getJSONFromStr.name, () => {

  test("Checks for invalid args", () => {
    assert.throws(() =>
      // @ts-expect-error testing invalid str argument
      getJSONFromStr(false)
    );
    assert.throws(() =>
      getJSONFromStr(
        '{ "hello": "world" }',
        // @ts-expect-error testing invalid fallback argument
        0
      )
    );
  });

  test("Checks for strings", () => {
    assert.deepStrictEqual(getJSONFromStr(""), {});
    assert.deepStrictEqual(getJSONFromStr('{ "hello": "world" }'), { hello: "world" });
    assert.deepStrictEqual(getJSONFromStr('{ "broken": "str'), {});
  });

});
