import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import { LilyCallout } from "@/components/lily-callout";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Logo } from "@/components/logo";
import { company } from "@/content/site";
import "./globals.css";

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: `${company.legalName} — Brokerage, Trading and Investment Advisory`,
    template: `%s — ${company.name}`,
  },
  description: company.description,
  applicationName: company.name,
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: company.legalName,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#4e4f6f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-NG" className={`${instrument.variable} ${plexMono.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <p className="flex flex-wrap justify-center gap-x-2 bg-ink px-4 py-3 text-center text-[0.8125rem] leading-snug text-paper">
          <span className="tabular font-mono text-xs leading-[inherit]">{company.rcNumber}</span>
        </p>
        <SiteHeader logo={<Logo className="h-11" />} />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <LilyCallout />
        <SiteFooter />
      </body>
    </html>
  );
}
