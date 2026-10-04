// Unit tests of the Markdown of doc comments (bun test).
import { describe, expect, test } from "bun:test";
import { renderDocComments, renderDocMarkdown } from "../src/docMarkdown";

describe("renderDocMarkdown", () => {
  test("a bullet goes on over its indented lines", () => {
    const html = renderDocMarkdown(
      "- The admin reads `Config` and draws its classes as the options forms: a\n" +
        "  page's is `PageConfig`.\n" +
        "- The templates import it.",
    );
    expect(html).toBe(
      "<ul><li>The admin reads <code>Config</code> and draws its classes as the options forms: a " +
        "page's is <code>PageConfig</code>.</li><li>The templates import it.</li></ul>",
    );
  });

  test("a code span over two lines of an item", () => {
    const html = renderDocMarkdown('- options are a `PostTypeConfig`: `{"PostLayout":\n  "ServiceOptions"}` — its form');
    expect(html).toBe(
      '<ul><li>options are a <code>PostTypeConfig</code>: <code>{"PostLayout": "ServiceOptions"}</code> — its form</li></ul>',
    );
  });

  test("paragraphs: their lines joined, apart by blank lines", () => {
    expect(renderDocMarkdown("What a page tells its layout\ndeclared as classes.\n\nWhat is saved:")).toBe(
      "<p>What a page tells its layout declared as classes.</p><p>What is saved:</p>",
    );
  });

  test("a paragraph after a list is not part of its last item", () => {
    expect(renderDocMarkdown("- one\n  more\n\nIn a class:")).toBe("<ul><li>one more</li></ul><p>In a class:</p>");
  });

  test("an unindented line after a bullet ends the list", () => {
    expect(renderDocMarkdown("- one\nnot an item")).toBe("<ul><li>one</li></ul><p>not an item</p>");
  });

  test("headings, quotes, inline formatting", () => {
    expect(renderDocMarkdown("# The layouts' options")).toBe("<h1>The layouts' options</h1>");
    expect(renderDocMarkdown("> a note")).toBe("<blockquote>a note</blockquote>");
    expect(renderDocMarkdown("**bold** and *it* <x>")).toBe("<p><strong>bold</strong> and <em>it</em> &lt;x&gt;</p>");
  });

  test("a fenced block is code, not a list", () => {
    const html = renderDocMarkdown("```\n- x := 1\n```");
    expect(html).toStartWith('<pre class="doc-code language-gad"><code>');
    expect(html).not.toContain("<li>");
  });
});

describe("renderDocComments", () => {
  test("the doc of the file is untitled; a declaration's, under its line", () => {
    const html = renderDocComments([
      { kind: "root", title: "export class Default {", content: "# The layouts' options" },
      { kind: "single", title: "export class Default {", content: "What a page tells the default layout." },
    ]);
    expect(html).toBe(
      "<h1>The layouts' options</h1>\n<h4>export class Default {</h4><p>What a page tells the default layout.</p>",
    );
  });

  test("a title is escaped; with none, the kind", () => {
    expect(renderDocComments([{ kind: "block", title: "a < b", content: "x" }])).toBe("<h4>a &lt; b</h4><p>x</p>");
    expect(renderDocComments([{ kind: "block", content: "x" }])).toBe("<h4>block</h4><p>x</p>");
  });

  test("no doc comments", () => {
    expect(renderDocComments([])).toContain("No documentation comments");
  });
});

describe("renderDocMarkdown tables", () => {
  test("a table: its head and its rows", () => {
    const out = renderDocMarkdown("| slot | what |\n|---|:--:|\n| `head_end` | tags at the end of `<head>` |\n| a \\| b | c |\n\nafter");
    expect(out).toBe(
      "<table><thead><tr><th>slot</th><th>what</th></tr></thead><tbody>" +
        "<tr><td><code>head_end</code></td><td>tags at the end of <code>&lt;head&gt;</code></td></tr>" +
        "<tr><td>a | b</td><td>c</td></tr></tbody></table><p>after</p>",
    );
  });
  test("pipes with no separator row are text", () => {
    expect(renderDocMarkdown("| a | b |")).toBe("<p>| a | b |</p>");
  });
});
