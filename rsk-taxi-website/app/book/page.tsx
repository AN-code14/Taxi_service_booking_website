import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BookingForm } from "@/components/booking-form";
export const metadata = { title: "Book a taxi or Goa tour" };
export default function BookPage() { return <div className="page-shell"><SiteHeader /><main className="container"><section className="page-hero"><p className="eyebrow">Start with the details</p><h1>Let&apos;s plan your ride.</h1><p>Tell us the essentials and we&apos;ll confirm availability, the right vehicle and the fare with you directly.</p></section><Suspense fallback={<div className="glass form-shell">Loading booking form...</div>}><BookingForm /></Suspense></main><SiteFooter /></div>; }
