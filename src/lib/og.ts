import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { DATA } from "@/data/resume";

// OG image routes run on the Node.js runtime and read their assets from disk.
// Fetching them from DATA.url would fail until the production domain is live,
// and on every preview deployment.
const publicPath = (file: string) => join(process.cwd(), "public", file);

const IMAGE_MIME_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
};

// The per-post OG route renders on demand, and rereading the avatar and fonts
// for every request is wasted I/O, so each is read once per server instance.
// A failed read is cleared instead of cached, so a transient error doesn't
// leave OG images without the avatar or fonts until the server restarts.
type OgFonts = { cabinetGrotesk: Buffer; clashDisplay: Buffer };

let avatarPromise: Promise<string | undefined> | undefined;
let fontsPromise: Promise<OgFonts | null> | undefined;

export function getOgAvatar() {
  return (avatarPromise ??= loadAvatar());
}

export function getOgFonts() {
  return (fontsPromise ??= loadFonts());
}

async function loadAvatar(): Promise<string | undefined> {
  if (!DATA.avatarUrl) return undefined;
  const mimeType = IMAGE_MIME_TYPES[extname(DATA.avatarUrl).toLowerCase()];
  if (!mimeType) {
    console.error(`Unsupported OG avatar format: ${DATA.avatarUrl}`);
    return undefined;
  }
  try {
    const data = await readFile(publicPath(DATA.avatarUrl), "base64");
    return `data:${mimeType};base64,${data}`;
  } catch (error) {
    console.error("Failed to load OG avatar:", error);
    avatarPromise = undefined;
    return undefined;
  }
}

async function loadFonts(): Promise<OgFonts | null> {
  try {
    const [cabinetGrotesk, clashDisplay] = await Promise.all([
      readFile(publicPath("fonts/CabinetGrotesk-Medium.ttf")),
      readFile(publicPath("fonts/ClashDisplay-Semibold.ttf")),
    ]);
    return { cabinetGrotesk, clashDisplay };
  } catch (error) {
    console.error("Failed to load OG fonts:", error);
    fontsPromise = undefined;
    return null;
  }
}
