import { motion } from "framer-motion";
import { useContent } from "../ContentContext";
import SectionLabel from "../components/SectionLabel";
import SectionNumber from "../components/SectionNumber";

export default function Section05Challenges() {
  const content = useContent();
  const s = content.section5_challenges;
  return (
    <section className="snap-section">
      <SectionNumber current={5} total={7} />
      <div style={{ maxWidth: 1400, margin: "0 auto", width: "100%" }}>
        <SectionLabel>{s.label}</SectionLabel>
        <h2
          style={{
            fontSize: 52,
            fontWeight: 400,
            letterSpacing: "-0.02em",
            margin: "1.25rem 0 2.5rem",
            color: "var(--color-text)",
            lineHeight: 1.1,
            maxWidth: 1100,
          }}
        >
          {s.title}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 60px 1.3fr",
            gap: "1.25rem",
            marginBottom: "0.75rem",
          }}
        >
          <div
            className="font-serif-italic"
            style={{
              fontSize: "14px",
              color: "var(--color-text-soft)",
              paddingLeft: "0.25rem",
            }}
          >
            → Marketing challenges
          </div>
          <div />
          <div
            className="font-serif-italic"
            style={{
              fontSize: "14px",
              color: "var(--c-indigo)",
              paddingLeft: "0.25rem",
            }}
          >
            → How PMM solves it
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {s.rows.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 60px 1.3fr",
                gap: "1.25rem",
                alignItems: "stretch",
              }}
            >
              <div
                className="frame"
                style={{
                  padding: "1.25rem 1.75rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p style={{ fontSize: 20, fontWeight: 500, margin: 0, color: "var(--color-text)", lineHeight: 1.35 }}>
                  {row.challenge}
                </p>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Arrow />
              </div>

              <div
                style={{
                  padding: "1.25rem 1.75rem",
                  borderRadius: 22,
                  background: "linear-gradient(135deg, rgba(165,138,255,0.09), rgba(99,102,241,0.07))",
                  border: "0.5px solid rgba(99,102,241,0.28)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p style={{ fontSize: 18, margin: 0, color: "var(--color-text)", lineHeight: 1.5 }}>
                  {row.solution}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <motion.svg
      width="44"
      height="22"
      viewBox="0 0 44 22"
      animate={{ x: [0, 6, 0] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <path
        d="M 0 11 L 38 11 M 30 4 L 38 11 L 30 18"
        fill="none"
        stroke="#6366f1"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}
