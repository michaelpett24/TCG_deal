import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Which Card Consignment Platform Pays Sellers the Most? | TCGFair",
  description:
    "Compare seller payouts across Fanatics Collect, Goldin, Probstein, PSA Vault, Heritage, Alt, and eBay. See exactly what you keep — and which platform wins at your price point.",
  alternates: { canonical: "/articles/which-card-consignment-platform-pays-the-most" },
  openGraph: {
    title: "Which Card Consignment Platform Pays Sellers the Most?",
    description:
      "Compare seller payouts across Fanatics Collect, Goldin, Probstein, PSA Vault, Heritage, Alt, and eBay.",
    url: "https://tcgfair.com/articles/which-card-consignment-platform-pays-the-most",
    siteName: "TCGFair",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Which Card Consignment Platform Pays Sellers the Most?",
  description:
    "Compare seller payouts across Fanatics Collect, Goldin, Probstein, PSA Vault, Heritage, Alt, and eBay. See exactly what you keep — and which platform wins at your price point.",
  datePublished: "2026-06-09",
  dateModified: "2026-06-09",
  author: { "@type": "Organization", name: "TCGFair" },
  publisher: { "@type": "Organization", name: "TCGFair", url: "https://tcgfair.com" },
  url: "https://tcgfair.com/articles/which-card-consignment-platform-pays-the-most",
};

