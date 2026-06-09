"use client";

import { useState, useRef, useCallback, ReactNode } from "react";

// ── Types ────────────────────────────────────────────────────
type AltTier = "base" | "silver" | "gold" | "black";

interface BreakdownLine {
  label: string;
  value: string;
  isTotal?: boolean;
}

interface PlatformResult {
  id: string;
  name: string;
  subtitleText: string;          // plain text subtitle (for ineligible rows)
  subtitleNode?: ReactNode;      // rich subtitle with dropdowns (for Alt / Heritage)
  payout: number;
  eligible: boolean;
  eligibilityNote?: string;
  requiresApproval?: boolean;
  breakdown: BreakdownLine[];
  footnote?: string;
  ctaLabel: string;
  ctaUrl: string;
  extUrl: string;
}

// ── GA tracking ──────────────────────────────────────────────
function track(name: string, params: Record<string, unknown>) {
  if (
    typeof window !== "undefined" &&
    (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
  ) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", name, params);
  }
}

// ── Formatting ───────────────────────────────────────────────
function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function fmtPct(n: number) {
  return (n * 100).toFixed(1) + "%";
}

// ── Inline select components ─────────────────────────────────
function TierSelect({
  value,
  onChange,
  platformId,
  price,
}: {
  value: AltTier;
  onChange: (t: AltTier) => void;
  platformId: string;
  price: string;
}) {
  return (
    <select
      className="consign-tier-select"
      value={value}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => {
        e.stopPropagation();
        const newTier = e.target.value as AltTier;
        onChange(newTier);
        track("alt_tier_changed", { platform_id: platformId, new_tier: newTier, price });
      }}
      aria-label="Alt Rewards tier (based on quarterly transaction volume)"
      title="Alt Rewards tier is based on your quarterly transaction volume on Alt"
    >
      <option value="base">Base (default)</option>
      <option value="silver">Silver</option>
      <option value="gold">Gold</option>
      <option value="black">Black</option>
    </select>
  );
}

function HeritageCommissionSelect({
  value,
  onChange,
  price,
}: {
  value: number;
  onChange: (n: number) => void;
  price: string;
}) {
  return (
    <select
      className="consign-tier-select"
      value={value}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => {
        e.stopPropagation();
        const newPct = parseFloat(e.target.value);
        onChange(newPct);
        track("heritage_commission_changed", { new_commission_pct: newPct, price });
      }}
      aria-label="Heritage seller commission"
    >
      <option value={0}>0% commission</option>
      <option value={0.05}>5% commission</option>
      <option value={0.10}>10% commission</option>
      <option value={0.15}>15% commission</option>
    </select>
  );
}

// ── Calculation functions ────────────────────────────────────

function buildFanaticsWeekly(buyerPrice: number): PlatformResult {
  const hammer = buyerPrice / 1.20;
  let bonusPct = 0;
  if (hammer <= 49.99) bonusPct = 0;
  else if (hammer <= 99.99) bonusPct = 0.02;
  else if (hammer <= 999.99) bonusPct = 0.04;
  else if (hammer <= 4999.99) bonusPct = 0.06;
  else if (hammer <= 9999.99) bonusPct = 0.08;
  else if (hammer <= 249999.99) bonusPct = 0.10;
  else if (hammer <= 999999.99) bonusPct = 0.125;
  else bonusPct = 0.15;

  const payout = hammer * (1 + bonusPct);
  return {
    id: "fanatics-weekly",
    name: "Fanatics Collect",
    subtitleText: "Weekly Auction · No seller fee · 20% buyer's premium",
    payout,
    eligible: true,
    breakdown: [
      { label: "Buyer pays (all-in)", value: fmt(buyerPrice) },
      { label: "Buyer's premium", value: "20%" },
      { label: "Hammer price", value: fmt(hammer) },
      { label: `Seller bonus (${fmtPct(bonusPct)})`, value: fmt(hammer * bonusPct) },
      { label: "Your payout", value: fmt(payout), isTotal: true },
    ],
    footnote: "No seller fee. Fanatics earns from the 20% buyer's premium only.",
    ctaLabel: "Consign with Fanatics Collect →",
    ctaUrl: "https://www.fanaticscollect.com/how-to-sell",
    extUrl: "https://www.fanaticscollect.com/how-to-sell",
  };
}

