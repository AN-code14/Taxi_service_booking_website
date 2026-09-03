# Prompt for VS Code Copilot Agent — Switch from Nodemailer to Resend

Paste this into Copilot's Agent mode.

---

Our booking API route (`app/api/booking/route.ts`) currently uses `nodemailer` to send email notifications, but it's not fully set up and I want to replace it entirely with **Resend** instead, which is simpler and doesn't need SMTP credentials.

Please do the following:

1. Remove the `nodemailer` import and any Nodemailer-specific transport/setup code from `app/api/booking/route.ts` (and uninstall it as a dependency — remove it from `package.json` if it's not used anywhere else in the project).

2. Install and set up the `resend` package properly:
   ```bash
   npm install resend
   ```

3. Rewrite the email-sending logic in the booking API route to use Resend's SDK, structured like this:
   ```ts
   import { Resend } from 'resend';

   const resend = new Resend(process.env.RESEND_API_KEY);

   await resend.emails.send({
     from: 'RSK Tours and Travels <onboarding@resend.dev>',
     to: process.env.OWNER_EMAIL as string,
     subject: `New Booking Request — ${customerName}`,
     html: `<the formatted booking details as HTML>`,
   });
   ```
   Keep all the existing booking detail fields we already send (name, phone, pickup date/time, pickup/drop location or package, vehicle type, passengers, notes) — just change the sending mechanism, not the content structure.

4. Make sure this reads `RESEND_API_KEY` and `OWNER_EMAIL` from environment variables (`process.env`) — never hardcoded.

5. Keep the existing error handling pattern: if the email fails to send, log the error server-side but don't crash the whole request — the WhatsApp redirect step should still work even if email fails.

6. Keep the existing input validation, sanitization, and rate limiting on this route exactly as they are — only the email-sending mechanism should change.

7. After finishing, tell me:
   - Exactly which files you modified
   - Confirm `nodemailer` and `@types/nodemailer` were removed from `package.json`
   - Confirm the exact environment variable names this now expects (`RESEND_API_KEY` and `OWNER_EMAIL`) so I can add them to `.env.local` and Vercel
