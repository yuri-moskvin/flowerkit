
import { isStrUrl } from "./index.js";

describe(isStrUrl.name, () => {

  test("Checks for invalid args", () => {
    expect(() => isStrUrl(123)).toThrow();
    expect(() => isStrUrl(null)).toThrow();
  });

  test("Checks for different valid paths of URL", () => {
    expect(isStrUrl("google.com/test/?query")).toBe(true);
    expect(isStrUrl("www.test.com")).toBe(true);
    expect(isStrUrl("www.test")).toBe(true);
    expect(isStrUrl("request.php")).toBe(true);
    expect(isStrUrl("google.html")).toBe(true);
    expect(isStrUrl("google.html?query=test")).toBe(true);
    expect(isStrUrl("google.html:9900?query=test")).toBe(true);
  });

  test("Checks for invalid strings", () => {
    expect(isStrUrl("")).toBe(false);
    expect(isStrUrl("123")).toBe(false);
    expect(isStrUrl("str.")).toBe(false);
    expect(isStrUrl("str.a")).toBe(false);
  });

});
