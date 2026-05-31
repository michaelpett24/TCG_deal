import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion } from "./accordion";

export const metadata: Metadata = {
  title: "FAQ — TCG Fair Deal Calculator",
  description:
    "Common questions about eBay fees, Pokémon card cash deals, and how the TCG fair deal calculator works.",
  alternates: { canonical: "/faq" },
};

const FAQS = [
  {
    group: "Understanding the Tool",
    items: [
      {
        q: "What is the fair deal range?",
        a: `<p>The fair deal range is the spread between two prices:</p>
<ul style="padding-left:20px;margin-top:6px;line-height:2">
  <li><strong style="color:#f4a460">Seller Floor</strong> — the minimum the seller should accept. Below this, they'd net more by listing on eBay.</li>
  <li><strong style="color:#a8d8ea">Buyer Ceiling</strong> — the maximum the buyer should pay. Above this, they'd pay less by buying on eBay.</li>
</ul>
<p>Any price in between is a win for both sides. The <strong style="color:#7bc47b">even split</strong> is the midpoint, where both parties save the same dollar amount vs. eBay.</p>`,
      },
      {
        q: "Why isn't 85% of market always fair to the seller?",
        a: `<p>85% is often framed as the seller's break-even after eBay fees — and that's roughly accurate. But it ignores the buyer's side.</p>
<p>On eBay, a buyer also pays sales tax (6–10%) and shipping ($3–6). For a $100 card with 8.25% tax and $4 shipping, the buyer's true eBay cost is $112.25. At $85, the buyer saves $27.25 vs. eBay while the seller gains only $0.17 above their eBay floor. The even split at $98.54 gives both parties equal savings — about $13.71 each.</p>`,
      },
      {
        q: "How does eBay calculate its final value fee?",
        a: `<p>eBay's Final Value Fee is charged on the <em>total transaction</em> — card price + shipping + sales tax. The formula:</p>
<p><code>(card + shipping + tax) × 13.25% + $0.30</code></p>
<p>For a $100 card with 8.25% tax and $4 shipping: <code>$112.25 × 13.25% + $0.30 = $15.17</code>. The effective fee on the card price alone is closer to 15%, not 13.25%, once you account for the fee being applied to shipping and tax.</p>`,
      },
      {
        q: "Why does shipping cancel out for the seller?",
        a: `<p>On eBay, the seller charges the buyer for shipping and uses that money to pay the carrier — net zero. However, eBay still charges its percentage fee on the shipping amount, which is why shipping appears in the fee calculation but not in the final seller net. In a cash deal, there's no shipping for either party.</p>`,
      },
    ],
  },
  {
    group: "Using the Calculator",
    items: [
      {
        q: "Where do I find the market price for a card?",
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
        q: "What do the verdict labels mean — 'Balanced deal', 'Favors buyer', etc.?",
        a: `<p>The verdict is based on where the proposed price falls between the <strong style="color:#f4a460">Seller Floor</strong> and <strong style="color:#a8d8ea">Buyer Ceiling</strong>. That range is divided into five zones:</p>
<ul style="padding-left:20px;margin-top:6px;line-height:2.2">
  <li><strong style="color:#f46060">Favors buyer heavily</strong> — price is in the bottom 0–20% of the range. Seller gains almost nothing vs. eBay.</li>
  <li><strong style="color:#f4a460">Favors buyer</strong> — bottom 20–40%. Buyer saves noticeably more than the seller gains.</li>
  <li><strong style="color:#7bc47b">Balanced deal</strong> — middle 40–60% of the range. Both parties save a roughly similar amount vs. eBay. The ★ Even Split at exactly 50% is where savings are perfectly equal.</li>
  <li><strong style="color:#e8d5a3">Favors seller</strong> — top 60–80%. Seller gains noticeably more than the buyer saves.</li>
  <li><strong style="color:#f46060">Favors seller heavily</strong> — top 80–100% of the range. Buyer saves almost nothing vs. eBay.</li>
</ul>
<p>Note: a "Balanced deal" doesn't mean equal savings — it means the price is in the fair middle zone. The ★ Recommended price is the only point where both parties save exactly the same dollar amount.</p>`,
      },
      {
        q: "What do the preset buttons represent?",
        a: `<p>They're community benchmarks for common cash offer tiers:</p>
<ul style="padding-left:20px;margin-top:6px;line-height:2">
  <li><strong>Market (100%)</strong> — the eBay sold price with no discount</li>
  <li><strong>Even Split</strong> — the price where both buyer and seller save equally vs. eBay</li>
  <li><strong>85%</strong> — the traditional "seller break-even" benchmark</li>
  <li><strong>70%</strong> — a deeper discount, often used by dealers buying bulk</li>
</ul>
<p>The custom % field lets you test any percentage. Tap any preset to instantly see the verdict.</p>`,
      },
      {
        q: "How do I share my deal analysis?",
        a: `<p>Two ways:</p>
<ul style="padding-left:20px;margin-top:6px;line-height:2">
  <li><strong>Show your screen</strong> — the verdict card is designed to be clear and convincing when shown in person at a card show.</li>
  <li><strong>Tap "Share This Deal Analysis"</strong> — copies the current URL (which encodes all your inputs) plus a formatted text summary to your clipboard. Paste into a text message, Discord, or chat.</li>
</ul>
<p>The URL updates as you type, so anyone who opens your link sees the exact same calculator state.</p>`,
      },
    ],
  },
  {
    group: "Edge Cases & Special Situations",
    items: [
      {
        q: "Can I use this for graded cards?",
        a: `<p>Yes — the math is identical. Just use the eBay sold price for the specific card in the specific grade. PSA 10 prices differ significantly from PSA 9 and raw, so make sure you're comparing like for like.</p>`,
      },
      {
        q: "What if the buyer is tax-exempt or in a no-sales-tax state?",
        a: `<p>Set the sales tax rate to 0%. States with no sales tax include Oregon, Montana, New Hampshire, Delaware, and Alaska. With 0% tax, the buyer's ceiling is lower, which shifts the entire fair range down and narrows it — the even split price also drops.</p>`,
      },
      {
        q: "Does this work for trades (not cash deals)?",
        a: `<p>The calculator is designed for cash deals, but the fair range concept applies to trades too. Run each card separately to get both parties' fair value benchmarks, then compare. The "even split" price for each card can help determine how much cash needs to change hands to balance a trade.</p>`,
      },
      {
        q: "Are eBay fees the same for all card prices?",
        a: `<p>eBay's standard Final Value Fee for Trading Cards is 13.25% on the total transaction up to $7,500, then 2.35% on the portion above $7,500, plus $0.30 per transaction. For most single-card Pokémon TCG deals, 13.25% is accurate.</p>
<p>Promoted listing fees are separate and not included here. You can adjust the fee rate field if you know a seller's actual rate differs.</p>`,
      },
      {
        q: "What if the seller offers free shipping on eBay?",
        a: `<p>Set the shipping cost to $0. With free shipping, the seller absorbs the shipping cost, the buyer's eBay ceiling drops (just card + tax), and the fair range narrows. The seller's floor also changes because the eBay fee base is lower without shipping.</p>`,
      },
      {
        q: "How accurate are these numbers?",
        a: `<p>The calculations are accurate given the inputs. The defaults (13.25% fee, 8.25% tax, $4 shipping) are reasonable US averages, but your actual numbers may vary.</p>
<p>eBay occasionally adjusts fee structures; some seller tiers have different rates; tax rates change. Use this as a negotiation guide, not a legally binding accounting document.</p>`,
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
      <div className="page-eyebrow">TCG Fair Deal Calculator</div>
      <h1 className="page-h1">Frequently Asked Questions</h1>
      <p className="page-intro">
        Common questions about eBay fees, in-person card deals, and how to use this calculator at your next card show or LGS.
      </p>

      <FaqAccordion groups={FAQS} />

      {/* Moved from calculator home page */}
      <div className="faq-group">
        <div className="faq-group-title">How to Know If a Pokémon Card Cash Deal Is Fair</div>
        <div style={{ fontSize: 13, color: "#8a8fa8", lineHeight: 1.75, display: "flex", flexDirection: "column", gap: 14 }}>
          <p>
            At card shows, local game stores (LGS), and trade nights, Pokémon TCG dealers and collectors often use &ldquo;85% of market&rdquo; as a default cash offer — the reasoning being that&rsquo;s roughly what a seller nets after eBay&rsquo;s final value fees. But that framing ignores a crucial piece of the picture: the buyer is also avoiding sales tax and shipping costs. This Pokémon TCG fair deal calculator makes the full math visible, showing the true out-of-pocket cost for a buyer on eBay and the real net for a seller, so both parties can see what a genuinely fair in-person price looks like.
          </p>
          <p>
            eBay charges a final value fee of around 13.25% on Pokémon card sales, plus a $0.30 fixed fee — and that fee is calculated on the total transaction including sales tax and shipping. After accounting for eBay&rsquo;s cut, a seller often nets closer to 83–86% of the card&rsquo;s market price. But a buyer on eBay typically pays 8–10% in sales tax plus $3–5 in shipping, meaning their true cost is often 112–115% of market price. The fair range for an in-person cash deal sits between these two numbers — not just at 85%.
          </p>
          <p>
            Whether you&rsquo;re negotiating at a card show, picking up singles at your LGS, or trading at a Friday night game event, this calculator helps you determine fair market value in real-time. Enter the eBay sold price, adjust for your local tax rate, and instantly see who benefits from any proposed deal. The shareable link and deal summary mean you can show your math directly to the other party — no more guessing.
          </p>
        </div>
      </div>

      <div className="cta-box">
        <p>Want the full step-by-step math? The How It Works page walks through every formula with real examples.</p>
        <Link href="/how-it-works" className="cta-btn">Read How It Works →</Link>
      </div>
    </div>
  );
}
