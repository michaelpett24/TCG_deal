import type { Metadata } from "next";
import Link from "next/link";
import { SuppliesStrip } from "../supplies-strip";

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Calculate a Fair Pokémon Card Cash Deal Price",
  description:
    "Use TCGFair's Fair Deal Calculator to find the fair price range for an in-person Pokémon TCG cash deal — the seller's floor, the buyer's ceiling, and the even-split price where both sides save equally vs. eBay.",
  url: "https://tcgfair.com/how-it-works",
  step: [
    {
      "@type": "HowToStep",
      name: "Start with the Market Price",
      text: "Find the recent eBay sold price for the card using the 'Sold Items' filter. This is your neutral baseline — what both sides agree the card is worth.",
      position: 1,
    },
    {
      "@type": "HowToStep",
      name: "Calculate what the buyer actually pays on eBay",
      text: "Add sales tax (e.g. 8.25%) and shipping (e.g. $4) to the market price. This is the buyer's ceiling — the maximum a fair cash price should ever be.",
      position: 2,
    },
    {
      "@type": "HowToStep",
      name: "Calculate what the seller actually nets on eBay",
      text: "Subtract eBay's Final Value Fee (13.25% of the total transaction including tax and shipping, plus $0.40) from the sale price. This is the seller's floor — the minimum a fair cash price should be.",
      position: 3,
    },
    {
      "@type": "HowToStep",
      name: "Identify the fair in-person price range",
      text: "Any cash price between the seller's floor and buyer's ceiling is better for both parties than eBay. The even-split price is the midpoint where both buyer and seller save the same dollar amount vs. eBay.",
      position: 4,
    },
    {
      "@type": "HowToStep",
      name: "Enter a proposed price and read the verdict",
      text: "Use the slider to test any price. The calculator shows the verdict (Fair Deal, Favors Buyer, Favors Seller, etc.) and the exact savings for each party vs. eBay.",
      position: 5,
    },
  ],
};

