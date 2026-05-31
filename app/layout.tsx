import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "./nav";
import { Footer } from "./footer";
import { ServiceWorkerRegistration } from "./sw-register";

const SITE_URL = "https://tcgfair.com";

export const metadata: Metadata = {
  title: "TCG Fair Deal Calculator — Is Your Card Deal Actually Fair?",
  description:
    "Free calculator for TCG buyers and sellers — Pokémon, MTG, sports cards and more. Enter a card's market price to instantly see eBay fees, tax, shipping, and whether a cash deal is fair for both sides.",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    title: "TCG Fair Deal Calculator",
    description:
      "Enter a card's market price to instantly see eBay fees, tax, shipping, and whether a cash deal is fair for both buyer and seller.",
    url: SITE_URL,
    siteName: "TCG Fair Deal Calculator",
    images: [{ url: "/og", width: 1200, height: 630, alt: "TCG Fair Deal Calculator — Is Your Card Deal Actually Fair?" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TCG Fair Deal Calculator",
    description: "See if your in-person card deal is actually fair — for buyer and seller.",
    images: ["/og"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0d0f14" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="TCG Deal Calc" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "TCG Fair Deal Calculator",
              description:
                "Free calculator for TCG buyers and sellers. Enter a card's market price to see eBay fees, tax, shipping, and whether a cash deal is fair for both sides.",
              url: SITE_URL,
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "Web",
            }),
          }}
        />
      </head>
      <body>
        <ServiceWorkerRegistration />
        <div className="site-wrapper">
          <Nav />
          <main className="site-main">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
