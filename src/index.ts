// @gad-lang/ide-vuetify — a reusable Vuetify 3 IDE for the Gad language.
//
// <GadIde> renders the full workspace UI (dockview file explorer / editor /
// run-doc-debug panels, resizable & movable, plus a stepping debugger) and is
// backend-agnostic: pass any `IdeApi` implementation via the `api` prop. Two
// independent v-models — `layoutConfig` (dockview layout) and `config` (project
// settings). Requires Vue 3, Vuetify 3 and dockview-vue as peer dependencies.
export { default as GadIde } from "./GadIde";
export type { ExtraPanel, HeaderAction } from "./extraPanels";
export {
  DEFAULT_MESSAGES,
  DEFAULT_IDE_OWN_MESSAGES,
  IDE_OWN_MESSAGES_PT_BR,
  IDE_I18N_MESSAGES,
  IDE_I18N_NAMESPACE,
  useIdeMessages,
  type IdeMessages,
  type IdeOwnMessages,
} from "./messages";
// the Git panels' words by vue-i18n: @gad-lang/git-vuetify's
export { GIT_I18N_MESSAGES, GIT_I18N_NAMESPACE, GIT_MESSAGES_PT_BR } from "@gad-lang/git-vuetify";
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
  GitLogFilter,
  GitAuthor,
  GitBlame,
  GitBranch,
  GitCommit,
  GitCommitDetail,
} from "./api";

// The diff browser, the resize edges, the Git and Changes panels:
// @gad-lang/git-vuetify's, re-exported.
export {
  DiffBrowser,
  DiffMergeView,
  LANGUAGES,
  languageExtensions,
  languageOf,
  renamedTo,
  statusColor,
  treePath,
  unchangedContent,
  GitPanel,
  ChangesPanel,
  createHttpGitApi,
  type LanguageOptions,
  type Content,
  type DiffFile,
  type SaveState,
  type GitApi,
  type GitMessages,
} from "@gad-lang/git-vuetify";
export type { FormatResult, RunResult, GadRunner, DocMode, DocResult, OutlineSym } from "./types";
export { default as DocPanel } from "./DocPanel";
export { StructureTree, KIND_ICONS, kindIcon } from "./structure";
export { ResizeHandle, useStoredSize } from "@gad-lang/git-vuetify";

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
