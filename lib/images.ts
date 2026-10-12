import fs from "node:fs";
import path from "node:path";

const EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif", ".svg"];

/**
 * Looks for a picture in /public. copy.md names every picture as
 * "images/eco-cover.jpg"; any of the extensions above is accepted, so a file
 * saved as eco-cover.png is found too. Returns the public URL, or null when
 * the picture has not been added yet.
 *
 * The URL ends in "?v=" and the time the file was saved. Next.js keeps a
 * resized copy of every picture for hours, keyed by its URL, so without this
 * a replaced photo would keep showing the old one.
 */
export function resolveImage(src: string): string | null {
  const relative = src.replace(/^\/+/, "");
  const base = relative.replace(/\.[a-z0-9]+$/i, "");
  const candidates = [relative, ...EXTENSIONS.map((ext) => base + ext)];
  for (const candidate of candidates) {
    try {
      const saved = fs.statSync(path.join(process.cwd(), "public", candidate)).mtimeMs;
      return `/${candidate}?v=${Math.round(saved)}`;
    } catch {
      // Not this extension; try the next one.
    }
  }
  return null;
}

export function fileName(src: string) {
  return src.split("/").pop() ?? src;
}

type Size = { width: number; height: number };

function pngSize(data: Buffer): Size | null {
  const isPng = data.length >= 24 && data.toString("latin1", 1, 4) === "PNG";
  return isPng ? { width: data.readUInt32BE(16), height: data.readUInt32BE(20) } : null;
}

/** True when the EXIF orientation tag says the camera was turned on its side. */
function exifTurned(tiff: Buffer) {
  if (tiff.length < 14) return false;
  const little = tiff.toString("latin1", 0, 2) === "II";
  const u16 = (at: number) => (little ? tiff.readUInt16LE(at) : tiff.readUInt16BE(at));
  const first = little ? tiff.readUInt32LE(4) : tiff.readUInt32BE(4);
  if (first + 2 > tiff.length) return false;
  const entries = u16(first);
  for (let index = 0; index < entries; index++) {
    const entry = first + 2 + index * 12;
    if (entry + 12 > tiff.length) break;
    if (u16(entry) === 0x0112) return u16(entry + 8) >= 5;
  }
  return false;
}

function jpegSize(data: Buffer): Size | null {
  if (data.length < 4 || data[0] !== 0xff || data[1] !== 0xd8) return null;
  let at = 2;
  let turned = false;
  while (at + 9 < data.length) {
    if (data[at] !== 0xff) return null;
    const marker = data[at + 1];
    if (marker === 0xff) {
      at += 1;
      continue;
    }
    const length = data.readUInt16BE(at + 2);
    if (marker === 0xe1 && data.toString("latin1", at + 4, at + 8) === "Exif") {
      turned = exifTurned(data.subarray(at + 10, at + 2 + length));
    }
    const isFrame = marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);
    if (isFrame) {
      const height = data.readUInt16BE(at + 5);
      const width = data.readUInt16BE(at + 7);
      return turned ? { width: height, height: width } : { width, height };
    }
    at += 2 + length;
  }
  return null;
}

const publicFile = (url: string) =>
  path.join(process.cwd(), "public", url.replace(/^\/+/, "").replace(/\?.*$/, ""));

async function readRatio(url: string, savedAt: number): Promise<number | null> {
  // Reading a file is not allowed while a page is being prerendered, so the
  // answer is cached. savedAt is part of the cache key: replace the picture
  // and it is measured again.
  "use cache";
  void savedAt;
  try {
    const data = fs.readFileSync(publicFile(url));
    const size = pngSize(data) ?? jpegSize(data);
    return size && size.width > 0 && size.height > 0 ? size.width / size.height : null;
  } catch {
    return null;
  }
}

/**
 * Width divided by height of a picture in /public, so a portrait photo can be
 * shown as a portrait. Reads JPEG and PNG; returns null for anything else.
 */
export async function imageRatio(url: string): Promise<number | null> {
  try {
    return await readRatio(url, fs.statSync(publicFile(url)).mtimeMs);
  } catch {
    return null;
  }
}
