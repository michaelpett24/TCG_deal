import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — TCG Fair",
  description: "Terms of service for TCGFair.com — the TCG fair deal calculator.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="page-wrap">
      <div className="page-eyebrow">Legal</div>
      <h1 className="page-h1">Terms of Service</h1>
      <p className="page-intro">
        Last updated: May 2026
      </p>

      <div className="hiw-body" style={{ display: "flex", flexDirection: "column", gap: 28 }}>

        <section>
          <h2 className="hiw-step-title" style={{ marginBottom: 10 }}>Acceptance of Terms</h2>
          <p>By using TCGFair.com (&ldquo;the site&rdquo;), you agree to these Terms of Service. If you do not agree, please do not use the site. We reserve the right to update these terms at any time; continued use of the site constitutes acceptance of any changes.</p>
        </section>

        <section>
          <h2 className="hiw-step-title" style={{ marginBottom: 10 }}>Estimates Only — Not Financial Advice</h2>
          <p>The calculations provided by this tool are <strong style={{ color: "#e8e0d0" }}>estimates for informational and negotiation purposes only</strong>. They do not constitute financial, legal, or tax advice. Results depend entirely on the values you enter and may not reflect your actual transaction costs.</p>
          <p style={{ marginTop: 10 }}>eBay fee rates, sales tax rates, and shipping costs change over time and vary by seller, buyer location, and transaction type. Always verify current rates before relying on any calculation for a real transaction.</p>
          <p style={{ marginTop: 10 }}>We are not responsible for any financial loss or dispute arising from the use of this tool.</p>
        </section>

        <section>
          <h2 className="hiw-step-title" style={{ marginBottom: 10 }}>Affiliate Links — FTC Disclosure</h2>
          <p>TCGFair.com participates in the eBay Partner Network (EPN), an affiliate advertising program. The &ldquo;Search eBay&rdquo; button on the calculator is an affiliate link — if you click it and make a purchase on eBay, we may earn a small commission at no additional cost to you.</p>
          <p style={{ marginTop: 10 }}>This affiliate relationship does not influence the calculator&rsquo;s math, fee defaults, or any recommendations made by the tool. The even split and fair range calculations are derived from eBay&rsquo;s publicly documented fee structure and are not adjusted to benefit eBay or any other party.</p>
        </section>

        <section>
          <h2 className="hiw-step-title" style={{ marginBottom: 10 }}>No Warranties</h2>
          <p>This site and its tools are provided &ldquo;as is&rdquo; without warranties of any kind, express or implied. We do not warrant that the site will be uninterrupted, error-free, or that results will be accurate for any particular use case.</p>
        </section>

        <section>
          <h2 className="hiw-step-title" style={{ marginBottom: 10 }}>Limitation of Liability</h2>
          <p>To the fullest extent permitted by law, TCGFair.com and its operators shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of this site or reliance on its calculations.</p>
        </section>

        <section>
          <h2 className="hiw-step-title" style={{ marginBottom: 10 }}>Intellectual Property</h2>
          <p>The TCGFair.com name, design, and calculator logic are the property of this site&rsquo;s operators. TCGFair.com is not affiliated with, endorsed by, or sponsored by eBay, Nintendo, The Pokémon Company, Wizards of the Coast, or any other brand referenced on this site. All trademarks belong to their respective owners.</p>
        </section>

        <section>
          <h2 className="hiw-step-title" style={{ marginBottom: 10 }}>Governing Law</h2>
          <p>These terms are governed by the laws of the United States. Any disputes arising from use of this site shall be resolved under applicable US law.</p>
        </section>

      </div>

      <div className="cta-box" style={{ marginTop: 40 }}>
        <p>Learn how the calculator math works.</p>
        <Link href="/how-it-works" className="cta-btn">How It Works →</Link>
      </div>
    </div>
  );
}
