import type { Extension } from "@codemirror/state";
import type { EditorLanguage } from "./codemirror";
export interface FileTypeHandler {
    /** Extensions this handler matches, without the dot (e.g. ["gad"], ["md","markdown"]). */
    extensions: string[];
    /** Material Design Icon name for the file tree (e.g. "mdi-language-python"). */
    icon?: string;
    /** A built-in EditorLanguage, or a factory returning a CodeMirror Extension for
     * a custom language / plugin. */
    language?: EditorLanguage | (() => Extension);
}
/** DEFAULT_FILE_TYPES cover the languages the editor already knows, with icons. */
export declare const DEFAULT_FILE_TYPES: FileTypeHandler[];
/** extOf returns a path's lowercase extension without the dot. */
export declare function extOf(path: string): string;
/** FileTypeRegistry resolves the icon and editor language for a path from the
 * built-in handlers plus any the host registered (host handlers win). */
export declare class FileTypeRegistry {
    private byExt;
    constructor(handlers?: FileTypeHandler[]);
    handlerFor(path: string): FileTypeHandler | undefined;
    iconFor(path: string): string;
    /** languageFor returns the built-in EditorLanguage for a path, or "text" when
     * the handler has none / a custom extension factory (see extensionFor). */
    languageFor(path: string): EditorLanguage;
    /** extensionFor returns a custom CodeMirror Extension factory when the handler
     * provides one, else undefined (use languageFor instead). */
    extensionFor(path: string): (() => Extension) | undefined;
}
