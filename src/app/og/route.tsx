import { ImageResponse } from "next/og";

const WIDTH = 1200;
const HEIGHT = 630;

function clampParam(value: string | null, fallback: string, max = 90): string {
  const v = (value ?? "").replace(/\s+/g, " ").trim();
  return (v ? v : fallback).slice(0, max);
}

const ACCENTS: Record<string, { badge: string; label: string }> = {
  default: { badge: "#fbbf24", label: "BOOTSTRAPPED" },
  product: { badge: "#38bdf8", label: "PRODUCT" },
  aitlas: { badge: "#a78bfa", label: "AITLAS" },
};

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const variant = searchParams.get("variant") ?? "default";
  const accent = ACCENTS[variant] ?? ACCENTS.default;
  const isDefault = variant !== "product" && variant !== "aitlas";

  const title = clampParam(searchParams.get("title"), "Build software that works.");
  const subtitle = clampParam(
    searchParams.get("subtitle"),
    "Digital Venture Studio & Sovereign AI Ecosystem",
    140,
  );

  return new ImageResponse(
    <div
      style={{
        width: WIDTH,
        height: HEIGHT,
        display: "flex",
        flexDirection: "column",
        background: "#0d0d0d",
        padding: "80px 100px",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -200,
          right: -100,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(251,191,36,0.18) 0%, rgba(251,191,36,0) 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -100,
          left: -50,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.14) 0%, rgba(59,130,246,0) 70%)",
        }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 16,
            background: "white",
            color: "#0d0d0d",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 48,
            fontWeight: 700,
            fontFamily: "serif",
          }}
        >
          F
        </div>
        <div
          style={{
            color: "white",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "0.05em",
          }}
        >
          FURMA.TECH
        </div>
      </div>
      <div
        style={{
          marginTop: 90,
          fontFamily: "serif",
          fontSize: isDefault ? 84 : 76,
          fontWeight: 700,
          color: "white",
          lineHeight: 1.1,
        }}
      >
        {title}
      </div>
      <div
        style={{
          marginTop: 28,
          fontSize: 26,
          color: "#808080",
          lineHeight: 1.3,
        }}
      >
        {subtitle}
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: "auto" }}>
        <div
          style={{
            padding: "8px 24px",
            borderRadius: 999,
            background: `${accent.badge}1a`,
            border: `1px solid ${accent.badge}33`,
            color: accent.badge,
            fontSize: 14,
            fontWeight: 700,
            fontFamily: "monospace",
            letterSpacing: "0.08em",
          }}
        >
          {accent.label}
        </div>
        <div
          style={{
            padding: "8px 24px",
            borderRadius: 999,
            background: "#10b9811a",
            border: "1px solid #10b98133",
            color: "#10b981",
            fontSize: 14,
            fontWeight: 700,
            fontFamily: "monospace",
            letterSpacing: "0.08em",
          }}
        >
          EU BASED
        </div>
      </div>
    </div>,
    { width: WIDTH, height: HEIGHT },
  );
}
