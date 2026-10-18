/** DocRootFn returns the doc root (a path or absolute URI) for a source path. */
export type DocRootFn = (sourcePath: string) => string;
/** resolveDocRef maps one doc-comment URL to a doc-tree path, or null to leave it
 * unchanged (external URL, anchor, data URI, empty). */
export declare function resolveDocRef(url: string, docRoot: string, fileDir: string): string | null;
/** resolveDocPaths rewrites `src`/`href` references in doc HTML to their doc-tree
 * paths for the source at sourcePath. docRootFor overrides the default `doc` root
 * (e.g. to serve assets from a different URI). */
export declare function resolveDocPaths(html: string, sourcePath: string, docRootFor?: DocRootFn): string;
