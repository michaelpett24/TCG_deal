import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ConsignmentCalc } from "./consignment-calc";
import { SuppliesStrip } from "../supplies-strip";

export const metadata: Metadata = {
  title:
    "Card Consignment Calculator: Compare eBay, Fanatics, PSA Vault, Goldin & More | TCGFair",
  description:
    "Instantly compare seller payouts across 11 consignment platforms including Fanatics Collect, PSA Vault, eBay, Goldin, Heritage, Alt, Probstein, and more. Enter what the buyer pays and see exactly what you keep.",
  alternates: { canonical: "/consignment-calculator" },
  openGraph: {
    title: "Card Consignment Calculator — TCGFair",
    description:
      "Enter what a buyer pays and instantly see your net payout across 11 platforms — ranked best to worst.",
    url: "https://tcgfair.com/consignment-calculator",
    siteName: "TCG Fair Deal Calculator",
    images: [{ url: "/og", width: 1200, height: 630, alt: "Card Consignment Calculator — TCGFair" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Card Consignment Calculator — TCGFair",
    description: "Compare seller payouts across 11 platforms — ranked best to worst. Free tool for TCG and sports card sellers.",
    images: ["/og"],
  },
};

const FAQ_ITEMS = [
  {
    q: "What does 'buyer pays' mean in this calculator?",
    a: "The total all-in amount the buyer pays, including any buyer's premium. For an auction with a 20% buyer's premium, a buyer who pays $120 generated a $100 hammer price. Enter $120 and the calculator derives the $100 hammer automatically.",
  },
  {
    q: "Does Fanatics Collect charge a seller fee on auctions?",
    a: "No. You receive 100% of the hammer price plus a bonus commission based on your tier. Fanatics Collect earns its revenue from the 20% buyer's premium charged to the buyer.",
  },
  {
    q: "What is a buyer's premium and does it affect my payout?",
    a: "A buyer's premium is a fee charged to the buyer on top of the hammer price. It is paid by the buyer, not the seller — so it doesn't directly reduce your payout. However, a high buyer's premium can dampen bidding and potentially lead to a lower hammer price.",
  },
  {
    q: "Which platform has the lowest seller fees?",
    a: "It depends on the sale price. Goldin and Fanatics Collect auctions charge $0 seller commission. PSA Vault fees drop to as low as 7% on sales over $5,000. Probstein charges just 5% on sales over $1,000. Use the calculator above to compare for your specific price point.",
  },
  {
    q: "Can I use PSA Vault if my cards are graded by BGS or SGC?",
    a: "Yes. PSA Vault accepts cards graded by PSA, BGS, SGC, and CGC. Cards must be physically stored in the PSA Vault before they can be listed for consignment.",
  },
  {
    q: "Why does Heritage show a dropdown instead of a fixed payout?",
    a: "Heritage Auctions does not publish seller commission rates — they are always negotiated between Heritage and the consignor. The calculator defaults to 10%, which is a typical rate for first-time consignors. Established consignors with strong relationships often negotiate their commission down to 0%.",
  },
  {
    q: "Does Alt charge sales tax?",
    a: "No. Alt's vault is located in Delaware, which has no state sales tax. All transactions processed through the Alt Vault are tax-free for buyers, which can support stronger hammer prices.",
  },
  {
    q: "What does Z and G Emporium accept?",
    a: "Z and G Emporium accepts TCG graded cards only — specifically Pokémon, Yu-Gi-Oh, and Magic: The Gathering graded by PSA, BGS, or CGC. Sports cards, raw ungraded cards, and sealed product are not accepted.",
  },
  {
    q: "What's the difference between Goldin Weekly and Elite auctions?",
    a: "Goldin Weekly auctions close on Thursdays, start at $10, and target cards with $100+ value. Goldin Elite auctions run on a variable schedule, start at $500, and target cards with $7,500+ estimated value. Both charge $0 seller commission — you receive 100% of the hammer price.",
  },
  {
    q: "Why does my payout differ across platforms even when the buyer pays the same amount?",
    a: "Each platform's fee structure is fundamentally different. Auction platforms derive the hammer price from the buyer's total by stripping out the buyer's premium; your payout is based on that hammer. Fixed-price platforms charge a direct seller fee on the full sale price. The buyer's premium rate, seller commission tier, and flat fees all compound into very different seller outcomes.",
  },
];

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "TCGFair Consignment Calculator",
  description:
    "Compare seller payouts across 11 consignment platforms including Fanatics Collect, PSA Vault, eBay, Goldin, Heritage, Alt, Probstein, and more. Enter what the buyer pays and see exactly what you keep.",
  url: "https://tcgfair.com/consignment-calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

const PLATFORM_SUMMARIES = [
  {
    name: "Fanatics Collect — Weekly Auction",
    bestFor: "Any graded TCG or sports card; great mid-range value",
    fees: "No seller fee; 20% buyer's premium; bonus commission by tier",
    min: "None",
    url: "https://www.fanaticscollect.com/how-to-sell",
  },
  {
    name: "Fanatics Collect — Premier Auction",
    bestFor: "High-end cards $10,000+ market value; white-glove experience",
    fees: "No seller fee; 20% buyer's premium; 10–15% seller bonus",
    min: "$10,000+ est. value; seller approval required",
    url: "https://www.fanaticscollect.com/how-to-sell",
  },
  {
    name: "Fanatics Collect — Buy Now",
    bestFor: "Sellers wanting price control and instant listing",
    fees: "6–12% seller fee; no buyer's premium",
    min: "Card must be in FC Vault",
    url: "https://www.fanaticscollect.com/how-to-sell",
  },
  {
    name: "eBay (direct)",
    bestFor:
      "High-volume sellers comfortable managing listing, shipping, and customer service",
    fees: "13.25% FVF on total transaction + $0.40",
    min: "None",
    url: "https://www.ebay.com/sl/sell",
  },
  {
    name: "Z and G Emporium",
    bestFor: "TCG graded cards under $3,000; hands-off selling",
    fees: "5–12% commission based on sale price; Z&G handles everything",
    min: "TCG graded only (PSA/BGS/CGC); $250 min for fixed price",
    url: "https://www.zandgemporium.com",
  },
  {
    name: "Probstein123",
    bestFor:
      "Sports cards and TCG; competitive 5% fee on sales over $1,000; broadest item acceptance",
    fees: "5–15% commission by sale price",
    min: "None stated",
    url: "https://p123auctions.com",
  },
  {
    name: "PSA Vault",
    bestFor: "Cards already in PSA Vault; seamless grade-to-sell pipeline",
    fees: "7–13% fee based on sale price; $5 minimum",
    min: "Card must be in PSA Vault; graded by PSA/BGS/SGC/CGC",
    url: "https://www.psacard.com/info/consignment-rates",
  },
  {
    name: "Goldin Auctions",
    bestFor:
      "Premium and vintage cards; $0 seller fee; large non-eBay buyer pool",
    fees: "No seller fee; 22% buyer's premium",
    min: "Weekly: target $100+; Elite: $7,500+ estimated value",
    url: "https://goldin.co",
  },
  {
    name: "Heritage Auctions",
    bestFor:
      "High-value sports memorabilia and vintage cards; most negotiable terms",
    fees: "Negotiated seller commission (0–15%); 25% buyer's premium",
    min: "~$1,000+ estimated value; must contact Heritage",
    url: "https://www.ha.com/consign/",
  },
  {
    name: "Alt — Auction",
    bestFor:
      "Active Alt vault users; rewards tier system benefits high-volume sellers",
    fees: "No seller fee; 20% buyer's premium; 4–15% seller bonus",
    min: "Card must be in Alt Vault",
    url: "https://alt.xyz/",
  },
  {
    name: "Alt — Fixed Price",
    bestFor:
      "Alt Vault users wanting price control; competitive fees at Silver/Gold/Black tier",
    fees: "4–14% fee by price and tier",
    min: "Card must be in Alt Vault",
    url: "https://alt.xyz/",
  },
];

export default function ConsignmentCalculatorPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      {/* Header */}
      <div className="app">
        <header className="app-header">
          <p className="app-eyebrow">TCGFair — Seller Tools</p>
          <h1 className="app-h1">TCG &amp; Sports Card Consignment Calculator</h1>
          <p className="app-desc">
            Enter what a buyer would pay, and we&apos;ll show you exactly what lands in your pocket —
            across every major platform, ranked from best to worst payout.
          </p>
        </header>

        {/* Calculator client island */}
        <Suspense
          fallback={
            <div style={{ padding: 32, textAlign: "center", color: "#8a8fa8" }}>
              Loading...
            </div>
          }
        >
          <ConsignmentCalc />
        </Suspense>
      </div>
      <SuppliesStrip />

      {/* Static SEO content */}
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "0 16px 80px" }}>
        {/* How This Calculator Works */}
        <section className="seo-section">
          <h2 className="seo-h2">How This Calculator Works</h2>
          <div className="seo-body">
            <p>
              <strong style={{ color: "var(--text)" }}>&ldquo;Buyer pays&rdquo;</strong> is the
              total all-in amount the buyer sends to the platform, including any buyer&apos;s premium.
              For most auctions, this is the checkout total — not just the hammer price.
            </p>
            <p>
              For auction platforms (Fanatics Collect, Goldin, Alt, Heritage), the hammer price is
              derived by dividing the buyer&apos;s total by{" "}
              <code style={{ background: "var(--panel-alt)", border: "1px solid var(--border)", borderRadius: 3, padding: "1px 5px", fontSize: 12, color: "var(--gold)" }}>
                1 + buyer_premium_rate
              </code>
              . Your payout is calculated from the hammer price, not the buyer&apos;s all-in total.
            </p>
            <p>
              The eBay direct row treats the entered price as the final sale price and ignores
              shipping and sales tax per the disclaimer below the rows. Heritage defaults to a 10%
              seller commission — a typical starting point for first-time consignors — but use the
              inline dropdown to model your negotiated rate. The Alt bonus is based on submission
              value at intake; the calculator estimates this using the derived hammer price.
            </p>
          </div>
        </section>

        {/* Understanding Consignment Fees */}
        <section className="seo-section">
          <h2 className="seo-h2">Understanding Consignment Fees</h2>
          <div className="seo-body">
            <p>
              <strong style={{ color: "var(--text)" }}>Buyer&apos;s premium</strong> is an extra
              fee charged to the buyer on top of the hammer price. It is paid by the buyer, not the
              seller. However, a high buyer&apos;s premium can suppress competitive bidding and lead
              to a lower hammer price.
            </p>
            <p>
              <strong style={{ color: "var(--text)" }}>Seller commission</strong> is the fee a
              platform deducts from your hammer price before paying you out. Some platforms (Fanatics
              Collect, Goldin, Alt) charge $0 and instead earn from the buyer&apos;s premium.
              Others charge a tiered percentage.
            </p>
            <p>
              <strong style={{ color: "var(--text)" }}>DIY vs. consignment tradeoff:</strong> Listing
              directly on eBay gives you full control and typically the highest gross, but you handle
              photography, listing, customer service, and shipping. Consignment platforms absorb all
              of that in exchange for their fee. If you&rsquo;re shipping cards yourself, standard
              supplies include{" "}
              <a href="https://www.amazon.com/dp/B078SFLTJQ?tag=collectorinsi-20" target="_blank" rel="noopener noreferrer" style={{ color: "var(--green)", textDecoration: "none" }}>Card Saver 1s</a>
              {" "}for PSA submissions,{" "}
              <a href="https://www.amazon.com/dp/B076V4V2QQ?tag=collectorinsi-20" target="_blank" rel="noopener noreferrer" style={{ color: "var(--green)", textDecoration: "none" }}>toploaders</a>
              {" "}for raw cards, and{" "}
              <a href="https://www.amazon.com/dp/B09P1D8DX1?tag=collectorinsi-20" target="_blank" rel="noopener noreferrer" style={{ color: "var(--green)", textDecoration: "none" }}>bubble mailers</a>
              {" "}for safe transit.
            </p>
            <p>
              <strong style={{ color: "var(--text)" }}>
                Why the highest buyer price ≠ highest seller payout:
              </strong>{" "}
              A platform with a 25% buyer&apos;s premium will show a higher all-in buyer price for
              the same hammer than one with a 20% premium. But your payout comes from the hammer,
              not the buyer&apos;s total — so a bigger premium can make the platform look more
              competitive to buyers while delivering the same or less to you.
            </p>
          </div>
        </section>

        {/* Platform Summaries */}
        <section className="seo-section">
          <details className="disclosure">
            <summary className="disclosure-summary">
              <span>Platform details &amp; best-for guide</span>
              <span className="disclosure-meta">11 platforms compared</span>
            </summary>
            <div className="disclosure-body">
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {PLATFORM_SUMMARIES.map((p) => (
                  <div
                    key={p.name}
                    style={{
                      background: "var(--panel)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      padding: "14px 16px",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: 16,
                        letterSpacing: "0.06em",
                        color: "var(--gold)",
                        marginBottom: 6,
                      }}
                    >
                      {p.name}
                    </div>
                    <div style={{ fontSize: 12, color: "#8a8fa8", lineHeight: 1.7 }}>
                      <span style={{ color: "var(--text-dim)" }}>Best for:</span> {p.bestFor}
                    </div>
                    <div style={{ fontSize: 12, color: "#8a8fa8", lineHeight: 1.7 }}>
                      <span style={{ color: "var(--text-dim)" }}>Fees:</span> {p.fees}
                    </div>
                    <div
                      style={{ fontSize: 12, color: "#8a8fa8", lineHeight: 1.7, marginBottom: 8 }}
                    >
                      <span style={{ color: "var(--text-dim)" }}>Min:</span> {p.min}
                    </div>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: 11,
                        color: "var(--green)",
                        textDecoration: "none",
                        letterSpacing: "0.04em",
                      }}
                    >
                      Visit platform ↗
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </details>
        </section>

        {/* FAQ */}
        <section className="seo-section">
          <h2 className="seo-h2">Frequently Asked Questions</h2>

          {/* JSON-LD FAQ schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {FAQ_ITEMS.map((item, i) => (
              <details key={i} className="disclosure">
                <summary className="disclosure-summary">
                  <span>{item.q}</span>
                </summary>
                <div
                  className="disclosure-body seo-body"
                  style={{ fontSize: 13, padding: "14px 16px" }}
                >
                  <p>{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Internal CTA */}
        <div className="cta-box">
          <p>
            Looking to negotiate a private sale instead? The TCGFair Deal Calculator shows the fair
            price for any in-person card trade.
          </p>
          <Link href="/" className="cta-btn">
            Open the Deal Calculator →
          </Link>
        </div>
      </div>
    </main>
  );
}
