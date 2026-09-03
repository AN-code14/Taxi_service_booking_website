# Final Polish & Security Prompt — RSK Tours and Travels

Paste this into VS Code Copilot Agent mode. This is a multi-part task — let the agent work through each numbered section in order, confirming each part before moving to the next if possible.

---

## PART 1: Add extra-km pricing note to vehicle cards

On the homepage's vehicle preview section and the full `/vehicles` page, directly below the price tag on each vehicle card (Sedan, Hatchback, SUV, MUV), add a small secondary line of text:

> "8 hours / 80 km included — ₹20 per extra km"

This should be smaller and more muted than the main price (e.g., a lighter gray/secondary text color, smaller font size) so it reads as supporting detail, not competing with the main price for attention. Store this as a shared constant in the pricing data file (`data/pricing.ts` or wherever pricing lives) so it's not duplicated as a hardcoded string across multiple components.

## PART 2: Add a 3D car per vehicle type on the cards

Each vehicle card (Sedan, Hatchback, SUV, MUV) should show a small 3D rendering of that specific vehicle type — not just the one hero car used elsewhere on the site.

- Source or reuse simple, distinct low-poly `.glb` models for each of the 4 vehicle types (sedan-shaped, hatchback-shaped, SUV-shaped, MUV/minivan-shaped) — check Poly Pizza or Sketchfab for free CC0 models; if a perfect match isn't available for one type, use the closest reasonable shape rather than leaving it blank.
- These should be small, lightweight 3D canvases per card (much smaller/simpler than the hero scene) — keep performance in mind since there will be up to 4 on screen at once.
- Add a lightweight rotation or subtle idle animation on each, not a large fully-interactive scene like the hero.
- **Critical: make these degrade gracefully on mobile.** Detect low-end devices or small viewports and show a static image/icon fallback instead of the full 3D canvas if needed — do not let 4 simultaneous 3D canvases tank mobile performance (see Part 3, this connects directly).

## PART 3: Fix mobile performance and loading issues (highest priority)

Investigate and fix why some mobile users struggle to open the site. Please check and address all of the following:

1. **Bundle size and 3D load** — audit whether the 3D scenes (hero car + new per-card cars from Part 2) are lazy-loaded and code-split so they don't block the initial page load on mobile. Use dynamic imports (`next/dynamic` with `ssr: false`) for all Three.js/React Three Fiber components.
2. **Image optimization** — confirm every image uses Next.js's `Image` component with proper sizing, not raw `<img>` tags, and that large images are compressed.
3. **Font loading** — confirm fonts are loaded efficiently (using `next/font`) rather than render-blocking external font requests.
4. **Test with Lighthouse** — run a Lighthouse audit (mobile mode) in Chrome DevTools and report the performance score along with the top 3 issues it flags, then fix them.
5. **Reduce JavaScript on initial load** — identify any unnecessarily large dependencies loaded on every page (not just where needed) and code-split them.
6. **Add loading states** — ensure slow-loading sections (especially any 3D content) show a lightweight skeleton/spinner rather than a blank white screen while loading, so mobile users on slower connections don't think the site is broken.

After fixing, report the before/after Lighthouse mobile performance score.

## PART 4: Security hardening for customer data protection

Since we now collect customer name, phone, pickup/drop locations, and other personal details through the booking form, please implement the following:

1. **Input sanitization** — confirm all form inputs (name, phone, location text fields, notes) are sanitized against XSS/injection before being used in the email HTML or anywhere else. Use a proper sanitization library if raw values are currently being interpolated into HTML strings.
2. **Rate limiting** — confirm the booking API route has rate limiting in place (should already exist from earlier work) and verify it's actually functioning, not just present in code but unreachable.
3. **HTTPS enforcement** — Vercel handles this automatically, but confirm no mixed-content issues (no `http://` resource references anywhere causing browser warnings).
4. **Environment variable audit** — search the entire codebase for any hardcoded API keys, phone numbers used as secrets, or credentials that should be environment variables instead. Report anything found.
5. **No client-side exposure of secrets** — confirm `RESEND_API_KEY` and any other secret keys are only referenced in server-side code (API routes), never in client components where they'd be exposed in the browser bundle.
6. **Basic security headers** — add standard security headers via `next.config.ts` (Content-Security-Policy basics, X-Frame-Options, X-Content-Type-Options) to reduce common attack surface, without breaking any existing functionality (3D content, external images, etc.) — test thoroughly after adding these since CSP can silently break things if too strict.
7. **Form spam protection** — if not already present, add a basic honeypot field (a hidden form field bots fill in but humans don't see) as a lightweight additional spam-prevention layer alongside the existing rate limiting.
8. **Data minimization** — confirm we are not storing any customer data in a database or persistent storage anywhere (since booking details are only meant to flow through email/WhatsApp, not be saved) — if any accidental storage/logging of full customer data exists beyond error logs, flag it so we can decide whether to remove it.

## Final report

After completing all 4 parts, provide:
- A list of every file created or modified
- The before/after Lighthouse mobile score from Part 3
- Any security issues found and fixed in Part 4
- Anything you were unable to complete and why, so we can address it together
