import { useContent } from "../ContentContext";
import SectionLabel from "../components/SectionLabel";
import SectionNumber from "../components/SectionNumber";
import ParticleFlow from "../components/ParticleFlow";

const TOTAL_SECTIONS = 8;

export default function Section03WhatIsPMM() {
  const content = useContent();
  const s = content.section3_what_is_pmm;
  return (
    <section className="snap-section">
      <SectionNumber current={2} total={TOTAL_SECTIONS} />
      <div style={{ maxWidth: 1600, margin: "0 auto", width: "100%" }}>
        <SectionLabel>{s.label}</SectionLabel>

        <h2
          style={{
            fontSize: "clamp(40px, 4.5vw, 60px)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            margin: "1.5rem 0 2.5rem",
            color: "var(--color-text)",
            lineHeight: 1.1,
          }}
        >
          {s.title}
        </h2>

        <div
          className="gradient-frame deep-shadow"
          style={{
            padding: "2rem 2.5rem",
            background: "var(--color-surface)",
            overflow: "hidden",
          }}
        >
          <ParticleFlow />
        </div>
      </div>
    </section>
  );
}
