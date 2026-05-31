import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-wrap" style={{ textAlign: "center", paddingTop: 80 }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>⚖️</div>
      <div className="page-eyebrow">404</div>
      <h1 className="page-h1">Page Not Found</h1>
      <p style={{ fontSize: 13, color: "#556", lineHeight: 1.7, marginBottom: 32 }}>
        This page doesn&rsquo;t exist — but a fair deal does.
      </p>
      <Link href="/" className="cta-btn">Back to Calculator →</Link>
    </div>
  );
}
