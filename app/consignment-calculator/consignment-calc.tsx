"use client";

import { useState, useRef, useCallback, ReactNode } from "react";

// ── Types ────────────────────────────────────────────────────
type AltTier = "base" | "silver" | "gold" | "black";
type SortBy  = "payout" | "az";

interface BreakdownLine {
  label: string;
  value: string;
  isTotal?: boolean;
}

interface FeeChartRow {
  cells: string[];
  active?: boolean;  // highlights the current price tier
}

interface FeeChart {
  caption: string;
  headers: string[];
  activeCol?: number;  // which column index represents the selected tier/option
  rows: FeeChartRow[];
  note?: string;
}

interface PlatformResult {
  id: string;
  name: string;
  subtitleText: string;
  subtitleNode?: ReactNode;
  payout: number;
  eligible: boolean;
  eligibilityNote?: string;
  requiresApproval?: boolean;
  approvalTooltip?: string;
  breakdown: BreakdownLine[];
  feeChart?: FeeChart;
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
  value, onChange, platformId, price,
}: {
  value: AltTier; onChange: (t: AltTier) => void; platformId: string; price: string;
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
  value, onChange, price,
}: {
  value: number; onChange: (n: number) => void; price: string;
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
  if      (hammer <= 49.99)     bonusPct = 0;
  else if (hammer <= 99.99)     bonusPct = 0.02;
  else if (hammer <= 999.99)    bonusPct = 0.04;
  else if (hammer <= 4999.99)   bonusPct = 0.06;
  else if (hammer <= 9999.99)   bonusPct = 0.08;
  else if (hammer <= 249999.99) bonusPct = 0.10;
  else if (hammer <= 999999.99) bonusPct = 0.125;
  else                          bonusPct = 0.15;

  const payout = hammer * (1 + bonusPct);
  return {
    id: "fanatics-weekly",
    name: "Fanatics Collect — Weekly Auction",
    subtitleText: `No seller fee · ${fmtPct(bonusPct)} seller bonus · 20% buyer's premium`,
    payout,
    eligible: true,
    breakdown: [
      { label: "Buyer pays (all-in)", value: fmt(buyerPrice) },
      { label: "÷ 1.20 (20% buyer's premium) = Hammer", value: fmt(hammer) },
      { label: `+ Seller bonus (${fmtPct(bonusPct)} of hammer)`, value: "+" + fmt(hammer * bonusPct) },
      { label: "Your payout", value: fmt(payout), isTotal: true },
    ],
    feeChart: {
      caption: "Seller bonus schedule — based on hammer price",
      headers: ["Hammer Price", "Bonus", "You Receive"],
      rows: [
        { cells: ["< $50",               "0%",    "100% of hammer"], active: hammer < 50 },
        { cells: ["$50 – $100",          "2%",    "102% of hammer"], active: hammer >= 50 && hammer <= 99.99 },
        { cells: ["$100 – $1,000",       "4%",    "104% of hammer"], active: hammer >= 100 && hammer <= 999.99 },
        { cells: ["$1,000 – $5,000",     "6%",    "106% of hammer"], active: hammer >= 1000 && hammer <= 4999.99 },
        { cells: ["$5,000 – $10,000",    "8%",    "108% of hammer"], active: hammer >= 5000 && hammer <= 9999.99 },
        { cells: ["$10,000 – $250,000",  "10%",   "110% of hammer"], active: hammer >= 10000 && hammer <= 249999.99 },
        { cells: ["$250,000 – $1M",      "12.5%", "112.5% of hammer"], active: hammer >= 250000 && hammer <= 999999.99 },
        { cells: ["$1M+",               "15%",   "115% of hammer"], active: hammer >= 1000000 },
      ],
      note: "$3 minimum commission per sale. No seller fee — Fanatics earns from the buyer's premium.",
    },
    footnote: "No seller fee. Fanatics earns from the 20% buyer's premium only.",
    ctaLabel: "Consign with Fanatics Collect →",
    ctaUrl: "https://www.fanaticscollect.com/how-to-sell",
    extUrl: "https://www.fanaticscollect.com/how-to-sell",
  };
}

