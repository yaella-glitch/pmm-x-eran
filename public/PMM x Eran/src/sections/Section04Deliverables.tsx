import { useState } from "react";
import { motion } from "framer-motion";
import { useContent } from "../ContentContext";
import SectionLabel from "../components/SectionLabel";
import SectionNumber from "../components/SectionNumber";

export default function Section04Deliverables() {
  const content = useContent();
  const s = content.section4_deliverables;
  const items = s.items;
  const [idx, setIdx] = useState(0);

  const next = () => setIdx((i) => Math.min(i + 1, items.length - 1));
  const prev = () => setIdx((i) => Math.max(i - 1, 0));

  return (
    <section className="snap-section" style={{ overflow: "hidden" }}>
      <SectionNumber current={4} total={7} />
      <div style={{ maxWidth: 1500, margin: "0 auto", width: "100%" }}>
        <SectionLabel>{s.label}</SectionLabel>

        <div style={{ marginTop: "3rem", position: "relative" }}>
          {/* Carousel viewport */}
          <div style={{ overflow: "hidden", padding: "1rem 0" }}>
            <motion.div
              animate={{ x: `calc(${-idx} * (28rem + 1.5rem))` }}
              transition={{ type: "spring", stiffness: 220, damping: 28 }}
              style={{
                display: "flex",
                gap: "1.5rem",
                width: "max-content",
                paddingLeft: "0.25rem",
              }}
            >
              {items.map((item, i) => {
                const isActive = i === idx;
                return (
                  <motion.div
                    key={i}
                    animate={{
                      scale: isActive ? 1 : 0.94,
                      opacity: isActive ? 1 : 0.55,
                    }}
                    transition={{ duration: 0.35 }}
                    onClick={() => setIdx(i)}
                    style={{
                      flex: "0 0 28rem",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      className={isActive ? "gradient-frame deep-shadow" : "frame"}
                      style={{
                        padding: 0,
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        height: 520,
                      }}
                    >
                      {/* Tall image */}
                      <div
                        style={{
                          flex: 1,
                          background:
                            "linear-gradient(180deg, rgba(165,138,255,0.18), rgba(99,102,241,0.12) 50%, rgba(56,189,248,0.12))",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "1.5rem",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            background: item.image
                              ? `url(${item.image}) center / cover`
                              : "transparent",
                            borderRadius: 12,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "var(--color-text-soft)",
                            fontSize: 13,
                            border: item.image
                              ? "none"
                              : "1px dashed var(--color-border-strong)",
                          }}
                        >
                          {!item.image && (
                            <span className="font-serif-italic">
                              image of {item.name.toLowerCase()}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Name + KPI strip */}
                      <div
                        style={{
                          padding: "1.5rem 1.75rem",
                          borderTop: "0.5px solid var(--color-border)",
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.5rem",
                        }}
                      >
                        <h3
                          style={{
                            fontSize: 22,
                            fontWeight: 500,
                            margin: 0,
                            color: "var(--color-text)",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {item.name}
                        </h3>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "baseline",
                            gap: "1rem",
                          }}
                        >
                          <p
                            style={{
                              margin: 0,
                              fontSize: 13,
                              color: "var(--color-text-muted)",
                            }}
                          >
                            {item.kpi_detail}
                          </p>
                          <div
                            className="brand-accent"
                            style={{
                              fontSize: 32,
                              fontWeight: 600,
                              letterSpacing: "-0.02em",
                              lineHeight: 1,
                              flexShrink: 0,
                            }}
                          >
                            {item.kpi}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Arrows + dots */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.25rem",
              marginTop: "2rem",
            }}
          >
            <button
              onClick={prev}
              disabled={idx === 0}
              aria-label="Previous"
              style={{
                background: "transparent",
                border: "0.5px solid var(--color-border-strong)",
                borderRadius: "50%",
                width: 44,
                height: 44,
                cursor: idx === 0 ? "not-allowed" : "pointer",
                opacity: idx === 0 ? 0.35 : 1,
                color: "var(--color-text)",
                fontFamily: "inherit",
                fontSize: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ←
            </button>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`Go to ${i + 1}`}
                  style={{
                    width: i === idx ? 32 : 10,
                    height: 10,
                    borderRadius: 5,
                    background:
                      i === idx
                        ? "linear-gradient(90deg, var(--c-violet), var(--c-indigo))"
                        : "var(--color-border-strong)",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                />
              ))}
            </div>
            <button
              onClick={next}
              disabled={idx === items.length - 1}
              aria-label="Next"
              style={{
                background: "transparent",
                border: "0.5px solid var(--color-border-strong)",
                borderRadius: "50%",
                width: 44,
                height: 44,
                cursor: idx === items.length - 1 ? "not-allowed" : "pointer",
                opacity: idx === items.length - 1 ? 0.35 : 1,
                color: "var(--color-text)",
                fontFamily: "inherit",
                fontSize: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
