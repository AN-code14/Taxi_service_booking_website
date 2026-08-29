import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { localHireRates, airportPickupDropRates, localHireVehicleOrder, airportVehicleOrder } from "@/data/pricing";
import { vehicles } from "@/data/vehicles";

export const metadata = { title: "Goa taxi pricing" };

const vehicleLookup = Object.fromEntries(vehicles.map(vehicle => [vehicle.id, vehicle]));

export default function PricingPage() {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="container">
        <section className="page-hero">
          <p className="eyebrow">Clear from the start</p>
          <h1>Pricing that leaves room for the plan.</h1>
          <p>Use these starting points to orient your day. We confirm the final fare with your exact pickup, route and vehicle before booking.</p>
        </section>

        <section className="section" style={{ paddingTop: 0 }}>
          <div style={{ marginBottom: "2rem" }}>
            <h2>Local Hire (8 Hrs/80 Km)</h2>
          </div>
          <div className="glass" style={{ overflowX: "auto", padding: "1rem" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 620 }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "1rem" }}>Vehicle</th>
                  <th style={{ textAlign: "left", padding: "1rem" }}>Rate</th>
                </tr>
              </thead>
              <tbody>
                {localHireVehicleOrder.map((vehicleId) => {
                  const vehicle = vehicleLookup[vehicleId];
                  const rate = localHireRates[vehicleId];
                  return (
                    <tr key={vehicleId}>
                      <td style={{ padding: "1rem", borderTop: "1px solid var(--line)" }}>
                        <strong>{vehicle.name}</strong><br />
                        <small>{vehicle.capacity}</small>
                      </td>
                      <td className="price" style={{ padding: "1rem", borderTop: "1px solid var(--line)" }}>{rate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 0 }}>
          <div style={{ marginBottom: "2rem" }}>
            <h2>Airport &amp; Railway Pickup-Drop (24/7)</h2>
          </div>
          <div className="glass" style={{ overflowX: "auto", padding: "1rem" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 620 }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "1rem" }}>Vehicle</th>
                  <th style={{ textAlign: "left", padding: "1rem" }}>Rate</th>
                </tr>
              </thead>
              <tbody>
                {airportVehicleOrder.map((vehicleId) => {
                  const vehicle = vehicleLookup[vehicleId];
                  const rate = airportPickupDropRates[vehicleId];
                  return (
                    <tr key={vehicleId}>
                      <td style={{ padding: "1rem", borderTop: "1px solid var(--line)" }}>
                        <strong>{vehicle.name}</strong><br />
                        <small>{vehicle.capacity}</small>
                      </td>
                      <td className="price" style={{ padding: "1rem", borderTop: "1px solid var(--line)" }}>{rate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <p className="section-intro" style={{ marginTop: "1.5rem" }}>
          Additional charges may apply for waiting time, night charges, outstation routes and changes to the agreed itinerary. We will always explain these before confirming.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
