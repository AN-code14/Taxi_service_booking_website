import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(7).max(25),
  date: z.string().min(1),
  time: z.string().min(1),
  pickup: z.string().trim().min(2).max(160),
  drop: z.string().trim().max(160).optional().default(""),
  package: z.string().trim().max(80).optional().default(""),
  vehicle: z.enum(["Sedan", "Hatchback", "SUV"]),
  passengers: z.coerce.number().int().min(1).max(20),
  notes: z.string().trim().max(800).optional().default(""),
  website: z.string().max(0).optional().default(""),
});

export type Booking = z.infer<typeof bookingSchema>;

export function bookingMessage(booking: Booking) {
  return [`Hello RSK Tours and Travels,`, `New booking enquiry`, `Name: ${booking.name}`, `Phone: ${booking.phone}`, `Date: ${booking.date}`, `Time: ${booking.time}`, `Pickup: ${booking.pickup}`, `Drop/package: ${booking.drop || booking.package || "Not specified"}`, `Vehicle: ${booking.vehicle}`, `Passengers: ${booking.passengers}`, `Notes: ${booking.notes || "None"}`].join("\n");
}
