/** renderDocMarkdown converts doc-comment Markdown to HTML, highlighting fenced
 * code blocks with the Gad (or named) Prism grammar. Code defaults to `gad`. */
export declare function renderDocMarkdown(md: string): string;
/** A doc comment of a file, as the IDE's backend gives it. */
export interface DocCommentEntry {
    kind: string;
    title?: string;
    content: string;
}
export declare function renderDocComments(docs: DocCommentEntry[]): string;
