import { Suspense } from "react";
import { Calculator } from "./calculator";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<div style={{ padding: 32, textAlign: "center", color: "#8a8fa8" }}>Loading...</div>}>
        <Calculator />
      </Suspense>
    </main>
  );
}
