import { motion } from "framer-motion";
import { useContent } from "../ContentContext";
import SectionNumber from "../components/SectionNumber";

const TOTAL_SECTIONS = 6;

export default function SectionVerticalsDivider() {
  const content = useContent();
  const s = (content as any).section5_verticals_divider;
  return (
    <section
      className="snap-section"
      style={{
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <SectionNumber current={4} total={TOTAL_SECTIONS} />
      <div className="aurora-bg" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        <p
          className="font-serif-italic"
          style={{
            fontSize: "clamp(56px, 8vw, 120px)",
            color: "var(--color-text)",
            margin: 0,
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          {s?.title || "Verticals zoom-in"}
        </p>
      </motion.div>
    </section>
  );
}
