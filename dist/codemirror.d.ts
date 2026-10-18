import { type Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { type DiagnoseFn } from "@gad-lang/codemirror-gad";
import { type LocalVar } from "./debugDecorations";
export type EditorLanguage = "gad" | "gadt" | "gadx" | "json" | "yaml" | "html" | "css" | "scss" | "javascript" | "typescript" | "jsx" | "tsx" | "markdown" | "text";
/** Custom `.gadt` / mixed-mode template tag delimiters. */
export interface TemplateDelimiters {
    start?: string;
    end?: string;
    preamble?: boolean;
}
/** langOf maps a file extension to an EditorLanguage. */
export declare function langOf(path: string): EditorLanguage;
/** Return the CodeMirror Extension for the given language. */
export declare function langExtension(lang: EditorLanguage, diagnose?: DiagnoseFn, tmpl?: TemplateDelimiters): Extension;
export interface EditorOptions {
    parent: HTMLElement;
    doc: string;
    language: EditorLanguage;
    dark: boolean;
    diagnose?: DiagnoseFn;
    onChange?: (value: string) => void;
    onBreakpointsChange?: (lines: number[]) => void;
    onBreakpointContext?: (line: number) => void;
    /** The breakpoint gutter (default true): none where nothing is debugged. */
    breakpoints?: boolean;
    getLocals?: () => Map<string, LocalVar>;
    readonly?: boolean;
    /** Editor font size in pixels (default 13). */
    fontSize?: number;
    /** Custom CodeMirror language extension (from a host-registered file type). When
     * set it replaces the built-in `langExtension(language)`. */
    customExtension?: () => Extension;
}
/** GadEditorView wraps an EditorView with compartment-based reconfiguration. */
export declare class GadEditorView {
    readonly view: EditorView;
    private langComp;
    private themeComp;
    private roComp;
    private fontComp;
    private opts;
    constructor(opts: EditorOptions);
    getValue(): string;
    setValue(value: string): void;
    setLanguage(language: EditorLanguage, diagnose?: DiagnoseFn, customExtension?: () => Extension): void;
    setDark(dark: boolean): void;
    setFontSize(px: number): void;
    setReadonly(readonly: boolean): void;
    setBreakpoints(lines: number[]): void;
    /** setDebugLine highlights the paused line (1-based), or clears it with 0. */
    setDebugLine(line: number, column?: number): void;
    undo(): void;
    redo(): void;
    /** gotoLine moves the cursor to a 1-based line and scrolls it into view. */
    gotoLine(line: number, column?: number): void;
    destroy(): void;
}
export type { LocalVar, DiagnoseFn };
