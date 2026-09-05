import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "RSK Tours and Travels | Goa Taxi Service", template: "%s | RSK Tours and Travels" },
  description: "Trusted taxi service, car hire and guided Goa tour packages from RSK Tours and Travels.",
  metadataBase: new URL("https://rsktoursandtravels.vercel.app"),
  openGraph: { title: "RSK Tours and Travels", description: "Your trusted taxi service in Goa", type: "website" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <a
          className="designer-watermark"
          href="https://wa.me/918390325653"
          target="_blank"
          rel="noopener noreferrer"
        >
          Designed by Ajay Bind
        </a>
      </body>
    </html>
  );
}
