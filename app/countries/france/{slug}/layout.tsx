import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study in France from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
  description: "Complete guide to studying in France for Indian students. Student visa process, top universities, scholarships, cost of living and career pathways. Expert guidance by ICEF-accredited consultants in Ahmedabad. Grandes Écoles, Affordable Public Universities.",
  keywords: ["study in France from India", "France student visa India", "French university admissions India", "study in France Ahmedabad"],
  alternates: { canonical: "https://www.edificationoverseas.com/countries/france" },
  openGraph: {
    title: "Study in France from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
    description: "Complete guide to studying in France. Visa process, top universities, scholarships and career pathways for Indian students. Grandes Écoles, Affordable Public Universities.",
    url: "https://www.edificationoverseas.com/countries/france",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Study in France from India — Edification Overseas Ahmedabad" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in France from India 2026 | Edification Overseas",
    description: "Visa process, top universities, scholarships and career pathways for Indian students in France. ICEF-accredited consultants in Ahmedabad.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{}</>;
}
