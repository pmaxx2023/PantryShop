export function LegalDocument({title, updated, sections}) {
  return <main className="legal"><p className="eyebrow">PShop · {updated}</p><h1>{title}</h1>{sections.map(section => <section key={section.h}><h2>{section.h}</h2>{section.p.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>)}</main>;
}
