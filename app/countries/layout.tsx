import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study Abroad Destinations — 33+ Countries | Edification Overseas Ahmedabad",
  description: "Explore 33+ study abroad destinations with Edification Overseas, Ahmedabad. Student visa guides, university rankings, scholarships and PR pathways for UK, Canada, Australia, Singapore, Germany, Cyprus, Malta, Mauritius and more. Free consultation for Gujarat students.",
  keywords: [
    "study abroad destinations India",
    "countries to study abroad from India",
    "overseas education destinations Gujarat",
    "best countries to study abroad for Indians",
    "study in UK from Ahmedabad",
    "study in Canada from Gujarat",
    "study in Australia from India",
    "study in Singapore from Ahmedabad",
    "study in Germany from India",
    "study in Cyprus from India",
    "study in Malta Indian students",
    "study in Mauritius from India",
    "study in Europe from India",
    "international student destinations India",
    "study abroad countries list India",
  ],
  alternates: { canonical: "https://www.edificationoverseas.com/countries" },
  openGraph: {
    title: "Study Abroad Destinations — 33+ Countries | Edification Overseas Ahmedabad",
    description: "Explore 33+ study abroad destinations with Edification Overseas. Student visa guides, scholarships and PR pathways for UK, Canada, Singapore, Germany, Cyprus & more.",
    url: "https://www.edificationoverseas.com/countries",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Study Abroad Destinations — Edification Overseas" }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Study Abroad Destinations — 33+ Countries | Edification Overseas", description: "Explore 33+ study abroad destinations. UK, Canada, Singapore, Germany, Cyprus & more. Free consultation in Ahmedabad, Gujarat.", images: ["/images/og-default.jpg"] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}