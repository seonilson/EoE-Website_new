import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study in Moldova from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
  description: "Complete guide to studying in Moldova for Indian students. Student visa process, top universities, scholarships, cost of living and career pathways. Expert guidance by ICEF-accredited consultants in Ahmedabad. Affordable EU-Adjacent Degrees.",
  keywords: ["study in Moldova from India", "Moldova student visa India", "Moldova university admissions India", "study in Moldova Ahmedabad"],
  alternates: { canonical: "https://www.edificationoverseas.com/countries/moldova" },
  openGraph: {
    title: "Study in Moldova from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
    description: "Complete guide to studying in Moldova. Visa process, top universities, scholarships and career pathways for Indian students. Affordable EU-Adjacent Degrees.",
    url: "https://www.edificationoverseas.com/countries/moldova",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Study in Moldova from India — Edification Overseas Ahmedabad" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in Moldova from India 2026 | Edification Overseas",
    description: "Visa process, top universities, scholarships and career pathways for Indian students in Moldova. ICEF-accredited consultants in Ahmedabad.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{}</>;
}
