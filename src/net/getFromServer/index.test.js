import fetch from "node-fetch";
import { TextEncoder, TextDecoder } from "util";
import { getFromServer } from "./index.js";

describe(getFromServer.name, () => {

  beforeAll(() => {
    Object.assign(global, { TextDecoder, TextEncoder, fetch });
  });

  const testUrl = "https://jsonplaceholder.typicode.com/todos/1";

  test("Checks for invalid args", () => {
    expect(() => getFromServer({
      url: null,
    })).rejects.toThrow();
    expect(() => getFromServer({
      allowedCodes: [ "100" ],
    })).rejects.toThrow();
    expect(() => getFromServer({
      data: null,
    })).rejects.toThrow();
    expect(
      getFromServer({
        url: testUrl,
        method: "GET",
        data: "str"
      })
    ).rejects.toThrow();
  });

  test("Checks for correct GET when data is plain object", async () => {
    expect(
      await getFromServer({
        url: testUrl,
        data: {
          test: 123,
        },
        method: "GET"
      }).then((resp) => resp.userId)
    ).toBe(1);
  });

  test("Checks for correct GET when data is FormData instance", async () => {
    expect(
      await getFromServer({
        url: testUrl,
        data: new FormData(),
        method: "GET"
      }).then((resp) => resp.userId)
    ).toBe(1);
  });

  test("Checks for correct GET when no data provided", async () => {
    expect(
      await getFromServer({
        url: testUrl,
        method: "GET"
      }).then((resp) => resp.userId)
    ).toBe(1);
    expect(
      await getFromServer({
        url: testUrl,
        method: "GET",
        data: null
      }).then((resp) => resp.userId)
    ).toBe(1);
  });

  test("Checks custom response callback", async () => {
    expect(
      await getFromServer({
        url: testUrl,
        data: {
          test: 123,
        },
        method: "GET",
        getResp: async (resp) => await resp.json()
      })
        .then(({ userId }) => userId)
    ).toBe(1);
  });

  test("Checks success response callback", async () => {
    expect(
      await getFromServer({
        url: testUrl,
        data: {
          test: 123,
        },
        method: "GET",
        getSuccessResp: ({ userId }) => userId
      })
    ).toBe(1);
  });

  test("Checks for DELETE method", async () => {
    expect(
      await getFromServer({
        url: testUrl,
        method: "DELETE"
      })
    ).toStrictEqual({});
  });

  test("Checks for error of POST method", async () => {
    await expect(
      getFromServer({
        url: testUrl,
        method: "POST"
      })
    ).rejects.toBe(404);
  });


});
