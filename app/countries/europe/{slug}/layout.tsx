import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study in Europe from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
  description: "Complete guide to studying in Europe for Indian students. Student visa process, top universities, scholarships, cost of living and career pathways. Expert guidance by ICEF-accredited consultants in Ahmedabad. Pan-European Study Options.",
  keywords: ["study in Europe from India", "Europe student visa India", "European university admissions India", "study in Europe Ahmedabad", "study abroad Europe Indian students"],
  alternates: { canonical: "https://www.edificationoverseas.com/countries/europe" },
  openGraph: {
    title: "Study in Europe from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
    description: "Complete guide to studying in Europe. Visa process, top universities, scholarships and career pathways for Indian students. Pan-European Study Options.",
    url: "https://www.edificationoverseas.com/countries/europe",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Study in Europe from India — Edification Overseas Ahmedabad" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in Europe from India 2026 | Edification Overseas",
    description: "Visa process, top universities, scholarships and career pathways for Indian students in Europe. ICEF-accredited consultants in Ahmedabad.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{}</>;
}
