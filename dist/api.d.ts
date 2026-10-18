import type { GadDiagnostic } from "@gad-lang/codemirror-gad";
import type { DocMode, DocResult, FormatResult, OutlineSym, RunResult } from "./types";
import { type GitApi } from "@gad-lang/git-vuetify";
export type { GitAuthor, GitBlame, GitBranch, GitCommit, GitCommitDetail, GitLogFilter } from "@gad-lang/git-vuetify";
export interface Workspace {
    root: string;
    name: string;
    openFile: string;
    /** What the user may do with the files — each omitted is allowed: the
     * Explorer and the editor offer only these. `import` is uploading and
     * downloading a URL by the server (api.upload, api.fetchUrl). */
    actions?: Partial<Record<WorkspaceAction, boolean>>;
    /** The workspace is (in) a git repository: the IDE has its Changes panel
     * (the files changed, compared and edited) and its Git one (the branches,
     * their commits and what each changed) — by api.git. */
    git?: boolean;
}
/** IdeGitApi is what the IDE's Changes and Git panels ask of the
 * workspace's repository: @gad-lang/git-vuetify's GitApi. */
export type IdeGitApi = GitApi;
/** WorkspaceAction is a way of changing the files of the workspace. */
export type WorkspaceAction = "create" | "edit" | "rename" | "move" | "delete" | "import";
export interface TreeNode {
    name: string;
    path: string;
    dir: boolean;
    children?: TreeNode[];
}
export interface ModuleInfo {
    name: string;
    unsafe: boolean;
}
export interface DocComment {
    line: number;
    kind: string;
    title: string;
    content: string;
}
export interface BreakpointSpec {
    line: number;
    disabled?: boolean;
    condition?: string;
}
/** RunProfile is a named run/debug configuration (JetBrains-style): a display
 * name, the file to execute, and command-line arguments passed to its `param`. */
export interface RunProfile {
    name: string;
    path: string;
    args: string[];
    /** GADX only: encode the returned tag as "json"/"yaml" instead of rendering. */
    tagEncode?: string;
}
/** RunMode gates the run/debug actions: "none" (or "") disables Run, Debug and
 * the profile selector; "run" enables Run (and the profile selector); "debug"
 * additionally enables Debug. */
export type RunMode = "none" | "run" | "debug" | "";
/** UploadedFile is one file uploaded into the Explorer: its path (relative to the
 * target — a directory drop keeps its subtree layout) and its text content, or
 * — a binary file (an image, a font) — its bytes (base64) in `bytes`. When
 * `archive` is set it is a downloaded archive the host is asked to extract:
 * `content` may be empty and `bytes` carries the raw archive (base64) instead. */
export interface UploadedFile {
    path: string;
    content: string;
    /** "zip" | "tar" | "tar.gz" when this is an archive to extract; else omitted. */
    archive?: "zip" | "tar" | "tar.gz";
    /** Base64 of the raw bytes: of a binary file, or of an `archive`. */
    bytes?: string;
}
export interface EvalResult {
    ok: boolean;
    value: string;
    error: string;
    stdout: string;
}
export interface InspectEntry {
    key: string;
    accessor: string;
    type: string;
    value: string;
    expandable: boolean;
}
export interface InspectResult {
    type: string;
    value: string;
    expandable: boolean;
    entries: InspectEntry[];
}
export interface DebugFrame {
    name: string;
    file: string;
    line: number;
    column: number;
    locals: DebugVariable[];
}
export interface DebugVariable {
    name: string;
    type: string;
    value: string;
}
export interface DebugResponse {
    session?: string;
    state: "stopped" | "terminated" | "error";
    reason?: string;
    file?: string;
    line?: number;
    column?: number;
    frames?: DebugFrame[];
    locals?: DebugVariable[];
    output?: string;
    stdout?: string;
    stderr?: string;
    result?: string;
    error?: string;
    diagnostics?: GadDiagnostic[];
}
/**
 * createHttpIdeApi is the HTTP client of a `gad ide` server whose API is at
 * base + "api/ide/…" ("/admin/site-files/ide/"); "" — the default — is
 * relative to the page, as an app served by the server itself is.
 */
