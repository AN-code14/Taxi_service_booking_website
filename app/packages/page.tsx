import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { packages } from "@/data/packages";
export const metadata = { title: "Goa tour packages" };
export default function PackagesPage() { return <div className="page-shell"><SiteHeader /><main className="container"><section className="page-hero"><p className="eyebrow">Goa, well seen</p><h1>Routes with room to wander.</h1><p>Our guided day tours bring together the landmarks people come to Goa for, with the breathing room to enjoy them.</p></section><section className="section" style={{ paddingTop: 0 }}><div className="card-grid">{packages.map((tour, index) => <article className="route-card glass" key={tour.slug}><div><p className="route-tag">0{index + 1} · {tour.eyebrow}</p><h3>{tour.name}</h3><p>{tour.summary}</p><ul className="list">{tour.stops.slice(0, 3).map(stop => <li key={stop.name}>{stop.name}</li>)}</ul></div><Link className="button-primary" href={`/packages/${tour.slug}`}>Explore the day ↗</Link></article>)}</div></section></main><SiteFooter /></div>; }
