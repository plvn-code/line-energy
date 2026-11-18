import type { Metadata, Viewport } from "next";
import { Geologica, JetBrains_Mono, Manrope, Montserrat } from "next/font/google";
import { CursorLabel } from "@/components/CursorLabel";
import { Effects } from "@/components/Effects";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Intro } from "@/components/Intro";
import { LeadModal } from "@/components/LeadModal";
import { MobileBar } from "@/components/MobileBar";
import { site } from "@/lib/site";
import "./globals.css";

const display = Geologica({ subsets: ["latin", "cyrillic"], variable: "--font-display", display: "swap" });
const body = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin", "cyrillic"], variable: "--font-mono", display: "swap" });
const brand = Montserrat({ subsets: ["latin", "cyrillic"], weight: ["600"], variable: "--font-brand", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Line Energy — сонячні електростанції під ключ в Одесі", template: "%s — Line Energy" },
  description: site.description,
  openGraph: { type: "website", locale: "uk_UA", siteName: "Line Energy", images: ["/images/hero-poster.webp"] },
  // The redesign stays out of search until the client approves the launch.
  robots: process.env.NEXT_PUBLIC_SITE_LIVE === "1" ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#030c14" };

const organization = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Line Energy",
  legalName: "ЛАЙН-ЕНЕРДЖИ",
  url: site.url,
  telephone: "+380992102119",
  email: site.email,
  areaServed: "Одеська область",
  address: { "@type": "PostalAddress", addressLocality: "Одеса", addressCountry: "UA" },
  sameAs: [site.instagram],
};

/** Runs before paint: shows the intro only once per session, only on the home page, never with reduced motion. */
const introScript = `try{var d=document.documentElement;if(sessionStorage.getItem('le-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches||location.pathname!=='/'){d.classList.add('no-intro')}sessionStorage.setItem('le-intro','1')}catch(e){document.documentElement.classList.add('no-intro')}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk" data-scroll-behavior="smooth" className={`${display.variable} ${body.variable} ${mono.variable} ${brand.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Перейти до змісту
        </a>
        <Intro />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <LeadModal />
        <MobileBar />
        <CursorLabel />
        <Effects />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      </body>
    </html>
  );
}
