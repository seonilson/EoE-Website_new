import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study in Poland from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
  description: "Complete guide to studying in Poland for Indian students. Student visa process, top universities, scholarships, cost of living and career pathways. Expert guidance by ICEF-accredited consultants in Ahmedabad. Affordable EU Degree, Medical Programs.",
  keywords: ["study in Poland from India", "Poland student visa India", "Polish university admissions India", "study in Poland Ahmedabad"],
  alternates: { canonical: "https://www.edificationoverseas.com/countries/poland" },
  openGraph: {
    title: "Study in Poland from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
    description: "Complete guide to studying in Poland. Visa process, top universities, scholarships and career pathways for Indian students. Affordable EU Degree, Medical Programs.",
    url: "https://www.edificationoverseas.com/countries/poland",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Study in Poland from India — Edification Overseas Ahmedabad" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in Poland from India 2026 | Edification Overseas",
    description: "Visa process, top universities, scholarships and career pathways for Indian students in Poland. ICEF-accredited consultants in Ahmedabad.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{}</>;
}
