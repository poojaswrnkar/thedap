import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { site } from "@/data/site";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});


export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  authors: [{ name: site.name }],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: `${site.name} — Explore the World with Us`,
    description: "Discover amazing tours in Bhutan, Nepal, India & Paris. Book your dream journey today!",
    url: site.url,
    siteName: site.name,
    locale: "en_IN",
    images: [{ url: "/assets/image/Bhutan.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Dream Travel Starts Here`,
    description:
      "Customized travel packages, flights, hotels & unforgettable journeys across top destinations.",
    images: ["/assets/image/Bhutan.jpg"],
  },
  icons: {
    icon: [
      { url: "/assets/image/favicon/favicon.ico" },
      { url: "/assets/image/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/assets/image/favicon/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/assets/image/favicon/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/assets/image/favicon/site.webmanifest",
  other: {
    "geo.region": "IN-UP",
    "geo.placename": "Noida",
    "geo.position": "28.6139;77.2090",
    ICBM: "28.6139, 77.2090",
  },
};

export const viewport: Viewport = {
  themeColor: "#fdfbf6",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: site.name,
  url: site.url,
  logo: `${site.url}${site.logo}`,
  description:
    "We provide customized travel packages, hotel bookings, flights and tours across Bhutan, Nepal, India and Europe.",
  address: { "@type": "PostalAddress", ...site.contact.postal },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-9654659085",
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: ["https://facebook.com/", "https://instagram.com/", "https://twitter.com/"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
