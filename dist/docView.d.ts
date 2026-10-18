export type DocKind = "html" | "markdown" | "gad" | "image" | "none";
/** IMAGE_EXTENSIONS are the files shown as an image (by the browser). */
export declare const IMAGE_EXTENSIONS: string[];
/** docKindOf is the kind of documentation of the file at path. */
export declare function docKindOf(path: string): DocKind;
/** isImagePath says whether the file at path is an image. */
export declare const isImagePath: (path: string) => boolean;
/** noDocHtml is shown for a file with no documentation to render. */
export declare const noDocHtml = "<p class=\"text-medium-emphasis\">No documentation for this kind of file.</p>";
/** renderDocSource is the rendered documentation of a file that is not gad:
 * the HTML file itself (shown sandboxed), the Markdown file rendered; an
 * image is shown by the panel from its URL. */
export declare function renderDocSource(kind: DocKind, source: string): string;
