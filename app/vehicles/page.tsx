import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";
import { VehicleCardScene } from "@/components/vehicle-card-scene";
import { extraKmPricingNote } from "@/data/pricing";
import { vehicles } from "@/data/vehicles";

export const metadata = { title: "Cars for hire in Goa" };

export default function VehiclesPage() {
	return <div className="page-shell"><SiteHeader /><main className="container"><section className="page-hero"><p className="eyebrow">Your ride, your way</p><h1>Comfort for the road ahead.</h1><p>Choose the right amount of room for an airport transfer, a beach day or a full Goa itinerary. Every category is available with A/C or Non-A/C options where noted.</p></section><section className="section" style={{ paddingTop: 0 }}><div className="card-grid">{vehicles.map((vehicle, index) => <article className="info-card glass" key={vehicle.id}><div className="card-top"><span className="card-number">0{index + 1}</span><div className="price-wrap"><span className="price">From {vehicle.price}</span><span className="price-note">{extraKmPricingNote}</span></div></div><VehicleCardScene vehicle={vehicle.id} /><h3>{vehicle.name}</h3><p>{vehicle.description}</p><div className="vehicle-meta"><span>{vehicle.capacity}</span><span>{vehicle.ac}</span></div><p><strong>Ideal for:</strong> {vehicle.use}</p><Link className="button-primary" href={`/book?vehicle=${vehicle.name}`} style={{ display: "inline-block", marginTop: "1rem" }}>Book this car ↗</Link></article>)}</div></section><SectionHeading eyebrow="Simple booking" title="Tell us where you are going." intro="Share a few details and we will help match the car and route to your day." /><Link className="button-primary" href="/book" style={{ display: "inline-block", marginBottom: "5rem" }}>Start an enquiry ↗</Link></main><SiteFooter /></div>;
}
