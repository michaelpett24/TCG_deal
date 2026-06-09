"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const NAV_ITEMS = [
  { href: "/",                       label: "Fair Deal Calculator",  desc: "In-person cash deal pricing",       exact: true },
  { href: "/consignment-calculator", label: "Consignment Calculator", desc: "Compare 11 selling platforms",     exact: true },
  { href: "/articles",               label: "Articles",              desc: "Guides on fees, deals & more",      exact: false },
  { href: "/how-it-works",           label: "How It Works",          desc: "The math behind fair deals",        exact: true },
  { href: "/faq",                    label: "FAQ",                   desc: "Common questions answered",         exact: true },
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

  const anyActive = NAV_ITEMS.some(item =>
    item.exact ? path === item.href : path.startsWith(item.href)
  );

  return (
    <nav className="site-nav" aria-label="Site navigation">
      <div className="nav-inner">
        <Link href="/" className="nav-brand">
          TCG<span>Fair</span>
        </Link>
        <ul className="nav-links">
          <li ref={dropRef} className="nav-dropdown-wrap">
            <button
              className={`nav-dropdown-trigger${anyActive ? " active" : ""}`}
              onClick={() => setOpen(v => !v)}
              aria-expanded={open}
            >
              Tools &amp; Guides <span className="nav-caret">{open ? "▴" : "▾"}</span>
            </button>
            {open && (
              <div className="nav-dropdown">
                {NAV_ITEMS.map(item => {
                  const isActive = item.exact ? path === item.href : path.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`nav-dropdown-item${isActive ? " active" : ""}`}
                      onClick={() => setOpen(false)}
                    >
                      <span className="nav-dropdown-label">{item.label}</span>
                      <span className="nav-dropdown-desc">{item.desc}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
