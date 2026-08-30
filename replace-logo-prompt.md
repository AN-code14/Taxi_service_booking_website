I've placed our actual business logo image at `public/logo.png`. Right now, the site displays a placeholder circular badge with the text "RSK" instead of this real logo — this appears in at least the site header and site footer (likely `components/site-header.tsx` and `components/site-footer.tsx`, but please check for any other places this same text badge appears too, like a mobile nav or loading screen).

Please do the following:

1. Search the entire codebase for this circular "RSK" text badge (it's usually a styled `<div>` with "RSK" as its text content, inside a rounded/circle container) and find every file where it appears.

2. In each location, replace the text-based badge with the actual logo image using Next.js's `Image` component, importing it like:
   ```tsx
   import Image from "next/image";
   ```
   and rendering it as:
   ```tsx
   <Image src="/logo.png" alt="RSK Tours and Travels" width={40} height={40} className="rounded-full object-cover" />
   ```
   Adjust the width/height to match whatever size the original text badge was, so the layout doesn't shift or break.

3. Keep the "TOURS & TRAVELS" text label next to the logo exactly as it currently appears — only replace the circular badge itself, not the accompanying text.

4. If the logo image has a background color that clashes with the header/footer background (e.g., a light background in a dark footer, or vice versa), adjust the container styling slightly (e.g., add a subtle white/dark backing circle behind the logo) so it looks clean in both header and footer contexts — but don't change the logo image itself.

5. After making the changes, list every file you edited so I can verify the swap was applied everywhere the placeholder badge existed.

Do not touch any other part of the design, layout, or content — this should be a scoped, isolated change limited to swapping the placeholder badge for the real logo image.
