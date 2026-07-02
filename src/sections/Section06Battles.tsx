import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContent } from "../ContentContext";
import { assetUrl } from "../lib/assetUrl";
import SectionLabel from "../components/SectionLabel";
import SectionNumber from "../components/SectionNumber";

const TOTAL_SECTIONS = 8;
const ACCENT = "#6366f1";

export default function Section06Battles() {
  const content = useContent();
  const s = content.section6_battles as any;
  const battle = s.battle;
  const [subIdx, setSubIdx] = useState(0);

  return (
    <section className="snap-section">
      <SectionNumber current={7} total={TOTAL_SECTIONS} />
      <div style={{ maxWidth: 1500, margin: "0 auto", width: "100%" }}>
        <SectionLabel>{s.label}</SectionLabel>

        <div
          className="gradient-frame deep-shadow"
          style={{
            marginTop: "1.5rem",
            padding: "1.5rem 2rem",
            background: "var(--color-surface)",
          }}
        >
          {/* Sub-view tabs only — no big title/summary */}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              marginBottom: "2.75rem",
              borderBottom: "0.5px solid var(--color-border)",
            }}
          >
            {battle.subviews.map((sv: any, i: number) => (
              <button
                key={i}
                onClick={() => setSubIdx(i)}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: "0.75rem 1.2rem",
                  fontSize: 15,
                  color: subIdx === i ? ACCENT : "var(--color-text-muted)",
                  borderBottom: subIdx === i ? `2px solid ${ACCENT}` : "2px solid transparent",
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
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
              style={{ minHeight: 340 }}
            >
              <SubviewBody subview={battle.subviews[subIdx]} accent={ACCENT} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function JourneyView({ subview, accent }: { subview: any; accent: string }) {
  const [zoomed, setZoomed] = useState<string | null>(null);
  const stages: Array<{ name: string; detail?: string; asset?: string }> = subview.stages || [];
  const title = subview.title;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      {title && (
        <p
          style={{
            fontSize: "clamp(24px, 2.5vw, 32px)",
            fontWeight: 400,
            color: "var(--color-text)",
            margin: 0,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            maxWidth: 1100,
          }}
        >
          {title}
        </p>
      )}
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))`, gap: "1rem" }}>
        {stages.map((stage, i) => {
          const src = stage.asset ? assetUrl(stage.asset) : "";
          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: "0.75rem", position: "relative" }}>
              <button
                type="button"
                onClick={() => src && setZoomed(src)}
                disabled={!src}
                style={{
                  padding: 0,
                  border: `0.5px solid ${accent}55`,
                  borderRadius: 12,
                  background: `linear-gradient(135deg, ${accent}18, ${accent}05)`,
                  aspectRatio: "4/3",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  cursor: src ? "zoom-in" : "default",
                  fontFamily: "inherit",
                }}
              >
                {src ? (
                  <img
                    src={src}
                    alt={stage.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top center",
                      display: "block",
                    }}
                  />
                ) : (
                  <span className="font-serif-italic" style={{ fontSize: 11, color: "var(--color-text-soft)" }}>
                    drop asset here
                  </span>
                )}
              </button>
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
                <p style={{ margin: 0, fontSize: 16, fontWeight: 500, color: "var(--color-text)", lineHeight: 1.25 }}>
                  {stage.name}
                </p>
                {stage.detail && (
                  <p style={{ margin: "0.25rem 0 0", fontSize: 12, color: "var(--color-text-muted)" }}>
                    {stage.detail}
                  </p>
                )}
              </div>
              {i < stages.length - 1 && (
                <span
                  style={{
                    position: "absolute",
                    right: "-0.65rem",
                    top: "25%",
                    color: accent,
                    fontSize: 20,
                    zIndex: 1,
                  }}
                >
                  →
                </span>
              )}
            </div>
          );
        })}
      </div>

      <Lightbox src={zoomed} onClose={() => setZoomed(null)} />
    </div>
  );
}

function Lightbox({ src, onClose }: { src: string | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 300,
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "3rem",
            cursor: "zoom-out",
          }}
        >
          <motion.img
            initial={{ scale: 0.94 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.94 }}
            transition={{ duration: 0.25 }}
            src={src}
            alt="Zoomed"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              borderRadius: 12,
              boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              position: "fixed",
              top: 24,
              right: 24,
              width: 44,
              height: 44,
              borderRadius: 999,
              background: "rgba(255,255,255,0.1)",
              border: "0.5px solid rgba(255,255,255,0.3)",
              color: "white",
              fontSize: 22,
              cursor: "pointer",
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(8px)",
              zIndex: 301,
            }}
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function BaselineSplit({ subview, accent }: { subview: any; accent: string }) {
  const [which, setWhich] = useState<"no_touch" | "touch">("no_touch");
  const tables = subview.tables || {};
  const t = tables[which] || {};
  const headers: string[] = t.headers || [];
  const rows: string[][] = t.rows || [];
  const totalArrIdx = headers.findIndex((h) => /total arr/i.test(h));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div
        style={{
          display: "inline-flex",
          gap: "0.35rem",
          padding: "0.3rem",
          background: "var(--color-surface-2)",
          borderRadius: 999,
          border: "0.5px solid var(--color-border)",
          alignSelf: "flex-start",
        }}
      >
        {(["no_touch", "touch"] as const).map((key) => {
          const active = which === key;
          return (
            <button
              key={key}
              onClick={() => setWhich(key)}
              style={{
                background: active ? accent : "transparent",
                color: active ? "white" : "var(--color-text-muted)",
                border: "none",
                borderRadius: 999,
                padding: "0.45rem 1.1rem",
                fontSize: 13,
                fontFamily: "inherit",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {tables[key]?.label || key.replace("_", " ")}
            </button>
          );
        })}
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
        <thead>
          <tr style={{ borderBottom: "0.5px solid var(--color-border-strong)" }}>
            {headers.map((h, i) => (
              <th
                key={i}
                style={{
                  textAlign: i === 0 ? "left" : "right",
                  padding: "0.75rem 1rem",
                  fontWeight: 500,
                  color: i === totalArrIdx ? "var(--c-amber)" : accent,
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
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: "0.5px solid var(--color-border)" }}>
              {row.map((cell, j) => {
                const isTotal = j === totalArrIdx;
                return (
                  <td
                    key={j}
                    style={{
                      padding: "0.85rem 1rem",
                      textAlign: j === 0 ? "left" : "right",
                      fontWeight: j === 0 ? 500 : isTotal ? 600 : 400,
                      color: isTotal
                        ? "var(--c-amber)"
                        : j === 0
                        ? "var(--color-text)"
                        : "var(--color-text-muted)",
                      fontSize: j === 0 ? 15 : isTotal ? 16 : 14,
                    }}
                  >
                    {cell}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PersonaBlock({ title, items, accent }: { title: string; items: string[]; accent: string }) {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <p
        style={{
          margin: 0,
          fontSize: 11,
          color: "var(--c-amber)",
          marginBottom: "0.65rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          fontWeight: 700,
        }}
      >
        {title}
      </p>
      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.45rem" }}>
        {items.map((n, i) => (
          <li
            key={i}
            style={{
              fontSize: 13,
              color: "var(--color-text)",
              paddingLeft: "0.7rem",
              borderLeft: `2px solid ${accent}`,
              lineHeight: 1.45,
            }}
          >
            {n}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SubviewBody({ subview, accent }: { subview: any; accent: string }) {
  if (!subview) return null;

  if (subview.kind === "goal") {
    const kpis: Array<{ label: string; value: string }> = subview.kpis || [];
    // Parse label: split off trailing "- Touch" or "- No touch"
    const parseKpi = (raw: string) => {
      const m = raw.match(/^(.*?)\s*-\s*(Touch|No touch)\s*$/i);
      if (m) return { main: m[1].trim(), tag: m[2].trim() };
      return { main: raw, tag: "" };
    };
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <p
          style={{
            fontSize: "clamp(28px, 3.2vw, 42px)",
            fontWeight: 400,
            color: "var(--color-text)",
            margin: 0,
            lineHeight: 1.15,
            letterSpacing: "-0.015em",
            maxWidth: 1100,
          }}
        >
          {subview.statement}
        </p>
        {kpis.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${Math.min(kpis.length, 4)}, minmax(0, 1fr))`,
              gap: "1.25rem",
              marginTop: "0.5rem",
            }}
          >
            {kpis.map((k, i) => {
              const { main, tag } = parseKpi(k.label || "");
              return (
                <div
                  key={i}
                  style={{
                    padding: "1.75rem 2rem",
                    borderRadius: 16,
                    background: `linear-gradient(135deg, ${accent}22, ${accent}08)`,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.6rem",
                  }}
                >
                  {tag ? (
                    <>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 44,
                          color: "var(--color-text)",
                          fontWeight: 500,
                          lineHeight: 1.05,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {tag}
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 15,
                          color: "var(--color-text)",
                          opacity: 0.7,
                          fontWeight: 400,
                        }}
                      >
                        {main}
                      </p>
                    </>
                  ) : (
                    <p
                      style={{
                        margin: 0,
                        fontSize: 26,
                        color: "var(--color-text)",
                        fontWeight: 500,
                        lineHeight: 1.2,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {main}
                    </p>
                  )}
                  {k.value && (
                    <p
                      className="brand-accent"
                      style={{
                        margin: "0.4rem 0 0",
                        fontSize: 32,
                        fontWeight: 600,
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                      }}
                    >
                      {k.value}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  if (subview.kind === "baseline_split") {
    return <BaselineSplit subview={subview} accent={accent} />;
  }

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
    const bullets: string[] = p.offering_bullets || [];
    const outcomes: string[] = p.outcomes || [];
    const stackImage = subview.stack_image;
    return (
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 1.4fr)", gap: "1.25rem", alignItems: "stretch" }}>
        {/* LEFT — persona card with 4 spaced sections */}
        <div
          style={{
            padding: "1.5rem 1.5rem 1.75rem",
            borderRadius: 14,
            background: `linear-gradient(160deg, ${accent}1f, ${accent}0a 70%)`,
            border: `0.5px solid ${accent}50`,
            display: "flex",
            flexDirection: "column",
            gap: "1.75rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 9,
                background: `linear-gradient(135deg, ${accent}, ${accent}66)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: 15,
                fontWeight: 600,
                flexShrink: 0,
              }}
            >
              {p.name.charAt(0)}
            </div>
            <h4 style={{ margin: 0, fontSize: 17, fontWeight: 500, color: "var(--color-text)" }}>
              {p.name}
            </h4>
          </div>

          <p
            style={{
              margin: 0,
              fontSize: 12,
              color: "var(--color-text)",
              lineHeight: 1.45,
              fontWeight: 500,
            }}
          >
            {p.subtitle}
          </p>

          <PersonaBlock title="Needs" items={p.needs || []} accent={accent} />
          <PersonaBlock title="Our offering" items={bullets} accent={accent} />
          <PersonaBlock title="Business outcomes" items={outcomes} accent={accent} />
        </div>

        {/* RIGHT — single static image */}
        <div
          style={{
            borderRadius: 14,
            overflow: "hidden",
            border: `0.5px solid ${accent}30`,
            background: stackImage
              ? `url(${assetUrl(stackImage)}) center / contain no-repeat, var(--color-surface-2)`
              : `linear-gradient(135deg, ${accent}18, ${accent}05)`,
            minHeight: 340,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!stackImage && (
            <span className="font-serif-italic" style={{ fontSize: 12, color: "var(--color-text-soft)" }}>
              drop marketing stack image here
            </span>
          )}
        </div>
      </div>
    );
  }

  if (subview.kind === "journey") {
    return <JourneyView subview={subview} accent={accent} />;
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
