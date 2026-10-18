import { type Extension } from "@codemirror/state";
export interface LocalVar {
    name: string;
    type: string;
    value: string;
}
export declare const setDebugLoc: import("@codemirror/state").StateEffectType<{
    line: number;
    col: number;
} | null>;
/**
 * debugDecorations builds the extension. getLocals supplies the current locals
 * (by name) for the hover tooltip; it is read lazily so it always reflects the
 * latest paused frame. onInspect, when provided, adds an inspect button that
 * opens the tree navigator for the hovered variable.
 */
export declare function debugDecorations(getLocals: () => Map<string, LocalVar>, getInspect?: () => ((name: string) => void) | undefined): Extension;
