// IdeApi — the backend contract the <GadIde> Vuetify component drives. It is
// framework-agnostic (plain types + fetch), and structurally the same contract
// as @gad-lang/ide-react's, so the same in-browser backend (WASM + a
// LocalStorage filesystem) can drive either UI. Every method operates on
// workspace file paths, so the UI edits and documents any text file in the tree
// regardless of backend.
import type { GadDiagnostic } from "@gad-lang/codemirror-gad";
import type { DocMode, DocResult, FormatResult, RunResult } from "./types";
import type { DiffFile } from "./diff/diffBrowserContext";

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

/** GitBranch is a branch of the workspace's repository. */
export interface GitBranch {
  /** "main", "origin/main" */
  name: string;
  /** the commit it points at */
  hash: string;
  /** a remote's */
  remote?: boolean;
  /** the one checked out */
  current?: boolean;
  /** its commit's subject */
  subject?: string;
}

/** GitCommit is a commit of a branch's log. */
export interface GitCommit {
  hash: string;
  parents: string[];
  author: string;
  email: string;
  /** ISO 8601 */
  date: string;
  subject: string;
  /** the branches and tags at it ("HEAD -> main", "tag: v1") */
  refs?: string[];
}

/** GitCommitDetail is a commit with its full message and the files it
 * changed (from its first parent: the commit before). */
export interface GitCommitDetail extends GitCommit {
  message: string;
  files: DiffFile[];
}

/** IdeGitApi is what the IDE's Changes and Git panels ask of the
 * workspace's repository. Paths are the workspace's. */
export interface IdeGitApi {
  /** the files changed (not committed): their summary */
  changes: () => Promise<DiffFile[]>;
  /** the diff of a file changed: its old (HEAD's) and current contents */
  diff: (path: string, from?: string) => Promise<DiffFile>;
  /** writes the file changed with content (edited in the compare) */
  save: (path: string, content: string) => Promise<void>;
  branches: () => Promise<GitBranch[]>;
  /** the commits of ref, newest first: limit of them after skip */
  log: (ref: string, skip?: number, limit?: number) => Promise<GitCommit[]>;
  commit: (hash: string) => Promise<GitCommitDetail>;
  /** the diff of a file the commit changed, with the commit before */
  commitDiff: (hash: string, path: string, from?: string) => Promise<DiffFile>;
  /** the URL that downloads the file as the commit has it */
  fileUrl?: (hash: string, path: string) => string;
  /** the URL that downloads the commit's patch (from the commit before): of
   * the file at path, or the whole commit's */
  patchUrl?: (hash: string, path?: string) => string;
}

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
  file?: string; // workspace-relative file of the current stop
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

