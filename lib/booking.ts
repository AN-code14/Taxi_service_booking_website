import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().regex(/^[+\d][\d\s().-]{6,24}$/),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  pickup: z.string().trim().min(2).max(160),
  drop: z.string().trim().max(160).optional().default(""),
  package: z.string().trim().max(80).optional().default(""),
  vehicle: z.enum(["Sedan", "Hatchback", "SUV"]),
  passengers: z.coerce.number().int().min(1).max(20),
  notes: z.string().trim().max(800).optional().default(""),
  website: z.string().max(0).optional().default(""),
}).superRefine((booking, context) => {
  const pickupDate = new Date(`${booking.date}T${booking.time}`);
  const [year, month, day] = booking.date.split("-").map(Number);
  const validCalendarDate = pickupDate.getFullYear() === year && pickupDate.getMonth() === month - 1 && pickupDate.getDate() === day;
  if (Number.isNaN(pickupDate.getTime()) || !validCalendarDate) context.addIssue({ code: "custom", path: ["date"], message: "Enter a valid pickup date and time." });
  if (!booking.drop && !booking.package) context.addIssue({ code: "custom", path: ["drop"], message: "Add a drop location or choose a package." });
});

export type Booking = z.infer<typeof bookingSchema>;

export function bookingMessage(booking: Booking) {
  return [`Hi RSK Tours and Travels! I'd like to book a ride. 🚕`, ``, `Name: ${booking.name}`, `Phone: ${booking.phone}`, `Pickup: ${booking.date} at ${booking.time}`, `From: ${booking.pickup}`, `To/Package: ${booking.drop || booking.package}`, `Vehicle: ${booking.vehicle}`, `Passengers: ${booking.passengers}`, `Notes: ${booking.notes || "None"}`].join("\n");
}
