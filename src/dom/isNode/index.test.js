import { isNode } from "./index.js";

describe(isNode.name, () => {

  test("Checks for correct detection of Element instance", () => {
    expect(isNode(null)).toBe(false);
    expect(isNode(document)).toBe(true);
    expect(isNode("foo")).toBe(false);
    expect(isNode(document.body)).toBe(true);
  });

});
