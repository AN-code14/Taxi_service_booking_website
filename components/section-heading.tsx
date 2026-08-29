type Props = { eyebrow: string; title: string; intro?: string; light?: boolean };
export function SectionHeading({ eyebrow, title, intro, light = false }: Props) {
  return <div className={light ? "section-heading light" : "section-heading"}><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{intro && <p className="section-intro">{intro}</p>}</div>;
}
