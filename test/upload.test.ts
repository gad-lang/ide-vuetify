// Unit tests of how an uploaded file is read: its text, or its bytes (bun test).
import { describe, expect, test } from "bun:test";
import { bytesToBase64, isTextBytes, uploadedOf } from "../src/upload";

const enc = (s: string) => new TextEncoder().encode(s);

describe("isTextBytes", () => {
  test("UTF-8 text is text", () => {
    expect(isTextBytes(enc("body { color: red }\n"))).toBe(true);
    expect(isTextBytes(enc("Opções: ação, ★"))).toBe(true);
    expect(isTextBytes(new Uint8Array())).toBe(true);
  });
  test("a binary file is not", () => {
    expect(isTextBytes(new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00]))).toBe(false); // PNG
    expect(isTextBytes(new Uint8Array([0xff, 0xd8, 0xff, 0xe0]))).toBe(false); // JPEG: not UTF-8
    expect(isTextBytes(enc("a\u0000b"))).toBe(false); // a NUL
  });
});

describe("uploadedOf", () => {
  test("a text file: its content", () => {
    expect(uploadedOf("static/a.css", enc("body {}\n"))).toEqual({ path: "static/a.css", content: "body {}\n" });
  });
  test("a binary file: its bytes in base64, as they are", () => {
    const png = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x00, 0xff]);
    const f = uploadedOf("img/logo.png", png);
    expect(f.content).toBe("");
    expect(f.bytes).toBe(btoa(String.fromCharCode(...png)));
    expect(Uint8Array.from(atob(f.bytes!), (c) => c.charCodeAt(0))).toEqual(png);
  });
  test("a large file is encoded whole (in chunks)", () => {
    const big = new Uint8Array(100_000).map((_, i) => (i * 7) % 256);
    expect(atob(bytesToBase64(big)).length).toBe(big.length);
  });
});
