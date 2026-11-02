import { describe, expect, test } from "bun:test";
import { ref } from "vue";
import { createController } from "../src/controller";
import type { IdeApi } from "../src/api";

// A drag in the Explorer: confirmed (from, to as the workspace's paths), then
// renamed; nothing into itself, nor where it is.
describe("dropMove", () => {
  const setup = () => {
    const renames: [string, string][] = [];
    const api = {
      tree: async () => ({ name: "", path: "", dir: true, children: [] }),
      rename: async (from: string, to: string) => void renames.push([from, to]),
    } as unknown as IdeApi;
    const ctx = createController(api, { root: "/", name: "w" } as never, ref(false));
    return { ctx, renames };
  };
  test("confirmed: moved, the message from and to", async () => {
    const { ctx, renames } = setup();
    const p = ctx.dropMove("a/b/c.gad", "x");
    await Promise.resolve();
    expect(ctx.confirmReq.value?.message).toBe("c.gad\nFrom: /a/b\nTo: /x");
    ctx.confirmReq.value!.resolve(true);
    await p;
    expect(renames).toEqual([["a/b/c.gad", "x/c.gad"]]);
  });
  test("to the root; a folder", async () => {
    const { ctx, renames } = setup();
    const p = ctx.dropMove("a/b", "");
    await Promise.resolve();
    expect(ctx.confirmReq.value?.message).toBe("b\nFrom: /a\nTo: /");
    ctx.confirmReq.value!.resolve(true);
    await p;
    expect(renames).toEqual([["a/b", "b"]]);
  });
  test("refused: canceled, into itself, where it is", async () => {
    const { ctx, renames } = setup();
    const p = ctx.dropMove("a/c.gad", "x");
    await Promise.resolve();
    ctx.confirmReq.value!.resolve(false);
    await p;
    await ctx.dropMove("a/b", "a/b/c");
    await ctx.dropMove("a/b", "a/b");
    await ctx.dropMove("a/c.gad", "a");
    expect(renames).toEqual([]);
  });
});
