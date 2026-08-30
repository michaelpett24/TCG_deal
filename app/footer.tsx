"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isStandaloneRoute } from "./standalone";

export function Footer() {
  const path = usePathname();
  if (isStandaloneRoute(path)) return null;

  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="footer-inner">
        <div className="footer-brand">TCGFair</div>
        <nav className="footer-links" aria-label="Footer navigation">
          <Link href="/">Fair Deal Calc</Link>
          <Link href="/consignment-calculator">Consignment Calc</Link>
          <Link href="/articles">Articles</Link>
          <Link href="/how-it-works">How It Works</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
        <p className="footer-disclaimer">
          Estimates only — not financial advice.
        </p>
      </div>
    </footer>
  );
}