function buildFanaticsPremer(buyerPrice: number): PlatformResult {
  const hammer = buyerPrice / 1.20;
  if (buyerPrice < 1200) {
    return {
      id: "fanatics-premier",
      name: "Fanatics Collect — Premier Auction",
      subtitleText: "$10,000+ market value required · Approval required",
      payout: 0,
      eligible: false,
      eligibilityNote: "Requires $10,000+ market value and seller approval",
      requiresApproval: true,
      approvalTooltip: "Premier Auction requires $10,000+ estimated market value and direct approval from Fanatics Collect before consigning.",
      breakdown: [],
      feeChart: {
        caption: "Seller bonus schedule — based on hammer price",
        headers: ["Hammer Price", "Multiplier", "You Receive"],
        rows: [
          { cells: ["< $250,000",       "×1.10",  "110% of hammer"] },
          { cells: ["$250,000 – $1M",  "×1.125", "112.5% of hammer"] },
          { cells: ["$1M+",            "×1.15",  "115% of hammer"] },
        ],
        note: "$1,000 minimum FC commission per sale. Requires $10k+ market value and seller approval.",
      },
      ctaLabel: "Learn About Premier →",
      ctaUrl: "https://www.fanaticscollect.com/how-to-sell",
      extUrl: "https://www.fanaticscollect.com/how-to-sell",
    };
  }

  let multiplier = 1.10;
  if (hammer >= 1000000) multiplier = 1.15;
  else if (hammer >= 250000) multiplier = 1.125;

  const payout = hammer * multiplier;
  return {
    id: "fanatics-premier",
    name: "Fanatics Collect — Premier Auction",
    subtitleText: `No seller fee · ${fmtPct(multiplier - 1)} seller bonus · Approval required`,
    payout,
    eligible: true,
    requiresApproval: true,
    approvalTooltip: "Premier Auction requires $10,000+ estimated market value and direct approval from Fanatics Collect before consigning.",
    breakdown: [
      { label: "Buyer pays (all-in)", value: fmt(buyerPrice) },
      { label: "÷ 1.20 (20% buyer's premium) = Hammer", value: fmt(hammer) },
      { label: `+ Seller bonus (${fmtPct(multiplier - 1)} of hammer)`, value: "+" + fmt(hammer * (multiplier - 1)) },
      { label: "Your payout", value: fmt(payout), isTotal: true },
    ],
    feeChart: {
      caption: "Seller bonus schedule — based on hammer price",
      headers: ["Hammer Price", "Multiplier", "You Receive"],
      rows: [
        { cells: ["< $250,000",      "×1.10",  "110% of hammer"], active: hammer < 250000 },
        { cells: ["$250,000 – $1M", "×1.125", "112.5% of hammer"], active: hammer >= 250000 && hammer < 1000000 },
        { cells: ["$1M+",           "×1.15",  "115% of hammer"], active: hammer >= 1000000 },
      ],
      note: "$1,000 minimum FC commission per sale. Requires $10k+ market value and seller approval.",
    },
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
    name: "Fanatics Collect — Buy Now",
    subtitleText: "12% seller fee (6% if ≤ Card Ladder value) · No buyer's premium",
    payout,
    eligible: true,
    breakdown: [
      { label: "Buyer pays (your list price)", value: fmt(buyerPrice) },
      { label: "− Seller fee (12% conservative)", value: "−" + fmt(buyerPrice * 0.12) },
      { label: "Your payout", value: fmt(payout), isTotal: true },
    ],
    feeChart: {
      caption: "Seller fee by listing price vs. Card Ladder value",
      headers: ["Condition", "Seller Fee", "You Keep"],
      rows: [
        { cells: ["Listed ≤ 120% of Card Ladder value", "6%",  "94%"], active: false },
        { cells: ["Listed > 120% of Card Ladder value", "12%", "88%"], active: true },
      ],
      note: "Calculator defaults to 12% (conservative). If your listing is at or below Card Ladder market value, you qualify for 6%.",
    },
    footnote: "Fee drops to 6% if listing price is at or below the Card Ladder value. Conservative 12% shown.",
    ctaLabel: "List on Fanatics Buy Now →",
    ctaUrl: "https://www.fanaticscollect.com/how-to-sell",
    extUrl: "https://www.fanaticscollect.com/how-to-sell",
  };
}

