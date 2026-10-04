// What the Preview panel shows of the open file, by its type: an HTML file
// rendered (in a sandboxed frame), a Markdown file rendered, the doc comments
// of a gad file (.gad, .gadt, .gadx), an image; nothing of the others.
import { renderDocMarkdown } from "./docMarkdown";

export type DocKind = "html" | "markdown" | "gad" | "image" | "none";

/** IMAGE_EXTENSIONS are the files shown as an image (by the browser). */
export const IMAGE_EXTENSIONS = ["png", "jpg", "jpeg", "gif", "webp", "svg", "avif", "bmp", "ico"];

/** docKindOf is the kind of documentation of the file at path. */
export function docKindOf(path: string): DocKind {
  const m = /\.([^./]+)$/.exec(path.toLowerCase());
  switch (m?.[1]) {
    case "html":
    case "htm":
      return "html";
    case "md":
    case "markdown":
      return "markdown";
    case "gad":
    case "gadt":
    case "gadx":
      return "gad";
    default:
      return m && IMAGE_EXTENSIONS.includes(m[1]) ? "image" : "none";
  }
}

/** isImagePath says whether the file at path is an image. */
export const isImagePath = (path: string) => docKindOf(path) === "image";

/** noDocHtml is shown for a file with no documentation to render. */
export const noDocHtml = `<p class="text-medium-emphasis">No documentation for this kind of file.</p>`;

/** renderDocSource is the rendered documentation of a file that is not gad:
 * the HTML file itself (shown sandboxed), the Markdown file rendered; an
 * image is shown by the panel from its URL. */
export function renderDocSource(kind: DocKind, source: string): string {
  switch (kind) {
    case "html":
      return source;
    case "markdown":
      return renderDocMarkdown(source);
    case "image":
      return "";
    default:
      return noDocHtml;
  }
}
