import assert from "node:assert";
import { describe, test } from "node:test";
import { isStrUrl } from "./index.ts";

describe(isStrUrl.name, () => {

  test("Checks for invalid args", () => {
    assert.throws(() =>
      // @ts-expect-error testing invalid str argument
      isStrUrl(123)
    );
    assert.throws(() =>
      // @ts-expect-error testing invalid str argument
      isStrUrl(null)
    );
  });

  test("Checks for different valid paths of URL", () => {
    assert.strictEqual(isStrUrl("google.com/test/?query"), true);
    assert.strictEqual(isStrUrl("www.test.com"), true);
    assert.strictEqual(isStrUrl("www.test"), true);
    assert.strictEqual(isStrUrl("request.php"), true);
    assert.strictEqual(isStrUrl("google.html"), true);
    assert.strictEqual(isStrUrl("google.html?query=test"), true);
    assert.strictEqual(isStrUrl("google.html:9900?query=test"), true);
  });

  test("Checks for invalid strings", () => {
    assert.strictEqual(isStrUrl(""), false);
    assert.strictEqual(isStrUrl("123"), false);
    assert.strictEqual(isStrUrl("str."), false);
    assert.strictEqual(isStrUrl("str.a"), false);
  });

});
