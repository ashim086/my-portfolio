import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ashim Thapa Magar — Full-Stack Web Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)",
          fontFamily: "sans-serif",
          color: "#ffffff",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: 72,
              fontWeight: 800,
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: "-2px",
            }}
          >
            Ashim Thapa Magar
          </h1>
          <p
            style={{
              fontSize: 36,
              color: "#94a3b8",
              margin: "16px 0 0 0",
              fontWeight: 400,
            }}
          >
            Full-Stack Web Developer
          </p>
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "32px",
              fontSize: 22,
              color: "#64748b",
            }}
          >
            <span>React</span>
            <span>·</span>
            <span>Next.js</span>
            <span>·</span>
            <span>Node.js</span>
            <span>·</span>
            <span>MongoDB</span>
            <span>·</span>
            <span>TypeScript</span>
          </div>
          <p
            style={{
              fontSize: 24,
              color: "#38bdf8",
              marginTop: "40px",
              fontWeight: 600,
            }}
          >
            ashimmagar.com.np
          </p>
        </div>
      </div>
    ),
    { ...size }
  );
}
