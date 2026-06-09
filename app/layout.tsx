import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Nav } from "./nav";
import { Footer } from "./footer";
import { ServiceWorkerRegistration } from "./sw-register";

const GA_ID = "G-RR3KPRCM8S";

const SITE_URL = "https://tcgfair.com";

export const metadata: Metadata = {
  title: "TCGFair — Free Calculators for Pokémon TCG & Sports Card Buyers and Sellers",
  description:
    "TCGFair offers two free calculators: the Fair Deal Calculator for in-person cash deals (seller floor, buyer ceiling, even-split price) and the Consignment Calculator comparing seller payouts across 11 platforms.",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    title: "TCGFair — Free Calculators for TCG Buyers & Sellers",
    description:
      "Fair Deal Calculator for in-person cash deals. Consignment Calculator comparing 11 platforms. Free tools for Pokémon TCG and sports card sellers.",
    url: SITE_URL,
    siteName: "TCGFair",
    images: [{ url: "/og", width: 1200, height: 630, alt: "TCGFair — Pokémon TCG & Sports Card Calculators" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TCGFair — Free Calculators for TCG Buyers & Sellers",
    description: "Fair Deal Calculator for in-person deals. Consignment Calculator for comparing 11 selling platforms. Free, no account needed.",
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
              name: "TCGFair",
              description:
                "Free calculators for TCG and sports card buyers and sellers. Fair Deal Calculator for in-person cash deals, Consignment Calculator comparing 11 selling platforms.",
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