function buildFanaticsPremer(buyerPrice: number): PlatformResult {
  if (buyerPrice < 1200) {
    return {
      id: "fanatics-premier",
      name: "Fanatics Collect",
      subtitleText: "Premier Auction · $10,000+ market value required",
      payout: 0,
      eligible: false,
      eligibilityNote: "Requires $10,000+ market value and seller approval",
      requiresApproval: true,
      breakdown: [],
      ctaLabel: "Learn About Premier →",
      ctaUrl: "https://www.fanaticscollect.com/how-to-sell",
      extUrl: "https://www.fanaticscollect.com/how-to-sell",
    };
  }

  const hammer = buyerPrice / 1.20;
  let multiplier = 1.10;
  if (hammer >= 1000000) multiplier = 1.15;
  else if (hammer >= 250000) multiplier = 1.125;

  const payout = hammer * multiplier;
  return {
    id: "fanatics-premier",
    name: "Fanatics Collect",
    subtitleText: "Premier Auction · White-glove · Approval required",
    payout,
    eligible: true,
    requiresApproval: true,
    breakdown: [
      { label: "Buyer pays (all-in)", value: fmt(buyerPrice) },
      { label: "Buyer's premium", value: "20%" },
      { label: "Hammer price", value: fmt(hammer) },
      { label: `Seller multiplier (${fmtPct(multiplier - 1)} bonus)`, value: `×${multiplier}` },
      { label: "Your payout", value: fmt(payout), isTotal: true },
    ],
    footnote: "Requires $10,000+ estimated market value and Fanatics Collect seller approval.",
    ctaLabel: "Consign with Fanatics Premier →",
    ctaUrl: "https://www.fanaticscollect.com/how-to-sell",
    extUrl: "https://www.fanaticscollect.com/how-to-sell",
  };
}

function buildFanaticsBuyNow(buyerPrice: number): PlatformResult {
  const payout = buyerPrice * 0.88;
  return {
    id: "fanatics-buynow",
    name: "Fanatics Collect",
    subtitleText: "Buy Now · 12% seller fee (6% if ≤ Card Ladder value)",
    payout,
    eligible: true,
    breakdown: [
      { label: "Buyer pays", value: fmt(buyerPrice) },
      { label: "Seller fee (12%)", value: fmt(buyerPrice * 0.12) },
      { label: "Your payout", value: fmt(payout), isTotal: true },
    ],
    footnote: "Fee drops to 6% if listing price is at or below the Card Ladder value. Conservative 12% shown.",
    ctaLabel: "List on Fanatics Buy Now →",
    ctaUrl: "https://www.fanaticscollect.com/how-to-sell",
    extUrl: "https://www.fanaticscollect.com/how-to-sell",
  };
}

function buildEbayDirect(buyerPrice: number): PlatformResult {
  const fee = Math.min(buyerPrice, 7500) * 0.1325 + Math.max(0, buyerPrice - 7500) * 0.0235 + 0.40;
  const payout = buyerPrice - fee;
  return {
    id: "ebay-direct",
    name: "eBay",
    subtitleText: "Direct listing · 13.25% FVF on first $7,500 · $0.40 order fee",
    payout,
    eligible: true,
    breakdown: [
      { label: "Sale price", value: fmt(buyerPrice) },
      { label: "FVF on first $7,500 (13.25%)", value: fmt(Math.min(buyerPrice, 7500) * 0.1325) },
      ...(buyerPrice > 7500
        ? [{ label: "FVF above $7,500 (2.35%)", value: fmt((buyerPrice - 7500) * 0.0235) }]
        : []),
      { label: "Per-order fee", value: "$0.40" },
      { label: "Your payout", value: fmt(payout), isTotal: true },
    ],
    footnote: "Excludes sales tax, shipping costs, and promoted listing fees.",
    ctaLabel: "List on eBay →",
    ctaUrl: "https://www.ebay.com/sl/sell",
    extUrl: "https://www.ebay.com/sl/sell",
  };
}

