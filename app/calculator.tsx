"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ebaySearchUrl } from "./ebay";

interface CalcState {
  market: string;
  tax: string;
  shipping: string;
  feeRate: string;
  feeFixed: string;
  customPct: string;
  proposed: string;
}

function calculate(s: CalcState) {
  const market   = parseFloat(s.market)   || 0;
  const tax      = (parseFloat(s.tax)     || 0) / 100;
  const shipping = parseFloat(s.shipping) || 0;
  const feeRate  = (parseFloat(s.feeRate) || 0) / 100;
  const feeFixed = parseFloat(s.feeFixed) || 0;

  const buyerTaxAmt = market * tax;
  const buyerTotal  = market + buyerTaxAmt + shipping;
  const ebayFeeBase = market + shipping + buyerTaxAmt;
  const ebayFeeAmt  = ebayFeeBase * feeRate + feeFixed;
  const sellerNet   = market - ebayFeeAmt;
  const sellerFloor = sellerNet;
  const buyerCeiling = buyerTotal;
  const evenSplit   = (sellerFloor + buyerCeiling) / 2;
  const sellerSavesVsEbay = ebayFeeAmt + shipping;
  const buyerSavesVsEbay  = buyerTaxAmt + shipping;

  return { market, shipping, buyerTaxAmt, buyerTotal, ebayFeeAmt, sellerNet,
           sellerFloor, buyerCeiling, evenSplit, sellerSavesVsEbay, buyerSavesVsEbay };
}

const fmtUSD = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

const PRESETS = [
  { label: "Market", pct: 100,  color: "#e8d5a3" },
  { label: "85%",    pct: 85,   color: "#a8d8a8" },
  { label: "70%",    pct: 70,   color: "#f4a460" },
] as const;

