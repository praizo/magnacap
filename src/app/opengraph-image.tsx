import { ImageResponse } from "next/og";
import { company } from "@/content/site";

export const alt = `${company.legalName} — Brokerage, trading and investment advisory`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#4e4f6f",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 600 }}>{company.legalName}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>
            UNLOCKING VALUE FOR YOU.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, color: "#c2c3d6" }}>
            <div style={{ width: 48, height: 6, background: "#f68f44" }} />
            Brokerage · Trading · Investment advisory
          </div>
        </div>
      </div>
    ),
    size,
  );
}
