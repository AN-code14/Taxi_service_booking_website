import Link from "next/link";
import { HeroCar } from "@/components/hero-car";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { packages } from "@/data/packages";
import { site } from "@/data/site";
import { vehicles } from "@/data/vehicles";

export default function Home() {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main>
        <section className="container hero">
          <div className="hero-copy">
            <p className="eyebrow">Goa, at your own pace</p>
            <h1>Good roads. <em>Better days.</em></h1>
            <p>Reliable taxis, comfortable cars and thoughtfully planned tours for seeing more of Goa without rushing the view.</p>
            <div className="button-row">
              <Link className="button-primary" href="/book">Book your ride <span>↗</span></Link>
              <Link className="button-secondary" href="/packages">Plan a tour <span>↗</span></Link>
            </div>
            <div className="hero-note"><span className="verified-dot" /> Verified local service · Available 24/7 for advance bookings</div>
          </div>
          <HeroCar />
        </section>

        <section className="container section" aria-labelledby="vehicles-heading">
          <div className="split">
            <SectionHeading eyebrow="Choose your comfort" title="A car that fits the day." intro="From a quick airport pickup to a full family itinerary, choose the space and pace that suit you." />
            <Link className="button-secondary" href="/vehicles">See all vehicles <span>↗</span></Link>
          </div>
          <div className="card-grid">
            {vehicles.map((vehicle, index) => (
              <article className="info-card glass" key={vehicle.id}>
                <div className="card-top"><span className="card-number">0{index + 1}</span><span className="price">From {vehicle.price}</span></div>
                <h3>{vehicle.name}</h3>
                <p>{vehicle.description}</p>
                <div className="vehicle-meta"><span>{vehicle.capacity}</span><span>{vehicle.ac}</span></div>
                <p><strong>{vehicle.use}</strong></p>
              </article>
            ))}
          </div>
        </section>

        <section className="container section" aria-labelledby="packages-heading">
          <div className="split">
            <SectionHeading eyebrow="Take the scenic route" title="Two ways to meet Goa." intro="Leave the map-reading to us. Our day tours connect the landmarks, beaches and quieter moments that make the state memorable." />
            <Link className="button-secondary" href="/packages">Explore packages <span>↗</span></Link>
          </div>
          <div className="card-grid">
            {packages.map((tour, index) => (
              <article className="route-card glass" key={tour.slug}>
                <div><span className="route-tag">0{index + 1} · {tour.eyebrow}</span><h3 style={{ marginTop: "1.6rem" }}>{tour.name}</h3><p>{tour.summary}</p></div>
                <div><p className="card-link">{tour.stops.slice(0, 3).map((stop) => stop.name).join(" · ")} <span>↗</span></p><Link className="button-primary" href={`/packages/${tour.slug}`} style={{ display: "inline-block", marginTop: ".8rem" }}>View the day</Link></div>
              </article>
            ))}
          </div>
        </section>

        <section className="band" aria-labelledby="why-heading">
          <div className="container">
            <SectionHeading light eyebrow="The RSK difference" title="The little things make the journey." intro="You get a local driver who knows the roads, clear communication before pickup and a plan that leaves room for Goa to surprise you." />
            <div className="card-grid">
              {["Local knowledge", "Clear from the start", "Flexible by design"].map((title, index) => (
                <article className="info-card" key={title} style={{ borderTop: "1px solid rgba(255,255,255,.2)" }}><div className="card-top"><span className="card-number">0{index + 1}</span></div><h3>{title}</h3><p style={{ color: "#b9c7cd" }}>{["Know the beach roads, airport runs and the best order for a day out.", "Straightforward quotes and a dependable pickup, with no hidden surprises.", "Choose a car, a route or just a starting point. We will help shape the rest."][index]}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="container section" aria-labelledby="trust-heading">
          <div className="split">
            <SectionHeading eyebrow="A service you can count on" title="Your plans are in good hands." intro="RSK Tours and Travels is here for the practical moments and the memorable ones: airport transfers, beach days and everything between." />
            <Link className="button-primary" href="/book">Start an enquiry <span>↗</span></Link>
          </div>
          <div className="stat-grid" style={{ marginTop: "2rem" }}>
            <div className="stat"><strong>{site.googleInteractions}</strong><span>Google Business interactions</span></div>
            <div className="stat"><strong>24/7</strong><span>Advance booking availability</span></div>
            <div className="stat"><strong>2 coasts</strong><span>North Goa, South Goa and airport transfers</span></div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