function buildZandG(buyerPrice: number): PlatformResult {
  let keepPct = 0.95;
  let flatDeduction = 0;
  let tierLabel = "5% commission";
  if (buyerPrice <= 99.99) {
    keepPct = 0.88; flatDeduction = 5; tierLabel = "12% + $5 flat";
  } else if (buyerPrice <= 999.99) {
    keepPct = 0.88; tierLabel = "12% commission";
  } else if (buyerPrice <= 2999.99) {
    keepPct = 0.93; tierLabel = "7% commission";
  }

  const payout = buyerPrice * keepPct - flatDeduction;
  return {
    id: "zandg",
    name: "Z and G Emporium",
    subtitleText: `eBay Consignment · ${tierLabel}`,
    payout,
    eligible: true,
    breakdown: [
      { label: "Sale price", value: fmt(buyerPrice) },
      { label: `Z&G fee (${fmtPct(1 - keepPct)})`, value: fmt(buyerPrice * (1 - keepPct)) },
      ...(flatDeduction > 0 ? [{ label: "Flat deduction", value: fmt(flatDeduction) }] : []),
      { label: "Your payout", value: fmt(payout), isTotal: true },
    ],
    footnote: "TCG graded cards only (PSA/BGS/CGC). Z&G handles listing, shipping, and buyer communication.",
    ctaLabel: "Consign with Z and G →",
    ctaUrl: "https://www.zandgemporium.com",
    extUrl: "https://www.zandgemporium.com",
  };
}

function buildProbstein(buyerPrice: number): PlatformResult {
  let feePct = 0.05;
  let tierLabel = "5% commission";
  if (buyerPrice <= 99.99) { feePct = 0.15; tierLabel = "15% commission"; }
  else if (buyerPrice <= 249.99) { feePct = 0.14; tierLabel = "14% commission"; }
  else if (buyerPrice <= 499.99) { feePct = 0.13; tierLabel = "13% commission"; }
  else if (buyerPrice <= 749.99) { feePct = 0.12; tierLabel = "12% commission"; }
  else if (buyerPrice <= 999.99) { feePct = 0.10; tierLabel = "10% commission"; }

  const payout = buyerPrice * (1 - feePct);
  return {
    id: "probstein",
    name: "Probstein123",
    subtitleText: `eBay Consignment · ${tierLabel}`,
    payout,
    eligible: true,
    breakdown: [
      { label: "Sale price", value: fmt(buyerPrice) },
      { label: `Commission (${fmtPct(feePct)})`, value: fmt(buyerPrice * feePct) },
      { label: "Your payout", value: fmt(payout), isTotal: true },
    ],
    footnote: "Probstein handles the full eBay listing and fulfillment. Broad item acceptance.",
    ctaLabel: "Consign with Probstein →",
    ctaUrl: "https://p123auctions.com",
    extUrl: "https://p123auctions.com",
  };
}

function buildPsaVault(buyerPrice: number): PlatformResult {
  let feePct = 0.07;
  let flatFee = 0;
  let tierLabel = "7% fee";
  if (buyerPrice <= 99.99) { feePct = 0.13; flatFee = 3; tierLabel = "13% + $3 flat"; }
  else if (buyerPrice <= 499.99) { feePct = 0.13; tierLabel = "13% fee"; }
  else if (buyerPrice <= 999.99) { feePct = 0.12; tierLabel = "12% fee"; }
  else if (buyerPrice <= 2499.99) { feePct = 0.10; tierLabel = "10% fee"; }
  else if (buyerPrice <= 4999.99) { feePct = 0.09; tierLabel = "9% fee"; }

  const rawFee = buyerPrice * feePct + flatFee;
  const fee = Math.max(rawFee, 5.00);
  const payout = Math.max(buyerPrice - fee, 0);
  const minApplied = fee > rawFee;

  return {
    id: "psa-vault",
    name: "PSA Vault",
    subtitleText: `eBay Consignment · ${tierLabel} · $5 min fee`,
    payout,
    eligible: true,
    breakdown: [
      { label: "Sale price", value: fmt(buyerPrice) },
      { label: `Consignment fee (${fmtPct(feePct)})`, value: fmt(buyerPrice * feePct) },
      ...(flatFee > 0 ? [{ label: "Flat fee", value: fmt(flatFee) }] : []),
      ...(minApplied ? [{ label: "Minimum fee applied", value: "$5.00" }] : []),
      { label: "Your payout", value: fmt(payout), isTotal: true },
    ],
    footnote: "Card must be stored in PSA Vault. Accepts PSA, BGS, SGC, and CGC graded cards.",
    ctaLabel: "Consign via PSA Vault →",
    ctaUrl: "https://www.psacard.com/info/consignment-rates",
    extUrl: "https://www.psacard.com/info/consignment-rates",
  };
}

