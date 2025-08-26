import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Shopco";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 80,
          background: "#111",
          color: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: "-0.02em",
          fontWeight: 700,
        }}
      >
        Shopco
      </div>
    ),
    {
      ...size,
    }
  );
}
