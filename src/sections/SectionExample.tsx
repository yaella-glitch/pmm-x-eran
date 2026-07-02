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
    <section
      className="snap-section"
      style={{
        overflow: "hidden",
        padding: "5rem 5rem 3rem",
        height: "100vh",
        minHeight: "100vh",
        maxHeight: "100vh",
      }}
    >
      <SectionNumber current={3} total={TOTAL_SECTIONS} />
      <div
        style={{
          maxWidth: 1500,
          margin: "0 auto",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
        }}
      >
        <SectionLabel>{s.label || "Let's take an example"}</SectionLabel>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 44px 1fr",
            gap: "1rem",
            marginTop: "1.25rem",
            alignItems: "stretch",
            flex: 1,
            minHeight: 0,
          }}
        >
          {/* LEFT — brief image */}
          <ColumnBox
            label={s.brief_label || "The brief"}
            gradient="linear-gradient(180deg, rgba(165,138,255,0.14), rgba(99,102,241,0.10) 50%, rgba(56,189,248,0.10))"
          >
            {brief ? (
              <img
                src={assetUrl(brief)}
                alt="Brief"
                style={imgStyle}
              />
            ) : (
              <EmptyMsg text="brief image" hint="drop into public/example/" />
            )}
          </ColumnBox>

          {/* CENTER — arrow */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <BigArrow />
          </div>

          {/* RIGHT — gallery */}
          <ColumnBox
            label={s.gallery_label || "What we shipped"}
            gradient="linear-gradient(180deg, rgba(56,189,248,0.14), rgba(99,102,241,0.10) 50%, rgba(165,138,255,0.14))"
            counter={gallery.length > 1 ? `${idx + 1} / ${gallery.length}` : undefined}
          >
            {gallery.length === 0 ? (
              <EmptyMsg text="gallery" hint="add paths in editor" />
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
                  style={imgStyle}
                />
              </AnimatePresence>
            )}
            {gallery.length > 1 && (
              <>
                <button onClick={prev} aria-label="Previous" style={arrowBtnStyle("left")}>←</button>
                <button onClick={next} aria-label="Next" style={arrowBtnStyle("right")}>→</button>
              </>
            )}
          </ColumnBox>
        </div>
      </div>
    </section>
  );
}

const imgStyle: React.CSSProperties = {
  maxWidth: "100%",
  maxHeight: "100%",
  width: "auto",
  height: "auto",
  objectFit: "contain",
  borderRadius: 10,
  display: "block",
};

function ColumnBox({
  label,
  gradient,
  counter,
  children,
}: {
  label: string;
  gradient: string;
  counter?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", minHeight: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexShrink: 0 }}>
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
          {label}
        </p>
        {counter && (
          <span
            className="font-serif-italic"
            style={{ fontSize: 12, color: "var(--color-text-muted)" }}
          >
            {counter}
          </span>
        )}
      </div>
      <div
        className="gradient-frame deep-shadow"
        style={{
          background: gradient,
          padding: "0.75rem",
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
        {children}
      </div>
    </div>
  );
}

function EmptyMsg({ text, hint }: { text: string; hint: string }) {
  return (
    <span
      className="font-serif-italic"
      style={{ fontSize: 13, color: "var(--color-text-soft)", textAlign: "center" }}
    >
      {text}
      <br />
      <span style={{ fontSize: 11 }}>{hint}</span>
    </span>
  );
}

function BigArrow() {
  return (
    <motion.svg
      width="44"
      height="24"
      viewBox="0 0 44 24"
      animate={{ x: [0, 6, 0] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <path
        d="M 0 12 L 36 12 M 28 5 L 36 12 L 28 19"
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
    width: 38,
    height: 38,
    borderRadius: 999,
    background: "rgba(0,0,0,0.55)",
    border: "0.5px solid rgba(255,255,255,0.2)",
    color: "white",
    fontSize: 16,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "inherit",
    backdropFilter: "blur(6px)",
    zIndex: 10,
  };
}