function buildGoldin(buyerPrice: number): PlatformResult {
  if (buyerPrice < 22) {
    return {
      id: "goldin",
      name: "Goldin Auctions",
      subtitleText: "Auction · No seller fee · 22% buyer's premium",
      payout: 0,
      eligible: false,
      eligibilityNote: "Target value $100+ for weekly; $7,500+ for Elite",
      breakdown: [],
      ctaLabel: "Consign with Goldin →",
      ctaUrl: "https://goldin.co/consign",
      extUrl: "https://goldin.co/consign",
    };
  }

  const payout = buyerPrice / 1.22;
  return {
    id: "goldin",
    name: "Goldin Auctions",
    subtitleText: "Auction · $0 seller fee · 22% buyer's premium",
    payout,
    eligible: true,
    breakdown: [
      { label: "Buyer pays (all-in)", value: fmt(buyerPrice) },
      { label: "Buyer's premium", value: "22%" },
      { label: "Hammer price (your payout)", value: fmt(payout), isTotal: true },
    ],
    footnote: "$0 seller fee. Weekly: target $100+ value; Elite: target $7,500+ estimated value.",
    ctaLabel: "Consign with Goldin →",
    ctaUrl: "https://goldin.co",
    extUrl: "https://goldin.co",
  };
}

function buildHeritage(buyerPrice: number, heritagePct: number): PlatformResult {
  if (buyerPrice < 1250) {
    return {
      id: "heritage",
      name: "Heritage Auctions",
      subtitleText: "Auction · Negotiated commission · 25% buyer's premium",
      payout: 0,
      eligible: false,
      eligibilityNote: "~$1,000+ estimated value; contact Heritage for approval",
      requiresApproval: true,
      breakdown: [],
      ctaLabel: "Contact Heritage →",
      ctaUrl: "https://www.ha.com/consign/",
      extUrl: "https://www.ha.com/consign/",
    };
  }

  const hammer = buyerPrice / 1.25;
  const payout = hammer * (1 - heritagePct);
  return {
    id: "heritage",
    name: "Heritage Auctions",
    subtitleText: `Auction · ${fmtPct(heritagePct)} seller commission · 25% buyer's premium`,
    payout,
    eligible: true,
    requiresApproval: true,
    breakdown: [
      { label: "Buyer pays (all-in)", value: fmt(buyerPrice) },
      { label: "Buyer's premium", value: "25%" },
      { label: "Hammer price", value: fmt(hammer) },
      { label: `Seller commission (${fmtPct(heritagePct)})`, value: fmt(hammer * heritagePct) },
      { label: "Your payout", value: fmt(payout), isTotal: true },
    ],
    footnote:
      "Commission rate is always negotiated — use the dropdown to model your rate. First-time consignors typically see ~10%. Established consignors often negotiate 0%.",
    ctaLabel: "Consign with Heritage →",
    ctaUrl: "https://www.ha.com/consign/",
    extUrl: "https://www.ha.com/consign/",
  };
}

