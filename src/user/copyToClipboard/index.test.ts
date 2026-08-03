import assert from "node:assert";
import { describe, mock, test } from "node:test";
import { copyToClipboard } from "./index.ts";

describe(copyToClipboard.name, () => {
  test("Checks validation", async () => {
    // @ts-expect-error testing invalid text argument
    await assert.rejects(copyToClipboard(null), TypeError);
  });

  test("Uses the Clipboard API", async () => {
    const descriptor = Object.getOwnPropertyDescriptor(window.navigator, "clipboard");
    const writeText = mock.fn(async (_value: string) => {});
    Object.defineProperty(window.navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    try {
      assert.strictEqual(await copyToClipboard("hello"), true);
      assert.strictEqual(writeText.mock.callCount(), 1);
      assert.strictEqual(writeText.mock.calls[0].arguments[0], "hello");
    } finally {
      if (descriptor) {
        Object.defineProperty(window.navigator, "clipboard", descriptor);
      } else {
        Reflect.deleteProperty(window.navigator, "clipboard");
      }
    }
  });

  test("Cleans up the legacy textarea when copying fails", async () => {
    const clipboardDescriptor = Object.getOwnPropertyDescriptor(window.navigator, "clipboard");
    const execCommandDescriptor = Object.getOwnPropertyDescriptor(document, "execCommand");
    const initialTextareas = document.body.querySelectorAll("textarea").length;
    Object.defineProperty(window.navigator, "clipboard", {
      configurable: true,
      value: undefined,
    });
    Object.defineProperty(document, "execCommand", {
      configurable: true,
      value: () => {
        throw new Error("Clipboard access denied");
      },
    });
    try {
      assert.strictEqual(await copyToClipboard("hello"), false);
      assert.strictEqual(document.body.querySelectorAll("textarea").length, initialTextareas);
    } finally {
      if (clipboardDescriptor) {
        Object.defineProperty(window.navigator, "clipboard", clipboardDescriptor);
      } else {
        Reflect.deleteProperty(window.navigator, "clipboard");
      }
      if (execCommandDescriptor) {
        Object.defineProperty(document, "execCommand", execCommandDescriptor);
      } else {
        Reflect.deleteProperty(document, "execCommand");
      }
    }
  });
});