export declare function createHttpIdeApi(base?: string): {
    /** the workspace's repository (Workspace.git) */
    git: GitApi;
    workspace: () => Promise<Workspace>;
    tree: (hidden?: boolean) => Promise<TreeNode>;
    read: (path: string) => Promise<{
        path: string;
        content: string;
    }>;
    /** rawUrl is the URL of the file's bytes as they are (an image to show). */
    rawUrl: (path: string) => string;
    write: (path: string, content: string) => Promise<{
        path: string;
    }>;
    mkfile: (path: string) => Promise<{
        path: string;
    }>;
    del: (path: string) => Promise<{
        path: string;
    }>;
    rename: (path: string, to: string) => Promise<{
        path: string;
    }>;
    mkdir: (path: string) => Promise<{
        path: string;
    }>;
    /** upload writes files uploaded — text, or bytes (base64) — at their paths. */
    upload: (files: UploadedFile[]) => Promise<{
        paths: string[];
    }>;
    fetchUrl: (url: string, path: string) => Promise<{
        path: string;
        size: number;
    }>;
    config: () => Promise<Record<string, unknown>>;
    saveConfig: (doc: Record<string, unknown>) => Promise<Record<string, unknown>>;
    modules: () => Promise<ModuleInfo[]>;
    format: (source: string) => Promise<FormatResult>;
    /** symbols is the structure of source (`gad symbols`): its declarations as
     * a tree; path (or sourceType) says its dialect. */
    symbols: (source: string, path?: string, sourceType?: string) => Promise<OutlineSym[]>;
    transpile: (source: string, path?: string) => Promise<FormatResult>;
    doc: (source: string) => Promise<DocComment[]>;
    /** docGen generates documentation for source in the requested mode. */
    docGen: (source: string, sourceType: string, mode: DocMode) => Promise<DocResult>;
    eval: (req: {
        expr: string;
        repr?: boolean;
        source?: string;
        path?: string;
    }) => Promise<EvalResult>;
    inspect: (req: {
        expr: string;
        session?: string;
        source?: string;
        path?: string;
        sourceType?: string;
    }) => Promise<{
        ok: boolean;
        inspect?: InspectResult;
        error?: string;
    }>;
    diagnose: (source: string, sourceType?: string) => Promise<GadDiagnostic[]>;
    run: (req: {
        path?: string;
        /** The source dialect ("gad" | "gadTemplate" | "gadx"): the order imports
         *  without an extension resolve in (default: from `path`). */
        sourceType?: string;
        source?: string;
        args?: string[];
        disabled?: string[];
        safe?: boolean;
        saveOut?: string;
        saveStdout?: string;
        saveStderr?: string;
        combine?: boolean;
        tagEncode?: string;
    }) => Promise<RunResult>;
    dbgStart: (req: {
        source: string;
        breakpoints: number[];
        breakpointSpecs?: BreakpointSpec[];
        stopOnEntry: boolean;
        path?: string;
        /** The source dialect ("gad" | "gadTemplate" | "gadx"): the order imports
         *  without an extension resolve in (default: from `path`). */
        sourceType?: string;
        args?: string[];
        disabled?: string[];
        safe?: boolean;
    }) => Promise<DebugResponse>;
    dbgCmd: (session: string, command: string) => Promise<DebugResponse>;
    dbgEval: (session: string, expr: string, repr: boolean) => Promise<{
        ok: boolean;
        value?: string;
        error?: string;
    }>;
};
export declare const ideApi: {
    /** the workspace's repository (Workspace.git) */
    git: GitApi;
    workspace: () => Promise<Workspace>;
    tree: (hidden?: boolean) => Promise<TreeNode>;
    read: (path: string) => Promise<{
        path: string;
        content: string;
    }>;
    /** rawUrl is the URL of the file's bytes as they are (an image to show). */
    rawUrl: (path: string) => string;
    write: (path: string, content: string) => Promise<{
        path: string;
    }>;
    mkfile: (path: string) => Promise<{
        path: string;
    }>;
    del: (path: string) => Promise<{
        path: string;
    }>;
    rename: (path: string, to: string) => Promise<{
        path: string;
    }>;
    mkdir: (path: string) => Promise<{
        path: string;
    }>;
    /** upload writes files uploaded — text, or bytes (base64) — at their paths. */
    upload: (files: UploadedFile[]) => Promise<{
        paths: string[];
    }>;
    fetchUrl: (url: string, path: string) => Promise<{
        path: string;
        size: number;
    }>;
    config: () => Promise<Record<string, unknown>>;
    saveConfig: (doc: Record<string, unknown>) => Promise<Record<string, unknown>>;
    modules: () => Promise<ModuleInfo[]>;
    format: (source: string) => Promise<FormatResult>;
    /** symbols is the structure of source (`gad symbols`): its declarations as
     * a tree; path (or sourceType) says its dialect. */
    symbols: (source: string, path?: string, sourceType?: string) => Promise<OutlineSym[]>;
    transpile: (source: string, path?: string) => Promise<FormatResult>;
    doc: (source: string) => Promise<DocComment[]>;
    /** docGen generates documentation for source in the requested mode. */
    docGen: (source: string, sourceType: string, mode: DocMode) => Promise<DocResult>;
    eval: (req: {
        expr: string;
        repr?: boolean;
        source?: string;
        path?: string;
    }) => Promise<EvalResult>;
    inspect: (req: {
        expr: string;
        session?: string;
        source?: string;
        path?: string;
        sourceType?: string;
    }) => Promise<{
        ok: boolean;
        inspect?: InspectResult;
        error?: string;
    }>;
    diagnose: (source: string, sourceType?: string) => Promise<GadDiagnostic[]>;
    run: (req: {
        path?: string;
        /** The source dialect ("gad" | "gadTemplate" | "gadx"): the order imports
         *  without an extension resolve in (default: from `path`). */
        sourceType?: string;
        source?: string;
        args?: string[];
        disabled?: string[];
        safe?: boolean;
        saveOut?: string;
        saveStdout?: string;
        saveStderr?: string;
        combine?: boolean;
        tagEncode?: string;
    }) => Promise<RunResult>;
    dbgStart: (req: {
        source: string;
        breakpoints: number[];
        breakpointSpecs?: BreakpointSpec[];
        stopOnEntry: boolean;
        path?: string;
        /** The source dialect ("gad" | "gadTemplate" | "gadx"): the order imports
         *  without an extension resolve in (default: from `path`). */
        sourceType?: string;
        args?: string[];
        disabled?: string[];
        safe?: boolean;
    }) => Promise<DebugResponse>;
    dbgCmd: (session: string, command: string) => Promise<DebugResponse>;
    dbgEval: (session: string, expr: string, repr: boolean) => Promise<{
        ok: boolean;
        value?: string;
        error?: string;
    }>;
};
/**
 * IdeApi is the full backend contract the reusable <GadIde> component drives.
 * Any implementation works: the default HTTP client (httpIdeApi, talking to a
 * `gad ide` server) or a fully in-browser one (WASM + a LocalStorage
 * filesystem).
 */
export type IdeApi = Omit<typeof ideApi, "rawUrl" | "upload" | "git" | "symbols"> & {
    /** symbols is the structure of a source (the Structure panel); without it,
     * the panel says there is none. */
    symbols?: (source: string, path?: string, sourceType?: string) => Promise<OutlineSym[]>;
    /** git is the workspace's repository, when it is in one (Workspace.git):
     * the Changes and Git panels. */
    git?: IdeGitApi;
    /** upload writes files uploaded (Workspace.import); without it, only their
     * text is written, file by file. */
    upload?: (files: UploadedFile[]) => Promise<{
        paths: string[];
    }>;
    /** rawUrl is the URL of the file's bytes (an image to show); without it an
     * image file is not shown. */
    rawUrl?: (path: string) => string;
};
/** httpIdeApi is the HTTP implementation of IdeApi (the `gad ide` server). */
export declare const httpIdeApi: IdeApi;
/** probeIde resolves the workspace when the IDE backend is reachable, else null. */
export declare function probeIde(): Promise<Workspace | null>;
