import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

function calculate(market: number, tax: number, shipping: number, feeRate: number, feeFixed: number) {
  const buyerTaxAmt  = market * tax;
  const buyerTotal   = market + buyerTaxAmt + shipping;
  const ebayFeeBase  = market + shipping + buyerTaxAmt;
  const ebayFeeAmt   = ebayFeeBase * feeRate + feeFixed;
  const sellerNet    = market - ebayFeeAmt;
  const evenSplit    = (sellerNet + buyerTotal) / 2;
  return { buyerTaxAmt, buyerTotal, ebayFeeAmt, sellerNet, evenSplit };
}

const fmtUSD = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export async function GET(req: NextRequest) {
  const p         = req.nextUrl.searchParams;
  const market    = parseFloat(p.get("market")    || "0");
  const proposed  = parseFloat(p.get("proposed")  || "0");
  const tax       = (parseFloat(p.get("tax")      || "0")) / 100;
  const shipping  = parseFloat(p.get("shipping")  || "0");
  const feeRate   = (parseFloat(p.get("fee_rate") || "13.25")) / 100;
  const feeFixed  = parseFloat(p.get("fee_fixed") || "0.30");
  const cardName  = p.get("card") || "";

  const r = calculate(market, tax, shipping, feeRate, feeFixed);

  const proposedPct    = market > 0 ? (proposed / market) * 100 : 0;
  const buyerSavesAt   = r.buyerTotal - proposed;
  const sellerGainsAt  = proposed - r.sellerNet;
  const range          = r.buyerTotal - r.sellerNet;
  const posInRange     = range > 0 ? (proposed - r.sellerNet) / range : 0.5;
  const recommended    = r.evenSplit;

  let verdict = "Fair deal — equal savings";
  let verdictColor = "#7bc47b";
  if      (proposed < r.sellerNet)                { verdict = "Below seller floor — seller loses vs eBay"; verdictColor = "#f46060"; }
  else if (proposed > r.buyerTotal)               { verdict = "Above buyer ceiling — buyer loses vs eBay"; verdictColor = "#f46060"; }
  else if (posInRange < 0.20)                     { verdict = "Favors buyer heavily";     verdictColor = "#f46060"; }
  else if (posInRange < 0.40)                     { verdict = "Favors buyer";             verdictColor = "#f4a460"; }
  else if (posInRange > 0.80)                     { verdict = "Favors seller heavily";    verdictColor = "#f46060"; }
  else if (posInRange > 0.60)                     { verdict = "Favors seller";            verdictColor = "#e8d5a3"; }

  const Row = ({ label, value, color = "#aaa", large = false }: { label: string; value: string; color?: string; large?: boolean }) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #2a2d3a" }}>
      <span style={{ color: "#8a8fa8", fontSize: large ? 18 : 16 }}>{label}</span>
      <span style={{ color, fontSize: large ? 20 : 16, fontWeight: large ? 700 : 400 }}>{value}</span>
    </div>
  );

  return new ImageResponse(
    (
      <div style={{
        width: 700, height: 920,
        background: "#0d0f14",
        display: "flex", flexDirection: "column",
        fontFamily: "sans-serif",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Top accent bar */}
        <div style={{ height: 5, background: "linear-gradient(to right, #f4a460, #e8d5a3, #7bc47b)", display: "flex" }} />

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 32px 16px", borderBottom: "1px solid #2a2d3a" }}>
          <span style={{ color: "#e8d5a3", fontSize: 18, fontWeight: 700, letterSpacing: "0.08em" }}>⚖️ TCG FAIR DEAL ANALYSIS</span>
          <span style={{ color: "#3a3d50", fontSize: 13 }}>tcgfair.com</span>
        </div>

        {/* Body */}
        <div style={{ display: "flex", flexDirection: "column", padding: "24px 32px", flex: 1 }}>

          {/* Card name */}
          {cardName && (
            <div style={{ color: "#556", fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
              {cardName}
            </div>
          )}

          {/* Market price */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ color: "#8a8fa8", fontSize: 14, letterSpacing: "0.12em", textTransform: "uppercase" }}>Market Price</span>
            <span style={{ color: "#e8e0d0", fontSize: 22, fontWeight: 700 }}>{fmtUSD(market)}</span>
          </div>
          <div style={{ height: 1, background: "#2a2d3a", marginBottom: 24, display: "flex" }} />

          {/* Proposed price — hero */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", background: "#141620", border: "1px solid #2a2d3a", borderRadius: 12, padding: "24px 20px", marginBottom: 20 }}>
            <span style={{ color: "#8a8fa8", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>Proposed Price</span>
            <span style={{ color: verdictColor, fontSize: 72, fontWeight: 900, lineHeight: 1 }}>{fmtUSD(proposed)}</span>
            <span style={{ color: verdictColor + "aa", fontSize: 16, marginTop: 6 }}>{proposedPct.toFixed(1)}% of market</span>
            <div style={{ display: "flex", background: verdictColor + "18", border: `1px solid ${verdictColor}55`, borderRadius: 6, padding: "6px 18px", marginTop: 14 }}>
              <span style={{ color: verdictColor, fontSize: 14, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>{verdict}</span>
            </div>
          </div>

          {/* Breakdown rows */}
          <div style={{ display: "flex", flexDirection: "column", background: "#0f111a", border: "1px solid #2a2d3a", borderRadius: 10, padding: "4px 20px", marginBottom: 16 }}>
            <Row label={sellerGainsAt >= 0 ? "Seller saves vs eBay" : "Seller loses vs eBay"} value={(sellerGainsAt > 0 ? "+" : "") + fmtUSD(sellerGainsAt)} color={sellerGainsAt >= 0 ? "#f4a460" : "#f46060"} large />
            <Row label={buyerSavesAt  >= 0 ? "Buyer saves vs eBay"  : "Buyer loses vs eBay"}  value={(buyerSavesAt  > 0 ? "+" : "") + fmtUSD(buyerSavesAt)}  color={buyerSavesAt  >= 0 ? "#a8d8ea" : "#f46060"} large />
          </div>

          {/* Fair range */}
          <div style={{ display: "flex", flexDirection: "column", background: "#0f1a12", border: "1px solid #2a4a2e", borderRadius: 10, padding: "14px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <span style={{ color: "#556", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase" }}>Seller Floor (eBay net)</span>
                <span style={{ color: "#f4a460", fontSize: 20, fontWeight: 700, marginTop: 2 }}>{fmtUSD(r.sellerNet)}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span style={{ color: "#556", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase" }}>★ Recommended</span>
                <span style={{ color: "#7bc47b", fontSize: 20, fontWeight: 700, marginTop: 2 }}>{fmtUSD(recommended)}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <span style={{ color: "#556", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase" }}>Buyer Ceiling</span>
                <span style={{ color: "#e8d5a3", fontSize: 20, fontWeight: 700, marginTop: 2 }}>{fmtUSD(r.buyerTotal)}</span>
              </div>
            </div>
            {/* Bar */}
            <div style={{ height: 6, background: "linear-gradient(to right, #f4a460, #e8d5a3 50%, #a8d8ea)", borderRadius: 3, position: "relative", display: "flex" }}>
              {range > 0 && (
                <div style={{
                  position: "absolute",
                  left: `${Math.min(96, Math.max(4, posInRange * 100))}%`,
                  top: -5, bottom: -5,
                  width: 14, height: 14,
                  borderRadius: "50%",
                  background: verdictColor,
                  border: "2px solid #0d0f14",
                  transform: "translateX(-50%) translateY(-15%)",
                  display: "flex",
                }} />
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "14px 32px", borderTop: "1px solid #1a1c23" }}>
          <span style={{ color: "#2a2d3a", fontSize: 12, letterSpacing: "0.1em" }}>tcgfair.com — free tool for TCG buyers &amp; sellers</span>
        </div>

        {/* Bottom accent bar */}
        <div style={{ height: 5, background: "linear-gradient(to right, #7bc47b, #e8d5a3, #f4a460)", display: "flex" }} />
      </div>
    ),
    { width: 700, height: 920 }
  );
}
