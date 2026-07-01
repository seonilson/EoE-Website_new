import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study in New Zealand from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
  description: "Complete guide to studying in New Zealand for Indian students. Student visa process, top universities, scholarships, cost of living and career pathways. Expert guidance by ICEF-accredited consultants in Ahmedabad. 3-Year Post-Study Work Visa.",
  keywords: ["study in New Zealand from India", "New Zealand student visa India", "NZ university admissions India", "study in New Zealand Ahmedabad"],
  alternates: { canonical: "https://www.edificationoverseas.com/countries/new-zealand" },
  openGraph: {
    title: "Study in New Zealand from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
    description: "Complete guide to studying in New Zealand. Visa process, top universities, scholarships and career pathways for Indian students. 3-Year Post-Study Work Visa.",
    url: "https://www.edificationoverseas.com/countries/new-zealand",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Study in New Zealand from India — Edification Overseas Ahmedabad" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in New Zealand from India 2026 | Edification Overseas",
    description: "Visa process, top universities, scholarships and career pathways for Indian students in New Zealand. ICEF-accredited consultants in Ahmedabad.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{}</>;
}
