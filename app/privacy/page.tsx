import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — TCG Fair",
  description: "Privacy policy for TCGFair.com — what data we collect and how we use it.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="page-wrap">
      <div className="page-eyebrow">Legal</div>
      <h1 className="page-h1">Privacy Policy</h1>
      <p className="page-intro">
        Last updated: May 2026
      </p>

      <div className="hiw-body" style={{ display: "flex", flexDirection: "column", gap: 28 }}>

        <section>
          <h2 className="hiw-step-title" style={{ marginBottom: 10 }}>Overview</h2>
          <p>TCGFair.com (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;the site&rdquo;) is a free calculator tool for TCG buyers and sellers. We are committed to keeping things simple and transparent. We do not require you to create an account or provide any personal information to use this tool.</p>
        </section>

        <section>
          <h2 className="hiw-step-title" style={{ marginBottom: 10 }}>Information We Collect</h2>
          <p><strong style={{ color: "#e8e0d0" }}>What you enter in the calculator</strong> — market prices, proposed prices, tax rates, and shipping amounts — are stored only in your browser&rsquo;s local storage. This data never leaves your device and is never transmitted to our servers.</p>
          <p style={{ marginTop: 10 }}><strong style={{ color: "#e8e0d0" }}>Usage data</strong> — we use Google Analytics to collect anonymized information about how visitors use the site, including pages visited, time on site, and general geographic region (country/state level). This data is aggregated and cannot be used to identify you personally. Google Analytics may use cookies to distinguish users.</p>
          <p style={{ marginTop: 10 }}>We do not collect your name, email address, phone number, or payment information.</p>
        </section>

        <section>
          <h2 className="hiw-step-title" style={{ marginBottom: 10 }}>Local Storage</h2>
          <p>We use your browser&rsquo;s local storage (similar to cookies, but stored locally) to remember your calculator settings — such as your preferred tax rate and shipping cost — between sessions. This data stays on your device. You can clear it at any time by clearing your browser&rsquo;s site data.</p>
        </section>

        <section>
          <h2 className="hiw-step-title" style={{ marginBottom: 10 }}>Affiliate Links</h2>
          <p>The &ldquo;Search eBay&rdquo; button on the calculator links to eBay using an affiliate link. This means we may earn a small commission if you make a purchase after clicking that link, at no additional cost to you. This does not influence the calculator&rsquo;s math or recommendations. See our <Link href="/terms" style={{ color: "#7bc47b", textDecoration: "none" }}>Terms of Service</Link> for more information.</p>
        </section>

        <section>
          <h2 className="hiw-step-title" style={{ marginBottom: 10 }}>Third-Party Services</h2>
          <p><strong style={{ color: "#e8e0d0" }}>Google Analytics</strong> — we use Google Analytics 4 to understand site usage. Google may collect and process data in accordance with their own <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#7bc47b", textDecoration: "none" }}>Privacy Policy</a>. You can opt out of Google Analytics tracking using the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: "#7bc47b", textDecoration: "none" }}>Google Analytics Opt-out Browser Add-on</a>.</p>
          <p style={{ marginTop: 10 }}><strong style={{ color: "#e8e0d0" }}>Netlify</strong> — this site is hosted on Netlify, which may collect server access logs including IP addresses as part of standard hosting operations. See <a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer" style={{ color: "#7bc47b", textDecoration: "none" }}>Netlify&rsquo;s Privacy Policy</a> for details.</p>
        </section>

        <section>
          <h2 className="hiw-step-title" style={{ marginBottom: 10 }}>Your Rights</h2>
          <p>Since we do not collect or store personal data on our servers, there is no personal profile to access, correct, or delete. To remove your locally stored settings, clear your browser&rsquo;s site data for tcgfair.com.</p>
          <p style={{ marginTop: 10 }}>If you are located in the EU/EEA, you have rights under GDPR regarding data processed by third-party services (Google Analytics, Netlify) used on this site. You can exercise those rights directly with those providers.</p>
        </section>

        <section>
          <h2 className="hiw-step-title" style={{ marginBottom: 10 }}>Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Changes will be reflected by updating the &ldquo;Last updated&rdquo; date at the top of this page. Continued use of the site after changes constitutes acceptance of the updated policy.</p>
        </section>

      </div>

      <div className="cta-box" style={{ marginTop: 40 }}>
        <p>Questions about the calculator math?</p>
        <Link href="/how-it-works" className="cta-btn">How It Works →</Link>
      </div>
    </div>
  );
}
