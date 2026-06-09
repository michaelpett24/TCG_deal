"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const CALCULATORS = [
  { href: "/", label: "Fair Deal Calculator", desc: "In-person cash deal pricing" },
  { href: "/consignment-calculator", label: "Consignment Calculator", desc: "Compare 11 selling platforms" },
];

const NAV_ARTICLES = [
  { href: "/articles", label: "Articles", desc: "Guides on fees, deals & more" },
];

export function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const dropRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const calcActive = path === "/" || path === "/consignment-calculator" || path.startsWith("/articles");

  return (
    <nav className="site-nav" aria-label="Site navigation">
      <div className="nav-inner">
        <Link href="/" className="nav-brand">
          TCG<span>Fair</span>
        </Link>
        <ul className="nav-links">
          <li ref={dropRef} className="nav-dropdown-wrap">
            <button
              className={`nav-dropdown-trigger${calcActive ? " active" : ""}`}
              onClick={() => setOpen(v => !v)}
              aria-expanded={open}
            >
              Calculators <span className="nav-caret">{open ? "▴" : "▾"}</span>
            </button>
            {open && (
              <div className="nav-dropdown">
                {CALCULATORS.map(c => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className={`nav-dropdown-item${path === c.href ? " active" : ""}`}
                    onClick={() => setOpen(false)}
                  >
                    <span className="nav-dropdown-label">{c.label}</span>
                    <span className="nav-dropdown-desc">{c.desc}</span>
                  </Link>
                ))}
                <div className="nav-dropdown-divider" />
                {NAV_ARTICLES.map(a => (
                  <Link
                    key={a.href}
                    href={a.href}
                    className={`nav-dropdown-item${path.startsWith(a.href) ? " active" : ""}`}
                    onClick={() => setOpen(false)}
                  >
                    <span className="nav-dropdown-label">{a.label}</span>
                    <span className="nav-dropdown-desc">{a.desc}</span>
                  </Link>
                ))}
              </div>
            )}
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
