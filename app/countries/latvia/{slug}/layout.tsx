import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study in Latvia from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
  description: "Complete guide to studying in Latvia for Indian students. Student visa process, top universities, scholarships, cost of living and career pathways. Expert guidance by ICEF-accredited consultants in Ahmedabad. Affordable EU Degree, Baltic Region.",
  keywords: ["study in Latvia from India", "Latvia student visa India", "Latvian university admissions India", "study in Latvia Ahmedabad"],
  alternates: { canonical: "https://www.edificationoverseas.com/countries/latvia" },
  openGraph: {
    title: "Study in Latvia from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
    description: "Complete guide to studying in Latvia. Visa process, top universities, scholarships and career pathways for Indian students. Affordable EU Degree, Baltic Region.",
    url: "https://www.edificationoverseas.com/countries/latvia",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Study in Latvia from India — Edification Overseas Ahmedabad" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in Latvia from India 2026 | Edification Overseas",
    description: "Visa process, top universities, scholarships and career pathways for Indian students in Latvia. ICEF-accredited consultants in Ahmedabad.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{}</>;
}