function getAltAuctionBonus(hammer: number, tier: AltTier): number {
  const tiers: Record<AltTier, number[]> = {
    base:   [0.04, 0.06, 0.08, 0.10, 0.12, 0.15],
    silver: [0.06, 0.08, 0.10, 0.11, 0.13, 0.15],
    gold:   [0.08, 0.10, 0.11, 0.13, 0.14, 0.15],
    black:  [0.10, 0.11, 0.12, 0.14, 0.15, 0.15],
  };
  const t = tiers[tier];
  if (hammer <= 999) return t[0];
  if (hammer <= 4999) return t[1];
  if (hammer <= 24999) return t[2];
  if (hammer <= 49999) return t[3];
  if (hammer <= 199999) return t[4];
  return t[5];
}

function getAltFpFee(buyerPrice: number, tier: AltTier): number {
  const tiers: Record<AltTier, number[]> = {
    base:   [0.14, 0.09, 0.07, 0.05],
    silver: [0.12, 0.08, 0.06, 0.05],
    gold:   [0.10, 0.07, 0.05, 0.05],
    black:  [0.09, 0.06, 0.04, 0.04],
  };
  const t = tiers[tier];
  if (buyerPrice <= 249) return t[0];
  if (buyerPrice <= 7499) return t[1];
  if (buyerPrice <= 9999) return t[2];
  return t[3];
}

function buildAltAuction(
  buyerPrice: number,
  tier: AltTier,
  tierSelect: ReactNode,
): PlatformResult {
  const hammer = buyerPrice / 1.20;
  const bonusPct = getAltAuctionBonus(hammer, tier);
  const payout = hammer * (1 + bonusPct);
  const tierLabel = tier.charAt(0).toUpperCase() + tier.slice(1);

  return {
    id: "alt-auction",
    name: "Alt",
    subtitleText: `Auction · ${tierLabel} tier · ${fmtPct(bonusPct)} bonus · 20% BP · No sales tax`,
    subtitleNode: (
      <span>
        Auction ·{" "}
        {tierSelect}
        {" "}tier · {fmtPct(bonusPct)} bonus · 20% BP · No sales tax
      </span>
    ),
    payout,
    eligible: true,
    breakdown: [
      { label: "Buyer pays (all-in)", value: fmt(buyerPrice) },
      { label: "Buyer's premium", value: "20%" },
      { label: "Hammer price", value: fmt(hammer) },
      { label: `Seller bonus (${fmtPct(bonusPct)} — ${tierLabel} tier)`, value: fmt(hammer * bonusPct) },
      { label: "Your payout", value: fmt(payout), isTotal: true },
    ],
    footnote:
      "Card must be in Alt Vault. Bonus estimated using hammer price as proxy for submission value at intake.",
    ctaLabel: "Consign on Alt →",
    ctaUrl: "https://support.alt.xyz/en/articles/9682168-alt-fees",
    extUrl: "https://support.alt.xyz/en/articles/9682168-alt-fees",
  };
}

function buildAltFixedPrice(
  buyerPrice: number,
  tier: AltTier,
  tierSelect: ReactNode,
): PlatformResult {
  const feePct = getAltFpFee(buyerPrice, tier);
  const payout = buyerPrice * (1 - feePct);
  const tierLabel = tier.charAt(0).toUpperCase() + tier.slice(1);

  return {
    id: "alt-fp",
    name: "Alt",
    subtitleText: `Fixed Price · ${tierLabel} tier · ${fmtPct(feePct)} seller fee · No sales tax`,
    subtitleNode: (
      <span>
        Fixed Price ·{" "}
        {tierSelect}
        {" "}tier · {fmtPct(feePct)} seller fee · No sales tax
      </span>
    ),
    payout,
    eligible: true,
    breakdown: [
      { label: "Sale price", value: fmt(buyerPrice) },
      { label: `Seller fee (${fmtPct(feePct)} — ${tierLabel} tier)`, value: fmt(buyerPrice * feePct) },
      { label: "Your payout", value: fmt(payout), isTotal: true },
    ],
    footnote:
      "Card must be in Alt Vault. Delaware-based vault means no sales tax on transactions.",
    ctaLabel: "List on Alt Fixed Price →",
    ctaUrl: "https://www.alt.com/sell",
    extUrl: "https://www.alt.com/sell",
  };
}