function buildEbayDirect(buyerPrice: number): PlatformResult {
  const tier1Fee = Math.min(buyerPrice, 7500) * 0.1325;
  const tier2Fee = Math.max(0, buyerPrice - 7500) * 0.0235;
  const fee = tier1Fee + tier2Fee + 0.40;
  const payout = buyerPrice - fee;
  return {
    id: "ebay-direct",
    name: "eBay",
    subtitleText: "Direct listing · 13.25% FVF on first $7,500 · $0.40 order fee",
    payout,
    eligible: true,
    breakdown: [
      { label: "Sale price", value: fmt(buyerPrice) },
      { label: "FVF on first $7,500 (13.25%)", value: "−" + fmt(tier1Fee) },
      ...(buyerPrice > 7500
        ? [{ label: "FVF above $7,500 (2.35%)", value: "−" + fmt(tier2Fee) }]
        : []),
      { label: "Per-order fee", value: "−$0.40" },
      { label: "Your payout", value: fmt(payout), isTotal: true },
    ],
    feeChart: {
      caption: "eBay final value fee structure — Trading Cards category",
      headers: ["Sale Price Portion", "Fee Rate", "Notes"],
      rows: [
        { cells: ["First $7,500",    "13.25%", "+ $0.40 per order"], active: buyerPrice <= 7500 },
        { cells: ["Above $7,500",    "2.35%",  "on the excess only"], active: buyerPrice > 7500 },
      ],
      note: "Fee applies to the total transaction. Excludes sales tax, shipping, promoted listing fees, and store subscription discounts.",
    },
    footnote: "Excludes sales tax, shipping costs, and promoted listing fees.",
    ctaLabel: "List on eBay →",
    ctaUrl: "https://www.ebay.com/sl/sell",
    extUrl: "https://www.ebay.com/sl/sell",
  };
}

function buildZandG(buyerPrice: number): PlatformResult {
  let keepPct = 0.95, flatDeduction = 0, tierLabel = "5% commission";
  if      (buyerPrice <= 99.99)   { keepPct = 0.88; flatDeduction = 5; tierLabel = "12% + $5 flat"; }
  else if (buyerPrice <= 999.99)  { keepPct = 0.88; tierLabel = "12% commission"; }
  else if (buyerPrice <= 2999.99) { keepPct = 0.93; tierLabel = "7% commission"; }

  const payout = buyerPrice * keepPct - flatDeduction;
  return {
    id: "zandg",
    name: "Z and G Emporium",
    subtitleText: `eBay Consignment · ${tierLabel}`,
    payout,
    eligible: true,
    breakdown: [
      { label: "eBay sale price", value: fmt(buyerPrice) },
      { label: `− Z&G fee (${fmtPct(1 - keepPct)})`, value: "−" + fmt(buyerPrice * (1 - keepPct)) },
      ...(flatDeduction > 0 ? [{ label: "− Flat deduction", value: "−" + fmt(flatDeduction) }] : []),
      { label: "Your payout", value: fmt(payout), isTotal: true },
    ],
    feeChart: {
      caption: "Commission schedule by eBay sale price",
      headers: ["Sale Price", "You Keep", "Commission"],
      rows: [
        { cells: ["< $100",             "88% − $5 flat", "12% + $5"], active: buyerPrice < 100 },
        { cells: ["$100 – $999.99",     "88%",           "12%"],      active: buyerPrice >= 100 && buyerPrice <= 999.99 },
        { cells: ["$1,000 – $2,999.99", "93%",           "7%"],       active: buyerPrice >= 1000 && buyerPrice <= 2999.99 },
        { cells: ["$3,000+",            "95%",           "5%"],       active: buyerPrice >= 3000 },
      ],
      note: "Z&G handles all eBay fees, listing, photography, and shipping. Payout ~8–10 days after buyer pays. TCG graded cards only (PSA/BGS/CGC). $250 min for fixed-price listings.",
    },
    footnote: "TCG graded cards only (PSA/BGS/CGC). Z&G handles listing, shipping, and buyer communication.",
    ctaLabel: "Consign with Z and G →",
    ctaUrl: "https://www.zandgemporium.com",
    extUrl: "https://www.zandgemporium.com",
  };
}

