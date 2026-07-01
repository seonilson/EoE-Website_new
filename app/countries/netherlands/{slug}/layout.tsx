import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study in Netherlands from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
  description: "Complete guide to studying in Netherlands for Indian students. Student visa process, top universities, scholarships, cost of living and career pathways. Expert guidance by ICEF-accredited consultants in Ahmedabad. English-Taught Programs, EU Hub.",
  keywords: ["study in Netherlands from India", "Netherlands student visa India", "Dutch university admissions India", "study in Netherlands Ahmedabad"],
  alternates: { canonical: "https://www.edificationoverseas.com/countries/netherlands" },
  openGraph: {
    title: "Study in Netherlands from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
    description: "Complete guide to studying in Netherlands. Visa process, top universities, scholarships and career pathways for Indian students. English-Taught Programs, EU Hub.",
    url: "https://www.edificationoverseas.com/countries/netherlands",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Study in Netherlands from India — Edification Overseas Ahmedabad" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in Netherlands from India 2026 | Edification Overseas",
    description: "Visa process, top universities, scholarships and career pathways for Indian students in Netherlands. ICEF-accredited consultants in Ahmedabad.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{}</>;
}
