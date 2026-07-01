import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study in Spain from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
  description: "Complete guide to studying in Spain for Indian students. Student visa process, top universities, scholarships, cost of living and career pathways. Expert guidance by ICEF-accredited consultants in Ahmedabad. Affordable EU Degree, Warm Climate.",
  keywords: ["study in Spain from India", "Spain student visa India", "Spanish university admissions India", "study in Spain Ahmedabad"],
  alternates: { canonical: "https://www.edificationoverseas.com/countries/spain" },
  openGraph: {
    title: "Study in Spain from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
    description: "Complete guide to studying in Spain. Visa process, top universities, scholarships and career pathways for Indian students. Affordable EU Degree, Warm Climate.",
    url: "https://www.edificationoverseas.com/countries/spain",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Study in Spain from India — Edification Overseas Ahmedabad" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in Spain from India 2026 | Edification Overseas",
    description: "Visa process, top universities, scholarships and career pathways for Indian students in Spain. ICEF-accredited consultants in Ahmedabad.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{}</>;
}
