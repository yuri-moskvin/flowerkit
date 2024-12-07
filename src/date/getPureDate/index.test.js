import { getPureDate } from "./index.js";

describe(getPureDate.name, () => {

  test("Gets pure date", () => {

    const stamp = new Date();
    expect(getPureDate(stamp).getHours()).toBe(0);
    expect(getPureDate(stamp).getSeconds()).toBe(0);
    expect(getPureDate(stamp).getMinutes()).toBe(0);
    expect(getPureDate(stamp).getMilliseconds()).toBe(0);

    const wrongStamp = new Date("");
    expect(getPureDate(wrongStamp)).toBe(null);

    const toDate = new Date().getTime();
    expect(getPureDate(toDate).getHours()).toBe(0);
    expect(getPureDate(toDate).getSeconds()).toBe(0);
    expect(getPureDate(toDate).getMinutes()).toBe(0);
    expect(getPureDate(toDate).getMilliseconds()).toBe(0);
  });

});
