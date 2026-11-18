import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { business } from "@/lib/business";
import { localBusinessSchema, webSiteSchema } from "@/lib/schema";
import { OG_IMAGE } from "@/lib/seo";
import { AnimationProvider, animationBootScript } from "@/components/AnimationProvider";
import { JsonLd } from "@/components/JsonLd";

/*
 * Display: Archivo, expanded width, weight 800 (Google Fonts, SIL Open Font License).
 * Self-hosted as a Latin subset of that single cut: 11 KB instead of the 90 KB variable file.
 * To rebuild the files, see "Fonts" in the README.
 */
const archivo = localFont({
  src: "../fonts/Archivo-Expanded-ExtraBold.woff2",
  weight: "800",
  style: "normal",
  display: "swap",
  variable: "--font-archivo",
  fallback: ["Arial Black", "Arial", "sans-serif"],
});

// The italic is only used for a few large quotes, so it is not preloaded.
const archivoItalic = localFont({
  src: "../fonts/Archivo-Expanded-ExtraBoldItalic.woff2",
  weight: "800",
  style: "italic",
  display: "swap",
  preload: false,
  variable: "--font-archivo-italic",
  fallback: ["Arial Black", "Arial", "sans-serif"],
});

// Body and sub-headings: Figtree (variable weight).
const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
});

const title = "Landscaping in Marietta, GA | Speedy Landscaping";
const description =
  "Speedy Landscaping & Lawncare: sod, mulch, lawn care, tree trimming and pressure washing in Marietta, GA. 5-star Google reviews. Call (678) 748-2590.";

export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title: { default: title, template: "%s | Speedy Landscaping" },
  description,
  applicationName: business.name,
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, address: true },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: business.name,
    locale: "en_US",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: "#0a3d14",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

/**
 * Root layout: fonts, the animation bootstrap and the sitewide structured data.
 * The header and footer live in (site)/layout.tsx so that /links can render without them.
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${archivoItalic.variable} ${figtree.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-dvh overflow-x-clip">
        <script dangerouslySetInnerHTML={{ __html: animationBootScript }} />
        {children}
        <AnimationProvider />
        <JsonLd data={[localBusinessSchema(), webSiteSchema()]} />
      </body>
    </html>
  );
}