export function Calculator() {
  const router       = useRouter();
  const searchParams = useSearchParams();

  const getSavedSettings = () => {
    try {
      const s = localStorage.getItem("tcg-settings");
      return s ? JSON.parse(s) : {};
    } catch { return {}; }
  };

  const saved = getSavedSettings();
  const [state, setState] = useState<CalcState>({
    market: "", proposed: "", customPct: "90",
    tax:      saved.tax      ?? "8.25",
    shipping: saved.shipping ?? "4.00",
    feeRate:  saved.feeRate  ?? "13.25",
    feeFixed: saved.feeFixed ?? "0.30",
  });
  const [copied,          setCopied]          = useState(false);
  const [linkCopied,      setLinkCopied]      = useState(false);
  const [justClicked,     setJustClicked]     = useState<string | null>(null);
  const [rounding,        setRounding]        = useState(1);
  const [cardName,        setCardName]        = useState("");
  const [includeTax,      setIncludeTax]      = useState(true);
  const [includeShipping, setIncludeShipping] = useState(true);
  const pushTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const g = (k: string, d: string) => searchParams.get(k) || d;
    setState(prev => ({
      market:    g("market",     ""),
      proposed:  g("proposed",   ""),
      customPct: g("custom_pct", "90"),
      tax:       g("tax",        prev.tax),
      shipping:  g("shipping",   prev.shipping),
      feeRate:   g("fee_rate",   prev.feeRate),
      feeFixed:  g("fee_fixed",  prev.feeFixed),
    }));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    try {
      localStorage.setItem("tcg-settings", JSON.stringify({
        tax: state.tax, shipping: state.shipping,
        feeRate: state.feeRate, feeFixed: state.feeFixed,
      }));
    } catch { /* storage unavailable */ }
  }, [state.tax, state.shipping, state.feeRate, state.feeFixed]);

  const syncUrl = useCallback((ns: CalcState) => {
    if (pushTimer.current) clearTimeout(pushTimer.current);
    pushTimer.current = setTimeout(() => {
      const p = new URLSearchParams();
      if (ns.market)              p.set("market",     ns.market);
      if (ns.tax       !== "8.25")  p.set("tax",        ns.tax);
      if (ns.shipping  !== "4.00")  p.set("shipping",   ns.shipping);
      if (ns.feeRate   !== "13.25") p.set("fee_rate",   ns.feeRate);
      if (ns.feeFixed  !== "0.30")  p.set("fee_fixed",  ns.feeFixed);
      if (ns.customPct !== "90")    p.set("custom_pct", ns.customPct);
      if (ns.proposed)              p.set("proposed",   ns.proposed);
      const qs = p.toString();
      router.replace(qs ? `?${qs}` : "/", { scroll: false });
    }, 200);
  }, [router]);

  const update = useCallback((field: keyof CalcState, value: string) => {
    setState(prev => {
      const next = { ...prev, [field]: value };
      syncUrl(next);
      return next;
    });
  }, [syncUrl]);

  const r = calculate({
    ...state,
    tax:      includeTax      ? state.tax      : "0",
    shipping: includeShipping ? state.shipping : "0",
  });
  const hasMarket = r.market > 0;

  const roundTo = (v: number, n: number) => n === 0 ? v : Math.round(v / n) * n;
  const recommendedPrice  = roundTo(r.evenSplit, rounding);
  const sellerGainsAtRec  = recommendedPrice - r.sellerFloor;
  const buyerSavesAtRec   = r.buyerCeiling - recommendedPrice;
  const isRounded         = rounding > 0;
  const buyerGuaranteedSaving = r.buyerTaxAmt + r.shipping;

  const proposed    = parseFloat(state.proposed);
  const hasProposed = state.proposed !== "" && !isNaN(proposed);
  const mkt         = r.market;

  const proposedPct     = hasProposed && mkt > 0 ? (proposed / mkt) * 100 : null;
  const buyerSavesAt    = hasProposed ? r.buyerCeiling - proposed : null;
  const sellerGainsAt   = hasProposed ? proposed - r.sellerFloor  : null;
  const range           = r.buyerCeiling - r.sellerFloor;
  const positionInRange = hasProposed && range > 0 ? (proposed - r.sellerFloor) / range : null;

  let verdict = "", verdictColor = "#999";
  if (hasProposed) {
    if      (proposed < r.sellerFloor)                              { verdict = "Below seller floor — seller loses vs eBay"; verdictColor = "#f46060"; }
    else if (proposed > r.buyerCeiling)                             { verdict = "Above buyer ceiling — buyer loses vs eBay"; verdictColor = "#f46060"; }
    else if (positionInRange !== null && positionInRange < 0.20)    { verdict = "Favors buyer heavily";      verdictColor = "#f46060"; }
    else if (positionInRange !== null && positionInRange < 0.40)    { verdict = "Favors buyer";              verdictColor = "#f4a460"; }
    else if (positionInRange !== null && positionInRange > 0.80)    { verdict = "Favors seller heavily";     verdictColor = "#f46060"; }
    else if (positionInRange !== null && positionInRange > 0.60)    { verdict = "Favors seller";             verdictColor = "#e8d5a3"; }
    else                                                            { verdict = "Fair Deal";                 verdictColor = "#7bc47b"; }
  }

  const barPct         = positionInRange !== null ? Math.min(100, Math.max(0, positionInRange * 100)) : 0;
  const barOutOfBounds = positionInRange !== null && (positionInRange < 0 || positionInRange > 1);
  const marketBarPct   = range > 0 ? Math.min(100, Math.max(0, ((r.market - r.sellerFloor) / range) * 100)) : 55;
  const recBarPct      = range > 0 ? Math.min(100, Math.max(0, ((recommendedPrice - r.sellerFloor) / range) * 100)) : 50;

  const evenSplitPct   = mkt > 0 ? (recommendedPrice / mkt) * 100 : 50;
  const customPresetLabel = `${state.customPct}%`;
  const allPresets = [
    ...PRESETS,
    { label: "Even Split", pct: evenSplitPct, color: "#7bc47b" },
    { label: customPresetLabel, pct: parseFloat(state.customPct) || 0, color: "#b8c4e8" },
  ];

  const applyPreset = (label: string, pct: number, exactPrice?: number) => {
    setJustClicked(label);
    setTimeout(() => setJustClicked(null), 450);
    const price = exactPrice !== undefined ? exactPrice.toFixed(2) : (r.market * pct / 100).toFixed(2);
    setState(prev => { const next = { ...prev, proposed: price }; syncUrl(next); return next; });
  };

  const generateSummary = () => {
    let s = `⚖️ Fair Deal Analysis\n`;
    s += `Card Market Price: ${fmtUSD(r.market)}\n\n`;
    s += `eBay comparison:\n`;
    s += `  Buyer would pay on eBay:   ${fmtUSD(r.buyerTotal)}\n`;
    s += `  Seller would net on eBay:  ${fmtUSD(r.sellerNet)}\n`;
    s += `  Fair cash range:           ${fmtUSD(r.sellerFloor)} – ${fmtUSD(r.buyerCeiling)}\n`;
    s += `  Recommended (equal saves): ${fmtUSD(recommendedPrice)}\n`;
    if (hasProposed && proposedPct !== null) {
      s += `\nProposed: ${fmtUSD(proposed)} (${proposedPct.toFixed(1)}% of market)\n`;
      s += `Verdict: ${verdict}\n`;
      if (buyerSavesAt  !== null) s += `  Buyer ${buyerSavesAt   >= 0 ? "saves" : "loses"} vs eBay:   ${buyerSavesAt  > 0 ? "+" : ""}${fmtUSD(buyerSavesAt)}\n`;
      if (sellerGainsAt !== null) s += `  Seller ${sellerGainsAt >= 0 ? "gains" : "loses"} vs floor: ${sellerGainsAt > 0 ? "+" : ""}${fmtUSD(sellerGainsAt)}\n`;
      const diff = proposed - recommendedPrice;
      s += `  vs Recommended: ${diff < 0 ? `↓${fmtUSD(Math.abs(diff))} favors buyer` : diff > 0 ? `↑${fmtUSD(diff)} favors seller` : "exactly even"}\n`;
    }
    s += `\ntcgfair.com`;
    return s;
  };

  const handleShare = async () => {
    const params = new URLSearchParams({
      market:    state.market,
      proposed:  state.proposed,
      tax:       includeTax      ? state.tax      : "0",
      shipping:  includeShipping ? state.shipping : "0",
      fee_rate:  state.feeRate,
      fee_fixed: state.feeFixed,
      ...(cardName.trim() ? { card: cardName.trim() } : {}),
    });

    try {
      const res  = await fetch(`/api/deal-card?${params}`);
      const blob = await res.blob();
      const file = new File([blob], "tcg-deal.png", { type: "image/png" });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: "TCG Fair Deal Analysis", text: generateSummary() });
        if (navigator.vibrate) navigator.vibrate(50);
      } else {
        const url = URL.createObjectURL(blob);
        const a   = document.createElement("a");
        a.href    = url;
        a.download = "tcg-deal.png";
        a.click();
        URL.revokeObjectURL(url);
        if (navigator.vibrate) navigator.vibrate(50);
      }
    } catch {
      // fallback: copy text
      try { await navigator.clipboard.writeText(`${window.location.href}\n\n${generateSummary()}`); } catch {}
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleCopyLink = async () => {
    try { await navigator.clipboard.writeText(window.location.href); } catch {}
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <div className="app">

      {/* ── Header ── */}
      <header className="app-header">
        <h1 className="app-h1">TCG Fair Deal Calculator</h1>
        <p className="app-desc">
          Enter the card&rsquo;s market price to see what&rsquo;s fair for both buyer and seller — and share your math.
        </p>
      </header>

      {/* ── eBay Card Search ── */}
      <div className="ebay-search-section">
        <label htmlFor="cardName" className="ebay-search-label">
          Search eBay Sold Listings
        </label>
        <div className="ebay-search-row">
          <input
            id="cardName"
            type="text"
            className="ebay-search-input"
            placeholder="Card name (e.g. Charizard Base Set, Black Lotus…)"
            value={cardName}
            onChange={e => setCardName(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && cardName.trim()) {
                window.open(ebaySearchUrl(cardName, "calculator-search"), "_blank", "noopener,noreferrer");
              }
            }}
          />
          <a
            href={ebaySearchUrl(cardName || "tcg card", "calculator-search")}
            target="_blank"
            rel="noopener noreferrer"
            className="ebay-search-btn"
          >
            Search eBay ↗
          </a>
        </div>
        <p className="ebay-search-hint">
          Opens eBay Sold Items — find the recent sale price, then enter it below.
        </p>
      </div>

      {/* ── Market Price — primary input ── */}
      <div className="market-input-wrap">
        <label htmlFor="market" className="market-input-label">Card Market Price</label>
        <div style={{ position: "relative" }}>
          <span className="market-input-prefix">$</span>
          <input
            id="market"
            type="number"
            className="market-input"
            placeholder="Enter eBay sold price…"
            value={state.market}
            min="0"
            step="0.01"
            onChange={e => update("market", e.target.value)}
            onWheel={e => e.currentTarget.blur()}
          />
        </div>
        <p className="market-input-hint">
          Use the eBay <em>Sold Items</em> price — not listed price.{" "}
          <Link href="/how-it-works" style={{ color: "#7bc47b", textDecoration: "none" }}>Why?</Link>
        </p>
      </div>

      {/* ── Tax / Shipping toggles ── */}
      <div className="toggles-row">
        <label className="toggle-pill">
          <input
            type="checkbox"
            checked={includeTax}
            onChange={e => setIncludeTax(e.target.checked)}
          />
          <span>Sales Tax</span>
          <input
            type="number"
            className="toggle-pill-input"
            value={state.tax}
            onChange={e => update("tax", e.target.value)}
            onClick={e => e.stopPropagation()}
            onWheel={e => e.currentTarget.blur()}
            step="0.01" min="0"
            disabled={!includeTax}
            aria-label="Sales tax rate"
          />
          <span>%</span>
        </label>
        <label className="toggle-pill">
          <input
            type="checkbox"
            checked={includeShipping}
            onChange={e => setIncludeShipping(e.target.checked)}
          />
          <span>Shipping $</span>
          <input
            type="number"
            className="toggle-pill-input"
            value={state.shipping}
            onChange={e => update("shipping", e.target.value)}
            onClick={e => e.stopPropagation()}
            onWheel={e => e.currentTarget.blur()}
            step="0.01" min="0"
            disabled={!includeShipping}
            aria-label="Shipping amount"
          />
        </label>
      </div>

      {/* ── Empty state ── */}
      {!hasMarket && (
        <div className="empty-state">
          <div className="empty-state-icon">⚖️</div>
          <p>Enter a market price above to see:</p>
          <ul>
            <li>What a buyer would pay on eBay (with tax + shipping)</li>
            <li>What a seller would net on eBay (after fees)</li>
            <li>The fair cash price range for both sides</li>
          </ul>
        </div>
      )}

      {/* ── Main content — shown when market price is entered ── */}
      {hasMarket && (
        <>
          {/* ── Fair In-Person Range + Deal Analyzer (unified) ── */}
          <div className="fair-zone">
            <div style={{ marginBottom: 14 }}>
              <div className="fair-zone-title">⚖️ Fair In-Person Range</div>
              <p style={{ fontSize: 11, color: "#556", margin: 0, lineHeight: 1.5 }}>
                Drag the slider or tap a preset to propose a price.
              </p>
            </div>

            {/* Three reference columns */}
            <div className="fair-range">
              <div className="fair-range-col floor">
                <div className="fair-range-label">Seller Floor</div>
                <div className="fair-range-val">{fmtUSD(r.sellerFloor)}</div>
                <div className="fair-range-sub">seller nets on eBay</div>
              </div>
              <div className="fair-range-col mid">
                <div className="fair-range-label" style={{ color: "#7bc47b" }}>★ Recommended</div>
                <div className="fair-range-val">{fmtUSD(recommendedPrice)}</div>
                <div className="fair-range-sub" style={{ color: "#5a9a5a" }}>
                  {isRounded ? `rounded · exact ${fmtUSD(r.evenSplit)}` : "equal savings for both"}
                </div>
                <div style={{ marginTop: 8 }}>
                  <select
                    value={rounding}
                    onChange={e => setRounding(Number(e.target.value))}
                    className="round-select"
                    aria-label="Round recommended price for negotiation"
                  >
                    <option value={1}>Round to $1</option>
                    <option value={0}>Exact</option>
                    <option value={5}>Round to $5</option>
                    <option value={10}>Round to $10</option>
                    <option value={50}>Round to $50</option>
                    <option value={100}>Round to $100</option>
                  </select>
                </div>
              </div>
              <div className="fair-range-col ceiling">
                <div className="fair-range-label">Buyer Ceiling</div>
                <div className="fair-range-val">{fmtUSD(r.buyerCeiling)}</div>
                <div className="fair-range-sub">buyer breaks even</div>
              </div>
            </div>

            {/* Position bar + slider */}
            <div className="fairness-bar">
              <div className="fairness-track-wrap">
                <div
                  className="fairness-track"
                  style={{ background: `linear-gradient(to right, #f4a460 0%, #e8d5a3 ${marketBarPct}%, #a8d8ea 100%)` }}
                >
                  <div style={{
                    position: "absolute", left: `${marketBarPct}%`,
                    top: -5, bottom: -5, width: 2,
                    background: "rgba(232,213,163,0.85)", borderRadius: 1,
                    transform: "translateX(-50%)",
                  }} />
                  <div className="fairness-tick" style={{ left: `${recBarPct}%`, background: "rgba(123,196,123,0.7)" }} />
                  {hasProposed && (
                    <div
                      className={`fairness-dot${barOutOfBounds ? " fairness-dot-oob" : ""}`}
                      style={{ left: `${barPct}%`, background: verdictColor }}
                    />
                  )}
                </div>
                {/* Invisible range slider overlaid on the bar */}
                <input
                  type="range"
                  className="fairness-slider"
                  min={r.sellerFloor}
                  max={r.buyerCeiling}
                  step={0.01}
                  value={hasProposed ? proposed : recommendedPrice}
                  onChange={e => {
                    setState(prev => { const next = { ...prev, proposed: parseFloat(e.target.value).toFixed(2) }; syncUrl(next); return next; });
                    setJustClicked(null);
                  }}
                  aria-label="Proposed price slider"
                />
              </div>
              <div style={{ position: "relative", height: 28, marginTop: 4 }}>
                <span className="fairness-label" style={{ position: "absolute", left: 0 }}>
                  {fmtUSD(r.sellerFloor)}<br /><span style={{ fontSize: 8, opacity: 0.45 }}>FLOOR</span>
                </span>
                <span className="fairness-label" style={{
                  position: "absolute", left: `${marketBarPct}%`,
                  transform: "translateX(-50%)", textAlign: "center", whiteSpace: "nowrap",
                }}>
                  <span style={{ color: "#e8d5a3" }}>{fmtUSD(r.market)}</span>
                  <br /><span style={{ fontSize: 8, opacity: 0.45 }}>MARKET</span>
                </span>
                {hasProposed && (
                  <span className="fairness-label" style={{
                    position: "absolute",
                    left: `${Math.min(92, Math.max(8, barPct))}%`,
                    transform: "translateX(-50%)", textAlign: "center",
                    whiteSpace: "nowrap", color: verdictColor,
                  }}>
                    {fmtUSD(proposed)}<br /><span style={{ fontSize: 8, opacity: 0.6 }}>PROPOSED</span>
                  </span>
                )}
                <span className="fairness-label" style={{ position: "absolute", right: 0, textAlign: "right" }}>
                  {fmtUSD(r.buyerCeiling)}<br /><span style={{ fontSize: 8, opacity: 0.45 }}>CEILING</span>
                </span>
              </div>
            </div>

            {/* Savings chips or verdict */}
            {!hasProposed ? (
              <>
                <div className="savings-row">
                  <div className="savings-chip">
                    <div className="savings-chip-label">Seller saves</div>
                    <div className="savings-chip-val">+{fmtUSD(sellerGainsAtRec)}</div>
                  </div>
                  <div className="savings-chip" style={{ border: "1px solid #3a6a3e", background: "#0f1f12" }}>
                    <div className="savings-chip-label" style={{ color: "#7bc47b" }}>
                      {isRounded ? "Each saves ~" : "Each saves"}
                    </div>
                    <div className="savings-chip-val">{fmtUSD((sellerGainsAtRec + buyerSavesAtRec) / 2)}</div>
                  </div>
                  <div className="savings-chip">
                    <div className="savings-chip-label">Buyer saves</div>
                    <div className="savings-chip-val" style={{ color: "#a8d8ea" }}>+{fmtUSD(buyerSavesAtRec)}</div>
                  </div>
                </div>
                <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 5 }}>
                  <p style={{ fontSize: 11, color: "#8a8fa8", lineHeight: 1.5, margin: 0 }}>
                    <strong style={{ color: "#e8e0d0", fontWeight: 500 }}>Seller:</strong>{" "}
                    eBay nets {fmtUSD(r.sellerFloor)} after fees — any cash price above that is a better deal.
                  </p>
                  <p style={{ fontSize: 11, color: "#8a8fa8", lineHeight: 1.5, margin: 0 }}>
                    <strong style={{ color: "#e8e0d0", fontWeight: 500 }}>Buyer:</strong>{" "}
                    even at market price ({fmtUSD(r.market)}) you save{" "}
                    <span style={{ color: "#a8d8ea" }}>+{fmtUSD(buyerGuaranteedSaving)}</span>{" "}
                    in eBay tax + shipping.
                  </p>
                </div>
              </>
            ) : (
              /* Inline verdict when a price is proposed */
              <div style={{ marginTop: 10, padding: "12px 14px", background: "#0a1a0d", border: `1px solid ${verdictColor}30`, borderRadius: 8 }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                    <span className="verdict-price">{fmtUSD(proposed)}</span>
                    {proposedPct !== null && (
                      <span className="verdict-pct" style={{ color: verdictColor }}>{proposedPct.toFixed(1)}%</span>
                    )}
                  </div>
                  <div className="verdict-badge" style={{ background: verdictColor + "1a", borderColor: verdictColor + "55", color: verdictColor, margin: 0 }}>
                    {verdict}
                  </div>
                </div>
                <div className="verdict-lines">
                  <div className="verdict-line">
                    <span>{(buyerSavesAt ?? 0) >= 0 ? "Buyer saves vs eBay" : "Buyer loses vs eBay"}</span>
                    <span className="verdict-line-val" style={{ color: (buyerSavesAt ?? 0) >= 0 ? "#7bc47b" : "#f46060" }}>
                      {(buyerSavesAt ?? 0) > 0 ? "+" : ""}{fmtUSD(buyerSavesAt ?? 0)}
                    </span>
                  </div>
                  <div className="verdict-line">
                    <span>{(sellerGainsAt ?? 0) >= 0 ? "Seller gains vs eBay" : "Seller loses vs eBay"}</span>
                    <span className="verdict-line-val" style={{ color: (sellerGainsAt ?? 0) >= 0 ? "#7bc47b" : "#f46060" }}>
                      {(sellerGainsAt ?? 0) > 0 ? "+" : ""}{fmtUSD(sellerGainsAt ?? 0)}
                    </span>
                  </div>
                  <div className="verdict-line">
                    <span>vs Recommended ({fmtUSD(recommendedPrice)})</span>
                    <span className="verdict-line-val" style={{ color: proposed < recommendedPrice ? "#a8d8ea" : "#e8d5a3" }}>
                      {proposed < recommendedPrice
                        ? `↓${fmtUSD(recommendedPrice - proposed)} favors buyer`
                        : proposed > recommendedPrice
                        ? `↑${fmtUSD(proposed - recommendedPrice)} favors seller`
                        : "exactly even"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Separator */}
            <div style={{ borderTop: "1px dashed #2a4a2e", margin: "16px 0 14px" }} />

            {/* Propose a price */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 10, color: "#556", textTransform: "uppercase", letterSpacing: "0.14em" }}>
                Propose a price
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <label htmlFor="customPct" style={{ fontSize: 10, color: "#556", letterSpacing: "0.08em" }}>Custom %:</label>
                <div className="input-wrap">
                  <input
                    id="customPct"
                    type="number"
                    className="calc-input"
                    value={state.customPct}
                    onChange={e => update("customPct", e.target.value)}
                    onWheel={e => e.currentTarget.blur()}
                    step="1" min="0" max="200"
                    style={{ width: 50, padding: "4px 6px", fontSize: 12 }}
                  />
                  <span className="affix suf" style={{ padding: "4px 6px", fontSize: 11 }}>%</span>
                </div>
              </div>
            </div>

            <div className="presets" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              {allPresets.slice(0, 3).map(({ label, pct, color }) => {
                const price = r.market * (pct / 100);
                const isActive = hasProposed && Math.abs(proposed - price) < 0.005;
                return (
                  <div key={label}
                    className={`preset${isActive ? " preset-active" : ""}${justClicked === label ? " pulse" : ""}`}
                    style={{ borderColor: isActive ? color : color + "44" }}
                    onClick={() => applyPreset(label, pct)}
                    role="button" tabIndex={0}
                    onKeyDown={e => e.key === "Enter" && applyPreset(label, pct)}
                    aria-pressed={isActive}
                  >
                    <div className="preset-label" style={{ color }}>{label}</div>
                    <div className="preset-val">{fmtUSD(price)}</div>
                  </div>
                );
              })}
            </div>
            <div className="presets" style={{ gridTemplateColumns: "repeat(2, 1fr)", marginTop: -2 }}>
              {/* Even Split */}
              {(() => {
                const p = allPresets[3];
                const isActive = hasProposed && Math.abs(proposed - recommendedPrice) < 0.005;
                const setEven = () => applyPreset("Even Split", p.pct, recommendedPrice);
                return (
                  <div key="Even Split"
                    className={`preset${isActive ? " preset-active" : ""}${justClicked === "Even Split" ? " pulse" : ""}`}
                    style={{ borderColor: isActive ? p.color : p.color + "44" }}
                    onClick={setEven} role="button" tabIndex={0}
                    onKeyDown={e => e.key === "Enter" && setEven()}
                    aria-pressed={isActive}
                  >
                    <div className="preset-label" style={{ color: p.color }}>★ Even Split</div>
                    <div className="preset-val">
                      {fmtUSD(recommendedPrice)}{isRounded && <span style={{ color: "#556", fontSize: 9, marginLeft: 2 }}>~</span>}
                      {" "}<span style={{ color: "#556", fontSize: 10 }}>{evenSplitPct.toFixed(1)}%</span>
                    </div>
                  </div>
                );
              })()}
              {/* Custom */}
              {(() => {
                const p = allPresets[4];
                const cPrice = r.market * (p.pct / 100);
                const isActive = hasProposed && Math.abs(proposed - cPrice) < 0.005;
                return (
                  <div key={p.label}
                    className={`preset${isActive ? " preset-active" : ""}${justClicked === p.label ? " pulse" : ""}`}
                    style={{ borderColor: isActive ? p.color : p.color + "44" }}
                    onClick={() => applyPreset(p.label, p.pct)}
                    role="button" tabIndex={0}
                    onKeyDown={e => e.key === "Enter" && applyPreset(p.label, p.pct)}
                    aria-pressed={isActive}
                  >
                    <div className="preset-label" style={{ color: p.color }}>{p.label}</div>
                    <div className="preset-val">{fmtUSD(cPrice)}</div>
                  </div>
                );
              })()}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
              <label htmlFor="proposed" style={{ fontSize: 12, color: "#888", flex: 1 }}>Or enter price:</label>
              <div className="input-wrap" style={{ borderColor: hasProposed ? "#7bc47b" : undefined }}>
                <span className="affix">$</span>
                <input
                  id="proposed"
                  type="number"
                  className="calc-input"
                  value={state.proposed}
                  onChange={e => { update("proposed", e.target.value); setJustClicked(null); }}
                  onWheel={e => e.currentTarget.blur()}
                  placeholder="0.00"
                  step="0.01" min="0"
                  style={{ width: 90 }}
                />
              </div>
            </div>
          </div>

          {/* ── Deal Card — always visible once market price is entered ── */}
          <div className="deal-card" role="region" aria-label="Shareable deal summary">
            <div className="deal-card-header">
              <span className="deal-card-header-title">⚖️ Fair Deal Analysis</span>
              <span className="deal-card-header-domain">tcgfair.com</span>
            </div>
            {!hasProposed ? (
              <div className="deal-card-empty">
                <div style={{ fontSize: 24, marginBottom: 10 }}>🖼️</div>
                <p style={{ fontSize: 13, color: "#556", margin: 0, lineHeight: 1.6 }}>
                  Drag the slider or tap a preset above to propose a price —<br />
                  then share this deal as an image to Facebook, Reddit, iMessage &amp; more.
                </p>
              </div>
            ) : (
              <div className="deal-card-body">
                <div className="deal-card-market-row">
                  <span>Market Price</span>
                  <span style={{ color: "#e8e0d0", fontFamily: "'DM Mono', monospace" }}>{fmtUSD(r.market)}</span>
                </div>
                <div className="deal-card-proposed-section">
                  <div className="deal-card-proposed-label">Proposed Price</div>
                  <div className="deal-card-proposed-price" style={{ color: verdictColor }}>
                    {fmtUSD(proposed)}
                  </div>
                  {proposedPct !== null && (
                    <div className="deal-card-proposed-pct" style={{ color: verdictColor + "aa" }}>
                      {proposedPct.toFixed(1)}% of market
                    </div>
                  )}
                  <div className="deal-card-verdict" style={{ background: verdictColor + "1a", borderColor: verdictColor + "55", color: verdictColor }}>
                    {verdict}
                  </div>
                </div>
                <div className="deal-card-savings">
                  <div className="deal-card-savings-row">
                    <span>{(sellerGainsAt ?? 0) >= 0 ? "Seller saves vs eBay" : "Seller loses vs eBay"}</span>
                    <span style={{ color: (sellerGainsAt ?? 0) >= 0 ? "#f4a460" : "#f46060", fontFamily: "'DM Mono', monospace" }}>
                      {(sellerGainsAt ?? 0) > 0 ? "+" : ""}{fmtUSD(sellerGainsAt ?? 0)}
                    </span>
                  </div>
                  <div className="deal-card-savings-row">
                    <span>{(buyerSavesAt ?? 0) >= 0 ? "Buyer saves vs eBay" : "Buyer loses vs eBay"}</span>
                    <span style={{ color: (buyerSavesAt ?? 0) >= 0 ? "#a8d8ea" : "#f46060", fontFamily: "'DM Mono', monospace" }}>
                      {(buyerSavesAt ?? 0) > 0 ? "+" : ""}{fmtUSD(buyerSavesAt ?? 0)}
                    </span>
                  </div>
                </div>
                <div className="deal-card-range-row">
                  Fair range: {fmtUSD(r.sellerFloor)} – {fmtUSD(r.buyerCeiling)} · Recommended: {fmtUSD(recommendedPrice)}
                </div>
              </div>
            )}
            <div className="deal-card-actions">
              <button
                className={`deal-card-btn-primary${copied ? " copied" : ""}${!hasProposed ? " disabled" : ""}`}
                onClick={handleShare}
                disabled={!hasProposed}
              >
                {copied ? "✓ Copied!" : "🖼️ Share Image"}
              </button>
              <button className={`deal-card-btn-secondary${linkCopied ? " copied" : ""}`} onClick={handleCopyLink}>
                {linkCopied ? "✓ Link copied!" : "🔗 Copy Link"}
              </button>
            </div>
          </div>

          {/* ── eBay breakdown — collapsed ── */}
          <details className="disclosure">
            <summary className="disclosure-summary">
              <span>View eBay breakdown</span>
              <span className="disclosure-meta">
                Buyer: {fmtUSD(r.buyerTotal)} · Seller nets: {fmtUSD(r.sellerNet)}
              </span>
            </summary>
            <div className="disclosure-body">
              <div className="results-card" style={{ marginBottom: 10 }}>
                <div className="results-card-title">Buyer → eBay Cost Breakdown</div>
                <ResultLine label="Card (market)"                value={fmtUSD(r.market)} />
                <ResultLine label={`Sales tax (${state.tax}%)`}  value={fmtUSD(r.buyerTaxAmt)} indent />
                <ResultLine label="Shipping"                     value={fmtUSD(r.shipping)}    indent />
                <ResultLine label="Total out-of-pocket"          value={fmtUSD(r.buyerTotal)}  bold />
              </div>
              <div className="results-card">
                <div className="results-card-title">Seller → eBay Net Breakdown</div>
                <ResultLine label="Sale price (market)"                                value={fmtUSD(r.market)} />
                <ResultLine label={`eBay fee (${state.feeRate}% + $${state.feeFixed})`} value={`−${fmtUSD(r.ebayFeeAmt)}`} indent />
                <ResultLine label="Net in pocket"                                      value={fmtUSD(r.sellerNet)} bold />
              </div>
            </div>
          </details>

          {/* ── Settings — collapsed ── */}
          <details className="disclosure">
            <summary className="disclosure-summary">
              <span>⚙ Adjust settings</span>
              <span className="disclosure-meta">
                {state.tax}% tax · ${state.shipping} shipping · {state.feeRate}% fee
              </span>
            </summary>
            <div className="disclosure-body">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <InputField id="tax"      label="Sales Tax Rate"     value={state.tax}      onChange={v => update("tax", v)}      suffix="%" hint="Buyer's local rate" />
                <InputField id="shipping" label="Shipping"           value={state.shipping} onChange={v => update("shipping", v)} prefix="$" hint="Avoided by both in cash deals" />
                <InputField id="feeRate"  label="eBay Fee Rate"      value={state.feeRate}  onChange={v => update("feeRate", v)}  suffix="%" hint="Final value fee (13.25%)" />
                <InputField id="feeFixed" label="eBay Fixed Fee"     value={state.feeFixed} onChange={v => update("feeFixed", v)} prefix="$" hint="Per-transaction ($0.30)" />
              </div>
            </div>
          </details>

          {/* ── Internal link ── */}
          <p style={{ fontSize: 12, color: "#556", textAlign: "center", marginTop: 20, lineHeight: 1.6 }}>
            Confused about the math?{" "}
            <Link href="/how-it-works" style={{ color: "#7bc47b", textDecoration: "none" }}>How It Works</Link>
            {" "}·{" "}
            <Link href="/faq" style={{ color: "#7bc47b", textDecoration: "none" }}>FAQ</Link>
          </p>
        </>
      )}

    </div>
  );
}

// ── Sub-components ──────────────────────────────────────────────

function InputField({
  id, label, value, onChange, prefix, suffix, hint,
}: {
  id: string; label: string; value: string; onChange: (v: string) => void;
  prefix?: string; suffix?: string; hint?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="label-text">{label}</label>
      {hint && <span style={{ display: "block", fontSize: 10, color: "#556", marginBottom: 4 }}>{hint}</span>}
      <div className="input-wrap">
        {prefix && <span className="affix">{prefix}</span>}
        <input
          id={id}
          type="number"
          className="calc-input"
          value={value}
          onChange={e => onChange(e.target.value)}
          onWheel={e => e.currentTarget.blur()}
          step="0.01" min="0"
          style={{ width: "100%", minWidth: 0 }}
        />
        {suffix && <span className="affix suf">{suffix}</span>}
      </div>
    </div>
  );
}

function ResultLine({ label, value, bold, dimmed, indent }: {
  label: string; value: string; bold?: boolean; dimmed?: boolean; indent?: boolean;
}) {
  const cls = ["result-line", bold && "bold", dimmed && "dimmed", indent && "indent"]
    .filter(Boolean).join(" ");
  return (
    <div className={cls}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