function buildProbstein(buyerPrice: number): PlatformResult {
  let feePct = 0.05, tierLabel = "5% commission";
  if      (buyerPrice <= 99.99)  { feePct = 0.15; tierLabel = "15% commission"; }
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
      { label: "eBay sale price", value: fmt(buyerPrice) },
      { label: `− Commission (${fmtPct(feePct)})`, value: "−" + fmt(buyerPrice * feePct) },
      { label: "Your payout", value: fmt(payout), isTotal: true },
    ],
    feeChart: {
      caption: "Commission schedule by eBay sale price",
      headers: ["Sale Price", "Commission", "You Keep"],
      rows: [
        { cells: ["< $100",        "15%", "85%"], active: buyerPrice < 100 },
        { cells: ["$100 – $249",   "14%", "86%"], active: buyerPrice >= 100 && buyerPrice <= 249.99 },
        { cells: ["$250 – $499",   "13%", "87%"], active: buyerPrice >= 250 && buyerPrice <= 499.99 },
        { cells: ["$500 – $749",   "12%", "88%"], active: buyerPrice >= 500 && buyerPrice <= 749.99 },
        { cells: ["$750 – $999",   "10%", "90%"], active: buyerPrice >= 750 && buyerPrice <= 999.99 },
        { cells: ["$1,000+",       "5%",  "95%"], active: buyerPrice >= 1000 },
      ],
      note: "Probstein handles all eBay listing, fees, photography, and shipping. Cash advances up to 50% of item value available. Broadest item acceptance including sports, TCG, memorabilia, coins, and comics.",
    },
    footnote: "Probstein handles the full eBay listing and fulfillment. Broad item acceptance.",
    ctaLabel: "Consign with Probstein →",
    ctaUrl: "https://p123auctions.com",
    extUrl: "https://p123auctions.com",
  };
}

