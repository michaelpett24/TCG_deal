import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Nav } from "./nav";
import { Footer } from "./footer";
import { ServiceWorkerRegistration } from "./sw-register";

const GA_ID = "G-RR3KPRCM8S";

const SITE_URL = "https://tcgfair.com";

export const metadata: Metadata = {
  title: "Pokémon Card Cash Deal Calculator — Fair Price for Buyer & Seller | TCG Fair",
  description:
    "Free Pokémon TCG cash deal calculator. Enter any card's eBay sold price to instantly find the fair in-person price — accounting for eBay fees, sales tax, and shipping. Used at card shows, LGS, and trade nights.",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Pokémon Card Cash Deal Calculator — Find the Fair Price",
    description:
      "Enter a card's eBay sold price to instantly see the fair cash price for both buyer and seller. Accounts for eBay fees, sales tax, and shipping.",
    url: SITE_URL,
    siteName: "TCG Fair Deal Calculator",
    images: [{ url: "/og", width: 1200, height: 630, alt: "Pokémon Card Cash Deal Calculator — TCG Fair" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pokémon Card Cash Deal Calculator",
    description: "Find the fair in-person price for any Pokémon card deal — free tool for buyers and sellers.",
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
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { anonymize_ip: true });
            `}</Script>
          </>
        )}
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
