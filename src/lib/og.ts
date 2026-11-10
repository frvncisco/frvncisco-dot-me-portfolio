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

export async function getOgAvatar(): Promise<string | undefined> {
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
    return undefined;
  }
}

export async function getOgFonts() {
  try {
    const [cabinetGrotesk, clashDisplay] = await Promise.all([
      readFile(publicPath("fonts/CabinetGrotesk-Medium.ttf")),
      readFile(publicPath("fonts/ClashDisplay-Semibold.ttf")),
    ]);
    return { cabinetGrotesk, clashDisplay };
  } catch (error) {
    console.error("Failed to load OG fonts:", error);
    return null;
  }
}
