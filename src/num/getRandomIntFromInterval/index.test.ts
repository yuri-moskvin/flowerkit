import assert from "node:assert";
import { describe, test } from "node:test";
import { getRandomIntFromInterval } from "./index.ts";

describe(getRandomIntFromInterval.name, () => {

  test("Checks for invalid args", () => {
    assert.throws(() =>
      getRandomIntFromInterval(
        // @ts-expect-error testing invalid min argument
        false, 10
      )
    );
  });

  test("Checks for valid numbers", () => {
    const random = getRandomIntFromInterval(1, 10);
    assert.strictEqual(getRandomIntFromInterval(0, 0), 0);
    assert.strictEqual(random >= 1 && random <= 10, true);
  });

});
