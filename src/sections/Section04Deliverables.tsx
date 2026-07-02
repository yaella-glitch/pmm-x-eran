import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContent } from "../ContentContext";
import { assetUrl } from "../lib/assetUrl";
import SectionLabel from "../components/SectionLabel";
import SectionNumber from "../components/SectionNumber";

const TOTAL_SECTIONS = 6;

type Item = {
  name: string;
  description?: string;
  images?: string[];
  impact?: string;
};

type Category = {
  name: string;
  items: Item[];
};

export default function Section04Deliverables() {
  const content = useContent();
  const s = content.section4_deliverables as any;
  const categories = s.categories as Category[];

  // "0.1" means category 0, item 1
  const [selection, setSelection] = useState<{ cat: number; item: number }>({ cat: 0, item: 0 });

  const activeItem = categories[selection.cat]?.items[selection.item];

  return (
    <section className="snap-section">
      <SectionNumber current={3} total={TOTAL_SECTIONS} />
      <div style={{ maxWidth: 1500, margin: "0 auto", width: "100%" }}>
        <SectionLabel>{s.label}</SectionLabel>

        {s.title && (
          <h2
            style={{
              fontSize: "clamp(44px, 5vw, 68px)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              margin: "1.25rem 0 2.5rem",
              color: "var(--color-text)",
              lineHeight: 1.05,
            }}
          >
            {s.title}
          </h2>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 0.75fr) minmax(0, 2fr)",
            gap: "2.5rem",
            alignItems: "stretch",
            marginTop: s.title ? 0 : "2rem",
            minHeight: 620,
          }}
        >
          {/* LEFT — expandable categories */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {categories.map((cat, ci) => {
              const isCatActive = ci === selection.cat;
              return (
                <div
                  key={ci}
                  style={{
                    borderTop: "0.5px solid var(--color-border)",
                    paddingTop: "1rem",
                  }}
                >
                  <button
                    onClick={() => setSelection({ cat: ci, item: 0 })}
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      padding: "0.5rem 0",
                      color: isCatActive ? "var(--color-text)" : "var(--color-text-muted)",
                      fontFamily: "inherit",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      transition: "color 0.3s",
                    }}
                  >
                    <span
                      style={{
                        fontSize: isCatActive ? 26 : 22,
                        fontWeight: 500,
                        letterSpacing: "-0.01em",
                        transition: "all 0.3s",
                      }}
                    >
                      {cat.name}
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        fontVariantNumeric: "tabular-nums",
                        color: "var(--color-text-soft)",
                        marginLeft: "0.75rem",
                      }}
                    >
                      {String(cat.items.length).padStart(2, "0")}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isCatActive && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          listStyle: "none",
                          margin: "0.75rem 0 0",
                          padding: 0,
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.4rem",
                          overflow: "hidden",
                        }}
                      >
                        {cat.items.map((it, ii) => {
                          const active = ii === selection.item;
                          return (
                            <li key={ii}>
                              <button
                                onClick={() => setSelection({ cat: ci, item: ii })}
                                style={{
                                  background: active ? "rgba(99,102,241,0.10)" : "transparent",
                                  border: active ? "0.5px solid rgba(99,102,241,0.35)" : "0.5px solid transparent",
                                  borderRadius: 12,
                                  padding: "0.85rem 1rem",
                                  cursor: "pointer",
                                  textAlign: "left",
                                  width: "100%",
                                  color: active ? "var(--color-text)" : "var(--color-text-muted)",
                                  fontFamily: "inherit",
                                  fontSize: 15,
                                  transition: "all 0.25s",
                                  display: "flex",
                                  alignItems: "baseline",
                                  gap: "0.6rem",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: 11,
                                    fontVariantNumeric: "tabular-nums",
                                    fontWeight: 600,
                                    color: active ? "var(--c-indigo)" : "var(--color-text-soft)",
                                    minWidth: 22,
                                  }}
                                >
                                  {String(ii + 1).padStart(2, "0")}
                                </span>
                                <span style={{ flex: 1, fontWeight: active ? 500 : 400 }}>
                                  {it.name}
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* RIGHT — preview: images gallery + description + impact */}
          <div
            className="gradient-frame deep-shadow"
            style={{
              padding: 0,
              overflow: "hidden",
              minHeight: 620,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selection.cat}-${selection.item}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  minHeight: 620,
                }}
              >
                {activeItem && <ItemPreview item={activeItem} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function ItemPreview({ item }: { item: Item }) {
  const [imgIdx, setImgIdx] = useState(0);
  const images = (item.images || []).filter(Boolean);
  const hasImages = images.length > 0;
  const impact = (item.impact || "").trim();

  const next = () => setImgIdx((i) => (i + 1) % Math.max(images.length, 1));
  const prev = () => setImgIdx((i) => (i - 1 + images.length) % Math.max(images.length, 1));

  return (
    <>
      {/* Card-stack image area — front card fully visible, extras peeking behind */}
      <div
        style={{
          flex: 1,
          background:
            "linear-gradient(180deg, rgba(165,138,255,0.14), rgba(99,102,241,0.10) 50%, rgba(56,189,248,0.10))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.75rem",
          minHeight: 460,
          position: "relative",
        }}
      >
        {!hasImages ? (
          <div
            style={{
              width: "100%",
              minHeight: 300,
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--color-text-soft)",
              fontSize: 13,
              border: "1px dashed var(--color-border-strong)",
            }}
          >
            <span className="font-serif-italic">
              image of {item.name.toLowerCase()}
            </span>
          </div>
        ) : (
          <ImageCardStack images={images} activeIdx={imgIdx} onClick={next} />
        )}

        {/* Prev/next arrows + dots — visible only with multiple images */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous image"
              style={arrowBtnStyle("left")}
            >
              ←
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next image"
              style={arrowBtnStyle("right")}
            >
              →
            </button>
            <div
              style={{
                position: "absolute",
                bottom: "1rem",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: 8,
                alignItems: "center",
                background: "rgba(0,0,0,0.55)",
                padding: "0.5rem 0.85rem",
                borderRadius: 999,
                backdropFilter: "blur(6px)",
              }}
            >
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setImgIdx(i); }}
                  aria-label={`Image ${i + 1}`}
                  style={{
                    width: i === imgIdx ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: i === imgIdx ? "white" : "rgba(255,255,255,0.45)",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                />
              ))}
              <span style={{ marginLeft: 6, fontSize: 11, color: "rgba(255,255,255,0.75)", fontFamily: "Figtree, sans-serif" }}>
                {imgIdx + 1} / {images.length}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Name + description + impact (impact hidden when empty) */}
      <div
        style={{
          padding: "1.5rem 2rem 1.75rem",
          borderTop: "0.5px solid var(--color-border)",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <h3
          style={{
            fontSize: 24,
            fontWeight: 500,
            margin: 0,
            color: "var(--color-text)",
            letterSpacing: "-0.01em",
          }}
        >
          {item.name}
        </h3>
        {item.description && (
          <p style={{ margin: 0, fontSize: 14, color: "var(--color-text-muted)", lineHeight: 1.5 }}>
            {item.description}
          </p>
        )}
        {impact && <ImpactBlock text={impact} />}
      </div>
    </>
  );
}

function arrowBtnStyle(side: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute",
    top: "50%",
    [side]: "1rem",
    transform: "translateY(-50%)",
    width: 42,
    height: 42,
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

function ImpactBlock({ text }: { text: string }) {
  // Split on common metric separators so we can render "metric || metric || metric"
  const parts = text
    .split(/\s*(?:·|\|\||,)\s*/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div
      style={{
        padding: "1rem 1.25rem",
        borderRadius: 12,
        background: "linear-gradient(135deg, rgba(165,138,255,0.18), rgba(56,189,248,0.10))",
        border: "0.5px solid rgba(99,102,241,0.4)",
        display: "flex",
        flexDirection: "column",
        gap: "0.6rem",
      }}
    >
      <span
        style={{
          fontSize: 11,
          color: "var(--c-indigo)",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        Impact
      </span>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "baseline",
          gap: "0.65rem 0.9rem",
        }}
      >
        {parts.map((p, i) => (
          <span key={i} style={{ display: "flex", alignItems: "baseline", gap: "0.6rem" }}>
            <span
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: "var(--color-text)",
                lineHeight: 1.35,
              }}
            >
              {p}
            </span>
            {i < parts.length - 1 && (
              <span style={{ color: "var(--c-indigo)", fontWeight: 700, opacity: 0.65 }}>||</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

function ImageCardStack({
  images,
  activeIdx,
  onClick,
}: {
  images: string[];
  activeIdx: number;
  onClick: () => void;
}) {
  // Show up to 3 stacked cards: active on top, next 2 peeking behind
  const stackCount = Math.min(3, images.length);
  const cardIndices = Array.from({ length: stackCount }, (_, i) => (activeIdx + i) % images.length);

  return (
    <div
      onClick={onClick}
      style={{
        width: "100%",
        height: "100%",
        minHeight: 300,
        position: "relative",
        cursor: images.length > 1 ? "pointer" : "default",
      }}
    >
      {cardIndices
        .slice()
        .reverse()
        .map((imgI, stackI) => {
          const depth = stackCount - 1 - stackI;
          const isFront = depth === 0;
          return (
            <motion.div
              key={`${imgI}-${stackI}`}
              layout
              initial={false}
              animate={{
                y: depth * 14,
                x: depth * 10,
                scale: 1 - depth * 0.05,
                opacity: 1 - depth * 0.35,
                rotate: depth * 2,
              }}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 14,
                background: `url(${assetUrl(images[imgI])}) top center / cover`,
                border: "0.5px solid rgba(255,255,255,0.14)",
                boxShadow: isFront
                  ? "0 20px 50px rgba(0,0,0,0.35)"
                  : "0 12px 32px rgba(0,0,0,0.22)",
                zIndex: 10 - depth,
              }}
            />
          );
        })}
    </div>
  );
}
