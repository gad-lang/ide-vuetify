// Framework-agnostic helpers that read files selected via an <input> or dropped
// onto the Explorer into UploadedFile[] (relative path + text content). A dropped
// directory is traversed recursively so its subtree layout is preserved.
import type { UploadedFile } from "./api";

/** RawFile is a picked/dropped file with its relative path and the File object,
 * read lazily (as text, or base64 bytes for an archive) when the upload is
 * confirmed. */
export interface RawFile {
  path: string;
  file: File;
}

/** rawFromInput collects RawFiles from an <input type="file"> FileList. */
export function rawFromInput(list: FileList | null): RawFile[] {
  return Array.from(list ?? []).map((file) => ({
    path: (file as File & { webkitRelativePath?: string }).webkitRelativePath || file.name,
    file,
  }));
}

/** rawFromDataTransfer collects RawFiles from a drop, recursing into directories. */
export async function rawFromDataTransfer(dt: DataTransfer): Promise<RawFile[]> {
  const entries: FileSystemEntry[] = [];
  for (const item of Array.from(dt.items)) {
    const entry = (item as DataTransferItem & { webkitGetAsEntry?: () => FileSystemEntry | null }).webkitGetAsEntry?.();
    if (entry) entries.push(entry);
  }
  if (!entries.length) return rawFromInput(dt.files);
  const out: RawFile[] = [];
  await Promise.all(entries.map((e) => walkRaw(e, "", out)));
  return out;
}

async function walkRaw(entry: FileSystemEntry, prefix: string, out: RawFile[]): Promise<void> {
  if (entry.isFile) {
    out.push({ path: prefix + entry.name, file: await fileOf(entry as FileSystemFileEntry) });
    return;
  }
  const children = await readDir(entry as FileSystemDirectoryEntry);
  await Promise.all(children.map((c) => walkRaw(c, prefix + entry.name + "/", out)));
}

/** isTextBytes says whether buf is text — UTF-8, with no NUL —, written as
 * text; else it is a binary file (an image, a font), written as its bytes. */
export function isTextBytes(buf: Uint8Array): boolean {
  if (buf.includes(0)) return false;
  try {
    new TextDecoder("utf-8", { fatal: true }).decode(buf);
    return true;
  } catch {
    return false;
  }
}

/** bytesToBase64 is buf in base64. */
export function bytesToBase64(buf: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < buf.length; i += 0x8000) bin += String.fromCharCode(...buf.subarray(i, i + 0x8000));
  return btoa(bin);
}

/** uploadedOf is the file at path holding buf: its text, or its bytes. */
export function uploadedOf(path: string, buf: Uint8Array): UploadedFile {
  return isTextBytes(buf) ? { path, content: new TextDecoder().decode(buf) } : { path, content: "", bytes: bytesToBase64(buf) };
}

/** readUploaded reads a picked file: its text, or its bytes (a binary file). */
export async function readUploaded(path: string, file: File): Promise<UploadedFile> {
  return uploadedOf(path, new Uint8Array(await file.arrayBuffer()));
}

/** readBase64 reads a File's bytes as a base64 string (for archive uploads). */
export async function readBase64(file: File): Promise<string> {
  const buf = new Uint8Array(await file.arrayBuffer());
  let bin = "";
  for (let i = 0; i < buf.length; i++) bin += String.fromCharCode(buf[i]);
  return btoa(bin);
}

/** filesFromInput reads a FileList (from <input type="file" [webkitdirectory]>).
 * A directory input sets webkitRelativePath, keeping the subtree; a plain file
 * input yields bare names. */
export async function filesFromInput(list: FileList | null): Promise<UploadedFile[]> {
  const out: UploadedFile[] = [];
  for (const file of Array.from(list ?? [])) {
    out.push({ path: (file as File & { webkitRelativePath?: string }).webkitRelativePath || file.name, content: await file.text() });
  }
  return out;
}

/** filesFromDataTransfer reads a drop, recursing into directory entries. Falls
 * back to the flat file list when the entries API is unavailable. */
export async function filesFromDataTransfer(dt: DataTransfer): Promise<UploadedFile[]> {
  const entries: FileSystemEntry[] = [];
  for (const item of Array.from(dt.items)) {
    const entry = (item as DataTransferItem & { webkitGetAsEntry?: () => FileSystemEntry | null }).webkitGetAsEntry?.();
    if (entry) entries.push(entry);
  }
  if (!entries.length) return filesFromInput(dt.files);

  const out: UploadedFile[] = [];
  await Promise.all(entries.map((e) => walkEntry(e, "", out)));
  return out;
}

async function walkEntry(entry: FileSystemEntry, prefix: string, out: UploadedFile[]): Promise<void> {
  if (entry.isFile) {
    const file = await fileOf(entry as FileSystemFileEntry);
    out.push({ path: prefix + entry.name, content: await file.text() });
    return;
  }
  const dir = entry as FileSystemDirectoryEntry;
  const children = await readDir(dir);
  await Promise.all(children.map((c) => walkEntry(c, prefix + entry.name + "/", out)));
}

function fileOf(entry: FileSystemFileEntry): Promise<File> {
  return new Promise((resolve, reject) => entry.file(resolve, reject));
}

/** readWithProgress reads a Response body to a Uint8Array, reporting download
 * progress as a percent (0–100), or -1 (indeterminate) when Content-Length is
 * absent. */
export async function readWithProgress(res: Response, onProgress: (pct: number) => void): Promise<Uint8Array> {
  const total = Number(res.headers.get("Content-Length") || 0);
  if (!res.body) {
    onProgress(total ? 100 : -1);
    return new Uint8Array(await res.arrayBuffer());
  }
  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let received = 0;
  onProgress(total ? 0 : -1);
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) {
      chunks.push(value);
      received += value.length;
      if (total) onProgress(Math.min(100, Math.round((received / total) * 100)));
    }
  }
  const out = new Uint8Array(received);
  let off = 0;
  for (const c of chunks) {
    out.set(c, off);
    off += c.length;
  }
  onProgress(100);
  return out;
}

// A directory reader must be called until it returns an empty batch.
function readDir(dir: FileSystemDirectoryEntry): Promise<FileSystemEntry[]> {
  const reader = dir.createReader();
  const all: FileSystemEntry[] = [];
  return new Promise((resolve, reject) => {
    const next = () =>
      reader.readEntries((batch) => {
        if (!batch.length) return resolve(all);
        all.push(...batch);
        next();
      }, reject);
    next();
  });
}
