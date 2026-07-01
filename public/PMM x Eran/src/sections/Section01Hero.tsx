import { motion } from "framer-motion";
import { useContent } from "../ContentContext";
import SectionLabel from "../components/SectionLabel";
import SectionNumber from "../components/SectionNumber";

export default function Section01Hero() {
  const content = useContent();
  const s = content.section1_hero;
  return (
    <section className="snap-section" style={{ overflow: "hidden" }}>
      <div className="aurora-bg" />
      <SectionNumber current={1} total={7} />

      {/* Background orb behind title */}
      <CenterOrb />
      <FloatingShapes />

      <div
        style={{
          maxWidth: 1300,
          margin: "0 auto",
          width: "100%",
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <SectionLabel>{s.label}</SectionLabel>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            fontSize: "clamp(80px, 13vw, 200px)",
            lineHeight: 0.92,
            fontWeight: 300,
            letterSpacing: "-0.045em",
            margin: "4rem 0 0",
            display: "flex",
            alignItems: "center",
            gap: "0.3em",
            flexWrap: "wrap",
          }}
        >
          <span>PMM</span>
          <HeartGlyph />
          <span>Eran</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            marginTop: "4.5rem",
            fontSize: "14px",
            color: "var(--color-text-muted)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          {s.date}
        </motion.p>
      </div>
    </section>
  );
}

function HeartGlyph() {
  return (
    <motion.svg
      width="0.42em"
      height="0.42em"
      viewBox="0 0 24 24"
      animate={{ scale: [1, 1.12, 1] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <path
        d="M12 21s-7-4.534-9.5-9C1 9 2.5 5 6.5 5 9 5 11 6.5 12 8c1-1.5 3-3 5.5-3 4 0 5.5 4 4 7-2.5 4.466-9.5 9-9.5 9z"
        fill="currentColor"
      />
    </motion.svg>
  );
}

function CenterOrb() {
  return (
    <motion.div
      aria-hidden
      animate={{
        scale: [1, 1.08, 1],
        opacity: [0.5, 0.7, 0.5],
      }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: "absolute",
        top: "50%",
        right: "10%",
        transform: "translateY(-50%)",
        width: "55vh",
        height: "55vh",
        maxWidth: 700,
        maxHeight: 700,
        borderRadius: "50%",
        background:
          "radial-gradient(circle at 35% 35%, rgba(165,138,255,0.30), rgba(99,102,241,0.18) 35%, rgba(56,189,248,0.08) 60%, transparent 75%)",
        filter: "blur(20px)",
        pointerEvents: "none",
      }}
    />
  );
}

function FloatingShapes() {
  const dots = Array.from({ length: 28 });
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {dots.map((_, i) => {
        const left = (i * 37 + 13) % 100;
        const top = (i * 53 + 7) % 100;
        const delay = (i % 7) * 0.5;
        const size = 2 + (i % 3);
        const color =
          i % 4 === 0
            ? "var(--c-violet)"
            : i % 4 === 1
            ? "var(--c-sky)"
            : i % 4 === 2
            ? "var(--c-indigo)"
            : "var(--c-amber)";
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0.55, 0], scale: [0, 1, 0] }}
            transition={{
              duration: 3.5 + (i % 3),
              repeat: Infinity,
              delay,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              borderRadius: "50%",
              background: color,
              boxShadow: `0 0 10px ${color}`,
            }}
          />
        );
      })}
    </div>
  );
}
