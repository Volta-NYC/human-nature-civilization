import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/lib/ui/site-header";
import SiteFooter from "@/lib/ui/site-footer";
import RevealEngine from "@/lib/motion/reveal-engine";
import { site } from "@/content/site";
import { org } from "@/content/org";

/**
 * Typefaces are self-hosted by next/font at build time, so the running site
 * makes no request to any third party. Three roles, deliberately distinct:
 *
 *   Archivo      — display and interface. A grotesque with enough width and
 *                  weight to hold a headline at 9rem without going generic.
 *   Newsreader   — reading. This is a society built on argument; the long copy
 *                  should read like something worth finishing.
 *   IBM Plex Mono — the record. Every label, date, docket number and source
 *                  line, in the register of a filing.
 */
const display = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.legalName} — Queens, New York`,
    template: `%s · Human Nature & Civilization`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "forum society",
    "human nature",
    "civilization",
    "public lecture",
    "Queens",
    "Flushing",
    "New York nonprofit",
    "philosophy discussion",
  ],
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.legalName,
    title: `${site.legalName} — Queens, New York`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.legalName,
    description: site.description,
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#020a19",
  colorScheme: "dark",
};

/**
 * Structured data. Only verified facts are emitted — the address and the legal
 * identity from the state filing. No invented founder, rating or event.
 */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: org.legalName.value,
  alternateName: org.shortName.value,
  url: site.url,
  foundingDate: org.formedOn.value,
  address: {
    "@type": "PostalAddress",
    streetAddress: org.address.line1.value,
    addressLocality: org.address.city.value,
    addressRegion: org.address.state.value,
    postalCode: org.address.zip.value,
    addressCountry: "US",
  },
  areaServed: { "@type": "AdministrativeArea", name: "Queens, New York" },
  identifier: {
    "@type": "PropertyValue",
    propertyID: "NY DOS ID",
    value: org.dosId.value,
  },
  description: site.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          // Emitted from a typed literal, not user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <RevealEngine />
      </body>
    </html>
  );
}
