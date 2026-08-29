"use client";
import Link from "next/link";
import { useState } from "react";
import { site, whatsappLink } from "@/data/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="nav-wrap"><Link href="/" className="brand" onClick={() => setOpen(false)}><span className="brand-mark">RSK</span><span>TOURS <i>&</i> TRAVELS</span></Link><button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>{open ? "×" : "☰"}</button><nav className={open ? "nav open" : "nav"}>{[["Vehicles", "/vehicles"], ["Packages", "/packages"], ["Pricing", "/pricing"], ["Why us", "/why-us"], ["About", "/about"], ["Contact", "/contact"]].map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}<Link href="/book" className="nav-cta" onClick={() => setOpen(false)}>Book a ride <span>↗</span></Link></nav></div></header>;
}
