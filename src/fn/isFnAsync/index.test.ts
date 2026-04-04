import assert from "node:assert";
import { describe, test } from "node:test";
import { isFnAsync } from "./index.ts";

describe(isFnAsync.name, () => {

  test("Checks for other types", () => {
    assert.strictEqual(isFnAsync(null as any), false);
    assert.strictEqual(isFnAsync(1 as any), false);
  });

  test("Checks for async fn", () => {
    const asyncFn = async function() {};
    const asyncArrowFn = async () => {};
    const bindAsyncFn = asyncFn.bind({});
    assert.strictEqual(isFnAsync(asyncFn as any), true);
    assert.strictEqual(isFnAsync(asyncArrowFn as any), true);
    assert.strictEqual(isFnAsync(bindAsyncFn as any), true);
  });

  test("Checks for default fn", () => {
    const defaultFn = function() {};
    const defaultArrowFn = () => {};
    assert.strictEqual(isFnAsync(defaultFn as any), false);
    assert.strictEqual(isFnAsync(defaultArrowFn as any), false);
  });

});
