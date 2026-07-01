import { useContent } from "../ContentContext";
import SectionLabel from "../components/SectionLabel";
import SectionNumber from "../components/SectionNumber";

export default function Section02Agenda() {
  const content = useContent();
  const s = content.section2_agenda;
  return (
    <section className="snap-section">
      <SectionNumber current={2} total={7} />
      <div style={{ maxWidth: 1400, margin: "0 auto", width: "100%" }}>
        <SectionLabel>{s.label}</SectionLabel>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2.4fr 1fr",
            gap: "4rem",
            marginTop: "4rem",
            alignItems: "stretch",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h2
              style={{
                fontSize: "clamp(44px, 5vw, 68px)",
                lineHeight: 1.05,
                fontWeight: 400,
                letterSpacing: "-0.025em",
                margin: 0,
                color: "var(--color-text)",
                maxWidth: 760,
              }}
            >
              {s.statement}
            </h2>
            <p
              className="font-serif-italic"
              style={{
                fontSize: "22px",
                color: "var(--color-text-muted)",
                margin: "2rem 0 0",
                lineHeight: 1.4,
                maxWidth: 760,
              }}
            >
              {s.tagline}
            </p>
          </div>

          <div
            className="gradient-frame"
            style={{
              padding: "2.5rem 2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              minHeight: 480,
              background: "var(--color-surface)",
            }}
          >
            <p
              className="font-serif-italic"
              style={{
                fontSize: "22px",
                color: "var(--color-text)",
                margin: 0,
                marginBottom: "2.25rem",
                position: "relative",
                zIndex: 1,
              }}
            >
              → agenda
            </p>
            <ol
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                position: "relative",
                zIndex: 1,
                flex: 1,
                justifyContent: "center",
              }}
            >
              {s.agenda.map((item, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: "17px",
                    color: "var(--color-text)",
                    display: "flex",
                    gap: "0.95rem",
                    alignItems: "baseline",
                    lineHeight: 1.4,
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      color: "var(--c-indigo)",
                      fontVariantNumeric: "tabular-nums",
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
