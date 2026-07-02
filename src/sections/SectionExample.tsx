import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContent } from "../ContentContext";
import { assetUrl } from "../lib/assetUrl";
import SectionLabel from "../components/SectionLabel";
import SectionNumber from "../components/SectionNumber";

const TOTAL_SECTIONS = 7;

export default function SectionExample() {
  const content = useContent();
  const s = (content as any).section_example || {};
  const gallery: string[] = (s.gallery || []).filter(Boolean);
  const brief: string = s.brief_image || "";
  const [idx, setIdx] = useState(0);
  const next = () => setIdx((i) => (i + 1) % Math.max(gallery.length, 1));
  const prev = () => setIdx((i) => (i - 1 + gallery.length) % Math.max(gallery.length, 1));

  return (
    <section className="snap-section">
      <SectionNumber current={3} total={TOTAL_SECTIONS} />
      <div style={{ maxWidth: 1400, margin: "0 auto", width: "100%" }}>
        <SectionLabel>{s.label || "Let's take an example"}</SectionLabel>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 48px 1fr",
            gap: "1rem",
            marginTop: "2rem",
            alignItems: "stretch",
            maxHeight: "calc(100vh - 14rem)",
          }}
        >
          {/* LEFT — brief image */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
            <p
              style={{
                margin: 0,
                fontSize: 11,
                color: "var(--c-amber)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              {s.brief_label || "The brief"}
            </p>
            <div
              className="gradient-frame deep-shadow"
              style={{
                background:
                  "linear-gradient(180deg, rgba(165,138,255,0.14), rgba(99,102,241,0.10) 50%, rgba(56,189,248,0.10))",
                padding: "0.85rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                minHeight: 0,
                width: "100%",
                boxSizing: "border-box",
                overflow: "hidden",
              }}
            >
              {brief ? (
                <img
                  src={assetUrl(brief)}
                  alt="Brief"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                    borderRadius: 12,
                    display: "block",
                  }}
                />
              ) : (
                <span
                  className="font-serif-italic"
                  style={{
                    fontSize: 13,
                    color: "var(--color-text-soft)",
                    textAlign: "center",
                  }}
                >
                  brief image
                  <br />
                  <span style={{ fontSize: 11 }}>
                    drop into public/example/, then set path in editor
                  </span>
                </span>
              )}
            </div>
          </div>

          {/* CENTER — arrow */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <BigArrow />
          </div>

          {/* RIGHT — gallery of shipped assets */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <p
                style={{
                  margin: 0,
                  fontSize: 11,
                  color: "var(--c-amber)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                {s.gallery_label || "What we shipped"}
              </p>
              {gallery.length > 1 && (
                <span
                  className="font-serif-italic"
                  style={{
                    fontSize: 12,
                    color: "var(--color-text-muted)",
                  }}
                >
                  {idx + 1} / {gallery.length}
                </span>
              )}
            </div>
            <div
              className="gradient-frame deep-shadow"
              style={{
                background:
                  "linear-gradient(180deg, rgba(56,189,248,0.14), rgba(99,102,241,0.10) 50%, rgba(165,138,255,0.14))",
                padding: "0.85rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                minHeight: 0,
                width: "100%",
                boxSizing: "border-box",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {gallery.length === 0 ? (
                <span
                  className="font-serif-italic"
                  style={{
                    fontSize: 13,
                    color: "var(--color-text-soft)",
                    textAlign: "center",
                  }}
                >
                  gallery
                  <br />
                  <span style={{ fontSize: 11 }}>
                    drop images into public/example/, add paths in editor
                  </span>
                </span>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.img
                    key={idx}
                    src={assetUrl(gallery[idx])}
                    alt={`Asset ${idx + 1}`}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      width: "auto",
                      height: "auto",
                      objectFit: "contain",
                      borderRadius: 12,
                      display: "block",
                    }}
                  />
                </AnimatePresence>
              )}

              {gallery.length > 1 && (
                <>
                  <button onClick={prev} aria-label="Previous" style={arrowBtnStyle("left")}>
                    ←
                  </button>
                  <button onClick={next} aria-label="Next" style={arrowBtnStyle("right")}>
                    →
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BigArrow() {
  return (
    <motion.svg
      width="48"
      height="24"
      viewBox="0 0 48 24"
      animate={{ x: [0, 6, 0] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <path
        d="M 0 12 L 40 12 M 32 5 L 40 12 L 32 19"
        fill="none"
        stroke="var(--c-amber)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

function arrowBtnStyle(side: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute",
    top: "50%",
    [side]: "0.75rem",
    transform: "translateY(-50%)",
    width: 40,
    height: 40,
    borderRadius: 999,
    background: "rgba(0,0,0,0.55)",
    border: "0.5px solid rgba(255,255,255,0.2)",
    color: "white",
    fontSize: 18,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "inherit",
    backdropFilter: "blur(6px)",
    zIndex: 10,
  };
}
