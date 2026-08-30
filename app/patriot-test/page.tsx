import type { Metadata } from "next";
import { Quiz } from "./quiz";

export const metadata: Metadata = {
  title: "The Official Patriot Purity Test — Measure Your Loyalty",
  description:
    "Fifteen questions. Three minutes. One number that finally settles how much you love this country and the man who saved it. A satirical loyalty assessment.",
  alternates: { canonical: "/patriot-test" },
  // Kept out of search so it doesn't muddy the calculator site's SEO.
  robots: { index: false, follow: false },
  openGraph: {
    title: "The Official Patriot Purity Test",
    description:
      "A rigorous, non-partisan assessment of your Personal Patriotism Quotient. Results not valid in California.",
    type: "website",
  },
};

export default function PatriotTestPage() {
  return <Quiz />;
}
