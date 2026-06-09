import type { Metadata } from "next";
import Link from "next/link";
import { SuppliesStrip } from "../../supplies-strip";

export const metadata: Metadata = {
  title: "Is 85% of Market Fair for Pokémon Cards? The Math Behind Cash Deals | TCGFair",
  description:
    "The \"85% of market\" rule is often cited as the seller's break-even — but it ignores the buyer's side entirely. Here's the full math on what a fair Pokémon card cash deal actually looks like.",
  alternates: { canonical: "/articles/is-85-percent-fair-for-pokemon-cards" },
  openGraph: {
    title: "Is 85% of Market Fair for Pokémon Cards? The Math Behind Cash Deals",
    description:
      "The \"85% of market\" rule only accounts for one side of the transaction. Here's what a genuinely fair in-person deal looks like.",
    url: "https://tcgfair.com/articles/is-85-percent-fair-for-pokemon-cards",
    siteName: "TCGFair",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Is 85% of Market a Fair Cash Deal for Pokémon Cards?",
  description:
    "The \"85% of market\" rule is often cited as the seller's break-even — but it ignores the buyer's side entirely. Here's the full math on what a fair Pokémon card cash deal actually looks like.",
  datePublished: "2026-06-09",
  dateModified: "2026-06-09",
  author: { "@type": "Organization", name: "TCGFair" },
  publisher: { "@type": "Organization", name: "TCGFair", url: "https://tcgfair.com" },
  url: "https://tcgfair.com/articles/is-85-percent-fair-for-pokemon-cards",
};

export default function Article85PercentPage() {
  return (
    <div className="page-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <nav className="article-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="article-breadcrumb-sep">›</span>
        <Link href="/articles">Articles</Link>
        <span className="article-breadcrumb-sep">›</span>
        <span className="article-breadcrumb-current">Is 85% Fair?</span>
      </nav>

      <div className="page-eyebrow">Cash Deals · 5 min read</div>
      <h1 className="page-h1">Is 85% of Market a Fair Cash Deal for Pokémon Cards?</h1>
      <p className="article-meta">
        At every card show and LGS, 85% of market is the default cash offer. It&rsquo;s not wrong — but it&rsquo;s incomplete.
      </p>

      <div className="article-body">

        <p>
          Walk into any card show negotiation and you&rsquo;ll hear the same number: 85% of market. It&rsquo;s cited as the standard cash deal price, the seller&rsquo;s break-even, the floor below which you&rsquo;re leaving money on the table. And it&rsquo;s roughly accurate — for the seller.
        </p>
        <p>
          The problem is that a cash deal involves two parties. 85% only accounts for one of them.
        </p>

        <h2>Where 85% Comes From</h2>
        <p>
          eBay&rsquo;s Final Value Fee for Trading Cards is 13.25% of the total transaction — that&rsquo;s the card price plus shipping plus any sales tax collected — plus a $0.30 fixed fee per transaction. For a $100 card with $4 shipping and 8.25% tax:
        </p>

        <div className="hiw-math-box">
          <div className="formula-line"><span className="formula-label">eBay fee base (card + shipping + tax)</span><span className="formula-val">$112.25</span></div>
          <div className="formula-line"><span className="formula-label">× 13.25% + $0.30</span><span className="formula-val">$15.17</span></div>
          <div className="formula-line formula-total"><span>Seller nets</span><span className="formula-val">$84.83</span></div>
        </div>

        <p>
          So a seller nets roughly $84.83 on a $100 card after eBay fees. That&rsquo;s where &ldquo;85%&rdquo; comes from — it&rsquo;s a reasonable approximation of the seller&rsquo;s eBay break-even. Below $84.83 in a cash deal, the seller would have been better off listing on eBay. That part is accurate.
        </p>

        <h2>What 85% Ignores: The Buyer&rsquo;s Side</h2>
        <p>
          When a buyer purchases the same card on eBay, they don&rsquo;t pay $100. They pay $100 plus sales tax plus shipping:
        </p>

        <div className="hiw-math-box">
          <div className="formula-line"><span className="formula-label">Card price</span><span className="formula-val">$100.00</span></div>
          <div className="formula-line"><span className="formula-label">+ Sales tax (8.25%)</span><span className="formula-val">+ $8.25</span></div>
          <div className="formula-line"><span className="formula-label">+ Shipping</span><span className="formula-val">+ $4.00</span></div>
          <div className="formula-line formula-total"><span>Buyer&rsquo;s true eBay cost</span><span className="formula-val">$112.25</span></div>
        </div>

        <p>
          The buyer&rsquo;s ceiling — the maximum a fair cash price should ever reach — is $112.25. Above that, the buyer would be better off buying on eBay.
        </p>
        <p>
          Now look at what happens at the &ldquo;standard&rdquo; 85% cash offer of $85:
        </p>

        <div className="hiw-math-box">
          <div className="formula-line"><span className="formula-label">Cash price</span><span className="formula-val">$85.00</span></div>
          <div className="formula-line"><span className="formula-label">Buyer saves vs. eBay ($112.25 − $85)</span><span className="formula-val">+$27.25</span></div>
          <div className="formula-line formula-total"><span>Seller gains vs. eBay floor ($85 − $84.83)</span><span className="formula-val">+$0.17</span></div>
        </div>

        <p>
          At $85, the buyer saves $27.25 compared to buying on eBay. The seller gains $0.17 above their eBay floor — essentially nothing. The buyer is capturing nearly all the value of avoiding eBay. The seller breaks even. That&rsquo;s not an even trade.
        </p>

        <SuppliesStrip />

        {/* Mid-article CTA */}
        <div className="cta-box">
          <p>Find the even-split price on any card in seconds — enter the eBay sold price and see the seller floor, buyer ceiling, and fair split price instantly.</p>
          <Link href="/" className="cta-btn">Open the Fair Deal Calculator →</Link>
        </div>

        <h2>The Even Split: What &ldquo;Fair&rdquo; Actually Means</h2>
        <p>
          The fair price in a cash deal isn&rsquo;t the seller&rsquo;s floor. It&rsquo;s the price where <em>both parties save the same dollar amount</em> compared to their eBay alternatives.
        </p>
        <p>
          The even-split price is the midpoint between the seller&rsquo;s floor ($84.83) and the buyer&rsquo;s ceiling ($112.25):
        </p>

        <div className="hiw-math-box">
          <div className="formula-line"><span className="formula-label">Seller floor</span><span className="formula-val">$84.83</span></div>
          <div className="formula-line"><span className="formula-label">+ Buyer ceiling</span><span className="formula-val">$112.25</span></div>
          <div className="formula-line formula-total"><span>Even split (÷ 2)</span><span className="formula-val">$98.54</span></div>
        </div>

        <p>
          At $98.54, both the buyer and seller each save $13.71 compared to their eBay experience. Neither side is subsidizing the other. That&rsquo;s the definition of a fair deal — not the seller&rsquo;s break-even.
        </p>
        <p>
          Any price between $84.83 and $112.25 is mutually beneficial — better than eBay for both parties. But within that range, $85 is heavily skewed toward the buyer. And $98.54 is the only price where both sides save equally.
        </p>

        <h2>When 85% Is Fine</h2>
        <p>
          None of this means $85 is a dishonest offer. If you&rsquo;re a seller who just wants to move a card quickly, accepting 85% is a rational choice — you&rsquo;re not losing money vs. eBay, you&rsquo;re just not capturing your share of the mutual savings.
        </p>
        <p>
          But knowing the math means knowing what you&rsquo;re giving up. On a $100 card, the difference between 85% and the even split is about $13.50. On a $500 card with the same tax/shipping assumptions, the seller&rsquo;s floor is roughly $424 and the even split is around $493 — the gap is about $69. On a $1,000 card, you&rsquo;re looking at roughly $135 left on the table by accepting the &ldquo;standard&rdquo; offer.
        </p>
        <p>
          The 85% rule isn&rsquo;t wrong. It&rsquo;s just the floor, not the ceiling — and not the fair midpoint. A buyer who offers 85% is making a reasonable opening bid. A seller who knows the even-split math can make a reasonable counteroffer.
        </p>

        <h2>How Tax and Shipping Affect the Number</h2>
        <p>
          The even-split price changes with local tax rates and shipping assumptions. In states with no sales tax (Oregon, Montana, Delaware, New Hampshire, Alaska), the buyer&rsquo;s ceiling drops and the even split lands closer to 90–92% of market. With higher tax rates (New York City at 8.875%, some California counties above 10%), the buyer&rsquo;s ceiling rises and the fair midpoint can reach 98–100% of market.
        </p>
        <p>
          This matters at card shows that draw buyers from across state lines. A buyer flying in from Oregon genuinely has a lower eBay cost than a buyer from Texas — their ceiling is lower, and the fair split adjusts accordingly. The calculator lets you set the exact rate.
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="cta-box">
        <p>Know your floor before you negotiate. Enter any card&rsquo;s eBay sold price to see the seller floor, buyer ceiling, and even-split price instantly.</p>
        <Link href="/" className="cta-btn">Open the Fair Deal Calculator →</Link>
      </div>

      {/* Related articles */}
      <div className="article-related">
        <div className="article-related-title">Related Articles</div>
        <div className="article-related-links">
          <Link href="/articles/ebay-fees-for-selling-cards" className="article-related-link">
            <span>eBay Fees for Selling Trading Cards: What You Actually Net</span>
            <span className="article-related-link-arrow">→</span>
          </Link>
          <Link href="/articles/which-card-consignment-platform-pays-the-most" className="article-related-link">
            <span>Which Card Consignment Platform Pays Sellers the Most?</span>
            <span className="article-related-link-arrow">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
