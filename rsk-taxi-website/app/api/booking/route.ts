import { NextResponse } from "next/server";
import { Resend } from "resend";
import { bookingMessage, bookingSchema } from "@/lib/booking";
import { whatsappLink } from "@/data/site";
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
		const whatsappUrl = whatsappLink(text);
		if (process.env.RESEND_API_KEY && process.env.OWNER_EMAIL) {
			const result = await new Resend(process.env.RESEND_API_KEY).emails.send({ from: "RSK Tours and Travels <onboarding@resend.dev>", to: process.env.OWNER_EMAIL, subject: `New Goa booking enquiry from ${booking.name}`, text });
			if (result.error) throw new Error(result.error.message);
		}
		return NextResponse.json({ ok: true, whatsappUrl });
	} catch {
		return NextResponse.json({ error: "We could not send your enquiry. Please try WhatsApp or call us directly." }, { status: 500 });
	}
}