async function jsonFetch<T>(method: string, url: string, body?: unknown): Promise<T> {
  const r = await fetch(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error((data as { error?: string }).error || r.statusText);
  return data as T;
}

/**
 * createHttpIdeApi is the HTTP client of a `gad ide` server whose API is at
 * base + "api/ide/…" ("/admin/site-files/ide/"); "" — the default — is
 * relative to the page, as an app served by the server itself is.
 */
export function createHttpIdeApi(base = "") {
  const u = (p: string) => base + p;
  const q = (params: Record<string, string | number | undefined>) =>
    Object.entries(params)
      .filter(([, v]) => v !== undefined && v !== "")
      .map(([k, v]) => k + "=" + encodeURIComponent(String(v)))
      .join("&");
  const git: IdeGitApi = {
    changes: () => jsonFetch<{ files: DiffFile[] }>("GET", u("api/ide/git/changes")).then((r) => r.files || []),
    diff: (path, from) => jsonFetch<DiffFile>("GET", u("api/ide/git/diff?") + q({ path, from })),
    save: (path, content) => jsonFetch<unknown>("POST", u("api/ide/git/save"), { path, content }).then(() => undefined),
    branches: () => jsonFetch<{ branches: GitBranch[] }>("GET", u("api/ide/git/branches")).then((r) => r.branches || []),
    log: (ref, skip, limit) =>
      jsonFetch<{ commits: GitCommit[] }>("GET", u("api/ide/git/log?") + q({ ref, skip, limit })).then((r) => r.commits || []),
    commit: (hash) => jsonFetch<GitCommitDetail>("GET", u("api/ide/git/commit?") + q({ hash })),
    commitDiff: (hash, path, from) => jsonFetch<DiffFile>("GET", u("api/ide/git/commit/diff?") + q({ hash, path, from })),
    fileUrl: (hash, path) => u("api/ide/git/file?") + q({ hash, path }),
    patchUrl: (hash, path) => u("api/ide/git/patch?") + q({ hash, path }),
  };
  return {
    /** the workspace's repository (Workspace.git) */
    git,
    workspace: () => jsonFetch<Workspace>("GET", u("api/ide/workspace")),
    tree: (hidden = false) =>
      jsonFetch<TreeNode>("GET", u("api/ide/tree") + (hidden ? "?hidden=true" : "")),
    read: (path: string) =>
      jsonFetch<{ path: string; content: string }>(
        "GET",
        u("api/ide/file?path=") + encodeURIComponent(path),
      ),
    /** rawUrl is the URL of the file's bytes as they are (an image to show). */
    rawUrl: (path: string) => u("api/ide/file?raw=1&path=") + encodeURIComponent(path),
    write: (path: string, content: string) =>
      jsonFetch<{ path: string }>("PUT", u("api/ide/file"), { path, content }),
    mkfile: (path: string) => jsonFetch<{ path: string }>("PUT", u("api/ide/file"), { path, content: "" }),
    del: (path: string) => jsonFetch<{ path: string }>("POST", u("api/ide/delete"), { path }),
    rename: (path: string, to: string) =>
      jsonFetch<{ path: string }>("POST", u("api/ide/rename"), { path, to }),
    mkdir: (path: string) => jsonFetch<{ path: string }>("POST", u("api/ide/mkdir"), { path }),
    /** upload writes files uploaded — text, or bytes (base64) — at their paths. */
    upload: (files: UploadedFile[]) =>
      jsonFetch<{ paths: string[] }>("POST", u("api/ide/upload"), {
        files: files.map((f) => (f.bytes ? { path: f.path, bytes: f.bytes } : { path: f.path, content: f.content })),
      }),
    fetchUrl: (url: string, path: string) =>
      jsonFetch<{ path: string; size: number }>("POST", u("api/ide/fetch"), { url, path }),
    config: () => jsonFetch<Record<string, unknown>>("GET", u("api/ide/config")),
    saveConfig: (doc: Record<string, unknown>) =>
      jsonFetch<Record<string, unknown>>("PUT", u("api/ide/config"), doc),
    modules: () => jsonFetch<ModuleInfo[]>("GET", u("api/ide/modules")),
    format: (source: string) => jsonFetch<FormatResult>("POST", u("api/ide/format"), { source }),
    transpile: (source: string, path?: string) =>
      jsonFetch<FormatResult>("POST", u("api/ide/transpile"), { source, path }),
    doc: (source: string) =>
      jsonFetch<{ docs: DocComment[] }>("POST", u("api/ide/doc"), { source }).then((r) => r.docs || []),
    /** docGen generates documentation for source in the requested mode. */
    docGen: (source: string, sourceType: string, mode: DocMode): Promise<DocResult> =>
      jsonFetch<DocResult>("POST", u("api/ide/doc-gen"), { source, sourceType, mode }),
    eval: (req: { expr: string; repr?: boolean; source?: string; path?: string }) =>
      jsonFetch<EvalResult>("POST", u("api/ide/eval"), req),
    inspect: (req: { expr: string; session?: string; source?: string; path?: string; sourceType?: string }) =>
      jsonFetch<{ ok: boolean; inspect?: InspectResult; error?: string }>("POST", u("api/ide/inspect"), req),
    diagnose: (source: string, sourceType?: string) =>
      jsonFetch<{ diagnostics: GadDiagnostic[] }>("POST", u("api/ide/diagnose"), { source, sourceType }).then(
        (r) => r.diagnostics || [],
      ),
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
    }) => jsonFetch<RunResult>("POST", u("api/ide/run"), req),
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
    }) => jsonFetch<DebugResponse>("POST", u("api/ide/debug/start"), req),
    dbgCmd: (session: string, command: string) =>
      jsonFetch<DebugResponse>("POST", u("api/ide/debug/command"), { session, command }),
    dbgEval: (session: string, expr: string, repr: boolean) =>
      jsonFetch<{ ok: boolean; value?: string; error?: string }>("POST", u("api/ide/debug/eval"), {
        session,
        expr,
        repr,
      }),
  };
}

export const ideApi = createHttpIdeApi();

/**
 * IdeApi is the full backend contract the reusable <GadIde> component drives.
 * Any implementation works: the default HTTP client (httpIdeApi, talking to a
 * `gad ide` server) or a fully in-browser one (WASM + a LocalStorage
 * filesystem).
 */
export type IdeApi = Omit<typeof ideApi, "rawUrl" | "upload" | "git"> & {
  /** git is the workspace's repository, when it is in one (Workspace.git):
   * the Changes and Git panels. */
  git?: IdeGitApi;
  /** upload writes files uploaded (Workspace.import); without it, only their
   * text is written, file by file. */
  upload?: (files: UploadedFile[]) => Promise<{ paths: string[] }>;
  /** rawUrl is the URL of the file's bytes (an image to show); without it an
   * image file is not shown. */
  rawUrl?: (path: string) => string;
};

/** httpIdeApi is the HTTP implementation of IdeApi (the `gad ide` server). */
export const httpIdeApi: IdeApi = ideApi;

/** probeIde resolves the workspace when the IDE backend is reachable, else null. */
export async function probeIde(): Promise<Workspace | null> {
  try {
    return await ideApi.workspace();
  } catch {
    return null;
  }
}
