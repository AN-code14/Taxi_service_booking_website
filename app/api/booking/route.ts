import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { Resend } from "resend";
import { bookingMessage, bookingSchema } from "@/lib/booking";
import { site, whatsappLink } from "@/data/site";
const requests = new Map<string, number[]>();
function limited(ip: string) { const now = Date.now(); const recent = (requests.get(ip) || []).filter(time => now - time < 60 * 60 * 1000); if (recent.length >= 5) return true; recent.push(now); requests.set(ip, recent); return false; }
export async function POST(request: Request) {
	const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
	if (limited(ip)) return NextResponse.json({ error: "Too many enquiries from this connection. Please try again later." }, { status: 429 });
	try {
		const parsed = bookingSchema.safeParse(await request.json());
		if (!parsed.success || parsed.data.website) return NextResponse.json({ error: "Please check the form details and try again." }, { status: 400 });
		const booking = parsed.data;
		const text = bookingMessage(booking);
		const whatsappUrl = whatsappLink(text, process.env.BOOKING_WHATSAPP || site.whatsapp);
		const recipient = process.env.BOOKING_EMAIL || "SONUKEVAT@520@gmail.com";
		const from = process.env.BOOKING_FROM || process.env.SMTP_FROM || "onboarding@resend.dev";

		try {
			if (process.env.RESEND_API_KEY) {
				const resend = new Resend(process.env.RESEND_API_KEY);
				const result = await resend.emails.send({ from, to: recipient, subject: `New Booking Request — ${booking.name}`, text });
				if (result.error) throw new Error(result.error.message);
			} else if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
				const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587), secure: process.env.SMTP_SECURE === "true", auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } });
				await transporter.sendMail({ from, to: recipient, subject: `New Booking Request — ${booking.name}`, text });
			} else {
				console.error("Booking email is not configured: set RESEND_API_KEY.");
			}
		} catch (error) {
			console.error("Booking email failed:", error);
		}
		return NextResponse.json({ ok: true, whatsappUrl });
	} catch (error) {
		console.error("Booking request failed:", error);
		return NextResponse.json({ error: "We could not process your enquiry. Please try WhatsApp or call us directly." }, { status: 500 });
	}
}
