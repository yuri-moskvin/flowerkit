import { isNode } from "./index.ts";

describe(isNode.name, () => {

  test("Checks for correct detection of Element instance", () => {
    expect(isNode(null as any)).toBe(false);
    expect(isNode(document as any)).toBe(true);
    expect(isNode("foo" as any)).toBe(false);
    expect(isNode(document.body as any)).toBe(true);
  });

});