// ── Row component ────────────────────────────────────────────
function ConsignRow({
  result,
  rank,
  isOpen,
  onToggle,
}: {
  result: PlatformResult;
  rank: number | null;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const handleExtLink = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    track("consignment_link_click", { platform_id: result.id, url });
  };

  const rankColor =
    rank === 1 ? "var(--gold)" :
    rank === 2 ? "#c0c0c0" :
    rank === 3 ? "#cd7f32" :
    "var(--text-faint)";

  return (
    <div
      className={[
        "consign-row",
        !result.eligible ? "consign-row-ineligible" : "",
        isOpen ? "consign-row-open" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className="consign-row-header"
        onClick={result.eligible ? onToggle : undefined}
        role={result.eligible ? "button" : undefined}
        tabIndex={result.eligible ? 0 : undefined}
        onKeyDown={
          result.eligible
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onToggle();
                }
              }
            : undefined
        }
        aria-expanded={result.eligible ? isOpen : undefined}
      >
        {/* Rank badge */}
        <div className="consign-rank-num" aria-label={rank ? `Rank ${rank}` : "Ineligible"}>
          {rank ? (
            <span style={{ color: rankColor, fontFamily: "'Bebas Neue', sans-serif", fontSize: 20 }}>
              {rank}
            </span>
          ) : (
            <span className="consign-rank-dash">—</span>
          )}
        </div>

        {/* Name + subtitle */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="consign-row-name">
            {result.name}
            {result.requiresApproval && (
              <span className="consign-approval-badge">APPROVAL REQ.</span>
            )}
          </div>
          <div className="consign-row-subtitle">
            {result.subtitleNode ?? result.subtitleText}
          </div>
          {!result.eligible && result.eligibilityNote && (
            <div style={{ fontSize: 11, color: "var(--red)", marginTop: 2, lineHeight: 1.4 }}>
              {result.eligibilityNote}
            </div>
          )}
        </div>

        {/* Payout + action icons */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          {result.eligible ? (
            <>
              <div className="consign-payout">{fmt(result.payout)}</div>
              <a
                href={result.extUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="consign-ext-link"
                onClick={(e) => handleExtLink(e, result.extUrl)}
                aria-label={`Visit ${result.name}`}
              >
                ↗
              </a>
              <span className={`consign-chevron${isOpen ? " open" : ""}`} aria-hidden="true">
                ▾
              </span>
            </>
          ) : (
            <span style={{ fontSize: 11, color: "var(--text-faint)", whiteSpace: "nowrap" }}>
              Ineligible
            </span>
          )}
        </div>
      </div>

      {/* Expanded breakdown */}
      {result.eligible && isOpen && (
        <div className="consign-breakdown">
          {result.breakdown.map((line, i) => (
            <div
              key={i}
              className={`consign-breakdown-line${line.isTotal ? " total" : ""}`}
            >
              <span>{line.label}</span>
              <span>{line.value}</span>
            </div>
          ))}
          {result.footnote && (
            <p className="consign-breakdown-note">{result.footnote}</p>
          )}
          <a
            href={result.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="consign-cta-link"
            onClick={(e) => {
              e.stopPropagation();
              track("consignment_link_click", { platform_id: result.id, url: result.ctaUrl });
            }}
          >
            {result.ctaLabel}
          </a>
        </div>
      )}
    </div>
  );
}

// ── Main exported component ──────────────────────────────────
export function ConsignmentCalc() {
  const [priceStr, setPriceStr] = useState("1500");
  const [openId, setOpenId] = useState<string | null>(null);
  const [altAuctTier, setAltAuctTier] = useState<AltTier>("base");
  const [altFpTier, setAltFpTier] = useState<AltTier>("base");
  const [heritagePct, setHeritagePct] = useState(0.10);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePriceChange = useCallback((val: string) => {
    setPriceStr(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      track("consignment_calc_price_change", { price: val });
    }, 500);
  }, []);

  const buyerPrice = parseFloat(priceStr) || 0;

  // Build all 11 results
  const allResults: PlatformResult[] = [
    buildFanaticsWeekly(buyerPrice),
    buildFanaticsPremer(buyerPrice),
    buildFanaticsBuyNow(buyerPrice),
    buildEbayDirect(buyerPrice),
    buildZandG(buyerPrice),
    buildProbstein(buyerPrice),
    buildPsaVault(buyerPrice),
    buildGoldin(buyerPrice),
    buildHeritage(buyerPrice, heritagePct),
    buildAltAuction(
      buyerPrice,
      altAuctTier,
      <TierSelect
        value={altAuctTier}
        onChange={setAltAuctTier}
        platformId="alt-auction"
        price={priceStr}
      />,
    ),
    buildAltFixedPrice(
      buyerPrice,
      altFpTier,
      <TierSelect
        value={altFpTier}
        onChange={setAltFpTier}
        platformId="alt-fp"
        price={priceStr}
      />,
    ),
  ];

  // For Heritage, inject the commission dropdown into the subtitle when eligible
  const heritageIdx = allResults.findIndex((r) => r.id === "heritage");
  if (heritageIdx !== -1 && allResults[heritageIdx].eligible) {
    allResults[heritageIdx] = {
      ...allResults[heritageIdx],
      subtitleNode: (
        <span>
          Auction ·{" "}
          <HeritageCommissionSelect
            value={heritagePct}
            onChange={setHeritagePct}
            price={priceStr}
          />
          {" "}· 25% buyer&apos;s premium
        </span>
      ),
    };
  }

  const eligible = allResults.filter((r) => r.eligible);
  const ineligible = allResults.filter((r) => !r.eligible);

  // Sort eligible by payout descending
  const sorted = [...eligible].sort((a, b) => b.payout - a.payout);

  const handleToggle = (id: string, payout: number) => {
    if (openId === id) {
      setOpenId(null);
    } else {
      setOpenId(id);
      track("consignment_row_expanded", { platform_id: id, payout });
    }
  };

  return (
    <div className="consign-wrap">
      {/* Price input */}
      <div className="market-input-wrap" style={{ position: "relative" }}>
        <label htmlFor="consign-price-input" className="market-input-label">
          Buyer pays
        </label>
        <span className="market-input-prefix">$</span>
        <input
          id="consign-price-input"
          type="number"
          className="market-input"
          value={priceStr}
          onChange={(e) => handlePriceChange(e.target.value)}
          onWheel={(e) => e.currentTarget.blur()}
          placeholder="0"
          min={0}
          step={1}
        />
      </div>
      <p className="market-input-hint" style={{ marginTop: -12, marginBottom: 20 }}>
        For auctions, enter the buyer&apos;s all-in checkout total (hammer + buyer&apos;s premium). For eBay or fixed-price platforms, enter the sale price.
      </p>

      {/* Ranked eligible rows */}
      {buyerPrice > 0 ? (
        <div className="consign-rows">
          {sorted.map((result, idx) => (
            <ConsignRow
              key={result.id}
              result={result}
              rank={idx + 1}
              isOpen={openId === result.id}
              onToggle={() => handleToggle(result.id, result.payout)}
            />
          ))}

          {/* Ineligible rows — unranked, dimmed */}
          {ineligible.map((result) => (
            <ConsignRow
              key={result.id}
              result={result}
              rank={null}
              isOpen={false}
              onToggle={() => {}}
            />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "40px 20px", border: "1px dashed var(--border)", borderRadius: 10, color: "var(--text-faint)", fontSize: 13, lineHeight: 1.6 }}>
          Enter a price above to see platform rankings
        </div>
      )}

      <p className="consign-disclaimer">
        eBay row excludes sales tax and shipping. Alt bonus is estimated using hammer price as a proxy for submission value at intake — actual bonus may differ. Heritage commission defaults to 10%; use the dropdown on the Heritage row to model your negotiated rate. Fee structures change — always verify with each platform before consigning.
      </p>
    </div>
  );
}
