import { motion } from "framer-motion";
import { useContent } from "../ContentContext";
import SectionNumber from "../components/SectionNumber";

const TOTAL_SECTIONS = 6;

export default function Section07Closing() {
  const content = useContent();
  const s = content.section7_closing;
  return (
    <section
      className="snap-section"
      style={{
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SectionNumber current={6} total={TOTAL_SECTIONS} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          textAlign: "center",
          position: "relative",
        }}
      >
        <h1
          className="gradient-text"
          style={{
            fontSize: "clamp(96px, 14vw, 200px)",
            fontWeight: 300,
            letterSpacing: "-0.03em",
            margin: 0,
            lineHeight: 0.95,
          }}
        >
          {s.title}
        </h1>
        <p
          className="font-serif-italic"
          style={{
            fontSize: 22,
            color: "var(--color-text-muted)",
            marginTop: "2rem",
            marginBottom: 0,
          }}
        >
          {s.subtitle}
        </p>
      </motion.div>

      <GlowHorizon />
    </section>
  );
}

function GlowHorizon() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        bottom: "-25vh",
        left: "-10%",
        width: "120%",
        height: "50vh",
        background:
          "radial-gradient(ellipse 50% 100% at 50% 100%, rgba(165,138,255,0.20), rgba(99,102,241,0.08) 30%, transparent 70%)",
        pointerEvents: "none",
      }}
    />
  );
}
