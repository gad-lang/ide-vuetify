import type { UploadedFile } from "./api";
/** RawFile is a picked/dropped file with its relative path and the File object,
 * read lazily (as text, or base64 bytes for an archive) when the upload is
 * confirmed. */
export interface RawFile {
    path: string;
    file: File;
}
/** rawFromInput collects RawFiles from an <input type="file"> FileList. */
export declare function rawFromInput(list: FileList | null): RawFile[];
/** rawFromDataTransfer collects RawFiles from a drop, recursing into directories. */
export declare function rawFromDataTransfer(dt: DataTransfer): Promise<RawFile[]>;
/** isTextBytes says whether buf is text — UTF-8, with no NUL —, written as
 * text; else it is a binary file (an image, a font), written as its bytes. */
export declare function isTextBytes(buf: Uint8Array): boolean;
/** bytesToBase64 is buf in base64. */
export declare function bytesToBase64(buf: Uint8Array): string;
/** uploadedOf is the file at path holding buf: its text, or its bytes. */
export declare function uploadedOf(path: string, buf: Uint8Array): UploadedFile;
/** readUploaded reads a picked file: its text, or its bytes (a binary file). */
export declare function readUploaded(path: string, file: File): Promise<UploadedFile>;
/** readBase64 reads a File's bytes as a base64 string (for archive uploads). */
export declare function readBase64(file: File): Promise<string>;
/** filesFromInput reads a FileList (from <input type="file" [webkitdirectory]>).
 * A directory input sets webkitRelativePath, keeping the subtree; a plain file
 * input yields bare names. */
export declare function filesFromInput(list: FileList | null): Promise<UploadedFile[]>;
/** filesFromDataTransfer reads a drop, recursing into directory entries. Falls
 * back to the flat file list when the entries API is unavailable. */
export declare function filesFromDataTransfer(dt: DataTransfer): Promise<UploadedFile[]>;
/** readWithProgress reads a Response body to a Uint8Array, reporting download
 * progress as a percent (0–100), or -1 (indeterminate) when Content-Length is
 * absent. */
export declare function readWithProgress(res: Response, onProgress: (pct: number) => void): Promise<Uint8Array>;
