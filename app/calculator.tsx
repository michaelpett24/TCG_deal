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

const trackEvent = (name: string, params?: Record<string, string | number>) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", name, params);
  }
};

const PRESETS = [
  { label: "Market", pct: 100,  color: "#e8d5a3" },
  { label: "85%",    pct: 85,   color: "#a8d8a8" },
  { label: "70%",    pct: 70,   color: "#f4a460" },
] as const;

export function Calculator() {
  const router       = useRouter();
  const searchParams = useSearchParams();

  const [state, setState] = useState<CalcState>(() => {
    let saved: Record<string, string> = {};
    if (typeof window !== "undefined") {
      try {
        const s = localStorage.getItem("tcg-settings");
        if (s) saved = JSON.parse(s);
      } catch { /* storage unavailable */ }
    }
    return {
      market: "", proposed: "", customPct: "90",
      tax:      saved.tax      ?? "8.25",
      shipping: saved.shipping ?? "4.00",
      feeRate:  saved.feeRate  ?? "13.25",
      feeFixed: saved.feeFixed ?? "0.40",
    };
  });
  const [copied,          setCopied]          = useState(false);
  const [linkCopied,      setLinkCopied]      = useState(false);
  const [justClicked,     setJustClicked]     = useState<string | null>(null);
  const [rounding,        setRounding]        = useState(1);
  const [cardName,        setCardName]        = useState("");
  const [includeTax,      setIncludeTax]      = useState(true);
  const [includeShipping, setIncludeShipping] = useState(true);
  const pushTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const evenSplitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
      if (ns.feeFixed  !== "0.40")  p.set("fee_fixed",  ns.feeFixed);
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

  // Always compute from displayPrice — defaults to recommended until user drags
  const displayPrice    = hasProposed ? proposed : recommendedPrice;
  const proposedPct     = mkt > 0 ? (displayPrice / mkt) * 100 : null;
  const buyerSavesAt    = r.buyerCeiling - displayPrice;
  const sellerGainsAt   = displayPrice - r.sellerFloor;
  const range           = r.buyerCeiling - r.sellerFloor;
  const positionInRange = range > 0 ? (displayPrice - r.sellerFloor) / range : 0.5;

  let verdict = "Fair Deal ✓", verdictColor = "#7bc47b", verdictAction = "Both sides save equally vs. eBay. A strong offer both can feel good about.";
  if (hasMarket) {
    if      (displayPrice < r.sellerFloor)        { verdict = "Below Min — Seller Loses vs eBay"; verdictColor = "#f46060"; verdictAction = "Seller would do better listing on eBay. Offer more to make it worth their while."; }
    else if (displayPrice > r.buyerCeiling)        { verdict = "Above Max — Buyer Loses vs eBay"; verdictColor = "#f46060"; verdictAction = "Buyer would pay less buying on eBay. Consider a lower price."; }
    else if (positionInRange < 0.20)               { verdict = "Favors Buyer Heavily";      verdictColor = "#f46060"; verdictAction = "Seller gains almost nothing over eBay. Consider offering more."; }
    else if (positionInRange < 0.40)               { verdict = "Favors Buyer";              verdictColor = "#f4a460"; verdictAction = "Buyer saves more than the seller. A fair counteroffer would be higher."; }
    else if (positionInRange > 0.80)               { verdict = "Favors Seller Heavily";     verdictColor = "#f46060"; verdictAction = "Buyer saves almost nothing over eBay. Consider a lower price."; }
    else if (positionInRange > 0.60)               { verdict = "Favors Seller";             verdictColor = "#e8d5a3"; verdictAction = "Seller gains more than the buyer saves. Still a fair deal for both."; }
    else                                           { verdict = "Fair Deal ✓";               verdictColor = "#7bc47b"; verdictAction = "Both sides save equally vs. eBay. A strong offer both can feel good about."; }
  }

  const barPct         = Math.min(100, Math.max(0, positionInRange * 100));
  const barOutOfBounds = positionInRange < 0 || positionInRange > 1;
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
    if (proposedPct !== null) {
      s += `\nPrice: ${fmtUSD(displayPrice)} (${proposedPct.toFixed(1)}% of market)\n`;
      s += `Verdict: ${verdict}\n`;
      s += `  Buyer ${buyerSavesAt  >= 0 ? "saves" : "loses"} vs eBay:   ${buyerSavesAt  > 0 ? "+" : ""}${fmtUSD(buyerSavesAt)}\n`;
      s += `  Seller ${sellerGainsAt >= 0 ? "gains" : "loses"} vs floor: ${sellerGainsAt > 0 ? "+" : ""}${fmtUSD(sellerGainsAt)}\n`;
      const diff = displayPrice - recommendedPrice;
      s += `  vs Fair Middle: ${diff < 0 ? `↓${fmtUSD(Math.abs(diff))} favors buyer` : diff > 0 ? `↑${fmtUSD(diff)} favors seller` : "exactly even"}\n`;
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
    trackEvent("share_offer_click", { market_price: r.market, has_proposed: hasProposed ? 1 : 0 });
    const p = new URLSearchParams();
    if (state.market)   p.set("market", state.market);
    if (state.proposed) p.set("proposed", state.proposed);
    if (cardName.trim()) p.set("card", cardName.trim());
    if (!includeTax)      p.set("tax", "0");
    if (!includeShipping) p.set("shipping", "0");
    const base = window.location.origin + window.location.pathname;
    const url  = p.toString() ? `${base}?${p}` : base;
    try { await navigator.clipboard.writeText(url); } catch {}
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleReset = () => {
    setState(prev => { const next = { ...prev, market: "", proposed: "" }; syncUrl(next); return next; });
    setCardName("");
  };

  return (
    <div className="app">

      {/* ── Header ── */}
      <header className="app-header">
        <h1 className="app-h1">Know Your Floor Before You Negotiate</h1>
        <p className="app-desc">
          Enter any card&rsquo;s eBay sold price to instantly see the minimum you should accept as a seller — then the fair split price where both sides win vs. eBay.
        </p>
        <p style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 8, fontFamily: "var(--font-prose)" }}>
          Used by collectors at card shows, LGS, Discord servers, and Facebook groups.
        </p>
      </header>

      {/* ── eBay Card Search ── */}
      <div className="ebay-search-section">
        <label htmlFor="cardName" className="ebay-search-label">
          Step 1 — Look up the card&rsquo;s eBay sold price <span style={{ color: "#778", fontWeight: 400 }}>(optional — skip if you already have it)</span>
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
            onClick={() => trackEvent("ebay_search_click", { card_name: cardName || "none" })}
          >
            Search eBay ↗
          </a>
        </div>
        <p className="ebay-search-hint">
          Opens eBay → search your card → filter by <strong style={{ color: "#e8e0d0" }}>Sold</strong> → use a recent sale price (not the listed asking price).{" "}
          <span style={{ opacity: 0.5 }}>Affiliate link — we may earn a commission at no cost to you.</span>
        </p>
      </div>

      {/* ── Market Price — primary input ── */}
      <div className="market-input-wrap">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <label htmlFor="market" className="market-input-label" style={{ margin: 0 }}>Step 2 — Enter the eBay sold price</label>
          {hasMarket && (
            <button
              onClick={handleReset}
              style={{ fontSize: 11, color: "#556", background: "none", border: "none", cursor: "pointer", letterSpacing: "0.06em", padding: 0 }}
            >
              ✕ Reset
            </button>
          )}
        </div>
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
            onChange={e => {
              setState(prev => {
                const next = { ...prev, market: e.target.value, proposed: "" };
                syncUrl(next);
                return next;
              });
            }}
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
        <div className="toggle-pill" onClick={() => setIncludeTax(v => !v)}>
          <input
            type="checkbox"
            checked={includeTax}
            onChange={e => setIncludeTax(e.target.checked)}
            onClick={e => e.stopPropagation()}
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
          <span onClick={e => e.stopPropagation()}>%</span>
        </div>
        <div className="toggle-pill" onClick={() => setIncludeShipping(v => !v)}>
          <input
            type="checkbox"
            checked={includeShipping}
            onChange={e => setIncludeShipping(e.target.checked)}
            onClick={e => e.stopPropagation()}
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
        </div>
      </div>
      <p style={{ fontSize: 10, color: "#778", marginTop: 4, marginBottom: 0, letterSpacing: "0.04em" }}>
        Sales tax is optional — enter the buyer&rsquo;s local rate if known, or leave unchecked.
      </p>

      {/* ── Empty state ── */}
      {!hasMarket && (
        <div className="empty-state">
          <div className="empty-state-icon">⚖️</div>
          <p>Enter the eBay sold price above and we&rsquo;ll instantly show you:</p>
          <ul>
            <li>The fair cash price — right in the middle for both sides</li>
            <li>How much the buyer saves vs. buying on eBay</li>
            <li>How much the seller saves vs. selling on eBay</li>
          </ul>
          <p style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 12 }}>Try it: enter $100 and see what&rsquo;s fair.</p>
        </div>
      )}

      {/* ── Main content — shown when market price is entered ── */}
      {hasMarket && (
        <>
          {/* ── Fair In-Person Range + Deal Analyzer (unified) ── */}
          <div className="fair-zone">
            <div style={{ marginBottom: 14 }}>
              <div className="fair-zone-title">⚖️ Fair Cash Price Range vs. eBay</div>
              <p style={{ fontSize: 11, color: "#7bc47b", margin: 0, lineHeight: 1.5, fontWeight: 500 }}>
                Any price in this range beats eBay for both buyer and seller.
              </p>
            </div>

            {/* ── Hero: Fair Middle Price ── */}
            <div className="fair-hero">
              <div className="fair-hero-label">★ Fair Middle Price</div>
              <div className="fair-hero-price">{fmtUSD(recommendedPrice)}</div>
              <div className="fair-hero-sub">
                {isRounded ? `rounded to nearest dollar · exact ${fmtUSD(r.evenSplit)}` : "both sides save equally vs. eBay"}
              </div>
              <select
                value={rounding}
                onChange={e => setRounding(Number(e.target.value))}
                className="round-select"
                aria-label="Round recommended price"
                style={{ marginTop: 8 }}
              >
                <option value={1}>Round to $1</option>
                <option value={0}>Exact</option>
                <option value={5}>Round to $5</option>
                <option value={10}>Round to $10</option>
                <option value={50}>Round to $50</option>
                <option value={100}>Round to $100</option>
              </select>
            </div>

            {/* ── Price slider ── */}
            <div className="price-slider-section">
              {/* Drag hint — shown until user interacts */}
              {!hasProposed && (
                <p className="slider-drag-hint">
                  ↕ Drag the marker to test a different price
                </p>
              )}
              {/* Floating price label above thumb — always visible */}
              <div className="price-slider-bubble-wrap" aria-hidden="true">
                <div
                  className="price-slider-bubble"
                  style={{
                    left: `${Math.min(88, Math.max(12, barPct))}%`,
                    background: verdictColor,
                  }}
                >
                  {fmtUSD(displayPrice)}
                </div>
              </div>

              {/* Gradient track + markers */}
              <div className="price-slider-track-wrap">
                <div
                  className="price-slider-track"
                  style={{ background: `linear-gradient(to right, var(--orange) 0%, var(--gold) ${marketBarPct}%, var(--blue) 100%)` }}
                >
                  {/* Market price tick */}
                  <div style={{
                    position: "absolute", left: `${marketBarPct}%`,
                    top: -4, bottom: -4, width: 2,
                    background: "rgba(21,128,61,0.5)", borderRadius: 1,
                    transform: "translateX(-50%)",
                  }} />
                  {/* Recommended tick */}
                  <div style={{
                    position: "absolute", left: `${recBarPct}%`,
                    top: -6, bottom: -6, width: 2,
                    background: "rgba(22,163,74,0.7)", borderRadius: 1,
                    transform: "translateX(-50%)",
                  }} />
                </div>
                <input
                  type="range"
                  className={`price-slider-input${!hasProposed ? " price-slider-pulse" : ""}`}
                  min={r.sellerFloor}
                  max={r.buyerCeiling}
                  step={0.01}
                  value={displayPrice}
                  style={{ "--thumb-color": verdictColor } as React.CSSProperties}
                  onChange={e => {
                    const isFirstDrag = !hasProposed;
                    setState(prev => { const next = { ...prev, proposed: parseFloat(e.target.value).toFixed(2) }; syncUrl(next); return next; });
                    setJustClicked(null);
                    if (isFirstDrag) trackEvent("slider_first_drag", { market_price: r.market });
                  }}
                  aria-label="Price slider"
                />
              </div>

              {/* Min / Max endpoint labels */}
              <div className="price-slider-endpoints">
                <div>
                  <div className="price-slider-endpoint-val" style={{ color: "var(--orange)" }}>{fmtUSD(r.sellerFloor)}</div>
                  <div className="price-slider-endpoint-label" style={{ color: "var(--text-dim)" }}>Seller Floor</div>
                  <div style={{ fontSize: 9, color: "var(--text-faint)", marginTop: 2, lineHeight: 1.4, maxWidth: 140 }}>
                    The minimum you should accept — below this, eBay nets you more.
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="price-slider-endpoint-val" style={{ color: "var(--blue)" }}>{fmtUSD(r.buyerCeiling)}</div>
                  <div className="price-slider-endpoint-label" style={{ color: "var(--text-dim)" }}>Buyer Ceiling</div>
                  <div style={{ fontSize: 9, color: "var(--text-faint)", marginTop: 2, lineHeight: 1.4, maxWidth: 140 }}>
                    The most you should pay — above this, buying on eBay is cheaper.
                  </div>
                </div>
              </div>
            </div>

            {/* Verdict card — always visible once market price is entered */}
            <div style={{ marginTop: 10, padding: "12px 14px", background: "var(--fair-deep)", border: `1px solid ${verdictColor}60`, borderRadius: 8, boxShadow: `0 0 0 3px ${verdictColor}12` }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 6 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                  <span className="verdict-price">{fmtUSD(displayPrice)}</span>
                  {proposedPct !== null && (
                    <span className="verdict-pct" style={{ color: verdictColor }}>{proposedPct.toFixed(1)}%</span>
                  )}
                </div>
                <div className="verdict-badge" style={{ background: verdictColor + "1a", borderColor: verdictColor + "55", color: verdictColor, margin: 0 }}>
                  {verdict}
                </div>
              </div>
              {verdictAction && (
                <p style={{ fontSize: 11, color: verdictColor, opacity: 0.85, margin: "0 0 8px", lineHeight: 1.5 }}>
                  {verdictAction}
                </p>
              )}
              <div className="verdict-lines">
                <div className="verdict-line">
                  <span>{buyerSavesAt >= 0 ? "Buyer saves vs eBay" : "Buyer loses vs eBay"}</span>
                  <span className="verdict-line-val" style={{ color: buyerSavesAt >= 0 ? "var(--green)" : "var(--red)" }}>
                    {buyerSavesAt > 0 ? "+" : ""}{fmtUSD(buyerSavesAt)}
                  </span>
                </div>
                <div className="verdict-line">
                  <span>{sellerGainsAt >= 0 ? "Seller gains vs eBay" : "Seller loses vs eBay"}</span>
                  <span className="verdict-line-val" style={{ color: sellerGainsAt >= 0 ? "var(--green)" : "var(--red)" }}>
                    {sellerGainsAt > 0 ? "+" : ""}{fmtUSD(sellerGainsAt)}
                  </span>
                </div>
                <div className="verdict-line">
                  <span>vs Fair Middle ({fmtUSD(recommendedPrice)})</span>
                  <span className="verdict-line-val" style={{ color: displayPrice < recommendedPrice ? "var(--blue)" : "var(--orange)" }}>
                    {displayPrice < recommendedPrice
                      ? `↓${fmtUSD(recommendedPrice - displayPrice)} favors buyer`
                      : displayPrice > recommendedPrice
                      ? `↑${fmtUSD(displayPrice - recommendedPrice)} favors seller`
                      : "exactly even"}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* ── Share button ── */}
          <button
            className={`share-btn${linkCopied ? " copied" : ""}`}
            onClick={handleCopyLink}
          >
            {linkCopied ? "✓ Link Copied!" : "🔗 Share Offer"}
          </button>

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
                <ResultLine label="Card sale price"                                              value={fmtUSD(r.market)} />
                {r.shipping > 0 && (
                  <ResultLine label="+ Shipping collected from buyer"                            value={`+${fmtUSD(r.shipping)}`} indent />
                )}
                <ResultLine label={`eBay fee (${state.feeRate}% on full amount incl. tax${r.shipping > 0 ? " + shipping" : ""} + $${state.feeFixed})`} value={`−${fmtUSD(r.ebayFeeAmt)}`} indent />
                {r.shipping > 0 && (
                  <ResultLine label="− Shipping paid to carrier"                                 value={`−${fmtUSD(r.shipping)}`} indent />
                )}
                <ResultLine label="Net in pocket"                                                value={fmtUSD(r.sellerNet)} bold />
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
                <InputField id="feeFixed" label="eBay Fixed Fee"     value={state.feeFixed} onChange={v => update("feeFixed", v)} prefix="$" hint="Per-transaction ($0.40)" />
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
