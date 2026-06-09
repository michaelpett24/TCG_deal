"use client";

import { useState, useEffect } from "react";

const SUPPLIES = [
  { name: "Card Saver 1s",         count: "50ct",  url: "https://www.amazon.com/dp/B078SFLTJQ?tag=collectorinsi-20" },
  { name: "Ultra Pro Toploaders",  count: "100ct", url: "https://www.amazon.com/dp/B076V4V2QQ?tag=collectorinsi-20" },
  { name: "Penny Sleeves",         count: "500ct", url: "https://www.amazon.com/dp/B074BPTDKK?tag=collectorinsi-20" },
  { name: "Card Mailer Envelopes", count: "100ct", url: "https://www.amazon.com/dp/B0DM6S72Q4?tag=collectorinsi-20" },
  { name: "Bubble Mailers 4×8",    count: "100ct", url: "https://www.amazon.com/dp/B09P1D8DX1?tag=collectorinsi-20" },
  { name: "BCW Team Bags",         count: "100ct", url: "https://www.amazon.com/dp/B002PF61O2?tag=collectorinsi-20" },
];

export function SuppliesStrip() {
  const [items, setItems] = useState(SUPPLIES);

  useEffect(() => {
    setItems([...SUPPLIES].sort(() => Math.random() - 0.5));
  }, []);

  return (
    <div className="supplies-outer">
      <div className="supplies-label">Collector Supplies</div>
      <div className="supplies-chips">
        {items.map(item => (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="supplies-chip"
          >
            {item.name} <span className="supplies-chip-arrow" aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
      <p className="supplies-disclosure">As an Amazon Associate we earn from qualifying purchases.</p>
    </div>
  );
}
