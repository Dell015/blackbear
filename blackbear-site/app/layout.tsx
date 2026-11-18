import type { Metadata, Viewport } from "next";
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/700.css";
import "@fontsource/yellowtail/400.css";
import "@fontsource/caveat/500.css";
import "@fontsource/caveat/700.css";
import "./globals.css";
import "maplibre-gl/dist/maplibre-gl.css";
import "./refinement.css";
import "./proposal.css";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Black Bear Kitchen + Coffee | Campsites across Isabela & Cagayan",
    template: "%s · Black Bear Kitchen + Coffee",
  },
  description:
    "Bear hugs & bold brews since 2020. Brunch, coffee, matcha, protein drinks and cakes at seven Black Bear campsites: Cauayan, Santiago (open 24/7), Alicia, Ilagan, Roxas and Tuguegarao.",
  // Prototype: keep out of search engines until Black Bear approves it.
  robots: { index: false, follow: false },
  openGraph: {
    title: "Black Bear Kitchen + Coffee",
    description:
      "Bear hugs & bold brews. Find your nearest campsite, see today's cakes, browse the full menu.",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  icons: { icon: "/favicon.png", apple: "/apple-icon.png" },
};

export const viewport: Viewport = { themeColor: "#CD6128" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Marks JS as available so reveal animations can hide content before they run. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(()=>{const r=document.documentElement;r.classList.add('js');try{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches||localStorage.getItem('bb-reduced-motion')==='1')r.classList.add('rm')}catch{}setTimeout(()=>{if(!window.__bbReady)r.classList.remove('js')},4000)})()",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
