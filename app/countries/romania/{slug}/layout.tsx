import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study in Romania from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
  description: "Complete guide to studying in Romania for Indian students. Student visa process, top universities, scholarships, cost of living and career pathways. Expert guidance by ICEF-accredited consultants in Ahmedabad. EU Degree, Affordable Medical & Engineering.",
  keywords: ["study in Romania from India", "Romania student visa India", "Romanian university admissions India", "MBBS in Romania India"],
  alternates: { canonical: "https://www.edificationoverseas.com/countries/romania" },
  openGraph: {
    title: "Study in Romania from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
    description: "Complete guide to studying in Romania. Visa process, top universities, scholarships and career pathways for Indian students. EU Degree, Affordable Medical & Engineering.",
    url: "https://www.edificationoverseas.com/countries/romania",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Study in Romania from India — Edification Overseas Ahmedabad" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in Romania from India 2026 | Edification Overseas",
    description: "Visa process, top universities, scholarships and career pathways for Indian students in Romania. ICEF-accredited consultants in Ahmedabad.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{}</>;
}
