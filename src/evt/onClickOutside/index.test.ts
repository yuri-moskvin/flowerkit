import assert from "node:assert";
import { describe, mock, test } from "node:test";
import { onClickOutside } from "./index.ts";

describe(onClickOutside.name, () => {
  test("Checks validation", () => {
    // @ts-expect-error testing invalid elements argument
    assert.throws(() => onClickOutside(null, () => {}), TypeError);
    // @ts-expect-error testing invalid callback argument
    assert.throws(() => onClickOutside(document.body, null), TypeError);
  });

  test("Calls only for events outside targets and ignored elements", () => {
    const target = document.createElement("div");
    const child = document.createElement("button");
    const ignored = document.createElement("div");
    target.append(child);
    document.body.append(target, ignored);
    const callback = mock.fn();
    const listener = onClickOutside(target, callback, { eventName: "click", ignored: [ ignored ] });
    child.dispatchEvent(new window.Event("click", { bubbles: true, composed: true }));
    ignored.dispatchEvent(new window.Event("click", { bubbles: true, composed: true }));
    document.body.dispatchEvent(new window.Event("click", { bubbles: true, composed: true }));
    assert.strictEqual(callback.mock.callCount(), 1);
    listener.removeListener();
    target.remove();
    ignored.remove();
  });
});
