import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Calculate a Fair Pokémon Card Cash Deal Price | TCG Fair",
  description:
    "Learn how to find a fair Pokémon card cash price using eBay sold prices, eBay fees, sales tax, and shipping. Step-by-step math for buyers and sellers at card shows and LGS.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <div className="page-wrap">
      <div className="page-eyebrow">Pokémon TCG Fair Deal Calculator</div>
      <h1 className="page-h1">How It Works</h1>
      <p className="page-intro">
        When you buy or sell a Pokémon card in person, you&rsquo;re implicitly comparing the deal to what both parties would experience on eBay. This tool makes that comparison explicit. Here&rsquo;s the full math.
      </p>

      {/* ── Step 1 ── */}
      <div className="hiw-step">
        <div className="hiw-step-num">Step 01</div>
        <h2 className="hiw-step-title">Start with the Market Price</h2>
        <div className="hiw-body">
          <p>
            The market price is the recent eBay sold price for the card — not the listed price, but actual completed sales. Check eBay&rsquo;s &ldquo;Sold Items&rdquo; filter or use TCGPlayer&rsquo;s market price. For a $100 market price example, all calculations below use this as the baseline.
          </p>
          <p>
            The market price represents what a buyer would pay before taxes and shipping, and what a seller would receive before fees. It&rsquo;s the neutral starting point both sides agree on.
          </p>
        </div>
      </div>

      {/* ── Step 2 ── */}
      <div className="hiw-step">
        <div className="hiw-step-num">Step 02</div>
        <h2 className="hiw-step-title">What the Buyer Actually Pays on eBay</h2>
        <div className="hiw-body">
          <p>
            When a buyer purchases a card on eBay, they pay more than the market price. eBay automatically collects sales tax based on the buyer&rsquo;s state, and most sellers charge shipping separately.
          </p>
          <div className="hiw-math-box">
            <div className="formula-line"><span className="formula-label">Card price</span><span className="formula-val">$100.00</span></div>
            <div className="formula-line"><span className="formula-label">+ Sales tax (8.25%)</span><span className="formula-val">+ $8.25</span></div>
            <div className="formula-line"><span className="formula-label">+ Shipping</span><span className="formula-val">+ $4.00</span></div>
            <div className="formula-line formula-total"><span>= Buyer&rsquo;s total eBay cost</span><span className="formula-val">$112.25</span></div>
          </div>
          <p>
            This is the buyer&rsquo;s <strong style={{ color: "#a8d8ea" }}>ceiling</strong> — the maximum a fair cash price should ever be. Any higher, and the buyer would be better off buying on eBay.
          </p>
        </div>
      </div>

      {/* ── Step 3 ── */}
      <div className="hiw-step">
        <div className="hiw-step-num">Step 03</div>
        <h2 className="hiw-step-title">What the Seller Actually Nets on eBay</h2>
        <div className="hiw-body">
          <p>
            eBay&rsquo;s Final Value Fee is 13.25% of the <em>total transaction</em> — including the card price, the shipping charge, and any sales tax collected. Plus there&rsquo;s a $0.40 fixed fee per transaction.
          </p>
          <div className="hiw-math-box">
            <div className="formula-line"><span className="formula-label">eBay fee base (card + shipping + tax)</span><span className="formula-val">$112.25</span></div>
            <div className="formula-line"><span className="formula-label">× 13.25% + $0.40</span><span className="formula-val">= $15.17</span></div>
            <div className="formula-line" style={{ marginTop: 8 }}><span className="formula-label">Sale price</span><span className="formula-val">$100.00</span></div>
            <div className="formula-line"><span className="formula-label">− eBay fee</span><span className="formula-val">− $15.17</span></div>
            <div className="formula-line"><span className="formula-label">Shipping (charges = pays)</span><span className="formula-val">$0.00 net</span></div>
            <div className="formula-line formula-total"><span>= Seller&rsquo;s net in pocket</span><span className="formula-val">$84.83</span></div>
          </div>
          <p>
            This is the seller&rsquo;s <strong style={{ color: "#f4a460" }}>floor</strong> — the minimum a fair cash price should be. Below this, the seller would be better off listing on eBay.
          </p>
          <p style={{ fontSize: 12, color: "#556" }}>
            <em>Why does shipping cancel out?</em> On eBay, the seller charges the buyer for shipping and uses that money to pay the carrier. It&rsquo;s a pass-through — no net gain or loss for the seller. However, eBay does charge its fee on the shipping amount, which is why shipping appears in the fee calculation above.
          </p>
        </div>
      </div>

      {/* ── Step 4 ── */}
      <div className="hiw-step">
        <div className="hiw-step-num">Step 04</div>
        <h2 className="hiw-step-title">The Fair In-Person Range</h2>
        <div className="hiw-body">
          <p>
            Any cash price between the seller&rsquo;s floor and buyer&rsquo;s ceiling is better for both parties than eBay. The question is just how that eBay &ldquo;savings&rdquo; gets split between them.
          </p>
          <div className="hiw-range-diagram">
            <div className="hiw-range-row">
              <div className="hiw-range-dot" style={{ background: "#f4a460" }} />
              <span className="hiw-range-label">Seller Floor — seller&rsquo;s eBay net (breaks even vs. eBay)</span>
              <span className="hiw-range-val">$84.83</span>
            </div>
            <div className="hiw-range-row">
              <div className="hiw-range-dot" style={{ background: "#7bc47b" }} />
              <span className="hiw-range-label">Even Split — savings distributed equally</span>
              <span className="hiw-range-val">$98.54</span>
            </div>
            <div className="hiw-range-row">
              <div className="hiw-range-dot" style={{ background: "#a8d8ea" }} />
              <span className="hiw-range-label">Buyer Ceiling — buyer&rsquo;s eBay total (breaks even vs. eBay)</span>
              <span className="hiw-range-val">$112.25</span>
            </div>
          </div>
          <p>
            The <strong style={{ color: "#7bc47b" }}>even split</strong> is the midpoint — it&rsquo;s the price where the seller saves the same dollar amount vs. eBay that the buyer saves vs. eBay. It&rsquo;s the most objectively fair price, though any deal in range is mutually beneficial.
          </p>
        </div>
      </div>

      {/* ── Step 5 ── */}
      <div className="hiw-step">
        <div className="hiw-step-num">Step 05</div>
        <h2 className="hiw-step-title">Reading the Verdict</h2>
        <div className="hiw-body">
          <p>
            When you enter a proposed price, the calculator shows exactly where it falls in the fair range and what each party saves vs. eBay.
          </p>
          <div className="hiw-math-box">
            <div className="formula-line"><span className="formula-label">Proposed price</span><span className="formula-val">$85.00</span></div>
            <div className="formula-line"><span className="formula-label">Buyer saves vs eBay ($112.25 − $85)</span><span className="formula-val">+$27.25</span></div>
            <div className="formula-line"><span className="formula-label">Seller gains vs floor ($85 − $84.83)</span><span className="formula-val">+$0.17</span></div>
            <div className="formula-line"><span className="formula-label">vs Even split ($98.54)</span><span className="formula-val">↓$13.54 favors buyer</span></div>
          </div>
          <p>
            The <strong>position bar</strong> shows visually where the proposed price falls between the seller floor and buyer ceiling. The range is split into five verdict zones:
          </p>
          <div className="hiw-math-box" style={{ lineHeight: 2.2 }}>
            <div className="formula-line"><span className="formula-label" style={{ color: "#f46060" }}>0 – 20% of range</span><span className="formula-val" style={{ color: "#f46060" }}>Favors buyer heavily</span></div>
            <div className="formula-line"><span className="formula-label" style={{ color: "#f4a460" }}>20 – 40% of range</span><span className="formula-val" style={{ color: "#f4a460" }}>Favors buyer</span></div>
            <div className="formula-line"><span className="formula-label" style={{ color: "#7bc47b" }}>40 – 60% of range</span><span className="formula-val" style={{ color: "#7bc47b" }}>Fair Deal</span></div>
            <div className="formula-line"><span className="formula-label" style={{ color: "#e8d5a3" }}>60 – 80% of range</span><span className="formula-val" style={{ color: "#e8d5a3" }}>Favors seller</span></div>
            <div className="formula-line"><span className="formula-label" style={{ color: "#f46060" }}>80 – 100% of range</span><span className="formula-val" style={{ color: "#f46060" }}>Favors seller heavily</span></div>
          </div>
          <p>
            A &ldquo;Fair Deal&rdquo; means the price is in the fair middle zone — not necessarily equal savings. The ★ Even Split at exactly 50% is the only price where both parties save the same dollar amount vs. eBay.
          </p>
          <p>
            This is why &ldquo;85% of market&rdquo; — while often presented as the seller&rsquo;s break-even — actually favors the buyer quite heavily. The seller nets just $0.17 above their eBay floor, while the buyer saves $27.25. The even split at $98.54 gives both parties $13.71 in savings vs. eBay.
          </p>
        </div>
      </div>

      {/* ── Step 6 ── */}
      <div className="hiw-step">
        <div className="hiw-step-num">Step 06</div>
        <h2 className="hiw-step-title">Sharing Your Analysis</h2>
        <div className="hiw-body">
          <p>
            Every input you enter is encoded into the URL in real time. You can share your deal two ways:
          </p>
          <ul style={{ paddingLeft: 20, marginTop: 8, lineHeight: 2 }}>
            <li><strong style={{ color: "#7bc47b" }}>Share Image</strong> — generates a deal card image you can send via iMessage, post to Facebook groups, Reddit, Discord, and more</li>
            <li><strong style={{ color: "#7bc47b" }}>Copy Link</strong> — copies the current URL which encodes all your inputs; anyone who opens the link sees the exact same calculator state</li>
            <li>Show your phone screen directly to the other party</li>
          </ul>
          <p style={{ marginTop: 10 }}>
            The goal is to make the negotiation transparent — when both parties can see the same numbers, the deal either makes sense or it doesn&rsquo;t.
          </p>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="cta-box">
        <p>Ready to run the numbers on your next deal?</p>
        <Link href="/" className="cta-btn">Open the Calculator →</Link>
      </div>
    </div>
  );
}
