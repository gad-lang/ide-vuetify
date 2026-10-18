import { type Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
export declare const setBreakpointsEffect: import("@codemirror/state").StateEffectType<number[]>;
/** getBreakpointLines returns the current breakpoints as sorted 1-based lines. */
export declare function getBreakpointLines(view: EditorView): number[];
/** setEditorBreakpoints replaces the editor's breakpoints with the given lines. */
export declare function setEditorBreakpoints(view: EditorView, lines: number[]): void;
/**
 * breakpointGutter builds the gutter extension. onChange is called with the new
 * line set whenever the user adds or removes a breakpoint. onContext, when given,
 * is called with the 1-based line on a right-click on the gutter (e.g. to edit a
 * breakpoint condition) — the browser context menu is suppressed for that line.
 */
export declare function breakpointGutter(onChange: (lines: number[]) => void, onContext?: (line: number) => void): Extension;
