"use client";

import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { vehicles } from "@/data/vehicles";
import { packages } from "@/data/packages";

type Status = "idle" | "loading" | "success" | "error";

export function BookingForm() {
  const params = useSearchParams();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  useEffect(() => {
    if (status !== "success" || !whatsappUrl) return;
    const timer = window.setTimeout(() => window.location.assign(whatsappUrl), 1800);
    return () => window.clearTimeout(timer);
  }, [status, whatsappUrl]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/booking", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(form.entries())) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Please check your details and try again.");
      setWhatsappUrl(data.whatsappUrl || "");
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") return <motion.div className="glass success success-card" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45, ease: "easeOut" }}><motion.div className="success-check" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15, type: "spring" }}>✓</motion.div><p className="eyebrow">Enquiry received</p><h3>Booking request received!</h3><p>Opening WhatsApp to confirm your details...</p>{whatsappUrl && <a className="button-primary" href={whatsappUrl}>Open WhatsApp to Confirm</a>}</motion.div>;

  return <form className="glass form-shell" onSubmit={submit}><div className="form-grid">
    <div className="field"><label htmlFor="name">Your name</label><input id="name" name="name" required minLength={2} /></div>
    <div className="field"><label htmlFor="phone">Phone / WhatsApp</label><input id="phone" name="phone" required type="tel" /></div>
    <div className="field"><label htmlFor="date">Pickup date</label><input id="date" name="date" required type="date" /></div>
    <div className="field"><label htmlFor="time">Pickup time</label><input id="time" name="time" required type="time" /></div>
    <div className="field"><label htmlFor="pickup">Pickup location</label><input id="pickup" name="pickup" required placeholder="Hotel, airport or area" /></div>
    <div className="field"><label htmlFor="drop">Drop location</label><input id="drop" name="drop" placeholder="Where are you going?" /></div>
    <div className="field"><label htmlFor="package">Select a package</label><select id="package" name="package" defaultValue={params.get("package") || ""}><option value="">No package / point-to-point</option>{packages.map(tour => <option key={tour.slug}>{tour.name}</option>)}</select></div>
    <div className="field"><label htmlFor="vehicle">Vehicle type</label><select id="vehicle" name="vehicle" defaultValue={params.get("vehicle") || "Sedan"}>{vehicles.map(vehicle => <option key={vehicle.id}>{vehicle.name}</option>)}</select></div>
    <div className="field"><label htmlFor="passengers">Passengers</label><input id="passengers" name="passengers" required type="number" min="1" max="20" defaultValue="2" /></div>
    <div className="field full"><label htmlFor="notes">Anything else?</label><textarea id="notes" name="notes" placeholder="Flight number, child seat, stops or timing notes" /></div>
    <input name="website" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />
    {status === "error" && <p className="form-error">{message}</p>}
    <div className="field full"><button className="button-primary" type="submit" disabled={status === "loading"}>{status === "loading" ? "Sending..." : "Send enquiry →"}</button></div>
  </div></form>;
}
