import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { DATA } from "@/data/resume";
import { siteUrl } from "@/lib/site-url";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeistMono } from "geist/font/mono";
import { GeistPixelLine } from "geist/font/pixel/line";
import { GeistPixelSquare } from "geist/font/pixel/square";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

// Self-hosted (latin subset, Google Fonts' variable file with the opsz, wght, SOFT and WONK axes), so
// the build doesn't need to reach Google. The variation settings are in globals.css.
const fraunces = localFont({
  src: "../../public/fonts/Fraunces-Variable.woff2",
  weight: "100 900",
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: siteUrl,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      // The font variables must sit on <html>: `@theme inline` in globals.css declares
      // `--font-*: var(--font-geist-*)` on :root, and var() resolves where it is declared.
      className={cn(
        GeistSans.variable,
        fraunces.variable,
        GeistMono.variable,
        GeistPixelSquare.variable,
        GeistPixelLine.variable,
      )}
    >
      <body className="relative min-h-dvh bg-background font-sans antialiased">
        {/* Dark mode is switched off for now: forcedTheme wins over a saved preference too. Remove it
            (and bring back the ModeToggle from git history) to turn dark mode on again. */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
        >
          {/* The nav is fixed, so it comes first in the DOM to be first in tab and reading order. */}
          <a
            href="#content"
            className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-[4.5rem] focus-visible:left-6 focus-visible:z-40 focus-visible:rounded-lg focus-visible:border focus-visible:border-border focus-visible:bg-background focus-visible:px-3 focus-visible:py-2 focus-visible:text-sm focus-visible:shadow-md focus-visible:ring-2 focus-visible:ring-foreground focus-visible:outline-hidden"
          >
            Skip to content
          </a>
          <Navbar />
          <div id="content" className="relative z-10 pt-(--page-pt) pb-12 sm:pb-24">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
