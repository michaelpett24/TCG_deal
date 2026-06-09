// Design preview — light theme concept for tcgfair.com
// Visit /test to see this

const C = {
  bg:          "#f3f4f6",
  surface:     "#ffffff",
  surfaceAlt:  "#f9fafb",
  border:      "#e5e7eb",
  borderMid:   "#d1d5db",
  text:        "#111827",
  textSub:     "#374151",
  textMuted:   "#6b7280",
  textFaint:   "#9ca3af",
  green:       "#15803d",
  greenMid:    "#16a34a",
  greenLight:  "#dcfce7",
  greenBorder: "#86efac",
  amber:       "#92400e",
  amberMid:    "#b45309",
  amberLight:  "#fef3c7",
  amberBorder: "#fcd34d",
  blue:        "#1e40af",
  blueMid:     "#2563eb",
  blueLight:   "#dbeafe",
  blueBorder:  "#93c5fd",
  red:         "#991b1b",
  shadow:      "0 1px 3px rgba(0,0,0,0.08), 0 1px 8px rgba(0,0,0,0.04)",
  shadowMd:    "0 4px 12px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
};

const mono = "'DM Mono', monospace";
const bebas = "'Bebas Neue', sans-serif";
const prose = "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif";

const card = (extra?: React.CSSProperties): React.CSSProperties => ({
  background: C.surface,
  border: `1px solid ${C.border}`,
  borderRadius: 12,
  boxShadow: C.shadow,
  ...extra,
});

