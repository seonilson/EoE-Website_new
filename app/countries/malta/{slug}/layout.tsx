import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study in Malta from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
  description: "Complete guide to studying in Malta for Indian students. Student visa process, top universities, scholarships, cost of living and career pathways. Expert guidance by ICEF-accredited consultants in Ahmedabad. EU Residency Pathway, English-Medium Degrees.",
  keywords: ["study in Malta from India", "Malta student visa India", "Malta university admissions India", "EU degree Malta Indian students", "study in Malta Ahmedabad", "Malta overseas education India"],
  alternates: { canonical: "https://www.edificationoverseas.com/countries/malta" },
  openGraph: {
    title: "Study in Malta from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
    description: "Complete guide to studying in Malta. Visa process, top universities, scholarships and career pathways for Indian students. EU Residency Pathway, English-Medium Degrees.",
    url: "https://www.edificationoverseas.com/countries/malta",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Study in Malta from India — Edification Overseas Ahmedabad" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in Malta from India 2026 | Edification Overseas",
    description: "Visa process, top universities, scholarships and career pathways for Indian students in Malta. ICEF-accredited consultants in Ahmedabad.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{}</>;
}
