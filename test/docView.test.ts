import { describe, expect, test } from "bun:test";
import { docKindOf, isImagePath, noDocHtml, renderDocSource } from "../src/docView";

describe("docKindOf", () => {
  test("by the extension of the open file", () => {
    expect(docKindOf("site/index.html")).toBe("html");
    expect(docKindOf("a/B.HTM")).toBe("html");
    expect(docKindOf("README.md")).toBe("markdown");
    expect(docKindOf("doc/guide.markdown")).toBe("markdown");
    expect(docKindOf("config/layout_config.gad")).toBe("gad");
    expect(docKindOf("templates/page.gadt")).toBe("gad");
    expect(docKindOf("templates/comps.gadx")).toBe("gad");
    expect(docKindOf("static/logo.PNG")).toBe("image");
    expect(docKindOf("static/icon.svg")).toBe("image");
    expect(docKindOf("static/site.css")).toBe("none");
    expect(docKindOf("Makefile")).toBe("none");
    expect(docKindOf("")).toBe("none");
  });
  test("the extension of the file, not of its directory", () => {
    expect(docKindOf("x.md/notes")).toBe("none");
    expect(isImagePath("img.png/a.gad")).toBe(false);
    expect(isImagePath("a/photo.jpeg")).toBe(true);
  });
});

describe("renderDocSource", () => {
  test("an HTML file is itself", () => {
    const html = "<h1>Hi</h1><script>alert(1)</script>";
    expect(renderDocSource("html", html)).toBe(html);
  });
  test("a Markdown file rendered", () => {
    const out = renderDocSource("markdown", "# Title\n\nSome **bold** text.\n\n- one\n- two\n");
    expect(out).toContain("<h");
    expect(out).toContain("<strong>bold</strong>");
    expect(out).toContain("<li>one</li>");
  });
  test("Markdown's raw HTML is escaped", () => {
    expect(renderDocSource("markdown", "<script>x</script>")).not.toContain("<script>");
  });
  test("an image is shown from its URL; others have no documentation", () => {
    expect(renderDocSource("image", "")).toBe("");
    expect(renderDocSource("none", "body {}")).toBe(noDocHtml);
  });
});
