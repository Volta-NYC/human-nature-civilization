import { ImageResponse } from "next/og";
import { org } from "@/content/org";

export const runtime = "nodejs";
export const alt = "Human Nature & Civilization Forum Society Inc. — Queens, New York";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The social card, generated at build time from the same tokens as the site.
 * There is no photography associated with this organization, so the card is
 * built from the one thing that is unambiguously its own: the name, set against
 * the rule that divides it.
 */
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(140deg, #01060f 0%, #020a19 55%, #050f22 100%)",
          padding: "72px 80px",
          color: "#d5e0ff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 22, letterSpacing: 4, color: "#c8a24c" }}>
          <div style={{ display: "flex" }}>NEW YORK · DOS {org.dosId.value}</div>
          <div style={{ display: "flex", width: 80, height: 1, background: "rgba(213,224,255,0.3)" }} />
          <div style={{ display: "flex", color: "rgba(213,224,255,0.55)" }}>
            CHARTERED {org.formedOnLabel.value.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 104, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>
            Human Nature
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 28, margin: "18px 0" }}>
            <div style={{ display: "flex", flex: 1, height: 1, background: "rgba(213,224,255,0.25)" }} />
            <div style={{ display: "flex", fontSize: 44, color: "#c8a24c" }}>&</div>
            <div style={{ display: "flex", flex: 1, height: 1, background: "rgba(213,224,255,0.25)" }} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              fontSize: 104,
              fontWeight: 700,
              letterSpacing: -4,
              lineHeight: 1,
            }}
          >
            Civilization
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "rgba(213,224,255,0.6)" }}>
          <div style={{ display: "flex" }}>A forum society in Flushing, Queens</div>
          <div style={{ display: "flex" }}>Forum Society Inc.</div>
        </div>
      </div>
    ),
    size,
  );
}