function buildPsaVault(buyerPrice: number): PlatformResult {
  let feePct = 0.07, flatFee = 0, tierLabel = "7% fee";
  if      (buyerPrice <= 99.99)   { feePct = 0.13; flatFee = 3; tierLabel = "13% + $3 flat"; }
  else if (buyerPrice <= 499.99)  { feePct = 0.13; tierLabel = "13% fee"; }
  else if (buyerPrice <= 999.99)  { feePct = 0.12; tierLabel = "12% fee"; }
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
      { label: "eBay sale price", value: fmt(buyerPrice) },
      { label: `− PSA Vault fee (${fmtPct(feePct)})`, value: "−" + fmt(buyerPrice * feePct) },
      ...(flatFee > 0   ? [{ label: "− Flat fee", value: "−" + fmt(flatFee) }] : []),
      ...(minApplied    ? [{ label: "  ($5 minimum applied)", value: "" }] : []),
      { label: "Your payout", value: fmt(payout), isTotal: true },
    ],
    feeChart: {
      caption: "Consignment fee schedule by sale price",
      headers: ["Sale Price", "Fee", "You Keep"],
      rows: [
        { cells: ["< $100",             "13% + $3 flat", "~87%"], active: buyerPrice < 100 },
        { cells: ["$100 – $499",        "13%",           "87%"],  active: buyerPrice >= 100 && buyerPrice <= 499.99 },
        { cells: ["$500 – $999",        "12%",           "88%"],  active: buyerPrice >= 500 && buyerPrice <= 999.99 },
        { cells: ["$1,000 – $2,499",    "10%",           "90%"],  active: buyerPrice >= 1000 && buyerPrice <= 2499.99 },
        { cells: ["$2,500 – $4,999",    "9%",            "91%"],  active: buyerPrice >= 2500 && buyerPrice <= 4999.99 },
        { cells: ["$5,000+",            "7%",            "93%"],  active: buyerPrice >= 5000 },
      ],
      note: "$5 minimum fee per transaction. Card must be stored in PSA Vault prior to listing. Accepts PSA, BGS, SGC, and CGC graded cards.",
    },
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
      feeChart: {
        caption: "Goldin fee structure",
        headers: ["Item", "Rate"],
        rows: [
          { cells: ["Seller commission", "$0 — no seller fee"] },
          { cells: ["Buyer's premium",   "22% of hammer"] },
          { cells: ["You receive",       "100% of hammer"] },
        ],
        note: "Weekly auctions: $10 opening bid, target $100+ value, close every Thursday 10pm ET. Elite auctions: $500 opening bid, $7,500+ estimated value.",
      },
      ctaLabel: "Consign with Goldin →",
      ctaUrl: "https://goldin.co",
      extUrl: "https://goldin.co",
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
      { label: "÷ 1.22 (22% buyer's premium) = Hammer", value: fmt(payout) },
      { label: "Seller fee", value: "$0.00" },
      { label: "Your payout", value: fmt(payout), isTotal: true },
    ],
    feeChart: {
      caption: "Goldin fee structure",
      headers: ["Item", "Rate"],
      rows: [
        { cells: ["Seller commission", "$0 — no seller fee"],  active: true },
        { cells: ["Buyer's premium",   "22% of hammer"] },
        { cells: ["You receive",       "100% of hammer"] },
      ],
      note: "Weekly: $10 opening bid, target $100+ value, close every Thursday 10pm ET. Elite: $500 opening bid, $7,500+ estimated value. Payout ~15 business days after close.",
    },
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
      approvalTooltip: "Heritage does not publish seller commission rates — they are always negotiated directly. Contact Heritage to arrange consignment and discuss your rate.",
      breakdown: [],
      feeChart: {
        caption: "Typical commission ranges (always negotiated)",
        headers: ["Consignor Type", "Typical Rate"],
        rows: [
          { cells: ["Established consignor / high-value lot", "0%"] },
          { cells: ["Negotiated mid-tier",                    "5%"] },
          { cells: ["First-time / smaller consignment",       "10%"] },
          { cells: ["Higher scenario",                        "15%"] },
        ],
        note: "25% buyer's premium on all lots. Commission is never published — always negotiated with Heritage directly. Contact Heritage for arrangements.",
      },
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
    approvalTooltip: "Heritage does not publish seller commission rates — they are always negotiated directly. Contact Heritage to arrange consignment and discuss your rate.",
    breakdown: [
      { label: "Buyer pays (all-in)", value: fmt(buyerPrice) },
      { label: "÷ 1.25 (25% buyer's premium) = Hammer", value: fmt(hammer) },
      { label: `− Seller commission (${fmtPct(heritagePct)} of hammer)`, value: "−" + fmt(hammer * heritagePct) },
      { label: "Your payout", value: fmt(payout), isTotal: true },
    ],
    feeChart: {
      caption: "Typical commission ranges (always negotiated) · 25% buyer's premium",
      headers: ["Consignor Type", "Typical Rate", "Active?"],
      rows: [
        { cells: ["Established consignor / high-value lot", "0%",  heritagePct === 0    ? "← selected" : ""], active: heritagePct === 0 },
        { cells: ["Negotiated mid-tier",                    "5%",  heritagePct === 0.05 ? "← selected" : ""], active: heritagePct === 0.05 },
        { cells: ["First-time / smaller consignment",       "10%", heritagePct === 0.10 ? "← selected" : ""], active: heritagePct === 0.10 },
        { cells: ["Higher scenario",                        "15%", heritagePct === 0.15 ? "← selected" : ""], active: heritagePct === 0.15 },
      ],
      note: "Commission is never published — always negotiated directly with Heritage. Use the dropdown above to model your expected rate.",
    },
    footnote: "Commission rate is always negotiated — use the dropdown to model your rate. First-time consignors typically see ~10%. Established consignors often negotiate 0%.",
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
  if (hammer <= 999)    return t[0];
  if (hammer <= 4999)   return t[1];
  if (hammer <= 24999)  return t[2];
  if (hammer <= 49999)  return t[3];
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
  if (buyerPrice <= 249)  return t[0];
  if (buyerPrice <= 7499) return t[1];
  if (buyerPrice <= 9999) return t[2];
  return t[3];
}

const ALT_TIER_COL: Record<AltTier, number> = { base: 1, silver: 2, gold: 3, black: 4 };

