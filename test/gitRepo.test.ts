import { describe, expect, test } from "bun:test";
import { repoOf } from "../src/panels/gitRepo";

// The repository of a file: the deepest one it is in; the workspace's ("")
// when in no folder's; none when the workspace is in none.
describe("repoOf", () => {
  test("the deepest", () => {
    const repos = ["", "a", "a/b"];
    expect(repoOf(repos, "a/b/c.txt")).toBe("a/b");
    expect(repoOf(repos, "a/c.txt")).toBe("a");
    expect(repoOf(repos, "ab/c.txt")).toBe("");
    expect(repoOf(repos, "x.txt")).toBe("");
  });
  test("a workspace in no repository", () => {
    expect(repoOf(["a", "b/c"], "b/c/f.txt")).toBe("b/c");
    expect(repoOf(["a", "b/c"], "b/x.txt")).toBeUndefined();
    expect(repoOf(["b/c", ""], "b/c/f")).toBe("b/c");
  });
});
