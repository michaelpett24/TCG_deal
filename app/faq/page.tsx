import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion } from "./accordion";

export const metadata: Metadata = {
  title: "TCGFair FAQ — Fair Deal Calculator & Consignment Calculator Questions | TCGFair",
  description:
    "Frequently asked questions about TCGFair's two calculators: the Fair Deal Calculator for in-person cash deals and the Consignment Calculator for comparing seller payouts across 11 platforms.",
  alternates: { canonical: "/faq" },
};

const FAQS = [
  {
    group: "About TCGFair",
    items: [
      {
        q: "What is TCGFair?",
        a: `<p>TCGFair is a free tool suite for Pokémon TCG and sports card buyers and sellers. It currently has two calculators:</p>
<ul style="padding-left:20px;margin-top:6px;line-height:2">
  <li><strong><a href="/" style="color:#7bc47b;text-decoration:none">Fair Deal Calculator</a></strong> — for in-person cash deals at card shows, LGS, and trade nights. It tells you the fair price range and the even-split price where both buyer and seller save equally vs. eBay.</li>
  <li><strong><a href="/consignment-calculator" style="color:#7bc47b;text-decoration:none">Consignment Calculator</a></strong> — for choosing where to sell online. It compares your net payout across 11 platforms (Fanatics Collect, PSA Vault, Goldin, Heritage, Alt, eBay, Probstein, Z&amp;G Emporium, and more), ranked best to worst.</li>
</ul>`,
      },
      {
        q: "What's the difference between the Fair Deal Calculator and the Consignment Calculator?",
        a: `<p>They solve two different problems:</p>
<ul style="padding-left:20px;margin-top:6px;line-height:2">
  <li>The <strong>Fair Deal Calculator</strong> is for <em>in-person cash deals</em>. Use it when you're at a card show, LGS, or trade night and need to know what a fair price looks like compared to what both parties would experience on eBay.</li>
  <li>The <strong>Consignment Calculator</strong> is for <em>choosing where to sell online</em>. Use it when you're deciding between listing on eBay yourself vs. consigning through a platform like Fanatics Collect, Goldin, or PSA Vault.</li>
</ul>
<p>They can also be used together: use the Fair Deal Calculator to figure out your floor before a face-to-face negotiation, then the Consignment Calculator to check whether you'd be better off just consigning instead.</p>`,
      },
      {
        q: "Is TCGFair free to use?",
        a: `<p>Yes — both calculators are completely free, no account required. TCGFair earns from affiliate links on the eBay "Search eBay" button (standard eBay Partner Network commissions). This doesn't affect your results or cost you anything.</p>`,
      },
    ],
  },
  {
    group: "Fair Deal Calculator",
    items: [
      {
        q: "What is a fair price for a Pokémon card cash deal?",
        a: `<p>The fair deal range is the spread between two prices:</p>
<ul style="padding-left:20px;margin-top:6px;line-height:2">
  <li><strong style="color:#f4a460">Seller Floor</strong> — the minimum the seller should accept. Below this, they'd net more by listing on eBay.</li>
  <li><strong style="color:#a8d8ea">Buyer Ceiling</strong> — the maximum the buyer should pay. Above this, they'd pay less by buying on eBay.</li>
</ul>
<p>Any price in between is a win for both sides. The <strong style="color:#7bc47b">even split</strong> is the midpoint, where both parties save the same dollar amount vs. eBay.</p>`,
      },
      {
        q: "Is 85% of market price a fair Pokémon card cash offer?",
        a: `<p>85% is often framed as the seller's break-even after eBay fees — and that's roughly accurate. But it ignores the buyer's side.</p>
<p>On eBay, a buyer also pays sales tax (6–10%) and shipping ($3–6). For a $100 card with 8.25% tax and $4 shipping, the buyer's true eBay cost is $112.25. At $85, the buyer saves $27.25 vs. eBay while the seller gains only $0.17 above their eBay floor. The even split at $98.54 gives both parties equal savings — about $13.71 each.</p>`,
      },
      {
        q: "How much does eBay take from a Pokémon card sale?",
        a: `<p>eBay's Final Value Fee is charged on the <em>total transaction</em> — card price + shipping + sales tax. The formula:</p>
<p><code>(card + shipping + tax) × 13.25% + $0.40</code></p>
<p>For a $100 card with 8.25% tax and $4 shipping: <code>$112.25 × 13.25% + $0.40 = $15.17</code>. The effective fee on the card price alone is closer to 15%, not 13.25%, once you account for the fee being applied to shipping and tax.</p>`,
      },
      {
        q: "Why does shipping cancel out for the seller?",
        a: `<p>On eBay, the seller charges the buyer for shipping and uses that money to pay the carrier — net zero. However, eBay still charges its percentage fee on the shipping amount, which is why shipping appears in the fee calculation but not in the final seller net. In a cash deal, there's no shipping for either party.</p>`,
      },
      {
        q: "Where do I find the market price for a Pokémon card?",
        a: `<p>Use eBay's <strong>Sold Listings</strong> filter to see what the card actually sold for — not what sellers are asking. Search the card on eBay, then filter by "Sold Items."</p>
<p>TCGPlayer's Market Price is another good reference. For graded cards (PSA, BGS, CGC), search specifically for the grade — values vary significantly by grade.</p>`,
      },
      {
        q: "What sales tax rate should I use?",
        a: `<p>Use the buyer's local combined rate (state + county + city). Quick references:</p>
<ul style="padding-left:20px;margin-top:6px;line-height:2">
  <li>California avg: ~8.68%</li>
  <li>Texas: 8.25%</li>
  <li>Florida: 7.0%</li>
  <li>New York City: 8.875%</li>
  <li>Oregon, Montana, Delaware: 0% (no sales tax)</li>
</ul>
<p>If the buyer has a resale certificate, eBay may not collect tax — set the rate to 0%.</p>`,
      },
      {
        q: "What do the verdict labels mean — 'Fair Deal', 'Favors buyer', etc.?",
        a: `<p>The verdict is based on where the proposed price falls between the <strong style="color:#f4a460">Seller Floor</strong> and <strong style="color:#a8d8ea">Buyer Ceiling</strong>. That range is divided into five zones:</p>
<ul style="padding-left:20px;margin-top:6px;line-height:2.2">
  <li><strong style="color:#f46060">Favors buyer heavily</strong> — bottom 0–20% of the range.</li>
  <li><strong style="color:#f4a460">Favors buyer</strong> — bottom 20–40%. Buyer saves noticeably more than the seller gains.</li>
  <li><strong style="color:#7bc47b">Fair Deal</strong> — middle 40–60%. Both parties save a roughly similar amount. The ★ Even Split at exactly 50% is where savings are perfectly equal.</li>
  <li><strong style="color:#e8d5a3">Favors seller</strong> — top 60–80%.</li>
  <li><strong style="color:#f46060">Favors seller heavily</strong> — top 80–100% of the range.</li>
</ul>`,
      },
      {
        q: "What do the preset buttons represent?",
        a: `<p>They're community benchmarks for common cash offer tiers:</p>
<ul style="padding-left:20px;margin-top:6px;line-height:2">
  <li><strong>Market (100%)</strong> — the eBay sold price with no discount</li>
  <li><strong>Even Split</strong> — the price where both buyer and seller save equally vs. eBay</li>
  <li><strong>85%</strong> — the traditional "seller break-even" benchmark</li>
  <li><strong>70%</strong> — a deeper discount, often used by dealers buying bulk</li>
</ul>`,
      },
      {
        q: "How do I share my deal analysis?",
        a: `<p>Tap <strong>Share Offer</strong> — it copies a link to your clipboard that encodes your market price, proposed price, and card name. The recipient sees the exact same calculator state when they open it. You can also just show your phone screen directly to the other party.</p>`,
      },
      {
        q: "Can I use this for graded cards?",
        a: `<p>Yes — the math is identical. Just use the eBay sold price for the specific card in the specific grade. PSA 10 prices differ significantly from PSA 9 and raw, so make sure you're comparing like for like.</p>`,
      },
      {
        q: "What if the buyer is tax-exempt or in a no-sales-tax state?",
        a: `<p>Set the sales tax rate to 0%. States with no sales tax include Oregon, Montana, New Hampshire, Delaware, and Alaska. With 0% tax, the buyer's ceiling is lower, which shifts the entire fair range down and narrows it.</p>`,
      },
      {
        q: "Are eBay fees the same for all card prices?",
        a: `<p>eBay's standard Final Value Fee for Trading Cards is 13.25% on the total transaction up to $7,500, then 2.35% on the portion above $7,500, plus $0.40 per transaction. For most single-card Pokémon TCG deals, 13.25% is accurate. You can adjust the fee rate field if you know a seller's actual rate differs.</p>`,
      },
      {
        q: "What if the seller offers free shipping on eBay?",
        a: `<p>Set the shipping cost to $0. With free shipping, the seller absorbs the shipping cost, the buyer's eBay ceiling drops (just card + tax), and the fair range narrows.</p>`,
      },
    ],
  },
  {
    group: "Consignment Calculator",
    items: [
      {
        q: "What does 'buyer pays' mean in the consignment calculator?",
        a: `<p>The total all-in amount the buyer pays, including any buyer's premium. For an auction with a 20% buyer's premium, a buyer who pays $120 generated a $100 hammer price. Enter $120 and the calculator derives the $100 hammer automatically.</p>`,
      },
      {
        q: "Does Fanatics Collect charge a seller fee on auctions?",
        a: `<p>No. You receive 100% of the hammer price plus a bonus commission based on your tier. Fanatics Collect earns its revenue from the 20% buyer's premium charged to the buyer.</p>`,
      },
      {
        q: "What is a buyer's premium and does it affect my payout?",
        a: `<p>A buyer's premium is a fee charged to the buyer on top of the hammer price. It is paid by the buyer, not the seller — so it doesn't directly reduce your payout. However, a high buyer's premium can dampen bidding and potentially lead to a lower hammer price.</p>`,
      },
      {
        q: "Which platform has the lowest seller fees?",
        a: `<p>It depends on the sale price. Goldin and Fanatics Collect auctions charge $0 seller commission. PSA Vault fees drop to as low as 7% on sales over $5,000. Probstein charges just 5% on sales over $1,000. Use the calculator to compare for your specific price point.</p>`,
      },
      {
        q: "Can I use PSA Vault if my cards are graded by BGS or SGC?",
        a: `<p>Yes. PSA Vault accepts cards graded by PSA, BGS, SGC, and CGC. Cards must be physically stored in the PSA Vault before they can be listed for consignment.</p>`,
      },
      {
        q: "Why does Heritage show a dropdown instead of a fixed payout?",
        a: `<p>Heritage Auctions does not publish seller commission rates — they are always negotiated between Heritage and the consignor. The calculator defaults to 10%, which is a typical rate for first-time consignors. Established consignors with strong relationships often negotiate their commission down to 0%.</p>`,
      },
      {
        q: "Does Alt charge sales tax?",
        a: `<p>No. Alt's vault is located in Delaware, which has no state sales tax. All transactions processed through the Alt Vault are tax-free for buyers, which can support stronger hammer prices.</p>`,
      },
      {
        q: "What does Z and G Emporium accept?",
        a: `<p>Z and G Emporium accepts TCG graded cards only — specifically Pokémon, Yu-Gi-Oh, and Magic: The Gathering graded by PSA, BGS, or CGC. Sports cards, raw ungraded cards, and sealed product are not accepted.</p>`,
      },
      {
        q: "What's the difference between Goldin Weekly and Elite auctions?",
        a: `<p>Goldin Weekly auctions close on Thursdays, start at $10, and target cards with $100+ value. Goldin Elite auctions run on a variable schedule, start at $500, and target cards with $7,500+ estimated value. Both charge $0 seller commission.</p>`,
      },
      {
        q: "Why does my payout differ across platforms even when the buyer pays the same amount?",
        a: `<p>Each platform's fee structure is fundamentally different. Auction platforms derive the hammer price from the buyer's total by stripping out the buyer's premium; your payout is based on that hammer. Fixed-price platforms charge a direct seller fee on the full sale price. The buyer's premium rate, seller commission tier, and flat fees all compound into very different seller outcomes.</p>`,
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="page-wrap">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.flatMap(g => g.items).map(item => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.a.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
              },
            })),
          }),
        }}
      />
      <div className="page-eyebrow">TCGFair</div>
      <h1 className="page-h1">Frequently Asked Questions</h1>
      <p className="page-intro">
        Questions about TCGFair&rsquo;s calculators — the Fair Deal Calculator for in-person cash deals and the Consignment Calculator for comparing online selling platforms.
      </p>

      <FaqAccordion groups={FAQS} />

      {/* SEO content — muted, kept for search indexing */}
      <div style={{ borderTop: "1px solid var(--border)", marginTop: 40, paddingTop: 28, opacity: 0.5 }}>
        <div style={{ fontSize: "0.8rem", color: "#8a8fa8", lineHeight: 1.75, display: "flex", flexDirection: "column", gap: 14 }}>
          <p>
            At card shows, local game stores (LGS), and trade nights, Pokémon TCG dealers and collectors often use &ldquo;85% of market&rdquo; as a default cash offer — the reasoning being that&rsquo;s roughly what a seller nets after eBay&rsquo;s final value fees. But that framing ignores a crucial piece of the picture: the buyer is also avoiding sales tax and shipping costs. TCGFair&rsquo;s fair deal calculator makes the full math visible, showing the true out-of-pocket cost for a buyer on eBay and the real net for a seller, so both parties can see what a genuinely fair in-person price looks like.
          </p>
          <p>
            For sellers deciding where to list online, TCGFair&rsquo;s consignment calculator compares payouts across 11 platforms in real time. Whether you&rsquo;re weighing Fanatics Collect auctions against PSA Vault&rsquo;s fixed-price listings, or trying to understand whether Goldin&rsquo;s $0 seller commission is actually better than eBay after accounting for the buyer&rsquo;s premium, the calculator does the math so you don&rsquo;t have to.
          </p>
        </div>
      </div>

      <div className="cta-box">
        <p>Want the full step-by-step math? How It Works covers both calculators in detail.</p>
        <Link href="/how-it-works" className="cta-btn">Read How It Works →</Link>
      </div>
    </div>
  );
}
