import { useContent } from "../ContentContext";
import SectionLabel from "../components/SectionLabel";
import SectionNumber from "../components/SectionNumber";
import ParticleFlow from "../components/ParticleFlow";

export default function Section03WhatIsPMM() {
  const content = useContent();
  const s = content.section3_what_is_pmm;
  return (
    <section className="snap-section">
      <SectionNumber current={3} total={7} />
      <div style={{ maxWidth: 1500, margin: "0 auto", width: "100%" }}>
        <SectionLabel>{s.label}</SectionLabel>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.6fr",
            gap: "4rem",
            marginTop: "3rem",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              textAlign: "left",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(40px, 4.2vw, 56px)",
                lineHeight: 1.1,
                fontWeight: 500,
                letterSpacing: "-0.02em",
                margin: 0,
                color: "var(--color-text)",
              }}
            >
              {s.title}
            </h2>
            <p
              className="font-serif-italic"
              style={{
                fontSize: "22px",
                color: "var(--color-text-muted)",
                marginTop: "1.75rem",
                marginBottom: 0,
                lineHeight: 1.5,
                maxWidth: 540,
              }}
            >
              {s.subtitle}
            </p>
          </div>

          <div
            className="gradient-frame deep-shadow"
            style={{
              padding: "2.5rem 2.5rem 2rem",
              overflow: "hidden",
              background: "var(--color-surface)",
            }}
          >
            <ParticleFlow />
          </div>
        </div>
      </div>
    </section>
  );
}
