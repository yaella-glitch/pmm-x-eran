import { useContent } from "../ContentContext";
import { assetUrl } from "../lib/assetUrl";

type Output = { name: string; owned: boolean };
type Persona = { name: string; avatar?: string };

const W = 1400;
const H = 620;

const HEART_X = 640;
const HEART_Y = 340;
const HEART_R = 56;

const FEATURE_LOGO_X = 90;

const FUNNEL_TOP_LEFT_X = 900;
const FUNNEL_TOP_RIGHT_X = 1340;
const FUNNEL_BOT_LEFT_X = 1050;
const FUNNEL_BOT_RIGHT_X = 1190;
const FUNNEL_TOP_Y = 170;
const FUNNEL_BOT_Y = 590;
const FUNNEL_ACCENT = "#a58aff";

export default function ParticleFlow() {
  const content = useContent();
  const features = content.section3_what_is_pmm.features;
  const outputs = content.section3_what_is_pmm.outputs;
  const personas = (content.section3_what_is_pmm as any).personas as Persona[] | undefined;

  const featSpacing = 62;
  const featStartY = HEART_Y - ((features.length - 1) * featSpacing) / 2;

  const funnelHeight = FUNNEL_BOT_Y - FUNNEL_TOP_Y;
  const zoneHeight = funnelHeight / 3;
  const zones = [
    { key: "top" as const, label: "Top of the funnel", yStart: FUNNEL_TOP_Y, yEnd: FUNNEL_TOP_Y + zoneHeight },
    { key: "middle" as const, label: "Middle of the funnel", yStart: FUNNEL_TOP_Y + zoneHeight, yEnd: FUNNEL_TOP_Y + 2 * zoneHeight },
    { key: "bottom" as const, label: "Bottom of the funnel", yStart: FUNNEL_TOP_Y + 2 * zoneHeight, yEnd: FUNNEL_BOT_Y },
  ];

  function funnelXAtY(y: number, side: "left" | "right") {
    const t = (y - FUNNEL_TOP_Y) / funnelHeight;
    if (side === "left") {
      return FUNNEL_TOP_LEFT_X + (FUNNEL_BOT_LEFT_X - FUNNEL_TOP_LEFT_X) * t;
    } else {
      return FUNNEL_TOP_RIGHT_X + (FUNNEL_BOT_RIGHT_X - FUNNEL_TOP_RIGHT_X) * t;
    }
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      <defs>
        <radialGradient id="heart-fill" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#a58aff" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#6366f1" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="line-in" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a58aff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="line-out" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#a58aff" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id="persona-flow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a58aff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#a58aff" stopOpacity="0.15" />
        </linearGradient>
        <filter id="heart-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* PERSONAS entering the funnel — tight cluster on the LEFT */}
      {personas && personas.length > 0 && (() => {
        const personaY = 80;
        const personaSpacing = 42;
        // Tight cluster, all on the LEFT side of the funnel top
        const groupStartX = FUNNEL_TOP_LEFT_X - 20;
        const funnelTopLeftEntry = FUNNEL_TOP_LEFT_X + 50;
        return (
          <g>
            {personas.map((p, i) => {
              const px = groupStartX + i * personaSpacing;
              const targetX = funnelTopLeftEntry;
              const path = `M ${px} ${personaY + 22} L ${targetX} ${FUNNEL_TOP_Y - 4}`;
              return (
                <g key={`persona-${i}`}>
                  <line
                    x1={px}
                    y1={personaY + 22}
                    x2={targetX}
                    y2={FUNNEL_TOP_Y - 4}
                    stroke="url(#persona-flow)"
                    strokeWidth="0.8"
                    strokeDasharray="2 4"
                  />
                  <FlowParticle path={path} delay={i * 0.5} color="#a58aff" duration="3.5s" />
                  {/* avatar circle - or image if provided */}
                  {p.avatar ? (
                    <>
                      <clipPath id={`persona-clip-${i}`}>
                        <circle cx={px} cy={personaY - 4} r={16} />
                      </clipPath>
                      <image
                        href={assetUrl(p.avatar)}
                        x={px - 16}
                        y={personaY - 20}
                        width={32}
                        height={32}
                        clipPath={`url(#persona-clip-${i})`}
                        preserveAspectRatio="xMidYMid slice"
                      />
                      <circle
                        cx={px}
                        cy={personaY - 4}
                        r={16}
                        fill="none"
                        stroke="rgba(165,138,255,0.4)"
                        strokeWidth="0.8"
                      />
                    </>
                  ) : (
                    <>
                      <circle
                        cx={px}
                        cy={personaY - 4}
                        r={16}
                        fill="var(--color-surface-2)"
                        stroke="rgba(165,138,255,0.4)"
                        strokeWidth="0.6"
                      />
                      <text
                        x={px}
                        y={personaY}
                        textAnchor="middle"
                        fontSize="12"
                        fontFamily="Figtree, sans-serif"
                        className="svg-text-soft"
                        fontWeight={500}
                      >
                        {p.name.charAt(0)}
                      </text>
                    </>
                  )}
                  <text
                    x={px}
                    y={personaY + 24}
                    textAnchor="middle"
                    fontSize="10"
                    fontFamily="Figtree, sans-serif"
                    className="svg-text-muted"
                  >
                    {p.name}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })()}

      {/* IN: feature → heart curves + particles + logo ONLY */}
      {features.map((f, i) => {
        const fy = featStartY + i * featSpacing;
        const lineStart = FEATURE_LOGO_X + 26;
        const path = `M ${lineStart} ${fy} C ${(lineStart + HEART_X) / 2} ${fy}, ${HEART_X - 140} ${HEART_Y}, ${HEART_X - HEART_R - 4} ${HEART_Y}`;
        return (
          <g key={`in-${i}`}>
            <path d={path} fill="none" stroke="url(#line-in)" strokeWidth="1" />
            <FlowParticle path={path} delay={i * 0.4} color="#a58aff" duration="5s" />
            <g>
              <circle
                cx={FEATURE_LOGO_X}
                cy={fy}
                r={22}
                fill="var(--color-surface-2)"
                stroke="rgba(99,102,241,0.35)"
                strokeWidth="0.6"
              />
              {f.logo ? (
                <image
                  href={assetUrl(f.logo)}
                  x={FEATURE_LOGO_X - 16}
                  y={fy - 16}
                  width={32}
                  height={32}
                  preserveAspectRatio="xMidYMid meet"
                />
              ) : (
                <text
                  x={FEATURE_LOGO_X}
                  y={fy + 4}
                  textAnchor="middle"
                  fontSize="12"
                  fontFamily="Figtree, sans-serif"
                  className="svg-text-soft"
                  fontWeight={500}
                >
                  {f.name.charAt(0).toUpperCase()}
                </text>
              )}
              <title>{f.name}</title>
            </g>
          </g>
        );
      })}

      {/* PMM heart center */}
      <g>
        <circle cx={HEART_X} cy={HEART_Y} r={HEART_R + 18} fill="url(#heart-fill)" filter="url(#heart-glow)" />
        <circle cx={HEART_X} cy={HEART_Y} r={HEART_R} className="svg-surface" stroke="#a58aff" strokeWidth="1.5" />
        <text x={HEART_X} y={HEART_Y - 2} textAnchor="middle" fontFamily="Figtree, sans-serif" fontSize="26" fontWeight={500} fill="#a58aff">
          PMM
        </text>
        <text x={HEART_X} y={HEART_Y + 20} textAnchor="middle" fontFamily="Crimson Text, serif" fontStyle="italic" fontSize="12" className="svg-text-soft">
          translates value
        </text>
      </g>

      {/* OUT: heart → funnel zones */}
      {zones.map((z, zi) => {
        const targetY = (z.yStart + z.yEnd) / 2;
        const targetX = funnelXAtY(targetY, "left");
        const path = `M ${HEART_X + HEART_R + 4} ${HEART_Y} C ${HEART_X + 180} ${HEART_Y}, ${targetX - 60} ${targetY}, ${targetX - 4} ${targetY}`;
        return (
          <g key={`out-line-${zi}`}>
            <path d={path} fill="none" stroke="url(#line-out)" strokeWidth="2" />
            <FlowParticle path={path} delay={0.6 + zi * 0.7} color="#a58aff" duration="5s" />
          </g>
        );
      })}

      {/* FUNNEL polygon + zones */}
      <g>
        <polygon
          points={`${FUNNEL_TOP_LEFT_X},${FUNNEL_TOP_Y} ${FUNNEL_TOP_RIGHT_X},${FUNNEL_TOP_Y} ${FUNNEL_BOT_RIGHT_X},${FUNNEL_BOT_Y} ${FUNNEL_BOT_LEFT_X},${FUNNEL_BOT_Y}`}
          fill={`${FUNNEL_ACCENT}10`}
          stroke={`${FUNNEL_ACCENT}55`}
          strokeWidth="1"
        />
        {zones.slice(0, -1).map((z, zi) => {
          const y = z.yEnd;
          return (
            <line
              key={`divider-${zi}`}
              x1={funnelXAtY(y, "left")}
              y1={y}
              x2={funnelXAtY(y, "right")}
              y2={y}
              stroke={`${FUNNEL_ACCENT}33`}
              strokeWidth="0.5"
              strokeDasharray="4 4"
            />
          );
        })}

        {zones.map((z, zi) => {
          const items = outputs[z.key] as Output[];
          const labelY = z.yStart + 26;
          const leftX = funnelXAtY(labelY, "left");
          const itemStartY = labelY + 26;
          return (
            <g key={`zone-${zi}`}>
              <text
                x={leftX + 20}
                y={labelY}
                fontFamily="Figtree, sans-serif"
                fontSize="15"
                fill={FUNNEL_ACCENT}
                fontWeight={600}
              >
                {z.label}
              </text>
              {items.map((o, oi) => {
                const oy = itemStartY + oi * 28;
                const itemX = funnelXAtY(oy, "left") + 24;
                return (
                  <g key={`item-${zi}-${oi}`}>
                    <circle
                      cx={itemX}
                      cy={oy - 4}
                      r={o.owned ? 5 : 4}
                      fill={o.owned ? FUNNEL_ACCENT : "var(--color-surface)"}
                      stroke={FUNNEL_ACCENT}
                      strokeWidth="1"
                    />
                    <text
                      x={itemX + 14}
                      y={oy}
                      fontFamily="Figtree, sans-serif"
                      fontSize="13"
                      className="svg-text"
                    >
                      {o.name}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </g>

      {/* Legend */}
      <g transform={`translate(40, ${H - 14})`}>
        <circle cx={5} cy={0} r={5} fill={FUNNEL_ACCENT} />
        <text x={16} y={4} fontFamily="Figtree, sans-serif" fontSize="12" className="svg-text-muted">PMM owns</text>
        <circle cx={108} cy={0} r={4} fill="var(--color-surface)" stroke={FUNNEL_ACCENT} strokeWidth="1" />
        <text x={120} y={4} fontFamily="Figtree, sans-serif" fontSize="12" className="svg-text-muted">PMM influences</text>
      </g>
    </svg>
  );
}

function FlowParticle({
  path,
  delay,
  color,
  duration = "5s",
}: {
  path: string;
  delay: number;
  color: string;
  duration?: string;
}) {
  return (
    <g>
      <circle r={1.8} fill={color} opacity={0}>
        <animateMotion path={path} dur={duration} repeatCount="indefinite" begin={`${Math.max(0, delay - 0.18)}s`} calcMode="spline" keySplines="0.45 0 0.2 1" keyTimes="0;1" />
        <animate attributeName="opacity" values="0;0.45;0.45;0" keyTimes="0;0.2;0.78;1" dur={duration} repeatCount="indefinite" begin={`${Math.max(0, delay - 0.18)}s`} />
      </circle>
      <circle r={2.6} fill={color} opacity={0}>
        <animateMotion path={path} dur={duration} repeatCount="indefinite" begin={`${Math.max(0, delay - 0.09)}s`} calcMode="spline" keySplines="0.45 0 0.2 1" keyTimes="0;1" />
        <animate attributeName="opacity" values="0;0.65;0.65;0" keyTimes="0;0.18;0.8;1" dur={duration} repeatCount="indefinite" begin={`${Math.max(0, delay - 0.09)}s`} />
      </circle>
      <circle r={3.5} fill={color} opacity={0}>
        <animateMotion path={path} dur={duration} repeatCount="indefinite" begin={`${delay}s`} calcMode="spline" keySplines="0.45 0 0.2 1" keyTimes="0;1" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur={duration} repeatCount="indefinite" begin={`${delay}s`} />
      </circle>
    </g>
  );
}