function buildAltAuction(buyerPrice: number, tier: AltTier, tierSelect: ReactNode): PlatformResult {
  const hammer = buyerPrice / 1.20;
  const bonusPct = getAltAuctionBonus(hammer, tier);
  const payout = hammer * (1 + bonusPct);
  const tierLabel = tier.charAt(0).toUpperCase() + tier.slice(1);

  return {
    id: "alt-auction",
    name: "Alt — Auction",
    subtitleText: `Auction · ${tierLabel} tier · ${fmtPct(bonusPct)} bonus · 20% BP · No sales tax`,
    subtitleNode: (
      <span>
        Auction ·{" "}{tierSelect}{" "}tier · {fmtPct(bonusPct)} bonus · 20% BP · No sales tax
      </span>
    ),
    payout,
    eligible: true,
    breakdown: [
      { label: "Buyer pays (all-in)", value: fmt(buyerPrice) },
      { label: "÷ 1.20 (20% buyer's premium) = Hammer", value: fmt(hammer) },
      { label: `+ Seller bonus (${fmtPct(bonusPct)} of hammer — ${tierLabel} tier)`, value: "+" + fmt(hammer * bonusPct) },
      { label: "Your payout", value: fmt(payout), isTotal: true },
    ],
    feeChart: {
      caption: "Seller bonus — % of hammer received (based on submission value at intake)",
      headers: ["Submission Value", "Base", "Silver", "Gold", "Black"],
      activeCol: ALT_TIER_COL[tier],
      rows: [
        { cells: ["< $1,000",           "104%", "106%", "108%", "110%"], active: hammer < 1000 },
        { cells: ["$1,000 – $5,000",    "106%", "108%", "110%", "111%"], active: hammer >= 1000 && hammer <= 4999 },
        { cells: ["$5,000 – $25,000",   "108%", "110%", "111%", "112%"], active: hammer >= 5000 && hammer <= 24999 },
        { cells: ["$25,000 – $50,000",  "110%", "111%", "113%", "114%"], active: hammer >= 25000 && hammer <= 49999 },
        { cells: ["$50,000 – $200,000", "112%", "113%", "114%", "115%"], active: hammer >= 50000 && hammer <= 199999 },
        { cells: ["$200,000+",          "115%", "115%", "115%", "115%"], active: hammer >= 200000 },
      ],
      note: "Bonus is applied to the hammer price, not the buyer's all-in total. Submission value = estimated market value of the lot at intake, which may differ from final hammer price. Card must be in Alt Vault. Delaware vault — no sales tax.",
    },
    footnote: "Bonus is a percentage of the hammer price, not the buyer's total. Estimated using hammer as proxy for submission value at intake — actual bonus may differ. Card must be in Alt Vault.",
    ctaLabel: "Consign on Alt →",
    ctaUrl: "https://alt.xyz/",
    extUrl: "https://alt.xyz/",
  };
}

function buildAltFixedPrice(buyerPrice: number, tier: AltTier, tierSelect: ReactNode): PlatformResult {
  const feePct = getAltFpFee(buyerPrice, tier);
  const payout = buyerPrice * (1 - feePct);
  const tierLabel = tier.charAt(0).toUpperCase() + tier.slice(1);

  return {
    id: "alt-fp",
    name: "Alt — Fixed Price",
    subtitleText: `Fixed Price · ${tierLabel} tier · ${fmtPct(feePct)} seller fee · No sales tax`,
    subtitleNode: (
      <span>
        Fixed Price ·{" "}{tierSelect}{" "}tier · {fmtPct(feePct)} seller fee · No sales tax
      </span>
    ),
    payout,
    eligible: true,
    breakdown: [
      { label: "Buyer pays (your list price)", value: fmt(buyerPrice) },
      { label: `− Alt fee (${fmtPct(feePct)} — ${tierLabel} tier)`, value: "−" + fmt(buyerPrice * feePct) },
      { label: "Your payout", value: fmt(payout), isTotal: true },
    ],
    feeChart: {
      caption: "Seller fee by sale price and Alt Rewards tier",
      headers: ["Sale Price", "Base", "Silver", "Gold", "Black"],
      activeCol: ALT_TIER_COL[tier],
      rows: [
        { cells: ["< $250",          "14%", "12%", "10%", "9%"], active: buyerPrice < 250 },
        { cells: ["$250 – $7,499",   "9%",  "8%",  "7%",  "6%"], active: buyerPrice >= 250 && buyerPrice <= 7499 },
        { cells: ["$7,500 – $9,999", "7%",  "6%",  "5%",  "4%"], active: buyerPrice >= 7500 && buyerPrice <= 9999 },
        { cells: ["$10,000+",        "5%",  "5%",  "5%",  "4%"], active: buyerPrice >= 10000 },
      ],
      note: "Alt Rewards tier is based on your quarterly transaction volume on Alt. Card must be in Alt Vault. Delaware vault — no sales tax on any transactions.",
    },
    footnote: "Card must be in Alt Vault. Delaware-based vault means no sales tax on transactions.",
    ctaLabel: "List on Alt Fixed Price →",
    ctaUrl: "https://alt.xyz/",
    extUrl: "https://alt.xyz/",
  };
}

