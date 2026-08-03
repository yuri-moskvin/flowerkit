import assert from "node:assert";
import { describe, test } from "node:test";
import { createStorage } from "./index.ts";

describe(createStorage.name, () => {
  test("Checks validation", () => {
    // @ts-expect-error testing invalid options argument
    assert.throws(() => createStorage(null), TypeError);
    // @ts-expect-error testing invalid namespace argument
    assert.throws(() => createStorage({ namespace: 1 }), TypeError);
    assert.throws(() => createStorage({ namespace: "" }), TypeError);
  });

  test("Stores JSON values in a namespace", () => {
    type TSchema = { settings: { dark: boolean; }; count: number; };
    window.localStorage.clear();
    const storage = createStorage<TSchema>({ namespace: "test", storage: window.localStorage });
    assert.strictEqual(storage.set("settings", { dark: true }), true);
    assert.deepStrictEqual(storage.get("settings"), { dark: true });
    assert.strictEqual(storage.has("settings"), true);
    assert.strictEqual(window.localStorage.getItem("test:settings"), '{"dark":true}');
    storage.remove("settings");
    assert.strictEqual(storage.has("settings"), false);
  });

  test("Clears only its namespace and supports unavailable storage", () => {
    window.localStorage.clear();
    window.localStorage.setItem("other:key", "1");
    const storage = createStorage<{ value: number; }>({ namespace: "mine", storage: window.localStorage });
    storage.set("value", 2);
    assert.strictEqual(storage.clear(), true);
    assert.strictEqual(window.localStorage.getItem("mine:value"), null);
    assert.strictEqual(window.localStorage.getItem("other:key"), "1");
    const unavailable = createStorage<{ value: number; }>({ storage: null });
    assert.strictEqual(unavailable.get("value", 3), 3);
    assert.strictEqual(unavailable.set("value", 1), false);
  });

  test("Uses a safe default namespace when clearing", () => {
    window.localStorage.clear();
    window.localStorage.setItem("unrelated", "keep");
    const storage = createStorage<{ value: number; }>({ storage: window.localStorage });
    storage.set("value", 2);

    assert.strictEqual(window.localStorage.getItem("flowerkit:value"), "2");
    assert.strictEqual(storage.clear(), true);
    assert.strictEqual(window.localStorage.getItem("flowerkit:value"), null);
    assert.strictEqual(window.localStorage.getItem("unrelated"), "keep");
  });
});
