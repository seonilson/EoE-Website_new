import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study in United States from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
  description: "Complete guide to studying in United States for Indian students. Student visa process, top universities, scholarships, cost of living and career pathways. Expert guidance by ICEF-accredited consultants in Ahmedabad. Ivy League Access, OPT Work Rights.",
  keywords: ["study in USA from India", "USA student visa India", "F1 visa Indian students", "US university admissions India", "study in USA Ahmedabad", "OPT visa USA India", "American university India"],
  alternates: { canonical: "https://www.edificationoverseas.com/countries/usa" },
  openGraph: {
    title: "Study in United States from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
    description: "Complete guide to studying in United States. Visa process, top universities, scholarships and career pathways for Indian students. Ivy League Access, OPT Work Rights.",
    url: "https://www.edificationoverseas.com/countries/usa",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Study in United States from India — Edification Overseas Ahmedabad" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in United States from India 2026 | Edification Overseas",
    description: "Visa process, top universities, scholarships and career pathways for Indian students in United States. ICEF-accredited consultants in Ahmedabad.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{}</>;
}
