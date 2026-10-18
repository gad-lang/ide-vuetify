import { type PropType } from "vue";
import type { DiagnoseFn } from "@gad-lang/codemirror-gad";
import type { Extension } from "@codemirror/state";
import { GadEditorView, type EditorLanguage, type LocalVar } from "./codemirror";
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    path: {
        type: StringConstructor;
        default: string;
    };
    modelValue: {
        type: StringConstructor;
        required: true;
    };
    language: {
        type: PropType<EditorLanguage>;
        default: undefined;
    };
    dark: {
        type: BooleanConstructor;
        default: boolean;
    };
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    fontSize: {
        type: NumberConstructor;
        default: number;
    };
    /** Custom CodeMirror language extension (host-registered file type); replaces
     * the built-in language derived from `path`/`language`. */
    customExtension: {
        type: PropType<() => Extension>;
        default: undefined;
    };
    diagnose: {
        type: PropType<DiagnoseFn>;
        default: undefined;
    };
    breakpoints: {
        type: PropType<number[]>;
        default: () => never[];
    };
    /** Shows the breakpoint gutter (default true); read when mounted. */
    breakpointGutter: {
        type: BooleanConstructor;
        default: boolean;
    };
    debugLine: {
        type: NumberConstructor;
        default: number;
    };
    debugColumn: {
        type: NumberConstructor;
        default: number;
    };
    getLocals: {
        type: PropType<() => Map<string, LocalVar>>;
        default: undefined;
    };
    /** Navigation request: scroll to `gotoLine`; bump `gotoSeq` to re-trigger. */
    gotoLine: {
        type: NumberConstructor;
        default: number;
    };
    gotoSeq: {
        type: NumberConstructor;
        default: number;
    };
    /** Right-click on a breakpoint line: (line) => void (e.g. edit condition). */
    onBreakpointContext: {
        type: PropType<(line: number) => void>;
        default: undefined;
    };
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (_v: string) => true;
    "update:breakpoints": (_lines: number[]) => true;
    ready: (_view: GadEditorView) => true;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    path: {
        type: StringConstructor;
        default: string;
    };
    modelValue: {
        type: StringConstructor;
        required: true;
    };
    language: {
        type: PropType<EditorLanguage>;
        default: undefined;
    };
    dark: {
        type: BooleanConstructor;
        default: boolean;
    };
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    fontSize: {
        type: NumberConstructor;
        default: number;
    };
    /** Custom CodeMirror language extension (host-registered file type); replaces
     * the built-in language derived from `path`/`language`. */
    customExtension: {
        type: PropType<() => Extension>;
        default: undefined;
    };
    diagnose: {
        type: PropType<DiagnoseFn>;
        default: undefined;
    };
    breakpoints: {
        type: PropType<number[]>;
        default: () => never[];
    };
    /** Shows the breakpoint gutter (default true); read when mounted. */
    breakpointGutter: {
        type: BooleanConstructor;
        default: boolean;
    };
    debugLine: {
        type: NumberConstructor;
        default: number;
    };
    debugColumn: {
        type: NumberConstructor;
        default: number;
    };
    getLocals: {
        type: PropType<() => Map<string, LocalVar>>;
        default: undefined;
    };
    /** Navigation request: scroll to `gotoLine`; bump `gotoSeq` to re-trigger. */
    gotoLine: {
        type: NumberConstructor;
        default: number;
    };
    gotoSeq: {
        type: NumberConstructor;
        default: number;
    };
    /** Right-click on a breakpoint line: (line) => void (e.g. edit condition). */
    onBreakpointContext: {
        type: PropType<(line: number) => void>;
        default: undefined;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((_v: string) => any) | undefined;
    "onUpdate:breakpoints"?: ((_lines: number[]) => any) | undefined;
    onReady?: ((_view: GadEditorView) => any) | undefined;
}>, {
    readonly: boolean;
    breakpoints: number[];
    fontSize: number;
    diagnose: DiagnoseFn;
    path: string;
    language: EditorLanguage;
    dark: boolean;
    customExtension: () => Extension;
    breakpointGutter: boolean;
    debugLine: number;
    debugColumn: number;
    getLocals: () => Map<string, LocalVar>;
    gotoLine: number;
    gotoSeq: number;
    onBreakpointContext: (line: number) => void;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
