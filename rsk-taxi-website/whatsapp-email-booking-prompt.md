# Prompt for VS Code Copilot Agent — Smart Booking Notification System

Paste this into Copilot's agent/edit mode (not just chat) so it can create and edit files directly.

---

I want to upgrade our existing booking form (`app/book/page.tsx` and its API route) into a smart, polished dual-notification system. When a customer submits the booking form, TWO things should happen automatically:

## 1. Instant email to the owner (fully automatic, no click needed)
- The moment the form is submitted, send an email to the owner's inbox (use `{{OWNER_EMAIL}}` as a placeholder I'll fill in) using our existing Resend setup (check if it's already configured in the API route; if not, set it up properly using an environment variable for the API key — never hardcode it)
- The email should be clean and readable, formatted like a proper booking alert: customer name, phone, pickup date/time, pickup location, drop location or selected package, vehicle type, number of passengers, and any notes — with a clear subject line like "New Booking Request — [Customer Name]"
- Handle errors gracefully — if the email fails to send, don't crash the form; log the error server-side and still let the WhatsApp step (below) proceed

## 2. Smart WhatsApp handoff to the customer (one-tap send)
- After the form submits successfully, automatically redirect the customer's browser to a WhatsApp deep link (`https://wa.me/{{OWNER_WHATSAPP}}?text=...`) with a pre-filled, nicely formatted message containing all their booking details
- URL-encode the message properly so line breaks and special characters don't break the link
- Make the message read naturally, like: "Hi RSK Tours and Travels! I'd like to book a ride. 🚕\n\nName: [name]\nPhone: [phone]\nPickup: [date] at [time]\nFrom: [location]\nTo/Package: [destination or package]\nVehicle: [type]\nPassengers: [count]\nNotes: [notes]"
- Detect if the customer is on mobile vs desktop — on mobile, the `wa.me` link should open the WhatsApp app directly; on desktop, it should open WhatsApp Web (this is usually automatic with wa.me links, but please confirm the implementation handles both cleanly)

## 3. Make the experience feel smart and polished (not just functional)
- After submission, don't just silently redirect — show a brief, well-designed success state first: a confirmation message with a subtle animation (using Framer Motion, which should already be in the project) like a checkmark or a smooth fade/scale-in, saying something like "Booking request received! Opening WhatsApp to confirm..." before the WhatsApp redirect happens
- Add a short delay (around 1.5-2 seconds) between showing this success state and triggering the WhatsApp redirect, so the customer actually sees the confirmation instead of being yanked away instantly
- If the WhatsApp redirect fails to open for any reason (e.g., popup blocked), show a fallback button the customer can manually click: "Open WhatsApp to Confirm" linking to the same wa.me URL
- Keep this consistent with our existing liquid glass / gradient morphism design language — the success state should use the same frosted glass card style as the rest of the site, not a plain browser alert or a jarring plain white box

## 4. Data integrity and validation
- Validate all form fields server-side before doing either the email or WhatsApp step (don't trust client-side validation alone)
- Sanitize the input to prevent injection into the email content or the WhatsApp URL
- Keep the rate limiting on this API route that we set up previously — confirm it's still in place and working after these changes

## 5. After finishing
- List every file you created or modified
- Tell me exactly where to plug in the real values for `{{OWNER_EMAIL}}` and `{{OWNER_WHATSAPP}}` (the WhatsApp number should be in international format like `919876543210` with no + or spaces, per wa.me's requirements)
- Confirm whether the Resend API key needs to be added to my `.env.local` file, and tell me the exact variable name it expects

Build this so it feels like a premium, trustworthy local business site — smooth, confident, no jank — not just a bare-minimum functional form.
