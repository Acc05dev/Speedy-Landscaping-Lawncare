import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";
import { business } from "@/lib/business";
import { localBusinessSchema, webSiteSchema } from "@/lib/schema";
import { OG_IMAGE } from "@/lib/seo";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { motionBootScript } from "@/components/motion/boot";
import { JsonLd } from "@/components/ui/JsonLd";

// Headings and text: Manrope (variable weight), self-hosted by next/font.
const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

// Customers' words only (quotes and reviews). Never above the fold, so it is not preloaded.
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
  preload: false,
  variable: "--font-instrument",
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
  themeColor: "#fbf9f4",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

/**
 * Root layout: fonts, the motion bootstrap and the sitewide structured data.
 * The header and footer live in (site)/layout.tsx so that /links can render without them.
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${instrument.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-dvh overflow-x-clip">
        <script dangerouslySetInnerHTML={{ __html: motionBootScript }} />
        {children}
        <MotionRoot />
        <JsonLd data={[localBusinessSchema(), webSiteSchema()]} />
      </body>
    </html>
  );
}