export const metadata: Metadata = {
  title: "How TCGFair Works — Fair Deal & Consignment Calculators Explained | TCGFair",
  description:
    "Step-by-step math behind the TCG Fair Deal Calculator. Learn how eBay fees, sales tax, and shipping determine the fair price range for any in-person card sale — Pokémon, MTG, sports cards, and more.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <div className="page-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <div className="page-eyebrow">TCGFair</div>
      <h1 className="page-h1">How It Works</h1>
      <p className="page-intro">
        TCGFair has two free calculators for Pokémon TCG and sports card sellers and buyers. Each solves a different problem — here&rsquo;s the math behind both.
      </p>

      {/* ── Calculator nav ── */}
      <div style={{ display: "flex", gap: 10, marginBottom: 40, flexWrap: "wrap" }}>
        <a href="#fair-deal" style={{ fontSize: 12, padding: "8px 14px", background: "var(--panel)", border: "1px solid var(--border)", borderRadius: 6, color: "var(--green)", textDecoration: "none", letterSpacing: "0.04em" }}>
          → Fair Deal Calculator
        </a>
        <a href="#consignment" style={{ fontSize: 12, padding: "8px 14px", background: "var(--panel)", border: "1px solid var(--border)", borderRadius: 6, color: "var(--green)", textDecoration: "none", letterSpacing: "0.04em" }}>
          → Consignment Calculator
        </a>
      </div>

      {/* ══════════════════════════════════════════════════════════
          SECTION 1: FAIR DEAL CALCULATOR
      ══════════════════════════════════════════════════════════ */}
      <div id="fair-deal" style={{ scrollMarginTop: 64 }}>
        <div style={{ borderLeft: "3px solid var(--green)", paddingLeft: 14, marginBottom: 28 }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 11, letterSpacing: "0.2em", color: "var(--text-faint)", textTransform: "uppercase", marginBottom: 4 }}>Calculator 1</div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: "0.06em", color: "var(--text)" }}>Fair Deal Calculator</div>
          <p style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 6, lineHeight: 1.6 }}>
            For in-person cash deals — card shows, LGS, trade nights. Answers: <em>what&rsquo;s a fair price when buying or selling face-to-face?</em>
          </p>
        </div>

        <p className="hiw-body" style={{ marginBottom: 28 }}>
          When you buy or sell a Pokémon card in person, you&rsquo;re implicitly comparing the deal to what both parties would experience on eBay. This calculator makes that comparison explicit. Here&rsquo;s the full math.
        </p>

        {/* ── Step 1 ── */}
        <div className="hiw-step">
          <div className="hiw-step-num">Step 01</div>
          <h2 className="hiw-step-title">Start with the Market Price</h2>
          <div className="hiw-body">
            <p>
              The market price is the recent eBay sold price for the card — not the listed price, but actual completed sales. Check eBay&rsquo;s &ldquo;Sold Items&rdquo; filter or use TCGPlayer&rsquo;s market price. All calculations below use a $100 market price as the example.
            </p>
            <p>
              The market price represents what a buyer would pay before taxes and shipping, and what a seller would receive before fees — the neutral starting point both sides agree on.
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
              eBay&rsquo;s Final Value Fee is 13.25% of the <em>total transaction</em> — including the card price, shipping, and any sales tax collected. Plus a $0.40 fixed fee per transaction.
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
          </div>
        </div>

        <SuppliesStrip />

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
              The <strong style={{ color: "#7bc47b" }}>even split</strong> is the midpoint — the price where the seller saves the same dollar amount vs. eBay that the buyer saves. It&rsquo;s the most objectively fair price, though any price in range is mutually beneficial.
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
            <div className="hiw-math-box" style={{ lineHeight: 2.2 }}>
              <div className="formula-line"><span className="formula-label" style={{ color: "#f46060" }}>0 – 20% of range</span><span className="formula-val" style={{ color: "#f46060" }}>Favors buyer heavily</span></div>
              <div className="formula-line"><span className="formula-label" style={{ color: "#f4a460" }}>20 – 40% of range</span><span className="formula-val" style={{ color: "#f4a460" }}>Favors buyer</span></div>
              <div className="formula-line"><span className="formula-label" style={{ color: "#7bc47b" }}>40 – 60% of range</span><span className="formula-val" style={{ color: "#7bc47b" }}>Fair Deal</span></div>
              <div className="formula-line"><span className="formula-label" style={{ color: "#e8d5a3" }}>60 – 80% of range</span><span className="formula-val" style={{ color: "#e8d5a3" }}>Favors seller</span></div>
              <div className="formula-line"><span className="formula-label" style={{ color: "#f46060" }}>80 – 100% of range</span><span className="formula-val" style={{ color: "#f46060" }}>Favors seller heavily</span></div>
            </div>
            <p>
              This is why &ldquo;85% of market&rdquo; — while often presented as the seller&rsquo;s break-even — actually favors the buyer quite heavily. The seller nets just $0.17 above their eBay floor, while the buyer saves $27.25.
            </p>
          </div>
        </div>

        <div className="cta-box" style={{ marginBottom: 0 }}>
          <p>Run the numbers on your next deal.</p>
          <Link href="/" className="cta-btn">Open the Fair Deal Calculator →</Link>
        </div>
      </div>

      {/* ── Divider ── */}
      <div style={{ borderTop: "1px solid var(--border)", margin: "52px 0" }} />

      {/* ══════════════════════════════════════════════════════════
          SECTION 2: CONSIGNMENT CALCULATOR
      ══════════════════════════════════════════════════════════ */}
      <div id="consignment" style={{ scrollMarginTop: 64 }}>
        <div style={{ borderLeft: "3px solid var(--blue)", paddingLeft: 14, marginBottom: 28 }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 11, letterSpacing: "0.2em", color: "var(--text-faint)", textTransform: "uppercase", marginBottom: 4 }}>Calculator 2</div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: "0.06em", color: "var(--text)" }}>Consignment Calculator</div>
          <p style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 6, lineHeight: 1.6 }}>
            For choosing where to sell online. Answers: <em>which platform puts the most money in my pocket?</em>
          </p>
        </div>

        <p className="hiw-body" style={{ marginBottom: 28 }}>
          When selling a valuable card online, the platform you choose dramatically affects your net payout. The Consignment Calculator compares 11 platforms — Fanatics Collect, Goldin, PSA Vault, eBay, Heritage, Alt, Probstein, Z&amp;G Emporium, and more — in one ranked view.
        </p>

        {/* ── Step 1 ── */}
        <div className="hiw-step">
          <div className="hiw-step-num">Step 01</div>
          <h2 className="hiw-step-title">Enter What the Buyer Pays</h2>
          <div className="hiw-body">
            <p>
              The calculator starts from the buyer&rsquo;s all-in total — the full amount they pay at checkout, including any buyer&rsquo;s premium. For an auction where a buyer pays $120 (hammer $100 + 20% premium), you enter $120.
            </p>
            <p>
              This is the most reliable input because it&rsquo;s what the buyer actually commits to — and it&rsquo;s the same number across every platform comparison.
            </p>
          </div>
        </div>

        {/* ── Step 2 ── */}
        <div className="hiw-step">
          <div className="hiw-step-num">Step 02</div>
          <h2 className="hiw-step-title">Hammer Price vs. Buyer&rsquo;s Premium</h2>
          <div className="hiw-body">
            <p>
              For auction platforms, your payout is based on the <strong>hammer price</strong>, not the buyer&rsquo;s total. The calculator derives it automatically:
            </p>
            <div className="hiw-math-box">
              <div className="formula-line"><span className="formula-label">Buyer pays (all-in)</span><span className="formula-val">$120.00</span></div>
              <div className="formula-line"><span className="formula-label">÷ (1 + 20% buyer&rsquo;s premium)</span><span className="formula-val">÷ 1.20</span></div>
              <div className="formula-line formula-total"><span>= Hammer price</span><span className="formula-val">$100.00</span></div>
            </div>
            <p>
              The buyer&rsquo;s premium is paid by the buyer, not by you. But a higher premium can suppress competitive bidding and lead to a lower hammer — so it&rsquo;s still a meaningful factor.
            </p>
          </div>
        </div>

        {/* ── Step 3 ── */}
        <div className="hiw-step">
          <div className="hiw-step-num">Step 03</div>
          <h2 className="hiw-step-title">Seller Commission &amp; Fee Structures</h2>
          <div className="hiw-body">
            <p>
              Each platform has a different fee model. The calculator handles all of them:
            </p>
            <div className="hiw-math-box" style={{ lineHeight: 2 }}>
              <div className="formula-line"><span className="formula-label">Fanatics Collect / Goldin / Alt</span><span className="formula-val">$0 seller fee + bonus</span></div>
              <div className="formula-line"><span className="formula-label">PSA Vault</span><span className="formula-val">7–13% by sale price</span></div>
              <div className="formula-line"><span className="formula-label">Probstein</span><span className="formula-val">5–15% by sale price</span></div>
              <div className="formula-line"><span className="formula-label">Z&amp;G Emporium</span><span className="formula-val">5–12% by sale price</span></div>
              <div className="formula-line"><span className="formula-label">eBay direct</span><span className="formula-val">13.25% FVF + $0.40</span></div>
              <div className="formula-line"><span className="formula-label">Heritage</span><span className="formula-val">Negotiated (0–15%)</span></div>
            </div>
            <p>
              Platforms that charge no seller commission (Fanatics, Goldin, Alt) earn their revenue from the buyer&rsquo;s premium instead. You receive 100% of the hammer — plus any tier bonus — but buyers pay more at checkout.
            </p>
          </div>
        </div>

        {/* ── Step 4 ── */}
        <div className="hiw-step">
          <div className="hiw-step-num">Step 04</div>
          <h2 className="hiw-step-title">Ranked Payout Table</h2>
          <div className="hiw-body">
            <p>
              All 11 platforms are ranked from highest to lowest seller payout for the buyer price you entered. The #1 row is highlighted — that&rsquo;s the platform that keeps the most in your pocket.
            </p>
            <p>
              Expand any row to see the step-by-step fee breakdown: how the buyer&rsquo;s total maps to the hammer, what the platform deducts, and the exact net you receive.
            </p>
            <p>
              For Heritage and Alt, inline dropdowns let you model different commission rates or seller tier bonuses without re-entering the buyer price.
            </p>
          </div>
        </div>

        {/* ── Step 5 ── */}
        <div className="hiw-step">
          <div className="hiw-step-num">Step 05</div>
          <h2 className="hiw-step-title">DIY vs. Consignment Tradeoff</h2>
          <div className="hiw-body">
            <p>
              eBay direct (listed and shipped by you) typically appears near the top of the rankings for mid-range cards — especially if you&rsquo;re an established seller with a low fee rate. But the comparison isn&rsquo;t purely about payout:
            </p>
            <div className="hiw-math-box" style={{ lineHeight: 2 }}>
              <div className="formula-line"><span className="formula-label">eBay direct</span><span className="formula-val">Higher payout, you handle everything</span></div>
              <div className="formula-line"><span className="formula-label">Consignment</span><span className="formula-val">Lower payout, platform handles everything</span></div>
            </div>
            <p>
              Consignment trades margin for convenience — photography, listing, customer service, and shipping are all handled by the platform. For high-value cards where the fee delta is small, that tradeoff is often worth it.
            </p>
          </div>
        </div>

        <div className="cta-box" style={{ marginBottom: 0 }}>
          <p>Compare your payout across 11 platforms.</p>
          <Link href="/consignment-calculator" className="cta-btn">Open the Consignment Calculator →</Link>
        </div>
      </div>

      {/* ── Final CTA ── */}
      <div style={{ borderTop: "1px solid var(--border)", marginTop: 52, paddingTop: 32 }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/faq" style={{ fontSize: 12, color: "var(--green)", textDecoration: "none" }}>Read the FAQ →</Link>
          <Link href="/" style={{ fontSize: 12, color: "var(--text-faint)", textDecoration: "none" }}>Fair Deal Calculator →</Link>
          <Link href="/consignment-calculator" style={{ fontSize: 12, color: "var(--text-faint)", textDecoration: "none" }}>Consignment Calculator →</Link>
        </div>
      </div>
    </div>
  );
}
