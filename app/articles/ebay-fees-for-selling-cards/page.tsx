import type { Metadata } from "next";
import Link from "next/link";
import { SuppliesStrip } from "../../supplies-strip";

export const metadata: Metadata = {
  title: "eBay Fees for Selling Trading Cards: What You Actually Net | TCGFair",
  description:
    "eBay charges 13.25% on card sales — but the real effective rate is closer to 15% once you account for fees on shipping and tax. Here's exactly what sellers keep.",
  alternates: { canonical: "/articles/ebay-fees-for-selling-cards" },
  openGraph: {
    title: "eBay Fees for Selling Trading Cards: What You Actually Net",
    description:
      "eBay charges 13.25% on card sales — but the real effective rate is closer to 15% once you account for fees on shipping and tax.",
    url: "https://tcgfair.com/articles/ebay-fees-for-selling-cards",
    siteName: "TCGFair",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "eBay Fees for Selling Trading Cards: What You Actually Net",
  description:
    "eBay charges 13.25% on card sales — but the real effective rate is closer to 15% once you account for fees on shipping and tax. Here's exactly what sellers keep.",
  datePublished: "2026-06-09",
  dateModified: "2026-06-09",
  author: { "@type": "Organization", name: "TCGFair" },
  publisher: { "@type": "Organization", name: "TCGFair", url: "https://tcgfair.com" },
  url: "https://tcgfair.com/articles/ebay-fees-for-selling-cards",
};

export default function ArticleEbayFeesPage() {
  return (
    <div className="page-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <nav className="article-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="article-breadcrumb-sep">›</span>
        <Link href="/articles">Articles</Link>
        <span className="article-breadcrumb-sep">›</span>
        <span className="article-breadcrumb-current">eBay Fees for Selling Cards</span>
      </nav>

      <div className="page-eyebrow">eBay Fees · 6 min read</div>
      <h1 className="page-h1">eBay Fees for Selling Trading Cards: What You Actually Net</h1>
      <p className="article-meta">
        eBay&rsquo;s 13.25% Final Value Fee applies to the full transaction — card price, tax, and shipping — so the effective rate on the card price alone is higher than most sellers expect.
      </p>

      <div className="article-body">

        <p>
          eBay is the default marketplace for selling trading cards. The liquidity is unmatched, the buyer pool is global, and for most cards with an established sold history it&rsquo;s the most efficient way to establish market price. But most sellers underestimate what they actually pay in fees — because the headline rate of 13.25% isn&rsquo;t the number that matters.
        </p>

        <h2>The Final Value Fee Explained</h2>
        <p>
          eBay&rsquo;s Final Value Fee (FVF) for Trading Cards is <strong>13.25% of the total transaction amount</strong>, plus $0.30 per order. The critical word is &ldquo;total transaction&rdquo; — eBay calculates the fee on the sum of the card price, the shipping charge you collect from the buyer, and any sales tax eBay collects on the buyer&rsquo;s behalf.
        </p>
        <p>
          For sales above $7,500, the rate drops to 2.35% on the portion exceeding $7,500. For most single-card TCG and sports card sales, the 13.25% rate applies to the full amount.
        </p>
        <p>
          The fee structure has a key implication that&rsquo;s easy to miss: <strong>eBay charges its percentage on money that never touches your pocket</strong>. The sales tax the buyer pays goes straight to the state — but eBay still takes 13.25% of it. The shipping amount the buyer pays goes to the carrier — but eBay still takes 13.25% of that too.
        </p>

        <h2>Why Your Effective Rate Is Higher Than 13.25%</h2>
        <p>
          Walk through the math on a typical $100 card with $4 shipping and 8.25% buyer sales tax:
        </p>

        <div className="hiw-math-box">
          <div className="formula-line"><span className="formula-label">Card price</span><span className="formula-val">$100.00</span></div>
          <div className="formula-line"><span className="formula-label">+ Shipping charged to buyer</span><span className="formula-val">$4.00</span></div>
          <div className="formula-line"><span className="formula-label">+ Sales tax (8.25% on $100)</span><span className="formula-val">$8.25</span></div>
          <div className="formula-line formula-total"><span>eBay fee base</span><span className="formula-val">$112.25</span></div>
          <div style={{ height: 10 }} />
          <div className="formula-line"><span className="formula-label">$112.25 × 13.25%</span><span className="formula-val">$14.87</span></div>
          <div className="formula-line"><span className="formula-label">+ $0.30 fixed fee</span><span className="formula-val">$0.30</span></div>
          <div className="formula-line formula-total"><span>Total eBay fee</span><span className="formula-val">$15.17</span></div>
        </div>

        <p>
          eBay charges $15.17 in fees on a $100 card. The effective rate on the card price alone is <strong>15.17%</strong> — not 13.25%. That gap exists because eBay is also taking its cut of the shipping ($0.53 in fees on $4 shipping) and the sales tax ($1.09 in fees on $8.25 tax).
        </p>
        <p>
          Your net after the eBay fee: $100 − $15.17 = <strong>$84.83</strong>. Shipping is a wash — you collect $4 from the buyer and pay $4 to the carrier, net zero. The sales tax goes to the state via eBay&rsquo;s collection, not to you.
        </p>

        <h2>What Sellers Actually Net — By Price Point</h2>
        <p>
          Using standard assumptions of $4 shipping and 8.25% sales tax, here&rsquo;s the exact fee and net payout at common card price points:
        </p>

        <div className="article-number-table-wrap">
          <table className="article-number-table">
            <thead>
              <tr>
                <th>Card Price</th>
                <th>eBay Fee</th>
                <th>Net to Seller</th>
                <th>Effective Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>$100</td><td>$15.17</td><td>$84.83</td><td>15.2%</td></tr>
              <tr><td>$250</td><td>$36.69</td><td>$213.31</td><td>14.7%</td></tr>
              <tr><td>$500</td><td>$72.55</td><td>$427.45</td><td>14.5%</td></tr>
              <tr><td>$1,000</td><td>$144.26</td><td>$855.74</td><td>14.4%</td></tr>
              <tr><td>$2,500</td><td>$359.41</td><td>$2,140.59</td><td>14.4%</td></tr>
            </tbody>
          </table>
        </div>

        <p>
          The effective rate decreases slightly as the card price rises because the fixed costs of shipping and the $0.30 fee are spread across a larger base. At $100, shipping and tax account for a large portion of the fee base. At $2,500, the same $4 shipping and 8.25% tax are proportionally smaller, so the rate converges closer to 13.25%.
        </p>

        <h2>Free Shipping Changes the Math</h2>
        <p>
          Some sellers offer free shipping to make listings more attractive. When you list with free shipping, the shipping charge doesn&rsquo;t appear in the buyer&rsquo;s total — so eBay&rsquo;s fee base drops. On the $100 card:
        </p>

        <div className="hiw-math-box">
          <div className="formula-line"><span className="formula-label">Card price</span><span className="formula-val">$100.00</span></div>
          <div className="formula-line"><span className="formula-label">+ Sales tax (8.25%)</span><span className="formula-val">$8.25</span></div>
          <div className="formula-line"><span className="formula-label">+ Shipping charged to buyer</span><span className="formula-val">$0.00</span></div>
          <div className="formula-line formula-total"><span>eBay fee base</span><span className="formula-val">$108.25</span></div>
          <div style={{ height: 10 }} />
          <div className="formula-line"><span className="formula-label">$108.25 × 13.25% + $0.30</span><span className="formula-val">$14.64</span></div>
          <div className="formula-line"><span className="formula-label">Card proceeds − eBay fee</span><span className="formula-val">$85.36</span></div>
          <div className="formula-line formula-total"><span>Net after paying carrier (~$4)</span><span className="formula-val">~$81.36</span></div>
        </div>

        <p>
          With free shipping, your eBay fee drops from $15.17 to $14.64 — a saving of $0.53. But you&rsquo;re also absorbing the ~$4 carrier cost yourself. Your actual net is closer to $81.36, not $85.36. Free shipping makes listings more attractive to buyers and can support a higher sale price, but it doesn&rsquo;t save you money on fees alone — it costs you the carrier expense in exchange for a cleaner buyer experience.{" "}
          <a href="https://www.amazon.com/dp/B09P1D8DX1?tag=collectorinsi-20" target="_blank" rel="noopener noreferrer">Bubble mailers</a>,
          a{" "}<a href="https://www.amazon.com/dp/B076V4V2QQ?tag=collectorinsi-20" target="_blank" rel="noopener noreferrer">toploader</a>,
          {" "}and a penny sleeve typically run $1.50–$2.00 per card in materials.
        </p>

        {/* Mid-article CTA */}
        <div className="cta-box">
          <p>Find your exact seller floor on any card — enter the eBay sold price and instantly see the minimum you should accept in a private cash sale.</p>
          <Link href="/" className="cta-btn">Open the Fair Deal Calculator →</Link>
        </div>

        <h2>eBay vs. Cash Deal: What&rsquo;s Your Floor?</h2>
        <p>
          Knowing your eBay net matters most when someone approaches you with a cash offer at a card show, LGS, or trade night. The $84.83 net on a $100 card isn&rsquo;t just an abstract number — it&rsquo;s your walk-away price in a private sale. Below that, you&rsquo;d net more by listing on eBay.
        </p>
        <p>
          But there&rsquo;s a second number that matters: the buyer&rsquo;s eBay ceiling. The buyer in that cash deal is also avoiding eBay — they&rsquo;re not paying $112.25 in tax and shipping. Any price between your floor ($84.83) and their ceiling ($112.25) is better than eBay for both of you. The even split — where both parties save the same amount — is $98.54.
        </p>
        <p>
          The 85% rule prices you at $85. That leaves $0.17 above your floor and gives the buyer $27.25 in savings. It&rsquo;s not a bad deal — you&rsquo;re not losing vs. eBay — but you&rsquo;re getting almost none of the mutual benefit of avoiding the platform.
        </p>
        <p>
          The full picture requires knowing both sides of the eBay comparison, not just the seller&rsquo;s fee rate.
        </p>

        <h2>A Note on Promoted Listings and Store Fees</h2>
        <p>
          The numbers above reflect the standard FVF only. If you run Promoted Listings campaigns, the additional ad rate (which you set, typically 2–15%) is charged on top of the FVF on any promoted sales. For high-volume sellers with eBay Store subscriptions, the FVF may be slightly lower depending on the subscription tier and category. If you&rsquo;re a Power Seller or above with negotiated rates, your effective cost is lower than the standard 13.25%. The Fair Deal Calculator has an adjustable fee rate field if you want to model your actual rate.
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="cta-box">
        <p>Know your exact eBay floor on any card. Enter the sold price and instantly see what you&rsquo;d net — and what a fair cash deal looks like for both sides.</p>
        <Link href="/" className="cta-btn">Open the Fair Deal Calculator →</Link>
      </div>

      <SuppliesStrip />

      {/* Related articles */}
      <div className="article-related">
        <div className="article-related-title">Related Articles</div>
        <div className="article-related-links">
          <Link href="/articles/is-85-percent-fair-for-pokemon-cards" className="article-related-link">
            <span>Is 85% of Market a Fair Cash Deal for Pokémon Cards?</span>
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
