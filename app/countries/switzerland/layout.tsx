import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study in Switzerland from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
  description: "Complete guide to studying in Switzerland for Indian students. Student visa process, top universities, scholarships, cost of living and career pathways. Expert guidance by ICEF-accredited consultants in Ahmedabad. Hospitality & Finance Excellence.",
  keywords: ["study in Switzerland from India", "Switzerland student visa India", "Swiss university admissions India", "study in Switzerland Ahmedabad"],
  alternates: { canonical: "https://www.edificationoverseas.com/countries/switzerland" },
  openGraph: {
    title: "Study in Switzerland from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
    description: "Complete guide to studying in Switzerland. Visa process, top universities, scholarships and career pathways for Indian students. Hospitality & Finance Excellence.",
    url: "https://www.edificationoverseas.com/countries/switzerland",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Study in Switzerland from India — Edification Overseas Ahmedabad" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in Switzerland from India 2026 | Edification Overseas",
    description: "Visa process, top universities, scholarships and career pathways for Indian students in Switzerland. ICEF-accredited consultants in Ahmedabad.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