export default function TestPage() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: C.bg, overflowY: "auto", fontFamily: prose, color: C.text }}>

      {/* ── Light Nav ───────────────────────────────────────── */}
      <nav style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, zIndex: 50, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 20px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: bebas, fontSize: 20, letterSpacing: "0.06em", color: C.green }}>
            TCG <span style={{ color: C.textFaint }}>Fair Deal Calc</span>
          </span>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            {["Consignment Calc", "How It Works", "FAQ"].map((l, i) => (
              <span key={l} style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: i === 0 ? C.green : C.textMuted, fontWeight: i === 0 ? 600 : 400, fontFamily: mono, cursor: "pointer" }}>
                {l}
              </span>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Preview Banner ──────────────────────────────────── */}
      <div style={{ background: C.green, color: "#fff", textAlign: "center", padding: "8px 16px", fontSize: 12, fontFamily: mono, letterSpacing: "0.06em" }}>
        DESIGN PREVIEW — tcgfair.com/test — not a working calculator
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 20px 80px" }}>

        {/* ── Hero ────────────────────────────────────────────── */}
        <div style={{ textAlign: "center", padding: "22px 0 14px" }}>
          <h1 style={{ fontFamily: bebas, fontSize: "clamp(32px, 8vw, 42px)", letterSpacing: "0.03em", color: C.text, lineHeight: 1.05, margin: "0 0 10px" }}>
            Know Your Floor Before You Negotiate
          </h1>
          <p style={{ fontSize: 15, color: C.textSub, lineHeight: 1.5, maxWidth: 520, margin: "0 auto", fontFamily: prose }}>
            Enter a card&rsquo;s eBay sold price — instantly see your seller floor, the buyer ceiling, and the fair split. Used at card shows, LGS, and Discord.
          </p>
        </div>

        {/* ── Step 1: eBay Search ─────────────────────────────── */}
        <div style={{ ...card({ padding: "18px 20px", marginBottom: 12 }) }}>
          <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: C.textMuted, fontFamily: mono, marginBottom: 10, fontWeight: 600 }}>
            Step 1 — Look up the card&rsquo;s eBay sold price (optional)
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              disabled
              placeholder="Card name (e.g. Charizard Base Set PSA 10)"
              style={{ flex: 1, background: C.surfaceAlt, border: `1.5px solid ${C.borderMid}`, borderRadius: 8, padding: "10px 14px", fontSize: 14, color: C.textMuted, fontFamily: prose, outline: "none" }}
            />
            <button style={{ background: C.green, color: "#fff", border: "none", borderRadius: 8, padding: "10px 18px", fontFamily: bebas, fontSize: 15, letterSpacing: "0.08em", cursor: "pointer", whiteSpace: "nowrap" as const }}>
              Search eBay ↗
            </button>
          </div>
          <p style={{ fontSize: 12, color: C.textMuted, marginTop: 8, lineHeight: 1.5, fontFamily: prose }}>
            Opens eBay → search your card → filter by <strong style={{ color: C.text }}>Sold</strong> → use a recent sale price (not the listed asking price).
          </p>
        </div>

        {/* ── Step 2: Price Input ─────────────────────────────── */}
        <div style={{ ...card({ padding: "20px 20px 16px", marginBottom: 12 }) }}>
          <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: C.textMuted, fontFamily: mono, marginBottom: 10, fontWeight: 600 }}>
            Step 2 — Enter the eBay sold price
          </div>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", fontFamily: bebas, fontSize: 28, color: C.textFaint, lineHeight: 1 }}>$</span>
            <input
              disabled
              value="1000"
              style={{ width: "100%", background: C.surfaceAlt, border: `2px solid ${C.green}`, borderRadius: 10, padding: "14px 16px 14px 44px", fontFamily: bebas, fontSize: "clamp(36px, 9vw, 48px)", color: C.text, boxShadow: `0 0 0 4px ${C.greenLight}`, outline: "none", boxSizing: "border-box" as const }}
            />
          </div>
          <p style={{ fontSize: 12, color: C.textSub, marginTop: 8, fontFamily: prose }}>
            Use the eBay <em>Sold Items</em> price — not listed price.
          </p>
          {/* Toggles */}
          <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" as const }}>
            {[
              { label: "Sales Tax", value: "8.25 %", active: true },
              { label: "Shipping", value: "$ 4.00", active: true },
            ].map(t => (
              <div key={t.label} style={{ display: "flex", alignItems: "center", gap: 6, background: t.active ? C.greenLight : C.surfaceAlt, border: `1.5px solid ${t.active ? C.greenBorder : C.borderMid}`, borderRadius: 20, padding: "6px 14px", fontSize: 13, color: t.active ? C.green : C.textMuted, fontFamily: mono }}>
                <span style={{ fontSize: 14 }}>{t.active ? "✓" : "○"}</span>
                {t.label} <strong style={{ marginLeft: 4 }}>{t.value}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* ── Result: Three-column range ──────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr 1fr", gap: 8, marginBottom: 12 }}>
          {[
            { label: "Seller Floor", sub: "min to accept", price: "$856", color: C.amber, bg: C.amberLight, border: C.amberBorder },
            { label: "★ Fair Middle", sub: "even split", price: "$972", color: C.green, bg: C.greenLight, border: C.greenBorder },
            { label: "Buyer Ceiling", sub: "max to pay", price: "$1,087", color: C.blue, bg: C.blueLight, border: C.blueBorder },
          ].map(col => (
            <div key={col.label} style={{ background: col.bg, border: `1.5px solid ${col.border}`, borderRadius: 12, padding: "16px 12px", textAlign: "center" }}>
              <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: col.color, fontFamily: mono, marginBottom: 6, fontWeight: 600 }}>{col.label}</div>
              <div style={{ fontFamily: bebas, fontSize: "clamp(26px, 6vw, 34px)", color: col.color, lineHeight: 1, letterSpacing: "0.02em" }}>{col.price}</div>
              <div style={{ fontSize: 11, color: col.color, opacity: 0.7, marginTop: 4, fontFamily: prose }}>{col.sub}</div>
            </div>
          ))}
        </div>

        {/* ── Verdict Card ────────────────────────────────────── */}
        <div style={{ ...card({ padding: "18px 20px", marginBottom: 32, border: `1.5px solid ${C.greenBorder}`, background: C.greenLight }) }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontFamily: bebas, fontSize: 38, color: C.text, letterSpacing: "0.02em", lineHeight: 1 }}>$972</span>
            <span style={{ background: C.green, color: "#fff", fontFamily: mono, fontSize: 11, letterSpacing: "0.1em", padding: "4px 12px", borderRadius: 20, fontWeight: 600 }}>
              FAIR DEAL ✓
            </span>
          </div>
          <div style={{ fontSize: 12, color: C.textSub, fontFamily: mono, marginBottom: 2 }}>98.5% of market · drag the slider to propose a price</div>
          <div style={{ borderTop: `1px solid ${C.greenBorder}`, marginTop: 12, paddingTop: 12, display: "flex", flexDirection: "column" as const, gap: 6 }}>
            {[
              ["Buyer saves vs. eBay", "+$115.00"],
              ["Seller gains vs. floor", "+$116.00"],
              ["vs. Fair Middle ($972)", "exactly even"],
            ].map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: C.textSub, fontFamily: prose }}>
                <span>{l}</span>
                <span style={{ fontFamily: mono, color: C.green, fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Divider ─────────────────────────────────────────── */}
        <div style={{ textAlign: "center", margin: "40px 0 28px" }}>
          <div style={{ fontFamily: bebas, fontSize: "clamp(24px, 6vw, 32px)", color: C.text, letterSpacing: "0.04em", marginBottom: 6 }}>
            Consignment Calculator
          </div>
          <p style={{ fontSize: 14, color: C.textMuted, fontFamily: prose }}>
            Enter what a buyer would pay — see exactly what you keep across 11 platforms, ranked best to worst.
          </p>
        </div>

        {/* ── Consignment input ───────────────────────────────── */}
        <div style={{ ...card({ padding: "20px 20px 16px", marginBottom: 12 }) }}>
          <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: C.textMuted, fontFamily: mono, marginBottom: 10, fontWeight: 600 }}>Buyer pays</div>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", fontFamily: bebas, fontSize: 28, color: C.textFaint, lineHeight: 1 }}>$</span>
            <input disabled value="1500" style={{ width: "100%", background: C.surfaceAlt, border: `2px solid ${C.green}`, borderRadius: 10, padding: "14px 16px 14px 44px", fontFamily: bebas, fontSize: "clamp(36px, 9vw, 48px)", color: C.text, outline: "none", boxSizing: "border-box" as const, boxShadow: `0 0 0 4px ${C.greenLight}` }} />
          </div>
          <p style={{ fontSize: 12, color: C.textFaint, marginTop: 8, fontFamily: prose }}>
            For auctions, include the buyer&rsquo;s premium. For eBay or fixed-price, enter the sale price.
          </p>
        </div>

        {/* ── Sort + column header ─────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 12, color: C.textMuted, fontFamily: prose }}>9 platforms · expand any row for full fee schedule</span>
          <div style={{ display: "flex", gap: 4 }}>
            {["Best Payout", "A – Z"].map((s, i) => (
              <button key={s} style={{ background: i === 0 ? C.greenLight : C.surface, border: `1.5px solid ${i === 0 ? C.greenBorder : C.border}`, color: i === 0 ? C.green : C.textMuted, borderRadius: 20, padding: "5px 12px", fontSize: 11, fontFamily: mono, cursor: "pointer" }}>{s}</button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: 80, marginBottom: 4 }}>
          <span style={{ fontSize: 10, color: C.textFaint, letterSpacing: "0.1em", textTransform: "uppercase" as const, fontFamily: mono }}>You keep</span>
        </div>

        {/* ── Consignment rows ─────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column" as const, gap: 6, marginBottom: 20 }}>

          {/* Row 1 — highlighted, #1 */}
          <div style={{ ...card({ border: `1.5px solid ${C.greenBorder}`, background: "#fafffe" }) }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", cursor: "pointer" }}>
              <div style={{ width: 28, textAlign: "center", fontFamily: bebas, fontSize: 22, color: C.green }}>1</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.text, display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" as const }}>
                  Probstein123
                  <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 4, background: "#fff3e0", border: "1px solid #fcd34d", color: "#92400e", fontFamily: mono, letterSpacing: "0.06em" }}>eBay CONSIGN</span>
                </div>
                <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2, fontFamily: mono }}>5% commission at this price</div>
              </div>
              <div style={{ fontFamily: bebas, fontSize: 26, color: C.greenMid, letterSpacing: "0.02em", whiteSpace: "nowrap" as const }}>$1,425</div>
              <div style={{ display: "flex", gap: 6 }}>
                <span style={{ fontSize: 13, color: C.textMuted, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${C.border}`, borderRadius: 6 }}>↗</span>
                <span style={{ fontSize: 13, color: C.textMuted, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>▾</span>
              </div>
            </div>

            {/* Expanded breakdown */}
            <div style={{ borderTop: `1px solid ${C.border}`, padding: "16px 16px 16px 56px", background: C.surfaceAlt, borderRadius: "0 0 12px 12px" }}>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 6, marginBottom: 14 }}>
                {[
                  ["eBay sale price", "$1,500.00"],
                  ["− Commission (5%)", "−$75.00"],
                  ["You keep", "$1,425.00", true],
                ].map(([l, v, total]) => (
                  <div key={String(l)} style={{ display: "flex", justifyContent: "space-between", fontSize: total ? 15 : 13, fontFamily: mono, color: total ? C.text : C.textMuted, borderTop: total ? `1px solid ${C.border}` : undefined, paddingTop: total ? 8 : undefined, marginTop: total ? 4 : undefined, fontWeight: total ? 600 : undefined }}>
                    <span style={{ fontFamily: total ? mono : mono }}>{l}</span>
                    <span style={{ color: total ? C.green : C.textMuted }}>{v}</span>
                  </div>
                ))}
              </div>
              {/* Fee chart */}
              <div style={{ fontSize: 11, color: C.textMuted, letterSpacing: "0.08em", textTransform: "uppercase" as const, fontFamily: mono, marginBottom: 6 }}>Commission schedule by sale price</div>
              <div style={{ border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: mono }}>
                  <thead>
                    <tr style={{ background: C.surfaceAlt }}>
                      {["Sale Price", "Commission", "You Keep"].map(h => (
                        <th key={h} style={{ padding: "7px 10px", textAlign: "left" as const, color: C.textMuted, fontWeight: 500, borderBottom: `1px solid ${C.border}`, fontSize: 11, letterSpacing: "0.04em" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["< $100", "15%", "85%", false],
                      ["$100 – $999", "10%", "90%", false],
                      ["$1,000+", "5%", "95%", true],
                    ].map(([r, f, k, active]) => (
                      <tr key={String(r)} style={{ background: active ? C.greenLight : undefined, borderLeft: active ? `3px solid ${C.green}` : undefined }}>
                        {[r, f, k].map((cell, ci) => (
                          <td key={ci} style={{ padding: "6px 10px", color: active ? C.green : C.textMuted, borderBottom: `1px solid ${C.border}`, fontWeight: active && ci > 0 ? 600 : undefined }}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ fontSize: 12, color: C.textFaint, fontStyle: "italic", marginTop: 8, lineHeight: 1.5, fontFamily: prose }}>Probstein handles all eBay listing, fees, photography, and shipping. Cash advances available.</p>
              <a href="#" style={{ display: "block", textAlign: "center", marginTop: 12, padding: "10px 16px", background: C.green, color: "#fff", borderRadius: 8, fontFamily: bebas, fontSize: 15, letterSpacing: "0.08em", textDecoration: "none" }}>
                Consign with Probstein →
              </a>
            </div>
          </div>

          {/* Rows 2–4 (collapsed) */}
          {[
            { rank: 2, name: "Z and G Emporium",   type: "eBay CONSIGN", sub: "7% commission",        payout: "$1,395" },
            { rank: 3, name: "Alt — Fixed Price",   type: "FIXED PRICE",  sub: "9% fee · No sales tax", payout: "$1,365" },
            { rank: 4, name: "PSA Vault",           type: "eBay CONSIGN", sub: "10% fee · $5 min",    payout: "$1,350" },
          ].map(row => (
            <div key={row.rank} style={{ ...card() }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", cursor: "pointer" }}>
                <div style={{ width: 28, textAlign: "center", fontFamily: bebas, fontSize: 22, color: C.textFaint }}>{row.rank}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.text, display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" as const }}>
                    {row.name}
                    <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 4, background: row.type === "FIXED PRICE" ? "#dbeafe" : "#fff3e0", border: `1px solid ${row.type === "FIXED PRICE" ? "#93c5fd" : "#fcd34d"}`, color: row.type === "FIXED PRICE" ? "#1e40af" : "#92400e", fontFamily: mono, letterSpacing: "0.06em" }}>{row.type}</span>
                  </div>
                  <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2, fontFamily: mono }}>{row.sub}</div>
                </div>
                <div style={{ fontFamily: bebas, fontSize: 26, color: C.greenMid, letterSpacing: "0.02em", whiteSpace: "nowrap" as const }}>{row.payout}</div>
                <div style={{ display: "flex", gap: 6 }}>
                  <span style={{ fontSize: 13, color: C.textMuted, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${C.border}`, borderRadius: 6 }}>↗</span>
                  <span style={{ fontSize: 13, color: C.textMuted, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>▾</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── FAQ Example ──────────────────────────────────────── */}
        <div style={{ marginTop: 48, marginBottom: 12 }}>
          <h2 style={{ fontFamily: bebas, fontSize: 28, letterSpacing: "0.04em", color: C.text, marginBottom: 16 }}>Frequently Asked Questions</h2>
        </div>
        {[
          {
            q: "What does 'buyer pays' mean in this calculator?",
            a: "The total all-in amount the buyer pays, including any buyer's premium. For an auction with a 20% buyer's premium, a buyer who pays $120 generated a $100 hammer price. Enter $120 and the calculator derives the $100 hammer automatically.",
            open: true,
          },
          {
            q: "Does Fanatics Collect charge a seller fee on auctions?",
            a: "",
            open: false,
          },
          {
            q: "Which platform has the lowest seller fees?",
            a: "",
            open: false,
          },
        ].map(item => (
          <div key={item.q} style={{ ...card({ marginBottom: 6, overflow: "hidden" }) }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", cursor: "pointer", gap: 12 }}>
              <span style={{ fontSize: 14, color: C.text, lineHeight: 1.4, fontFamily: prose, fontWeight: 500 }}>{item.q}</span>
              <span style={{ color: item.open ? C.green : C.textFaint, fontSize: 14, flexShrink: 0, transform: item.open ? "rotate(180deg)" : undefined }}>▾</span>
            </div>
            {item.open && (
              <div style={{ padding: "0 18px 16px", fontSize: 14, color: C.textSub, lineHeight: 1.7, fontFamily: prose, borderTop: `1px solid ${C.border}`, paddingTop: 14, marginTop: 0 }}>
                {item.a}
              </div>
            )}
          </div>
        ))}

        {/* ── CTA Box ──────────────────────────────────────────── */}
        <div style={{ background: C.greenLight, border: `1.5px solid ${C.greenBorder}`, borderRadius: 14, padding: "28px 24px", textAlign: "center", marginTop: 48 }}>
          <div style={{ fontFamily: bebas, fontSize: 24, color: C.green, letterSpacing: "0.04em", marginBottom: 10 }}>
            Ready to run the numbers?
          </div>
          <p style={{ fontSize: 14, color: C.textSub, marginBottom: 18, lineHeight: 1.6, fontFamily: prose }}>
            The TCGFair Deal Calculator shows the fair price range for any in-person card trade — free, no login required.
          </p>
          <a href="/" style={{ display: "inline-block", background: C.green, color: "#fff", fontFamily: bebas, fontSize: 17, letterSpacing: "0.1em", padding: "13px 32px", borderRadius: 8, textDecoration: "none" }}>
            Open the Deal Calculator →
          </a>
        </div>

        {/* ── Type system reference ────────────────────────────── */}
        <div style={{ marginTop: 56, paddingTop: 32, borderTop: `1px solid ${C.border}` }}>
          <p style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: C.textFaint, fontFamily: mono, marginBottom: 20 }}>Type system</p>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 14 }}>
            <div style={{ fontFamily: bebas, fontSize: 48, letterSpacing: "0.03em", color: C.text, lineHeight: 1 }}>H1 Heading — Bebas Neue</div>
            <div style={{ fontFamily: bebas, fontSize: 28, letterSpacing: "0.04em", color: C.text }}>H2 Section Title — Bebas Neue</div>
            <div style={{ fontSize: 16, color: C.textSub, lineHeight: 1.65, fontFamily: prose }}>Body text — System sans-serif 16px. The quick brown fox jumps over the lazy dog. Used for all paragraph text, FAQ answers, explanations, and multi-sentence copy.</div>
            <div style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.5, fontFamily: prose }}>Secondary text — 13px. Used for hints, subtitles, and supporting information that doesn&rsquo;t need full body weight.</div>
            <div style={{ fontFamily: mono, fontSize: 13, color: C.textSub }}>DM Mono 13px — used for data labels, inputs, table cells, calc results</div>
            <div style={{ fontFamily: bebas, fontSize: 42, color: C.greenMid, letterSpacing: "0.02em" }}>$1,425 — payout numbers in Bebas Neue</div>
          </div>
        </div>

        {/* ── Color chips ──────────────────────────────────────── */}
        <div style={{ marginTop: 32, paddingTop: 24, borderTop: `1px solid ${C.border}` }}>
          <p style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: C.textFaint, fontFamily: mono, marginBottom: 14 }}>Color palette</p>
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8 }}>
            {[
              { name: "Primary Green", hex: C.green, light: false },
              { name: "Green Light", hex: C.greenLight, light: true },
              { name: "Amber", hex: C.amberMid, light: false },
              { name: "Amber Light", hex: C.amberLight, light: true },
              { name: "Blue", hex: C.blue, light: false },
              { name: "Blue Light", hex: C.blueLight, light: true },
              { name: "Text Primary", hex: C.text, light: false },
              { name: "Text Muted", hex: C.textMuted, light: false },
              { name: "Border", hex: C.border, light: true },
              { name: "Surface", hex: C.surface, light: true },
            ].map(chip => (
              <div key={chip.name} style={{ display: "flex", alignItems: "center", gap: 8, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px" }}>
                <div style={{ width: 20, height: 20, borderRadius: 4, background: chip.hex, border: chip.light ? `1px solid ${C.border}` : undefined, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 11, color: C.text, fontFamily: mono }}>{chip.name}</div>
                  <div style={{ fontSize: 10, color: C.textFaint, fontFamily: mono }}>{chip.hex}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Light Footer ─────────────────────────────────────── */}
      <footer style={{ background: C.surface, borderTop: `1px solid ${C.border}`, padding: "28px 20px 36px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ fontFamily: bebas, fontSize: 17, letterSpacing: "0.06em", color: C.green, marginBottom: 10 }}>TCG Fair Deal Calc</div>
          <div style={{ display: "flex", gap: 20, marginBottom: 12, flexWrap: "wrap" as const }}>
            {["Consignment Calc", "How It Works", "FAQ", "Privacy", "Terms"].map(l => (
              <span key={l} style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: C.textMuted, fontFamily: mono, cursor: "pointer" }}>{l}</span>
            ))}
          </div>
          <p style={{ fontSize: 12, color: C.textFaint, lineHeight: 1.6, fontFamily: prose }}>
            Estimates only — not financial advice. eBay fees and tax rates may vary. Verify directly with each platform before consigning.
          </p>
        </div>
      </footer>

    </div>
  );
}
