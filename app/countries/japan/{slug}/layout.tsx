import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study in Japan from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
  description: "Complete guide to studying in Japan for Indian students. Student visa process, top universities, scholarships, cost of living and career pathways. Expert guidance by ICEF-accredited consultants in Ahmedabad. Technology & Innovation Leader.",
  keywords: ["study in Japan from India", "Japan student visa India", "Japanese university admissions India", "study in Japan Ahmedabad"],
  alternates: { canonical: "https://www.edificationoverseas.com/countries/japan" },
  openGraph: {
    title: "Study in Japan from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
    description: "Complete guide to studying in Japan. Visa process, top universities, scholarships and career pathways for Indian students. Technology & Innovation Leader.",
    url: "https://www.edificationoverseas.com/countries/japan",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Study in Japan from India — Edification Overseas Ahmedabad" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in Japan from India 2026 | Edification Overseas",
    description: "Visa process, top universities, scholarships and career pathways for Indian students in Japan. ICEF-accredited consultants in Ahmedabad.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{}</>;
}
