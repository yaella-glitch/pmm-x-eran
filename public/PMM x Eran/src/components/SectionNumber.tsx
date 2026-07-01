type Props = {
  current: number;
  total: number;
};

export default function SectionNumber({ current, total }: Props) {
  return (
    <p
      className="font-serif-italic text-slate-400 absolute"
      style={{ fontSize: "12px", top: "1.5rem", right: "2rem", margin: 0 }}
    >
      {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}
    </p>
  );
}
