This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [https://rsk-taxi-website.vercel.app/](https://rsk-taxi-website.vercel.app/) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
## Business details

Edit `data/site.ts` for `{{PHONE}}`, `{{WHATSAPP}}`, `{{EMAIL}}`, `{{GOA_BUSINESS_ADDRESS}}` and `{{GOOGLE_MAP_EMBED_URL}}`. Edit `data/vehicles.ts` and `data/packages.ts` for all price placeholders. Replace `{{INCLUSIONS}}`, `{{EXCLUSIONS}}` and `{{ADDITIONAL_CHARGES_NOTE}}` with approved commercial terms.

The booking route validates and rate-limits requests, creates a pre-filled WhatsApp link, and sends email when SMTP variables from `.env.example` are configured. Without SMTP configuration, WhatsApp still works and the API returns the link.

## Learn More
This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:
Check out [the Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. Import this repository into Vercel, add the SMTP variables in project settings, and deploy with no extra configuration.

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
