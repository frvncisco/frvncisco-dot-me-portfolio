import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { ImageResponse } from "next/og";
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

function getOgAvatar() {
  return (avatarPromise ??= loadAvatar());
}

function getOgFonts() {
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

const size = { width: 1200, height: 630 };

const styles = {
  outerWrapper: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    position: "relative",
  },
  middleWrapper: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    position: "relative",
    padding: "40px",
  },
  wrapper: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fafafa",
    position: "relative",
    padding: "40px",
    border: "1px solid #e5e5e5",
    borderRadius: "12px",
  },
  imageSection: {
    position: "absolute",
    top: "40px",
    left: "40px",
    display: "flex",
    alignItems: "center",
    zIndex: "2",
  },
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    height: "100%",
    width: "100%",
    position: "relative",
    zIndex: "1",
  },
  image: {
    width: "140px",
    height: "140px",
    borderRadius: "24px",
    border: "4px solid #e5e5e5",
    objectFit: "cover",
  },
  title: {
    fontFamily: "Clash Display",
    fontSize: "48px",
    fontWeight: "600",
    lineHeight: "1.1",
    textAlign: "left",
    color: "#000000",
    marginBottom: "16px",
    letterSpacing: "-0.02em",
    maxWidth: "900px",
  },
  description: {
    fontSize: "20px",
    fontWeight: "400",
    lineHeight: "1.5",
    textAlign: "left",
    maxWidth: "800px",
    color: "#404040",
    textWrap: "balance",
  },
  date: {
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "1.5",
    textAlign: "left",
    color: "#666666",
    marginBottom: "32px",
  },
} as const;

// Shared card for the `opengraph-image` routes. Callers do their own notFound() checks
// first: notFound() throws, and the catch below would turn it into a 500.
export async function renderOg({
  title,
  description,
  date,
}: {
  title: string;
  description?: string;
  date?: string;
}) {
  try {
    const [fontData, imageUrl] = await Promise.all([getOgFonts(), getOgAvatar()]);

    return new ImageResponse(
      <div style={styles.outerWrapper}>
        <div style={styles.middleWrapper}>
          <div style={styles.wrapper}>
            {imageUrl && (
              <div style={styles.imageSection}>
                {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders to PNG */}
                <img src={imageUrl} alt="" style={styles.image} />
              </div>
            )}
            <div style={styles.mainContainer}>
              <div style={styles.title}>{title}</div>
              {description && (
                <div style={{ ...styles.description, marginBottom: date ? "16px" : "32px" }}>
                  {description}
                </div>
              )}
              {date && <div style={styles.date}>{date}</div>}
            </div>
          </div>
        </div>
      </div>,
      {
        ...size,
        fonts: fontData
          ? [
              {
                name: "Cabinet Grotesk",
                data: fontData.cabinetGrotesk,
                weight: 400,
                style: "normal",
              },
              { name: "Clash Display", data: fontData.clashDisplay, weight: 600, style: "normal" },
            ]
          : undefined,
      },
    );
  } catch (error) {
    console.error("Error generating OpenGraph image:", error);
    return new Response(
      `Failed to generate image: ${error instanceof Error ? error.message : "Unknown error"}`,
      { status: 500 },
    );
  }
}
