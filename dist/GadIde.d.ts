import { type PropType } from "vue";
import type { SerializedDockview } from "dockview-vue";
import type { IdeApi, RunMode, RunProfile, UploadedFile, Workspace } from "./api";
import type { FileTypeHandler } from "./fileTypes";
import { type ExtraPanel, type HeaderAction } from "./extraPanels";
import { type IdeMessages } from "./messages";
import "./styles.css";
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    api: {
        type: PropType<IdeApi>;
        required: true;
    };
    workspace: {
        type: PropType<Workspace>;
        required: true;
    };
    dark: {
        type: BooleanConstructor;
        default: boolean;
    };
    onReset: {
        type: PropType<() => Promise<void> | void>;
        default: undefined;
    };
    /** Handle files uploaded (Explorer button or drag-drop). When absent, files
     * are written to the workspace via the api. */
    onUpload: {
        type: PropType<(files: UploadedFile[]) => Promise<void> | void>;
        default: undefined;
    };
    layoutConfig: {
        type: PropType<SerializedDockview | null>;
        default: null;
    };
    config: {
        type: PropType<Record<string, unknown>>;
        default: () => {};
    };
    runProfiles: {
        type: PropType<RunProfile[]>;
        default: () => never[];
    };
    /** Gates the run/debug actions (v-model). Defaults to "debug" (all enabled). */
    runMode: {
        type: PropType<RunMode>;
        default: string;
    };
    /** Read-only workspace (v-model): disables create/delete/upload/import. */
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Auto-save: false = manual (dirty tabs are marked); true = save on every
     * edit; a positive number = save all dirty tabs every N milliseconds. */
    autosave: {
        type: PropType<boolean | number>;
        default: boolean;
    };
    /** Max characters of a tab's file name before it is truncated (default 25). */
    tabNameMax: {
        type: NumberConstructor;
        default: number;
    };
    /** Editor font size in pixels (v-model; default 13). */
    fontSize: {
        type: NumberConstructor;
        default: number;
    };
    /** Extra file-type handlers (icon + editor language/plugin) for the Explorer
     * icons and editor highlighting — merged over the built-ins. */
    fileTypes: {
        type: PropType<FileTypeHandler[]>;
        default: () => never[];
    };
    /** The panels the IDE has, by id (explorer, editor, docs, output,
     * callstack, locals, breakpoints) — default all. One left out is not built,
     * is taken out of a restored layout and is not offered in the Settings: an
     * IDE that runs no code needs no Output nor debugger panels. */
    panels: {
        type: PropType<string[]>;
        default: undefined;
    };
    /** Panels of the host app (ExtraPanel): rendered in the layout like the
     * IDE's own — below the editor by default —, in the Settings' toggles,
     * each with an expand/collapse button, and a button in the Editor's
     * toolbar that opens it (toolbarButton). */
    extraPanels: {
        type: PropType<ExtraPanel[]>;
        default: () => never[];
    };
    /** Buttons of the host app in the IDE's header, at its right after the
     * panels' (Changes): their icon, their title (and label, when given),
     * what their click does — a host's "back into the page", say. */
    headerActions: {
        type: PropType<HeaderAction[]>;
        default: () => never[];
    };
    /** The texts of the Changes and Git panels (IdeMessages), translated:
     * any left out is English. */
    messages: {
        type: PropType<Partial<IdeMessages>>;
        default: undefined;
    };
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:layoutConfig": (_v: SerializedDockview) => true;
    "update:config": (_v: Record<string, unknown>) => true;
    "update:runProfiles": (_v: RunProfile[]) => true;
    "update:runMode": (_v: RunMode) => true;
    "update:readonly": (_v: boolean) => true;
    "update:fontSize": (_v: number) => true;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    api: {
        type: PropType<IdeApi>;
        required: true;
    };
    workspace: {
        type: PropType<Workspace>;
        required: true;
    };
    dark: {
        type: BooleanConstructor;
        default: boolean;
    };
    onReset: {
        type: PropType<() => Promise<void> | void>;
        default: undefined;
    };
    /** Handle files uploaded (Explorer button or drag-drop). When absent, files
     * are written to the workspace via the api. */
    onUpload: {
        type: PropType<(files: UploadedFile[]) => Promise<void> | void>;
        default: undefined;
    };
    layoutConfig: {
        type: PropType<SerializedDockview | null>;
        default: null;
    };
    config: {
        type: PropType<Record<string, unknown>>;
        default: () => {};
    };
    runProfiles: {
        type: PropType<RunProfile[]>;
        default: () => never[];
    };
    /** Gates the run/debug actions (v-model). Defaults to "debug" (all enabled). */
    runMode: {
        type: PropType<RunMode>;
        default: string;
    };
    /** Read-only workspace (v-model): disables create/delete/upload/import. */
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Auto-save: false = manual (dirty tabs are marked); true = save on every
     * edit; a positive number = save all dirty tabs every N milliseconds. */
    autosave: {
        type: PropType<boolean | number>;
        default: boolean;
    };
    /** Max characters of a tab's file name before it is truncated (default 25). */
    tabNameMax: {
        type: NumberConstructor;
        default: number;
    };
    /** Editor font size in pixels (v-model; default 13). */
    fontSize: {
        type: NumberConstructor;
        default: number;
    };
    /** Extra file-type handlers (icon + editor language/plugin) for the Explorer
     * icons and editor highlighting — merged over the built-ins. */
    fileTypes: {
        type: PropType<FileTypeHandler[]>;
        default: () => never[];
    };
    /** The panels the IDE has, by id (explorer, editor, docs, output,
     * callstack, locals, breakpoints) — default all. One left out is not built,
     * is taken out of a restored layout and is not offered in the Settings: an
     * IDE that runs no code needs no Output nor debugger panels. */
    panels: {
        type: PropType<string[]>;
        default: undefined;
    };
    /** Panels of the host app (ExtraPanel): rendered in the layout like the
     * IDE's own — below the editor by default —, in the Settings' toggles,
     * each with an expand/collapse button, and a button in the Editor's
     * toolbar that opens it (toolbarButton). */
    extraPanels: {
        type: PropType<ExtraPanel[]>;
        default: () => never[];
    };
    /** Buttons of the host app in the IDE's header, at its right after the
     * panels' (Changes): their icon, their title (and label, when given),
     * what their click does — a host's "back into the page", say. */
    headerActions: {
        type: PropType<HeaderAction[]>;
        default: () => never[];
    };
    /** The texts of the Changes and Git panels (IdeMessages), translated:
     * any left out is English. */
    messages: {
        type: PropType<Partial<IdeMessages>>;
        default: undefined;
    };
}>> & Readonly<{
    "onUpdate:layoutConfig"?: ((_v: SerializedDockview) => any) | undefined;
    "onUpdate:config"?: ((_v: Record<string, unknown>) => any) | undefined;
    "onUpdate:runProfiles"?: ((_v: RunProfile[]) => any) | undefined;
    "onUpdate:runMode"?: ((_v: RunMode) => any) | undefined;
    "onUpdate:readonly"?: ((_v: boolean) => any) | undefined;
    "onUpdate:fontSize"?: ((_v: number) => any) | undefined;
}>, {
    readonly: boolean;
    messages: Partial<IdeMessages>;
    panels: string[];
    fontSize: number;
    config: Record<string, unknown>;
    onReset: () => Promise<void> | void;
    dark: boolean;
    onUpload: (files: UploadedFile[]) => Promise<void> | void;
    layoutConfig: SerializedDockview | null;
    runProfiles: RunProfile[];
    runMode: RunMode;
    autosave: number | boolean;
    tabNameMax: number;
    fileTypes: FileTypeHandler[];
    extraPanels: ExtraPanel[];
    headerActions: HeaderAction[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