export default function ArticleConsignmentPage() {
  return (
    <div className="page-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <nav className="article-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="article-breadcrumb-sep">›</span>
        <Link href="/articles">Articles</Link>
        <span className="article-breadcrumb-sep">›</span>
        <span className="article-breadcrumb-current">Consignment Platform Comparison</span>
      </nav>

      <div className="page-eyebrow">Consignment · 7 min read</div>
      <h1 className="page-h1">Which Card Consignment Platform Pays Sellers the Most?</h1>
      <p className="article-meta">
        The platform with the largest buyer audience isn&rsquo;t always the one that puts the most money in your pocket.
      </p>

      <div className="article-body">

        <p>
          When you&rsquo;re deciding where to sell a high-value card, the choice of platform can easily be worth hundreds of dollars. A $1,000 card sold through the right platform might net you $950. Sold through the wrong one, $820. Same card, same buyer, different outcome.
        </p>
        <p>
          The difference comes down to fee structure — and fee structures in this space are genuinely complicated. Some platforms charge no seller commission at all but earn via buyer&rsquo;s premium. Others charge a direct percentage of your sale. A few do both. The only way to compare them is to run the actual numbers.
        </p>

        {/* Mid-article CTA */}
        <div className="cta-box">
          <p>Skip the math — enter what a buyer pays and see every platform ranked best to worst payout instantly.</p>
          <Link href="/consignment-calculator" className="cta-btn">Open the Consignment Calculator →</Link>
        </div>

        <h2>How Consignment Fees Actually Work</h2>
        <p>
          There are two separate fees in consignment: the <strong>seller commission</strong> and the <strong>buyer&rsquo;s premium</strong>. Understanding the difference is essential to comparing platforms accurately.
        </p>
        <p>
          The seller commission is what the platform deducts from your proceeds before paying you. If you sell a card for $1,000 and the platform charges 10% seller commission, you get $900. Simple.
        </p>
        <p>
          The buyer&rsquo;s premium is an additional fee charged to the buyer on top of the hammer price. On a $1,000 hammer with a 20% buyer&rsquo;s premium, the buyer pays $1,200. You still get the $1,000 (minus any seller commission). The platform keeps the $200 premium.
        </p>
        <p>
          Auction platforms like Fanatics Collect and Goldin have moved to a model where they charge <strong>$0 seller commission</strong> and earn entirely from the buyer&rsquo;s premium. On the surface this looks great for sellers. The catch is that buyer&rsquo;s premiums — especially when they reach 20–25% — can suppress competitive bidding. A buyer willing to pay $1,000 for a card might only bid $833 if they know they&rsquo;ll owe an additional $167 in premium.
        </p>
        <p>
          Fixed-price platforms (like Fanatics Collect Buy Now, Alt Fixed Price, or eBay direct) charge a direct seller fee. You get price control — you set the number and buyers either pay it or they don&rsquo;t. The tradeoff is that competitive auction dynamics can sometimes push a hammer higher than any fixed-price listing would reach.
        </p>

        <h2>Platform-by-Platform Breakdown</h2>

        <p><strong>Fanatics Collect — Weekly Auction</strong><br />
        No seller commission. 20% buyer&rsquo;s premium. You also receive a tier-based seller bonus: 4% on hammers from $100–$1,000, 6% on $1,000–$5,000, scaling up to 15% on $1M+. The bonus is applied to your hammer price and paid on top. This makes Fanatics Weekly competitive on mid-range cards where the bonus offsets any price suppression from the premium. Best for: most graded TCG and sports cards with a liquid eBay market.</p>

        <p><strong>Fanatics Collect — Premier Auction</strong><br />
        Same structure as Weekly — no seller fee, 20% buyer&rsquo;s premium, 10–15% seller bonus — but reserved for cards with $10,000+ estimated market value and requires direct approval from Fanatics Collect. Best for: high-end vintage and trophy cards where white-glove presentation matters.</p>

        <p><strong>Fanatics Collect — Buy Now</strong><br />
        6–12% seller fee based on sale price. No buyer&rsquo;s premium. You control the price and can list immediately if your card is already in the Fanatics vault. Best for: sellers who want certainty over auction dynamics and are comfortable letting a card sit at a fixed price.</p>

        <p><strong>Goldin</strong><br />
        No seller commission. 22% buyer&rsquo;s premium — slightly higher than Fanatics. Weekly auctions target cards with $100+ value; Elite auctions target $7,500+ estimated value with a $500 starting bid. Goldin&rsquo;s buyer pool leans toward sports card and vintage collectors. Best for: premium and vintage cards, especially sports cards where Goldin has strong buyer relationships.</p>

        <p><strong>Probstein123</strong><br />
        5–15% commission on a tiered scale: 15% under $200, 10% from $200–$1,000, 5% on $1,000+. No buyer&rsquo;s premium. At the $1,000+ tier, Probstein&rsquo;s 5% commission is among the lowest direct-fee options available, and they accept TCG and sports cards broadly. Best for: mid-range to high-value cards where the 5% tier kicks in and you want hands-off selling without the premium/suppression dynamic.</p>

        <p><strong>Z&amp;G Emporium</strong><br />
        5–12% commission. Accepts only TCG graded cards — Pokémon, MTG, and Yu-Gi-Oh graded by PSA, BGS, or CGC. $250 minimum for fixed price listings. Strong TCG-specific buyer base. Best for: TCG graded cards where a specialist audience is more valuable than a general marketplace.</p>

        <p><strong>PSA Vault</strong><br />
        7–13% fee on a tiered scale, with a $5 minimum. Your card must already be physically stored in the PSA Vault to list. If your cards are at PSA for grading and you&rsquo;re considering selling, the vault-to-listing pipeline is seamless. Accepts PSA, BGS, SGC, and CGC graded cards. Best for: cards already in PSA Vault where the convenience of not shipping is worth the fee.</p>

        <p><strong>Heritage Auctions</strong><br />
        The seller commission is fully negotiated — it typically starts around 10% for first-time consignors and can reach 0% for established relationships with proven sale history. Heritage charges a 25% buyer&rsquo;s premium, the highest of any platform here. Targets $1,000+ estimated value cards. Best for: high-value vintage where Heritage&rsquo;s serious collector audience may drive stronger hammer prices despite the premium.</p>

        <p><strong>Alt — Auction</strong><br />
        No seller commission. 20% buyer&rsquo;s premium. 4–15% seller bonus based on your Alt Rewards tier, which is determined by your quarterly transaction volume on Alt. Cards must be in the Alt Vault. Delaware vault means no state sales tax for buyers, which can support stronger bids. Best for: active Alt vault users who have accumulated tier status.</p>

        <p><strong>Alt — Fixed Price</strong><br />
        4–14% seller fee based on sale price and your Alt tier. No buyer&rsquo;s premium. Vault required. At the highest tiers, the fixed fee drops below what most auction platforms&rsquo; effective rates work out to. Best for: high-volume Alt sellers with top-tier status who want price control.</p>

        <p><strong>eBay Direct</strong><br />
        13.25% Final Value Fee on the total transaction (card + shipping + tax) plus $0.40 per transaction. No consignment — you photograph, list, package, and ship yourself. You have full control over price, presentation, and timing. The effective fee rate on the card price alone is closer to 15% once eBay charges its percentage on the shipping and tax amounts. Best for: high-volume sellers comfortable managing the operational side who want maximum payout without waiting for auction end dates.</p>

        <h2>Why the Highest Buyer Price Doesn&rsquo;t Mean the Highest Seller Payout</h2>
        <p>
          This is the most important concept in platform comparison. Consider a $1,000 card sold through two platforms with different buyer&rsquo;s premiums:
        </p>

        <div className="hiw-math-box">
          <div className="formula-line"><span className="formula-label">Goldin (22% buyer&rsquo;s premium, $0 seller fee)</span><span className="formula-val"></span></div>
          <div className="formula-line"><span className="formula-label">Buyer pays $1,000 hammer + 22% = $1,220</span><span className="formula-val"></span></div>
          <div className="formula-line"><span className="formula-label">You receive</span><span className="formula-val">$1,000</span></div>
          <div style={{ height: 12 }} />
          <div className="formula-line"><span className="formula-label">Fanatics Collect Weekly (20% buyer&rsquo;s premium, 4% seller bonus)</span><span className="formula-val"></span></div>
          <div className="formula-line"><span className="formula-label">Buyer pays $1,000 hammer + 20% = $1,200</span><span className="formula-val"></span></div>
          <div className="formula-line formula-total"><span>You receive (hammer + 4% bonus)</span><span className="formula-val">$1,040</span></div>
        </div>

        <p>
          The buyer actually paid <em>more</em> on Goldin ($1,220 vs $1,200) — but you netted $40 less. The platform earning more from the buyer doesn&rsquo;t mean you receive more. In this case, Fanatics&rsquo; seller bonus more than offset Goldin&rsquo;s zero-commission structure.
        </p>
        <p>
          The real comparison is always between what the buyer is willing to pay after the premium and what lands in your pocket. A platform with a higher buyer&rsquo;s premium may attract fewer bids, resulting in a lower hammer even if buyers &ldquo;pay more&rdquo; per dollar of hammer price.
        </p>

        <h2>Which Platform Wins at Each Price Tier</h2>
        <p>
          There&rsquo;s no universal winner. The best platform depends on your card&rsquo;s value, whether it&rsquo;s already in a vault, your seller tier status, and how hands-off you want the process to be.
        </p>
        <p>
          <strong>Under $500:</strong> eBay direct usually wins on payout for sellers who can manage listings themselves. Probstein and Z&amp;G are competitive for TCG graded cards where hands-off selling is worth the 10–12% commission. Fanatics Weekly is viable but the tier bonus doesn&rsquo;t kick in until $100 hammer, and the buyer&rsquo;s premium may suppress bids on lower-value cards.
        </p>
        <p>
          <strong>$500 – $2,500:</strong> Fanatics Weekly becomes compelling here — the 4–6% seller bonus plus $0 commission means you&rsquo;re receiving 104–106% of hammer. Probstein at 5% on $1,000+ is genuinely competitive. PSA Vault and Alt are strong options if your card is already vaulted.
        </p>
        <p>
          <strong>$2,500 – $10,000:</strong> Fanatics Weekly (6–8% bonus) and Goldin both become attractive. Goldin&rsquo;s 22% buyer&rsquo;s premium is high, but its collector audience for premium cards is strong. Probstein at 5% remains competitive if the card has enough cross-market appeal.
        </p>
        <p>
          <strong>$10,000+:</strong> Heritage (at a negotiated 0–5% commission), Fanatics Premier, and Goldin Elite all have specific buyer pools that can drive exceptional results on the right card. At this price level, the relationship with the platform and the specific event or auction timing matter as much as the fee structure.
        </p>
        <p>
          The only way to compare platforms accurately for your specific card and price point is to run the actual numbers. A 1% difference in fee rate on a $5,000 card is $50 — meaningful, but not the whole story.
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="cta-box">
        <p>Enter what a buyer pays and see every platform ranked best to worst payout — instantly, for free.</p>
        <Link href="/consignment-calculator" className="cta-btn">Open the Consignment Calculator →</Link>
      </div>

      {/* Related articles */}
      <div className="article-related">
        <div className="article-related-title">Related Articles</div>
        <div className="article-related-links">
          <Link href="/articles/is-85-percent-fair-for-pokemon-cards" className="article-related-link">
            <span>Is 85% of Market a Fair Cash Deal for Pokémon Cards?</span>
            <span className="article-related-link-arrow">→</span>
          </Link>
          <Link href="/articles/ebay-fees-for-selling-cards" className="article-related-link">
            <span>eBay Fees for Selling Trading Cards: What You Actually Net</span>
            <span className="article-related-link-arrow">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
