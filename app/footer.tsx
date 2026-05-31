import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="footer-inner">
        <div className="footer-brand">TCG Fair Deal Calculator</div>
        <nav className="footer-links" aria-label="Footer navigation">
          <Link href="/">Calculator</Link>
          <Link href="/how-it-works">How It Works</Link>
          <Link href="/faq">FAQ</Link>
        </nav>
        <p className="footer-disclaimer">
          Not affiliated with eBay, Nintendo, The Pokémon Company, or Wizards of the Coast.
          Market prices and fee rates are estimates — verify current eBay rates before negotiating.
          Built for card players, by card players.
        </p>
      </div>
    </footer>
  );
}
