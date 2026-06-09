import { Suspense } from "react";
import Link from "next/link";
import { Calculator } from "./calculator";
import { SuppliesStrip } from "./supplies-strip";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<div style={{ padding: 32, textAlign: "center", color: "#8a8fa8" }}>Loading...</div>}>
        <Calculator />
      </Suspense>
      <SuppliesStrip />

      {/* SEO content — collapsed by default, crawlable by Google */}
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "0 16px 80px" }}>
        <details className="disclosure">
          <summary className="disclosure-summary">
            <span>About this calculator</span>
            <span className="disclosure-meta">What is a fair TCG cash deal?</span>
          </summary>
          <div className="disclosure-body seo-body" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <h2 className="seo-h2" style={{ fontSize: 18, marginBottom: 10 }}>What Is a Fair Pokémon Card Cash Deal?</h2>
              <p>
                When buying or selling a Pokémon card in person — at a card show, local game store (LGS), or trade night — the standard reference is eBay&rsquo;s sold price. But a fair cash price isn&rsquo;t simply a percentage of that number. The buyer avoids sales tax (6–10%) and shipping ($3–6), while the seller avoids eBay&rsquo;s final value fee (13.25% on the full transaction). A truly fair deal splits those savings equally.
              </p>
              <p style={{ marginTop: 10 }}>
                This free Pokémon TCG cash deal calculator does that math instantly. Enter the eBay sold price and it shows the fair price range — the minimum the seller should accept and the maximum the buyer should pay — along with the recommended even-split price where both sides save the same dollar amount vs. eBay.
              </p>
            </div>

            <div>
              <h2 className="seo-h2" style={{ fontSize: 18, marginBottom: 10 }}>Why Not Just Use 85% of Market?</h2>
              <p>
                The &ldquo;85% of market&rdquo; rule is often cited as the seller&rsquo;s break-even after eBay fees — and it&rsquo;s roughly accurate. But it ignores the buyer&rsquo;s side entirely. On a $100 card with 8.25% tax and $4 shipping, the buyer&rsquo;s true eBay cost is $112.25. At $85, the buyer saves $27.25 while the seller gains just $0.17 above their eBay floor. That&rsquo;s not a fair split — it heavily favors the buyer.
              </p>
              <p style={{ marginTop: 10 }}>
                The fair middle price for that same card is around $98.54, where both buyer and seller each save about $13.71 vs. eBay. Use this calculator at your next card show to know exactly where that number lands for any card.
              </p>
            </div>

            <div>
              <h2 className="seo-h2" style={{ fontSize: 18, marginBottom: 10 }}>Works for Any TCG Card</h2>
              <p>
                While built with Pokémon TCG in mind, this calculator works for any trading card game — Magic: The Gathering, One Piece TCG, Lorcana, sports cards, and more. Any card with an eBay sold price can be run through the same math. Adjust the eBay fee rate for your seller tier, set your local sales tax rate, and get an instant fair price.
              </p>
              <p style={{ marginTop: 10 }}>
                <Link href="/how-it-works" style={{ color: "#7bc47b", textDecoration: "none" }}>See the full math →</Link>
                {" · "}
                <Link href="/faq" style={{ color: "#7bc47b", textDecoration: "none" }}>Read the FAQ →</Link>
              </p>
            </div>
          </div>
        </details>
      </div>
    </main>
  );
}
