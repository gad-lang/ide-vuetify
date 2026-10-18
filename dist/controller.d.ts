import { type IdeMessages } from "./messages";
import { type InjectionKey, type Ref } from "vue";
import type { GadDiagnostic } from "@gad-lang/codemirror-gad";
import type { LocalVar } from "./codemirror";
import { type DocKind } from "./docView";
import type { DebugResponse, IdeApi, RunMode, RunProfile, TreeNode, UploadedFile, Workspace } from "./api";
import type { RunResult } from "./types";
import type { InspectFn } from "./InspectorNode";
import type { GadEditorView } from "./codemirror";
import { FileTypeRegistry, type FileTypeHandler } from "./fileTypes";
export interface TreeRow {
    node: TreeNode;
    depth: number;
}
/** RunTarget is what run()/debugStart() execute: a file, its content and args. */
export interface RunTarget {
    source: string;
    path: string;
    args: string[];
    /** GADX only: encode the returned tag as "json"/"yaml" instead of rendering. */
    tagEncode?: string;
}
/** BpMeta is a breakpoint's per-line metadata: disabled flag and condition. */
export interface BpMeta {
    disabled?: boolean;
    condition?: string;
}
export type IdeController = ReturnType<typeof createController>;
/** Injection key for the shared controller. */
export declare const IdeControllerKey: InjectionKey<IdeController>;
/** ControllerHooks feed the reactive props/emits GadIde owns into the controller
 * so the editor-panel toolbar (run profiles, run/debug gating) can live here. */
export interface ControllerHooks {
    onReset?: () => Promise<void> | void;
    getRunProfiles?: () => RunProfile[];
    getRunMode?: () => RunMode;
    emitRunProfiles?: (profiles: RunProfile[]) => void;
    /** When true, disables create/delete/upload/import (read-only workspace). */
    getReadonly?: () => boolean;
    /** Auto-save: false = manual; true = on every edit; a positive number = save
     * dirty tabs every N milliseconds. */
    getAutosave?: () => boolean | number;
    /** Max characters of a tab's file name before truncation (default 25). */
    getTabNameMax?: () => number;
    /** Initial editor font size in pixels (default 13). */
    initialFontSize?: number;
    /** Called when the editor font size changes (e.g. to persist it). */
    onFontSize?: (px: number) => void;
    /** The IDE's words (its prompts and confirms, the run label). */
    getWords?: () => IdeMessages;
    /** Extra file-type handlers (icon + editor language/plugin) merged over the
     * built-ins, so hosts can support new extensions. */
    fileTypes?: FileTypeHandler[];
    /** Handle files uploaded (button or drag-drop) into the Explorer. `files` carry
     * paths already prefixed with `targetDir` (the directory they were dropped on,
     * or chosen in the dialog); `targetDir` is also passed for convenience. When
     * absent, the controller writes them to the workspace via `api.write`. */
    onUpload?: (files: UploadedFile[], targetDir: string) => Promise<void> | void;
}
/** PromptRequest / ConfirmRequest back the in-app dialogs that replace the native
 * window.prompt / window.confirm (rendered by GadIde, driven from the controller). */
