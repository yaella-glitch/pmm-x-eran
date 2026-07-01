type Props = {
  current: number;
  total: number;
};

export default function SectionNumber({ current, total }: Props) {
  return (
    <p
      className="font-serif-italic"
      style={{
        position: "absolute",
        top: "1.5rem",
        right: "2rem",
        fontSize: "12px",
        color: "var(--color-text-soft)",
        margin: 0,
      }}
    >
      {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}
    </p>
  );
}
