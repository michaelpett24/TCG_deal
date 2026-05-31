// eBay Partner Network affiliate link builder
// campid: 5339155145

const EPN_PARAMS = {
  mkcid:    "1",
  mkrid:    "711-53200-19255-0",
  siteid:   "0",
  campid:   "5339155145",
  toolid:   "10001",
  mkevt:    "1",
} as const;

/**
 * Build an eBay Sold Listings search URL with EPN tracking.
 * @param query   Card name / search term
 * @param source  customid slug to track which page drove the click
 */
export function ebaySearchUrl(query: string, source = "calculator"): string {
  const p = new URLSearchParams({
    _nkw: query.trim() || "tcg card",
    LH_Sold:     "1",
    LH_Complete: "1",
    ...EPN_PARAMS,
    customid: source,
  });
  return `https://www.ebay.com/sch/i.html?${p.toString()}`;
}

/**
 * Build an EPN-tagged link to any eBay URL.
 */
export function ebayUrl(path: string, source = "calculator"): string {
  const base = path.includes("?") ? `${path}&` : `${path}?`;
  const p = new URLSearchParams({ ...EPN_PARAMS, customid: source });
  return `${base}${p.toString()}`;
}
