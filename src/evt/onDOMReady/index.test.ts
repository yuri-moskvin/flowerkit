import { onDOMReady } from "./index.ts";

describe(onDOMReady.name, () => {

  test("Checks for invalid args", () => {
    expect(() => onDOMReady(1 as any)).toThrow();
    expect(() => onDOMReady(null as any)).toThrow();
  });

  test("Checks for correct DOMContentLoaded callback", () => {
    let isReady = false;
    const getReady = () => isReady = true;
    onDOMReady(getReady);
    expect(isReady).toBe(true);
  });

});
