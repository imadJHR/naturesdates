import type { Metadata, Viewport } from "next";
import { Nunito, Pacifico } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import "./content-pages.css";
import { SmoothScroll } from "./components/smooth-scroll";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const pacifico = Pacifico({ subsets: ["latin"], weight: "400", variable: "--font-script", display: "swap" });
const siteUrl = new URL(SITE_URL);

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f1a11e",
};

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Natures Dates | Medjool Dates Raised on Sunshine",
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
  keywords: ["Medjool dates", "dates", "date snacks", "Medjool date recipes", "whole fruit snacks"],
  authors: [{ name: SITE_NAME, url: siteUrl }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "food",
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title: "Natures Dates | Medjool Dates Raised on Sunshine",
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE_NAME,
    images: [{ url: "/og-natures-dates.jpg", width: 1200, height: 630, alt: "Natures Dates — Medjool dates raised on sunshine" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Natures Dates | Medjool Dates Raised on Sunshine",
    description: SITE_DESCRIPTION,
    images: ["/og-natures-dates.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/natures-dates-logo.webp`,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-US",
      },
    ],
  };

  return (
    <html lang="en">
      <body className={`${nunito.variable} ${pacifico.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
