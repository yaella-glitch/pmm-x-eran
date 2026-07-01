import { useRef, useState, useEffect } from "react";
import type { ReactNode, CSSProperties } from "react";
import { motion } from "framer-motion";

type Props = {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
  spotlightColor?: string;
};

export default function SpotlightCard({
  children,
  active,
  onClick,
  style,
  spotlightColor = "rgba(165, 138, 255, 0.25)",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!hover) return;
    const onMove = (e: MouseEvent) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [hover]);

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      style={{
        position: "relative",
        borderRadius: 22,
        background: "var(--color-surface)",
        cursor: onClick ? "pointer" : "default",
        overflow: "hidden",
        boxShadow: active || hover
          ? `0 30px 70px ${spotlightColor.replace("0.25", "0.35")}, 0 0 0 0.5px rgba(255,255,255,0.08)`
          : "0 0 0 0.5px var(--color-border)",
        transition: "box-shadow 0.4s ease",
        ...style,
      }}
    >
      {/* Mouse-following spotlight */}
      <motion.div
        aria-hidden
        animate={{ opacity: hover ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(420px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 60%)`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* Subtle gradient border */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 22,
          padding: 1,
          background: `linear-gradient(135deg, ${spotlightColor.replace("0.25", "0.6")}, transparent 35%, transparent 65%, ${spotlightColor.replace("0.25", "0.6")})`,
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          opacity: active || hover ? 1 : 0.5,
          transition: "opacity 0.4s",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </motion.div>
  );
}
