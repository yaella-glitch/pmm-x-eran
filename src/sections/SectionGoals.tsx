import { motion } from "framer-motion";
import { useContent } from "../ContentContext";
import SectionLabel from "../components/SectionLabel";
import SectionNumber from "../components/SectionNumber";

const TOTAL_SECTIONS = 8;

export default function SectionGoals() {
  const content = useContent();
  const s = (content as any).section_goals || {};
  const goals: Array<{ name: string }> = s.goals || [];

  return (
    <section
      className="snap-section"
      style={{
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      <SectionNumber current={4} total={TOTAL_SECTIONS} />
      <div className="aurora-bg" />

      <div
        style={{
          maxWidth: 1500,
          margin: "0 auto",
          width: "100%",
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "3rem",
        }}
      >
        <SectionLabel>{s.title || "our goals"}</SectionLabel>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${goals.length}, minmax(0, 1fr))`,
            gap: "1.5rem",
          }}
        >
          {goals.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="gradient-frame deep-shadow"
              style={{
                padding: "2.25rem 2rem",
                background: "var(--color-surface)",
                minHeight: 220,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "1.25rem",
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  color: "var(--c-amber)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                {`0${i + 1}`}
              </span>
              <h3
                style={{
                  margin: 0,
                  fontSize: "clamp(24px, 2.4vw, 32px)",
                  fontWeight: 500,
                  color: "var(--color-text)",
                  letterSpacing: "-0.015em",
                  lineHeight: 1.15,
                }}
              >
                {g.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
