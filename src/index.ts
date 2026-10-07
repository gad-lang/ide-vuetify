// @gad-lang/ide-vuetify — a reusable Vuetify 3 IDE for the Gad language.
//
// <GadIde> renders the full workspace UI (dockview file explorer / editor /
// run-doc-debug panels, resizable & movable, plus a stepping debugger) and is
// backend-agnostic: pass any `IdeApi` implementation via the `api` prop. Two
// independent v-models — `layoutConfig` (dockview layout) and `config` (project
// settings). Requires Vue 3, Vuetify 3 and dockview-vue as peer dependencies.
export { default as GadIde } from "./GadIde";
export type { ExtraPanel } from "./extraPanels";
export { default as GadEditor } from "./GadEditor";
export { default as GadPlayground } from "./GadPlayground";
export { default as GadNotebook } from "./GadNotebook";
export { default as InspectorNode, type InspectFn } from "./InspectorNode";

// Backend contract + the built-in HTTP implementation.
export { httpIdeApi, ideApi, probeIde, createHttpIdeApi } from "./api";
export type {
  IdeApi,
  Workspace,
  WorkspaceAction,
  TreeNode,
  ModuleInfo,
  DocComment,
  BreakpointSpec,
  RunProfile,
  RunMode,
  UploadedFile,
  EvalResult,
  InspectEntry,
  InspectResult,
  DebugFrame,
  DebugVariable,
  DebugResponse,
  IdeGitApi,
  GitBranch,
  GitCommit,
  GitCommitDetail,
} from "./api";

// The diff browser (the Changes and Git panels'): rvq's <vx-diff-browser> too.
export * from "./diff";
export type { FormatResult, RunResult, GadRunner, DocMode, DocResult } from "./types";
export { default as DocPanel } from "./DocPanel";

// CodeMirror building blocks (for composing a custom shell).
export {
  GadEditorView,
  langExtension,
  langOf,
  type EditorLanguage,
  type TemplateDelimiters,
  type LocalVar,
} from "./codemirror";
export { renderDocMarkdown } from "./docMarkdown";
export { FileTypeRegistry, DEFAULT_FILE_TYPES, type FileTypeHandler } from "./fileTypes";
export { createController, IdeControllerKey, type IdeController, type BpMeta } from "./controller";

// Dockview layout serialization type, for typing the `layoutConfig` v-model.
export type { SerializedDockview } from "dockview-vue";
