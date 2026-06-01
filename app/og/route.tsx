import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0d0f14",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Border accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(to right, #f4a460, #e8d5a3, #a8d8ea)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(to right, #a8d8ea, #e8d5a3, #f4a460)",
          }}
        />

        {/* Pokéball decoration */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            border: "40px solid #e8d5a310",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 240,
            height: 240,
            borderRadius: "50%",
            border: "30px solid #a8d8ea10",
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0 80px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 18,
              color: "#8a8fa8",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            Free Tool for Buyers & Sellers
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: "#e8d5a3",
              lineHeight: 1,
              letterSpacing: "0.02em",
              marginBottom: 16,
            }}
          >
            TCG Fair
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: "#e8e0d0",
              lineHeight: 1,
              letterSpacing: "0.02em",
              marginBottom: 32,
            }}
          >
            Deal Calculator
          </div>

          {/* Pills */}
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
            {["eBay Fees", "Sales Tax", "Shipping", "Cash Deals"].map((item) => (
              <div
                key={item}
                style={{
                  background: "#141620",
                  border: "1px solid #2a2d3a",
                  borderRadius: 8,
                  padding: "8px 20px",
                  color: "#a8d8ea",
                  fontSize: 20,
                }}
              >
                {item}
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 40,
              fontSize: 22,
              color: "#6a6f88",
            }}
          >
            tcgfair.com
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
