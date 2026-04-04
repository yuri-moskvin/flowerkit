import assert from "node:assert";
import { describe, test } from "node:test";
import { getFormDataFromObj } from "./index.ts";

describe(getFormDataFromObj.name, () => {

  test("Checks for invalid args", () => {
    assert.throws(() =>
      // @ts-expect-error testing invalid obj argument
      getFormDataFromObj("moo")
    );
    assert.throws(() =>
      getFormDataFromObj(
        {},
        // @ts-expect-error testing invalid fd argument
        function() {}
      )
    );
    assert.throws(() =>
      getFormDataFromObj(
        {},
        new FormData(),
        // @ts-expect-error testing invalid callback argument
        true
      )
    );
  });

  test("Checks for correct FormData transform", () => {
    const fd1 = getFormDataFromObj({
      test: 123,
      boo: "foo",
    });
    const fd2 = getFormDataFromObj({
      test: 123,
      boo: "foo",
    }, new FormData(), (name, value, fd) => {
      if (name !== "test") {
        fd.set(name, value as string);
      }
    });
    assert.ok(fd1 instanceof FormData);
    assert.strictEqual(fd1.get("test"), "123");
    assert.strictEqual(fd1.get("boo"), "foo");
    assert.strictEqual(fd2.get("boo"), "foo");
    assert.strictEqual(fd2.has("test"), false);
  });

});
