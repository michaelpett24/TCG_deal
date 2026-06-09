"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Nav() {
  const path = usePathname();
  return (
    <nav className="site-nav" aria-label="Site navigation">
      <div className="nav-inner">
        <Link href="/" className="nav-brand">
          TCG <span>Fair Deal Calc</span>
        </Link>
        <ul className="nav-links">
          <li>
            <Link href="/consignment-calculator" className={path === "/consignment-calculator" ? "active" : ""}>
              Consignment Calc
            </Link>
          </li>
          <li>
            <Link href="/how-it-works" className={path === "/how-it-works" ? "active" : ""}>
              How It Works
            </Link>
          </li>
          <li>
            <Link href="/faq" className={path === "/faq" ? "active" : ""}>
              FAQ
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
