import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContent } from "../ContentContext";
import SectionLabel from "../components/SectionLabel";
import SectionNumber from "../components/SectionNumber";
import SpotlightCard from "../components/SpotlightCard";

const ACCENTS = [
  { spotlight: "rgba(165, 138, 255, 0.28)", accent: "#a58aff" },
  { spotlight: "rgba(251, 113, 133, 0.28)", accent: "#fb7185" },
  { spotlight: "rgba(251, 191, 36, 0.28)", accent: "#fbbf24" },
];

export default function Section06Battles() {
  const content = useContent();
  const s = content.section6_battles;
  const [openId, setOpenId] = useState<string | null>(null);
  const [subIdx, setSubIdx] = useState(0);

  const open = (id: string) => {
    setOpenId(id);
    setSubIdx(0);
  };

  const active = s.battles.find((b) => b.id === openId);
  const activeIndex = s.battles.findIndex((b) => b.id === openId);
  const activeAccent = activeIndex >= 0 ? ACCENTS[activeIndex] : ACCENTS[0];

  return (
    <section className="snap-section">
      <SectionNumber current={6} total={7} />
      <div style={{ maxWidth: 1400, margin: "0 auto", width: "100%" }}>
        <SectionLabel>{s.label}</SectionLabel>

        {!openId && (
          <h2
            style={{
              fontSize: 52,
              fontWeight: 400,
              letterSpacing: "-0.02em",
              margin: "1.25rem 0 3rem",
              color: "var(--color-text)",
              lineHeight: 1.05,
            }}
          >
            {s.title}
          </h2>
        )}

        {openId && (
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "1rem",
              margin: "1.25rem 0 1.5rem",
            }}
          >
            <h2
              style={{
                fontSize: 28,
                fontWeight: 400,
                letterSpacing: "-0.01em",
                margin: 0,
                color: "var(--color-text-muted)",
                lineHeight: 1.1,
              }}
            >
              {s.title}
            </h2>
          </div>
        )}

        <AnimatePresence mode="wait">
          {!openId ? (
            <motion.div
              key="overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "2rem",
              }}
            >
              {s.battles.map((b, i) => (
                <SpotlightCard
                  key={b.id}
                  onClick={() => open(b.id)}
                  spotlightColor={ACCENTS[i].spotlight}
                  style={{ minHeight: 520 }}
                >
                  <div
                    style={{
                      padding: "3.5rem 2.75rem 2.75rem",
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      minHeight: 520,
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontSize: 40,
                          fontWeight: 400,
                          margin: 0,
                          letterSpacing: "-0.025em",
                          color: "var(--color-text)",
                          lineHeight: 1.1,
                        }}
                      >
                        {b.name}
                      </h3>
                      <p
                        style={{
                          fontSize: 18,
                          color: "var(--color-text-muted)",
                          marginTop: "1.25rem",
                          marginBottom: 0,
                          lineHeight: 1.5,
                        }}
                      >
                        {b.summary}
                      </p>
                    </div>

                    <div
                      style={{
                        marginTop: "2rem",
                        fontSize: 14,
                        color: ACCENTS[i].accent,
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                      }}
                    >
                      Read more <span>→</span>
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={`open-${openId}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.4 }}
            >
              <SpotlightCard active spotlightColor={activeAccent.spotlight}>
                <div style={{ padding: "2.5rem 3rem" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "2rem",
                      marginBottom: "1.75rem",
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontSize: 36,
                          fontWeight: 400,
                          margin: 0,
                          color: "var(--color-text)",
                          letterSpacing: "-0.02em",
                          lineHeight: 1.1,
                        }}
                      >
                        {active?.name}
                      </h3>
                      <p
                        style={{
                          fontSize: 16,
                          color: "var(--color-text-muted)",
                          margin: "0.5rem 0 0",
                        }}
                      >
                        {active?.summary}
                      </p>
                    </div>
                    <button
                      onClick={() => setOpenId(null)}
                      aria-label="close"
                      style={{
                        background: "transparent",
                        border: "0.5px solid var(--color-border-strong)",
                        borderRadius: 999,
                        padding: "0.5rem 1.1rem",
                        fontSize: 13,
                        cursor: "pointer",
                        color: "var(--color-text)",
                        fontFamily: "inherit",
                        flexShrink: 0,
                      }}
                    >
                      ← back
                    </button>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      marginBottom: "1.75rem",
                      borderBottom: "0.5px solid var(--color-border)",
                    }}
                  >
                    {active?.subviews.map((sv, i) => (
                      <button
                        key={i}
                        onClick={() => setSubIdx(i)}
                        style={{
                          background: "transparent",
                          border: "none",
                          padding: "0.7rem 1.1rem",
                          fontSize: 14,
                          color: subIdx === i ? activeAccent.accent : "var(--color-text-muted)",
                          borderBottom: subIdx === i ? `2px solid ${activeAccent.accent}` : "2px solid transparent",
                          marginBottom: "-0.5px",
                          cursor: "pointer",
                          fontFamily: "inherit",
                          fontWeight: subIdx === i ? 500 : 400,
                        }}
                      >
                        {sv.name}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={subIdx}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.25 }}
                      style={{ minHeight: 320 }}
                    >
                      <SubviewBody subview={active?.subviews[subIdx]} accent={activeAccent.accent} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </SpotlightCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function SubviewBody({ subview, accent }: { subview: any; accent: string }) {
  if (!subview) return null;

  if (subview.kind === "baseline") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {subview.goal && (
          <div
            style={{
              padding: "1.1rem 1.4rem",
              borderRadius: 14,
              background: `linear-gradient(135deg, ${accent}1a, ${accent}08)`,
              border: `0.5px solid ${accent}40`,
              display: "flex",
              gap: "1rem",
              alignItems: "baseline",
            }}
          >
            <span
              className="font-serif-italic"
              style={{ fontSize: 13, color: accent, flexShrink: 0, fontWeight: 600 }}
            >
              → goal
            </span>
            <span style={{ fontSize: 16, color: "var(--color-text)", lineHeight: 1.45 }}>
              {subview.goal}
            </span>
          </div>
        )}
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15 }}>
          <thead>
            <tr style={{ borderBottom: "0.5px solid var(--color-border-strong)" }}>
              {subview.headers.map((h: string, i: number) => (
                <th
                  key={i}
                  style={{
                    textAlign: i === 0 ? "left" : "right",
                    padding: "0.85rem 1.25rem",
                    fontWeight: 500,
                    color: accent,
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {subview.rows.map((row: string[], i: number) => (
              <tr key={i} style={{ borderBottom: "0.5px solid var(--color-border)" }}>
                {row.map((cell: string, j: number) => (
                  <td
                    key={j}
                    style={{
                      padding: "1rem 1.25rem",
                      textAlign: j === 0 ? "left" : "right",
                      fontWeight: j === 0 ? 500 : 400,
                      color: j === 0 ? "var(--color-text)" : "var(--color-text-muted)",
                      fontSize: j === 0 ? 16 : 15,
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (subview.kind === "offering") {
    const p = subview.persona;
    const grouped: Record<string, any[]> = {};
    (subview.products as any[]).forEach((pr) => {
      grouped[pr.category] = grouped[pr.category] || [];
      grouped[pr.category].push(pr);
    });
    return (
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 2fr)", gap: "1.5rem" }}>
        {/* Persona card */}
        <div
          style={{
            padding: "1.75rem",
            borderRadius: 16,
            background: `linear-gradient(160deg, ${accent}1f, ${accent}0a 70%)`,
            border: `0.5px solid ${accent}50`,
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: `linear-gradient(135deg, ${accent}, ${accent}66)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: 20,
                fontWeight: 600,
              }}
            >
              {p.name.charAt(0)}
            </div>
            <div>
              <p className="font-serif-italic" style={{ margin: 0, fontSize: 12, color: accent }}>→ persona</p>
              <h4 style={{ margin: "0.15rem 0 0", fontSize: 22, fontWeight: 500, color: "var(--color-text)" }}>
                {p.name}
              </h4>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: 14, color: "var(--color-text-muted)", lineHeight: 1.5 }}>
            {p.subtitle}
          </p>
          <div>
            <p className="font-serif-italic" style={{ margin: 0, fontSize: 12, color: accent, marginBottom: "0.5rem" }}>→ needs</p>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {p.needs.map((n: string, i: number) => (
                <li
                  key={i}
                  style={{
                    fontSize: 13,
                    color: "var(--color-text)",
                    paddingLeft: "0.75rem",
                    borderLeft: `2px solid ${accent}`,
                  }}
                >
                  {n}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-serif-italic" style={{ margin: 0, fontSize: 12, color: accent, marginBottom: "0.4rem" }}>→ value prop</p>
            <p style={{ margin: 0, fontSize: 15, color: "var(--color-text)", lineHeight: 1.45, fontWeight: 500 }}>
              {p.value_prop}
            </p>
          </div>
        </div>

        {/* Product offering */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {Object.entries(grouped).map(([category, prods]) => (
            <div key={category}>
              <p
                style={{
                  margin: 0,
                  marginBottom: "0.75rem",
                  fontSize: 11,
                  color: "var(--color-text-soft)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                {category}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${prods.length}, minmax(0, 1fr))`, gap: "0.85rem" }}>
                {prods.map((pr: any, i: number) => (
                  <div
                    key={i}
                    style={{
                      padding: "1.1rem",
                      borderRadius: 14,
                      background: "var(--color-surface-2)",
                      border: "0.5px solid var(--color-border)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.6rem",
                    }}
                  >
                    {/* Image placeholder */}
                    <div
                      style={{
                        aspectRatio: "1/1",
                        background: `linear-gradient(135deg, ${accent}30, ${accent}10)`,
                        borderRadius: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        className="font-serif-italic"
                        style={{ fontSize: 10, color: "var(--color-text-soft)" }}
                      >
                        image
                      </span>
                    </div>
                    <h5
                      style={{
                        margin: 0,
                        fontSize: 15,
                        fontWeight: 500,
                        color: "var(--color-text)",
                        lineHeight: 1.2,
                      }}
                    >
                      {pr.name}
                    </h5>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 12,
                        color: "var(--color-text-muted)",
                        lineHeight: 1.4,
                      }}
                    >
                      {pr.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (subview.kind === "journey") {
    return (
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${subview.stages.length}, minmax(0, 1fr))`, gap: "0.75rem" }}>
        {subview.stages.map((stage: any, i: number) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              position: "relative",
            }}
          >
            {/* Asset teaser placeholder */}
            <div
              style={{
                aspectRatio: "4/3",
                background: stage.asset
                  ? `url(${stage.asset}) center / cover`
                  : `linear-gradient(135deg, ${accent}28, ${accent}08)`,
                borderRadius: 12,
                border: `0.5px solid ${accent}55`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {!stage.asset && (
                <span className="font-serif-italic" style={{ fontSize: 11, color: "var(--color-text-soft)" }}>
                  asset teaser
                </span>
              )}
            </div>
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: 10,
                  color: accent,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  marginBottom: "0.25rem",
                }}
              >
                Stage {String(i + 1).padStart(2, "0")}
              </p>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: "var(--color-text)", lineHeight: 1.25 }}>
                {stage.name}
              </p>
              <p style={{ margin: "0.25rem 0 0", fontSize: 12, color: "var(--color-text-muted)" }}>
                {stage.detail}
              </p>
            </div>
            {i < subview.stages.length - 1 && (
              <span
                style={{
                  position: "absolute",
                  right: "-0.6rem",
                  top: "30%",
                  color: accent,
                  fontSize: 18,
                  zIndex: 1,
                }}
              >
                →
              </span>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <p
      style={{
        fontSize: 18,
        color: "var(--color-text)",
        lineHeight: 1.6,
        margin: 0,
        maxWidth: 820,
      }}
    >
      {subview.body}
    </p>
  );
}