export interface PromptRequest {
    title: string;
    label: string;
    initial: string;
    resolve: (value: string | null) => void;
}
export interface ConfirmRequest {
    title: string;
    message: string;
    resolve: (ok: boolean) => void;
}
export declare function createController(rawApi: IdeApi, workspace: Workspace, dark: Ref<boolean>, hooks?: ControllerHooks): {
    api: IdeApi;
    dark: Ref<boolean, boolean>;
    writes: Ref<number, number>;
    refreshFile: (path: string) => Promise<void>;
    workspace: Workspace;
    tree: import("vue").ShallowRef<TreeNode | null, TreeNode | null>;
    rows: import("vue").ComputedRef<TreeRow[]>;
    openPath: import("vue").ComputedRef<string>;
    source: import("vue").WritableComputedRef<string, string>;
    isExpanded: (path: string) => boolean;
    toggleDir: (path: string) => void;
    openFile: (path: string) => Promise<void>;
    tabs: Ref<{
        path: string;
        content: string;
        saved: string;
    }[], {
        path: string;
        content: string;
        saved: string;
    }[] | {
        path: string;
        content: string;
        saved: string;
    }[]>;
    active: Ref<number, number>;
    activateTab: (i: number) => void;
    closeTab: (i: number) => void;
    isDirty: (path: string) => boolean;
    autosave: import("vue").ComputedRef<number | boolean>;
    tabNameMax: import("vue").ComputedRef<number>;
    showHidden: Ref<boolean, boolean>;
    toggleHidden: () => Promise<void>;
    newFile: () => Promise<void>;
    newDir: () => Promise<void>;
    removeOpen: () => Promise<void>;
    reset: () => Promise<void>;
    canReset: import("vue").ComputedRef<boolean>;
    upload: (files: UploadedFile[], targetDir?: string) => Promise<void>;
    uploadUrl: (url: string, extract: boolean, targetDir?: string) => Promise<void>;
    urlDialog: Ref<boolean, boolean>;
    uploadProgress: Ref<number, number>;
    pathExists: (path: string) => boolean;
    archiveKind: (name: string) => UploadedFile["archive"] | undefined;
    readonly: import("vue").ComputedRef<boolean>;
    fileTypes: FileTypeRegistry;
    iconFor: (path: string) => string;
    canUpload: import("vue").ComputedRef<boolean>;
    canCreate: import("vue").ComputedRef<boolean>;
    canRename: import("vue").ComputedRef<boolean>;
    canMove: import("vue").ComputedRef<boolean>;
    canDelete: import("vue").ComputedRef<boolean>;
    renameOpen: () => Promise<void>;
    moveOpen: () => Promise<void>;
    moveReq: Ref<{
        path: string;
        resolve: (dir: string | null) => void;
    } | null, {
        path: string;
        resolve: (dir: string | null) => void;
    } | {
        path: string;
        resolve: (dir: string | null) => void;
    } | null>;
    canExtract: import("vue").ComputedRef<boolean>;
    canEdit: import("vue").ComputedRef<boolean>;
    promptReq: Ref<{
        title: string;
        label: string;
        initial: string;
        resolve: (value: string | null) => void;
    } | null, PromptRequest | {
        title: string;
        label: string;
        initial: string;
        resolve: (value: string | null) => void;
    } | null>;
    confirmReq: Ref<{
        title: string;
        message: string;
        resolve: (ok: boolean) => void;
    } | null, ConfirmRequest | {
        title: string;
        message: string;
        resolve: (ok: boolean) => void;
    } | null>;
    diagnose: (src: string, sourceType?: string) => Promise<GadDiagnostic[]>;
    busy: Ref<boolean, boolean>;
    runRes: Ref<{
        ok: boolean;
        stdout: string;
        stderr: string;
        result: string;
        diagnostics: {
            line: number;
            column: number;
            message: string;
            severity: "error" | "warning";
        }[];
    } | null, RunResult | {
        ok: boolean;
        stdout: string;
        stderr: string;
        result: string;
        diagnostics: {
            line: number;
            column: number;
            message: string;
            severity: "error" | "warning";
        }[];
    } | null>;
    run: (target?: RunTarget) => Promise<void>;
    format: () => Promise<void>;
    docHtml: Ref<string, string>;
    docKind: Ref<DocKind, DocKind>;
    refreshDoc: () => Promise<void>;
    isImage: import("vue").ComputedRef<boolean>;
    imageUrl: (path: string) => string;
    registerEditor: (v: GadEditorView | null) => void;
    save: () => Promise<void>;
    reload: () => Promise<void>;
    undo: () => void;
    redo: () => void;
    fontSize: Ref<number, number>;
    incFont: () => void;
    decFont: () => void;
    setFontSize: (px: number) => void;
    runProfiles: import("vue").ComputedRef<RunProfile[]>;
    runMode: import("vue").ComputedRef<RunMode>;
    activeProfile: Ref<string | null, string | null>;
    profileDialog: Ref<boolean, boolean>;
    activeProfileObj: import("vue").ComputedRef<RunProfile | null>;
    runLabel: import("vue").ComputedRef<string>;
    canRun: import("vue").ComputedRef<boolean>;
    canDebug: import("vue").ComputedRef<boolean>;
    runActive: () => Promise<void>;
    debugActive: () => Promise<void>;
    addProfile: (p: RunProfile) => void;
    deleteProfile: (name: string) => void;
    docRequest: Ref<number, number>;
    requestDocs: () => void;
    settingsOpen: Ref<boolean, boolean>;
    session: Ref<string | null, string | null>;
    snap: Ref<{
        session?: string | undefined;
        state: "stopped" | "terminated" | "error";
        reason?: string | undefined;
        file?: string | undefined;
        line?: number | undefined;
        column?: number | undefined;
        frames?: {
            name: string;
            file: string;
            line: number;
            column: number;
            locals: {
                name: string;
                type: string;
                value: string;
            }[];
        }[] | undefined;
        locals?: {
            name: string;
            type: string;
            value: string;
        }[] | undefined;
        output?: string | undefined;
        stdout?: string | undefined;
        stderr?: string | undefined;
        result?: string | undefined;
        error?: string | undefined;
        diagnostics?: {
            line: number;
            column: number;
            message: string;
            severity: "error" | "warning";
        }[] | undefined;
    } | null, DebugResponse | {
        session?: string | undefined;
        state: "stopped" | "terminated" | "error";
        reason?: string | undefined;
        file?: string | undefined;
        line?: number | undefined;
        column?: number | undefined;
        frames?: {
            name: string;
            file: string;
            line: number;
            column: number;
            locals: {
                name: string;
                type: string;
                value: string;
            }[];
        }[] | undefined;
        locals?: {
            name: string;
            type: string;
            value: string;
        }[] | undefined;
        output?: string | undefined;
        stdout?: string | undefined;
        stderr?: string | undefined;
        result?: string | undefined;
        error?: string | undefined;
        diagnostics?: {
            line: number;
            column: number;
            message: string;
            severity: "error" | "warning";
        }[] | undefined;
    } | null>;
    dbgOutput: Ref<string, string>;
    breakpoints: import("vue").WritableComputedRef<number[], number[]>;
    debugLine: import("vue").ComputedRef<number>;
    debugColumn: import("vue").ComputedRef<number>;
    stopped: import("vue").ComputedRef<boolean>;
    getLocals: () => Map<string, LocalVar>;
    debugStart: (target?: RunTarget) => Promise<void>;
    debugCmd: (command: "continue" | "next" | "stepIn" | "stepOut") => Promise<void>;
    evalExpr: Ref<string, string>;
    evalOut: Ref<string, string>;
    doEval: () => Promise<void>;
    inspectFn: InspectFn;
    dialect: import("vue").ComputedRef<string>;
    bpFor: (path?: string) => number[];
    bpMetaFor: (path?: string) => Record<number, BpMeta>;
    allBreakpoints: () => Record<string, number[]>;
    setFileBreakpoints: (path: string, lines: number[]) => void;
    setBpMeta: (path: string, line: number, meta: BpMeta) => void;
    removeBreakpoint: (path: string, line: number) => void;
    gotoTarget: Ref<{
        line: number;
        seq: number;
    }, {
        line: number;
        seq: number;
    } | {
        line: number;
        seq: number;
    }>;
    goto: (line: number) => void;
    gotoFileLine: (path: string, line: number) => Promise<void>;
    bpDialog: Ref<{
        path: string;
        line: number;
    } | null, {
        path: string;
        line: number;
    } | {
        path: string;
        line: number;
    } | null>;
    openBpCondition: (path: string, line: number) => void;
    init: () => Promise<void>;
};
