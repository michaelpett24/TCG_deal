import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Articles — TCG Card Selling Guides & Calculators | TCGFair",
  description:
    "In-depth guides on Pokémon TCG and trading card selling: eBay fees, consignment platform comparisons, cash deal pricing, and more.",
  alternates: { canonical: "/articles" },
};

const ARTICLES = [
  {
    href: "/articles/which-card-consignment-platform-pays-the-most",
    eyebrow: "Consignment",
    title: "Which Card Consignment Platform Pays Sellers the Most?",
    desc: "Compare seller payouts across Fanatics Collect, Goldin, Probstein, PSA Vault, Heritage, Alt, and eBay — and see exactly which platform wins at your price point.",
    readTime: "7 min read",
  },
  {
    href: "/articles/is-85-percent-fair-for-pokemon-cards",
    eyebrow: "Cash Deals",
    title: "Is 85% of Market a Fair Cash Deal for Pokémon Cards?",
    desc: "The 85% rule covers the seller's side — but completely ignores the buyer's. Here's the full math on what a genuinely fair in-person deal looks like.",
    readTime: "5 min read",
  },
  {
    href: "/articles/ebay-fees-for-selling-cards",
    eyebrow: "eBay Fees",
    title: "eBay Fees for Selling Trading Cards: What You Actually Net",
    desc: "eBay's 13.25% FVF applies to the full transaction — card price, tax, and shipping. The effective rate on the card alone is closer to 15%. Here's the exact math.",
    readTime: "6 min read",
  },
];

export default function ArticlesPage() {
  return (
    <div className="page-wrap">
      <div className="page-eyebrow">TCGFair</div>
      <h1 className="page-h1">Articles</h1>
      <p className="page-intro" style={{ color: "var(--text-dim)" }}>
        Guides on TCG card selling — eBay fees, consignment platform comparisons, and the math behind fair in-person deals.
      </p>

      <div className="articles-index-list">
        {ARTICLES.map(a => (
          <Link key={a.href} href={a.href} className="articles-index-item">
            <div className="articles-index-item-eyebrow">{a.eyebrow} · {a.readTime}</div>
            <div className="articles-index-item-title">{a.title}</div>
            <div className="articles-index-item-desc">{a.desc}</div>
            <div className="articles-index-item-cta">Read article →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
