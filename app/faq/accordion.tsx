"use client";

import { useState } from "react";

interface FaqItem {
  q: string;
  a: string; // HTML string
}

interface FaqGroup {
  group: string;
  items: FaqItem[];
}

function FaqEntry({ q, a }: FaqItem) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? " open" : ""}`}>
      <button
        className="faq-question"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span>{q}</span>
        <svg className="faq-chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="4 6 8 10 12 6" />
        </svg>
      </button>
      <div
        className={`faq-answer${open ? " open" : ""}`}
        dangerouslySetInnerHTML={{ __html: a }}
      />
    </div>
  );
}

export function FaqAccordion({ groups }: { groups: FaqGroup[] }) {
  return (
    <>
      {groups.map(({ group, items }) => (
        <div key={group} className="faq-group">
          <div className="faq-group-title">{group}</div>
          {items.map(item => (
            <FaqEntry key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      ))}
    </>
  );
}
