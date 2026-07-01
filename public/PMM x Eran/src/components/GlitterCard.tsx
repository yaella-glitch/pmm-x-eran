import { motion } from "framer-motion";
import { useState } from "react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
};

export default function GlitterCard({ children, active, onClick, style }: Props) {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      whileHover={{ y: -6 }}
      animate={{
        boxShadow:
          active || hover
            ? "0 0 0 1px rgba(99,102,241,0.5), 0 20px 60px rgba(99,102,241,0.25)"
            : "0 0 0 0.5px var(--color-border)",
      }}
      transition={{ duration: 0.35 }}
      style={{
        position: "relative",
        borderRadius: 18,
        background: "var(--color-surface)",
        cursor: onClick ? "pointer" : "default",
        overflow: "hidden",
        ...style,
      }}
    >
      <GradientFrame intense={active || hover} />
      <HoverGlow visible={hover && !active} />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </motion.div>
  );
}

function GradientFrame({ intense }: { intense?: boolean }) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: 18,
        padding: 1,
        background:
          "linear-gradient(135deg, rgba(165,138,255,0.75), rgba(99,102,241,0.5) 30%, rgba(56,189,248,0.5) 70%, rgba(165,138,255,0.75))",
        WebkitMask:
          "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        opacity: intense ? 1 : 0.55,
        transition: "opacity 0.35s",
        pointerEvents: "none",
      }}
    />
  );
}

function HoverGlow({ visible }: { visible: boolean }) {
  return (
    <motion.div
      aria-hidden
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(ellipse 70% 100% at 50% 50%, rgba(99,102,241,0.18), rgba(165,138,255,0.08) 40%, transparent 75%)",
        pointerEvents: "none",
        borderRadius: 18,
      }}
    />
  );
}
