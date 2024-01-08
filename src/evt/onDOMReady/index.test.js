import { onDOMReady } from "./index.js";

describe(onDOMReady.name, () => {

  test("Checks for invalid args", () => {
    expect(() => onDOMReady(1)).toThrow();
    expect(() => onDOMReady(null)).toThrow();
  });

  test("Checks for correct DOMContentLoaded callback", () => {
    let isReady = false;
    const getReady = () => isReady = true;
    onDOMReady(getReady);
    expect(isReady).toBe(true);
  });

});
