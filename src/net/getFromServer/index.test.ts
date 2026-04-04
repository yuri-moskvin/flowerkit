import assert from "node:assert";
import { createServer } from "node:http";
import type { Server } from "node:http";
import {
  after, before, describe, test,
} from "node:test";
import { TextEncoder, TextDecoder } from "util";
import { getFromServer } from "./index.ts";

describe(getFromServer.name, () => {
  let server: Server;
  let testUrl = "";

  before(async () => {
    Object.assign(global as any, { TextDecoder, TextEncoder });

    server = createServer((req, resp) => {
      const origin = `http://${req.headers.host || "127.0.0.1"}`;
      const { pathname } = new URL(req.url || "/", origin);

      if (pathname !== "/todos/1") {
        resp.writeHead(404, { "Content-Type": "application/json" });
        resp.end(JSON.stringify({ message: "Not Found" }));
        return;
      }

      if (req.method === "GET") {
        resp.writeHead(200, { "Content-Type": "application/json" });
        resp.end(JSON.stringify({ userId: 1 }));
        return;
      }

      resp.writeHead(405, { "Content-Type": "application/json" });
      resp.end(JSON.stringify({ message: "Method Not Allowed" }));
    });

    await new Promise<void>((resolve) => {
      server.listen(0, "127.0.0.1", () => resolve());
    });

    const address = server.address();
    if (!address || typeof address === "string") {
      throw new Error("Unable to resolve local test server address");
    }
    testUrl = `http://127.0.0.1:${address.port}/todos/1`;
  });

  after(async () => {
    if (!server) {
      return;
    }
    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  });

  test("Checks for invalid args", async () => {
    await assert.rejects(() =>
      getFromServer({
        // @ts-expect-error testing invalid url argument
        url: null,
      })
    );
    await assert.rejects(() =>
      getFromServer({
        // @ts-expect-error testing invalid allowedCodes argument
        allowedCodes: [ "100" ],
      })
    );
    await assert.rejects(() =>
      getFromServer({
        data: null,
      })
    );
    await assert.rejects(
      getFromServer({
        url: testUrl,
        method: "GET",
        // @ts-expect-error testing invalid data argument
        data: "str",
      })
    );
  });

  test("Checks for correct GET when data is plain object", async () => {
    const result = await getFromServer({
      url: testUrl,
      data: {
        test: 123,
      },
      method: "GET",
    }).then((resp: any) => resp.userId);
    assert.strictEqual(result, 1);
  });

  test("Checks for correct GET when data is FormData instance", async () => {
    const result = await getFromServer({
      url: testUrl,
      data: new FormData(),
      method: "GET",
    }).then((resp: any) => resp.userId);
    assert.strictEqual(result, 1);
  });

  test("Checks for correct GET when no data provided", async () => {
    const result1 = await getFromServer({
      url: testUrl,
      method: "GET",
    }).then((resp: any) => resp.userId);
    assert.strictEqual(result1, 1);

    const result2 = await getFromServer({
      url: testUrl,
      method: "GET",
      data: null,
    }).then((resp: any) => resp.userId);
    assert.strictEqual(result2, 1);
  });

  test("Checks custom response callback", async () => {
    const result = await getFromServer<{
      userId: number;
    }>({
      url: testUrl,
      data: {
        test: 123,
      },
      method: "GET",
      getResp: async (resp) => await resp.json(),
    })
      .then(({ userId }) => userId);
    assert.strictEqual(result, 1);
  });

  test("Checks success response callback", async () => {
    const result = await getFromServer({
      url: testUrl,
      data: {
        test: 123,
      },
      method: "GET",
      getSuccessResp: ({ userId }: any) => userId,
    });
    assert.strictEqual(result, 1);
  });

  test("Checks for error of POST method", async () => {
    await assert.rejects(
      getFromServer({
        url: testUrl,
        method: "POST",
      }), Response
    );
  });

});
