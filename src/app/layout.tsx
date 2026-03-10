import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Site } from "@/data/Site";
import { VisitTracker } from "@/components/analytics/VisitTracker";

const siteUrl = Site.Url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: Site.Title,
    template: `%s | ${Site.Author}`,
  },
  description: Site.Description,
  applicationName: Site.Title,
  authors: [{ name: Site.Author, url: siteUrl }],
  keywords: Site.Keywords.split(",").map((k) => k.trim()),
  creator: Site.Author,
  publisher: Site.Author,
  category: "technology",
  alternates: {
    canonical: "/",
    languages: {
      "pt-BR": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: Site.Title,
    title: Site.Title,
    description: Site.Description,
    locale: "pt_BR",
    images: [
      {
        url: "/cover.png",
        width: 1200,
        height: 630,
        alt: Site.Title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: Site.Title,
    description: Site.Description,
    images: ["/cover.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: siteUrl,
  name: Site.Title,
  description: Site.Description,
  publisher: {
    "@type": "Person",
    name: Site.Author,
    url: siteUrl,
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body>
        <VisitTracker />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        {children}
      </body>
    </html>
  );
}
