import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study in South Korea from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
  description: "Complete guide to studying in South Korea for Indian students. Student visa process, top universities, scholarships, cost of living and career pathways. Expert guidance by ICEF-accredited consultants in Ahmedabad. K-Tech Hub, Strong Scholarships.",
  keywords: ["study in South Korea from India", "South Korea student visa India", "Korean university admissions India", "study in South Korea Ahmedabad"],
  alternates: { canonical: "https://www.edificationoverseas.com/countries/south-korea" },
  openGraph: {
    title: "Study in South Korea from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
    description: "Complete guide to studying in South Korea. Visa process, top universities, scholarships and career pathways for Indian students. K-Tech Hub, Strong Scholarships.",
    url: "https://www.edificationoverseas.com/countries/south-korea",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Study in South Korea from India — Edification Overseas Ahmedabad" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in South Korea from India 2026 | Edification Overseas",
    description: "Visa process, top universities, scholarships and career pathways for Indian students in South Korea. ICEF-accredited consultants in Ahmedabad.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{}</>;
}
