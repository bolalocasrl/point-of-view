// Big two-line section title: first line solid, second line outlined.
// Same treatment as the "POV / MERCH" heading on the shop page.

export default function SectionTitle({
  solid,
  outline,
  className = "",
}: {
  solid: string;
  outline: string;
  className?: string;
}) {
  return (
    <h2
      className={`font-display text-5xl md:text-8xl font-black uppercase leading-[0.85] tracking-tighter ${className}`}
    >
      {solid}
      <br />
      <span className="text-transparent [-webkit-text-stroke:1px_white]">{outline}</span>
    </h2>
  );
}
