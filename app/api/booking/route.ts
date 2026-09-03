import { NextResponse } from "next/server";
import { Resend } from "resend";
import { bookingMessage, bookingSchema } from "@/lib/booking";
import { site, whatsappLink } from "@/data/site";

const requests = new Map<string, number[]>();

function escapeHtml(value: string | number) {
  return String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] || character);
}

function limited(ip: string) {
  const now = Date.now();
  const recent = (requests.get(ip) || []).filter((time) => now - time < 60 * 60 * 1000);
  if (recent.length >= 5) return true;
  recent.push(now);
  requests.set(ip, recent);
  return false;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ error: "Too many enquiries from this connection. Please try again later." }, { status: 429 });

  try {
    const parsed = bookingSchema.safeParse(await request.json());
    if (!parsed.success || parsed.data.website) return NextResponse.json({ error: "Please check the form details and try again." }, { status: 400 });

    const booking = parsed.data;
    const text = bookingMessage(booking);
    const whatsappUrl = whatsappLink(text, process.env.BOOKING_WHATSAPP || site.whatsapp);

    try {
      const resendApiKey = process.env.RESEND_API_KEY;
      const ownerEmail = process.env.OWNER_EMAIL;

      if (resendApiKey && ownerEmail) {
        const resend = new Resend(resendApiKey);
        const html = `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827; max-width: 640px; margin: 0 auto;">
            <h2 style="margin-bottom: 16px;">New Booking Request</h2>
            <p><strong>Name:</strong> ${escapeHtml(booking.name)}</p>
            <p><strong>Phone:</strong> ${escapeHtml(booking.phone)}</p>
            <p><strong>Pickup Date & Time:</strong> ${escapeHtml(booking.date)} at ${escapeHtml(booking.time)}</p>
            <p><strong>Pickup:</strong> ${escapeHtml(booking.pickup)}</p>
            <p><strong>Drop / Package:</strong> ${escapeHtml(booking.drop || booking.package)}</p>
            <p><strong>Vehicle:</strong> ${escapeHtml(booking.vehicle)}</p>
            <p><strong>Passengers:</strong> ${escapeHtml(booking.passengers)}</p>
            <p><strong>Notes:</strong> ${escapeHtml(booking.notes || "None")}</p>
          </div>
        `;

        const result = await resend.emails.send({
          from: "RSK Tours and Travels <onboarding@resend.dev>",
          to: ownerEmail,
          subject: `New Booking Request — ${booking.name}`,
          html,
        });

        if (result.error) throw new Error(result.error.message);
      } else {
        console.error("Booking email is not configured: set RESEND_API_KEY and OWNER_EMAIL.");
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

