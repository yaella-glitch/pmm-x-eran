import { motion } from "framer-motion";
import { useContent } from "../ContentContext";
import SectionLabel from "../components/SectionLabel";
import SectionNumber from "../components/SectionNumber";

const TOTAL_SECTIONS = 6;

export default function Section01Hero() {
  const content = useContent();
  const s = content.section1_hero;
  return (
    <section className="snap-section" style={{ overflow: "hidden" }}>
      <div className="aurora-bg" />
      <SectionNumber current={1} total={TOTAL_SECTIONS} />

      <CenterOrb />
      <FloatingShapes />

      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          width: "100%",
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "1.7fr 1fr",
          gap: "4rem",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <SectionLabel>{s.label}</SectionLabel>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{
              fontSize: "clamp(56px, 8vw, 128px)",
              lineHeight: 0.95,
              fontWeight: 300,
              letterSpacing: "-0.04em",
              margin: "2.5rem 0 0",
              display: "flex",
              flexDirection: "column",
              gap: "0.05em",
            }}
          >
            <span>{s.title_line_1}</span>
            <span>{s.title_line_2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              marginTop: "3.5rem",
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

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="gradient-frame deep-shadow"
          style={{
            padding: "2.5rem 2.25rem",
            background: "var(--color-surface)",
            display: "flex",
            flexDirection: "column",
            gap: "1.75rem",
            position: "relative",
          }}
        >
          <p
            className="font-serif-italic"
            style={{
              fontSize: 22,
              color: "var(--color-text)",
              margin: 0,
              position: "relative",
              zIndex: 1,
            }}
          >
            → Agenda
          </p>
          <ol
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "1.4rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            {s.agenda.map((item: any, i: number) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  gap: "0.9rem",
                  alignItems: "baseline",
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    color: "var(--c-indigo)",
                    fontVariantNumeric: "tabular-nums",
                    fontWeight: 600,
                    minWidth: 22,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: "0.75rem",
                    flex: 1,
                  }}
                >
                  <span
                    style={{
                      fontSize: 17,
                      color: "var(--color-text)",
                      lineHeight: 1.3,
                    }}
                  >
                    → {item.text}
                  </span>
                  <span
                    className="font-serif-italic"
                    style={{
                      fontSize: 13,
                      color: "var(--color-text-muted)",
                      flexShrink: 0,
                    }}
                  >
                    {item.duration}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}

function CenterOrb() {
  return (
    <motion.div
      aria-hidden
      animate={{
        scale: [1, 1.08, 1],
        opacity: [0.4, 0.6, 0.4],
      }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: "absolute",
        top: "50%",
        left: "20%",
        transform: "translateY(-50%)",
        width: "45vh",
        height: "45vh",
        maxWidth: 600,
        maxHeight: 600,
        borderRadius: "50%",
        background:
          "radial-gradient(circle at 40% 40%, rgba(165,138,255,0.25), rgba(99,102,241,0.14) 40%, rgba(56,189,248,0.06) 65%, transparent 80%)",
        filter: "blur(24px)",
        pointerEvents: "none",
      }}
    />
  );
}

function FloatingShapes() {
  const dots = Array.from({ length: 22 });
  return (
    <div
      aria-hidden
      style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}
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
            animate={{ opacity: [0, 0.5, 0], scale: [0, 1, 0] }}
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