// ── Fee chart renderer ────────────────────────────────────────
function FeeChartTable({ chart }: { chart: FeeChart }) {
  return (
    <div style={{ marginTop: 14 }}>
      <div className="consign-fee-chart-caption">{chart.caption}</div>
      <div className="consign-fee-chart">
        <table className="consign-fee-table">
          <thead>
            <tr>
              {chart.headers.map((h, i) => (
                <th
                  key={i}
                  style={chart.activeCol === i ? { color: "var(--green)" } : undefined}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {chart.rows.map((row, ri) => (
              <tr key={ri} className={row.active ? "active" : ""}>
                {row.cells.map((cell, ci) => (
                  <td
                    key={ci}
                    style={
                      row.active && chart.activeCol === ci
                        ? { color: "var(--green)", fontWeight: 500 }
                        : chart.activeCol === ci && ci > 0
                        ? { color: "var(--text-dim)" }
                        : undefined
                    }
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {chart.note && (
        <p className="consign-breakdown-note" style={{ marginTop: 6 }}>{chart.note}</p>
      )}
    </div>
  );
}

// ── Row component ────────────────────────────────────────────
function ConsignRow({
  result, rank, isOpen, onToggle,
}: {
  result: PlatformResult; rank: number | null; isOpen: boolean; onToggle: () => void;
}) {
  const handleExtLink = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    track("consignment_link_click", { platform_id: result.id, url });
  };

  const rankColor =
    rank === 1 ? "var(--gold)"     :
    rank === 2 ? "#c0c0c0"         :
    rank === 3 ? "#cd7f32"         :
    "var(--text-faint)";

  return (
    <div
      className={[
        "consign-row",
        !result.eligible ? "consign-row-ineligible" : "",
        isOpen ? "consign-row-open" : "",
      ].filter(Boolean).join(" ")}
    >
      <div
        className="consign-row-header"
        onClick={result.eligible ? onToggle : undefined}
        role={result.eligible ? "button" : undefined}
        tabIndex={result.eligible ? 0 : undefined}
        onKeyDown={result.eligible ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggle(); } } : undefined}
        aria-expanded={result.eligible ? isOpen : undefined}
      >
        {/* Rank badge */}
        <div className="consign-rank-num" aria-label={rank ? `Rank ${rank}` : "Ineligible"}>
          {rank
            ? <span style={{ color: rankColor, fontFamily: "'Bebas Neue', sans-serif", fontSize: 20 }}>{rank}</span>
            : <span className="consign-rank-dash">—</span>
          }
        </div>

        {/* Name + subtitle */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="consign-row-name">
            {result.name}
            {result.requiresApproval && (
              <span
                className="consign-approval-badge"
                title={result.approvalTooltip ?? "This platform requires direct contact or approval before you can list."}
                style={{ cursor: "help" }}
              >
                APPROVAL REQ.
              </span>
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
              >↗</a>
              <span className={`consign-chevron${isOpen ? " open" : ""}`} aria-hidden="true">▾</span>
            </>
          ) : (
            <a
              href={result.extUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="consign-ext-link"
              onClick={(e) => handleExtLink(e, result.extUrl)}
              aria-label={`Visit ${result.name}`}
              style={{ opacity: 0.5 }}
            >↗</a>
          )}
        </div>
      </div>

      {/* Expanded breakdown */}
      {isOpen && (
        <div className="consign-breakdown">
          {/* Step-by-step calc */}
          {result.breakdown.length > 0 && result.breakdown.map((line, i) => (
            <div key={i} className={`consign-breakdown-line${line.isTotal ? " total" : ""}`}>
              <span>{line.label}</span>
              <span>{line.value}</span>
            </div>
          ))}

          {/* Fee rate chart */}
          {result.feeChart && <FeeChartTable chart={result.feeChart} />}

          {/* Footnote */}
          {result.footnote && (
            <p className="consign-breakdown-note" style={{ marginTop: 12 }}>{result.footnote}</p>
          )}

          {/* CTA */}
          <a
            href={result.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="consign-cta-link"
            onClick={(e) => { e.stopPropagation(); track("consignment_link_click", { platform_id: result.id, url: result.ctaUrl }); }}
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
  const [priceStr,     setPriceStr]     = useState("1500");
  const [openId,       setOpenId]       = useState<string | null>(null);
  const [altAuctTier,  setAltAuctTier]  = useState<AltTier>("base");
  const [altFpTier,    setAltFpTier]    = useState<AltTier>("base");
  const [heritagePct,  setHeritagePct]  = useState(0.10);
  const [sortBy,       setSortBy]       = useState<SortBy>("payout");

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePriceChange = useCallback((val: string) => {
    setPriceStr(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      track("consignment_calc_price_change", { price: val });
    }, 500);
  }, []);

  const buyerPrice = parseFloat(priceStr) || 0;

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
    buildAltAuction(buyerPrice, altAuctTier,
      <TierSelect value={altAuctTier} onChange={setAltAuctTier} platformId="alt-auction" price={priceStr} />
    ),
    buildAltFixedPrice(buyerPrice, altFpTier,
      <TierSelect value={altFpTier} onChange={setAltFpTier} platformId="alt-fp" price={priceStr} />
    ),
  ];

  // Inject Heritage commission dropdown into subtitle
  const heritageIdx = allResults.findIndex((r) => r.id === "heritage");
  if (heritageIdx !== -1 && allResults[heritageIdx].eligible) {
    allResults[heritageIdx] = {
      ...allResults[heritageIdx],
      subtitleNode: (
        <span>
          Auction ·{" "}
          <HeritageCommissionSelect value={heritagePct} onChange={setHeritagePct} price={priceStr} />
          {" "}· 25% buyer&apos;s premium
        </span>
      ),
    };
  }

  const eligible   = allResults.filter((r) => r.eligible);
  const ineligible = allResults.filter((r) => !r.eligible);

  const sortFn = sortBy === "az"
    ? (a: PlatformResult, b: PlatformResult) => a.name.localeCompare(b.name)
    : (a: PlatformResult, b: PlatformResult) => b.payout - a.payout;

  const sortedEligible   = [...eligible].sort(sortFn);
  const sortedIneligible = sortBy === "az" ? [...ineligible].sort(sortFn) : ineligible;

  const handleToggle = (id: string, payout: number) => {
    if (openId === id) { setOpenId(null); }
    else { setOpenId(id); track("consignment_row_expanded", { platform_id: id, payout }); }
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

      {buyerPrice > 0 ? (
        <>
          {/* Sort controls */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontSize: 11, color: "var(--text-faint)", letterSpacing: "0.04em" }}>
              {eligible.length} platforms · tap any row to expand
            </span>
            <div className="consign-sort-pills">
              <span className="consign-sort-label">Sort:</span>
              <button
                className={`consign-sort-pill${sortBy === "payout" ? " active" : ""}`}
                onClick={() => setSortBy("payout")}
              >
                Best Payout
              </button>
              <button
                className={`consign-sort-pill${sortBy === "az" ? " active" : ""}`}
                onClick={() => setSortBy("az")}
              >
                A – Z
              </button>
            </div>
          </div>

          {/* Rows */}
          <div className="consign-rows">
            {sortedEligible.map((result, idx) => (
              <ConsignRow
                key={result.id}
                result={result}
                rank={sortBy === "payout" ? idx + 1 : null}
                isOpen={openId === result.id}
                onToggle={() => handleToggle(result.id, result.payout)}
              />
            ))}
            {sortedIneligible.map((result) => (
              <ConsignRow
                key={result.id}
                result={result}
                rank={null}
                isOpen={openId === result.id}
                onToggle={() => handleToggle(result.id, result.payout)}
              />
            ))}
          </div>
        </>
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
