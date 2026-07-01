type Props = {
  children: React.ReactNode;
};

export default function SectionLabel({ children }: Props) {
  return (
    <p
      className="font-serif-italic section-label"
      style={{
        fontSize: "22px",
        letterSpacing: "-0.005em",
        margin: 0,
        color: "var(--color-text)",
        fontWeight: 400,
      }}
    >
      → {children}
    </p>
  );
}
