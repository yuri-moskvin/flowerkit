
import { getId } from "./index.js";

describe(getId.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getId(0)).toThrow();
    expect(() => getId(Infinity)).toThrow();
  });

  test("Checks for 1000 cases", () => {
    const count = 1000;
    const storageIds = new Set();
    for (let i = 0; i < count; i++) {
      storageIds.add(getId());
    }
    expect(storageIds.size === count).toBe(true);
    expect(getId(16).length).toBe(16);
    expect(getId() !== getId()).toBe(true);
  });

});
