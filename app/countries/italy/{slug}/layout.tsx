import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study in Italy from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
  description: "Complete guide to studying in Italy for Indian students. Student visa process, top universities, scholarships, cost of living and career pathways. Expert guidance by ICEF-accredited consultants in Ahmedabad. UNESCO Heritage, Design & Fashion.",
  keywords: ["study in Italy from India", "Italy student visa India", "Italian university admissions India", "study in Italy Ahmedabad"],
  alternates: { canonical: "https://www.edificationoverseas.com/countries/italy" },
  openGraph: {
    title: "Study in Italy from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
    description: "Complete guide to studying in Italy. Visa process, top universities, scholarships and career pathways for Indian students. UNESCO Heritage, Design & Fashion.",
    url: "https://www.edificationoverseas.com/countries/italy",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Study in Italy from India — Edification Overseas Ahmedabad" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in Italy from India 2026 | Edification Overseas",
    description: "Visa process, top universities, scholarships and career pathways for Indian students in Italy. ICEF-accredited consultants in Ahmedabad.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{}</>;
}
