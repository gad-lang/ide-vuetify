// Unit tests of the HTTP client of the IDE (bun test): its URLs under a base.
import { afterEach, describe, expect, test } from "bun:test";
import { createHttpIdeApi, ideApi } from "../src/api";

const realFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = realFetch;
});

// asked records the requests made, each answered {}.
const record = () => {
  const asked: { method: string; url: string }[] = [];
  globalThis.fetch = (async (url: string, init?: RequestInit) => {
    asked.push({ method: init?.method || "GET", url: String(url) });
    return new Response("{}", { status: 200 });
  }) as typeof fetch;
  return asked;
};

describe("createHttpIdeApi", () => {
  test("every URL under the base", async () => {
    const asked = record();
    const api = createHttpIdeApi("/admin/site-files/ide/");
    await api.workspace();
    await api.tree(true);
    await api.read("a b.gad");
    await api.write("x.gad", "1");
    expect(asked).toEqual([
      { method: "GET", url: "/admin/site-files/ide/api/ide/workspace" },
      { method: "GET", url: "/admin/site-files/ide/api/ide/tree?hidden=true" },
      { method: "GET", url: "/admin/site-files/ide/api/ide/file?path=a%20b.gad" },
      { method: "PUT", url: "/admin/site-files/ide/api/ide/file" },
    ]);
    expect(api.rawUrl("i.png")).toBe("/admin/site-files/ide/api/ide/file?raw=1&path=i.png");
  });

  test("no base: relative to the page, as before", async () => {
    const asked = record();
    await ideApi.workspace();
    expect(asked[0].url).toBe("api/ide/workspace");
    expect(ideApi.rawUrl("i.png")).toBe("api/ide/file?raw=1&path=i.png");
  });
});
