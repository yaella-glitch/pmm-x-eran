import { motion } from "framer-motion";
import { useContent } from "../ContentContext";
import SectionLabel from "../components/SectionLabel";
import SectionNumber from "../components/SectionNumber";

export default function Section07Closing() {
  const content = useContent();
  const s = content.section7_closing;
  return (
    <section className="snap-section" style={{ overflow: "hidden" }}>
      <SectionNumber current={7} total={7} />
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          width: "100%",
          position: "relative",
        }}
      >
        <SectionLabel>{s.label}</SectionLabel>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ marginTop: "3rem", maxWidth: 1100 }}
        >
          <h2
            className="gradient-text"
            style={{
              fontSize: "clamp(56px, 8vw, 112px)",
              fontWeight: 400,
              letterSpacing: "-0.03em",
              margin: 0,
              lineHeight: 1.05,
              textAlign: "left",
            }}
          >
            {s.title}
          </h2>

          <p
            className="font-serif-italic"
            style={{
              fontSize: "26px",
              color: "var(--color-text-muted)",
              marginTop: "2.5rem",
              marginBottom: 0,
              textAlign: "left",
            }}
          >
            {s.subtitle}
          </p>
        </motion.div>

        <GlowHorizon />
      </div>
    </section>
  );
}

function GlowHorizon() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        bottom: "-30vh",
        left: "-10%",
        width: "120%",
        height: "50vh",
        background:
          "radial-gradient(ellipse 50% 100% at 30% 100%, rgba(165,138,255,0.18), rgba(99,102,241,0.08) 30%, transparent 70%)",
        pointerEvents: "none",
      }}
    />
  );
}
