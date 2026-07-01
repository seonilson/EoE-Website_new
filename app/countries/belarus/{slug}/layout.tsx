import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study in Belarus from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
  description: "Complete guide to studying in Belarus for Indian students. Student visa process, top universities, scholarships, cost of living and career pathways. Expert guidance by ICEF-accredited consultants in Ahmedabad. Affordable MBBS & Engineering.",
  keywords: ["study in Belarus from India", "Belarus student visa India", "MBBS in Belarus India", "Belarus university admissions India", "study in Belarus Ahmedabad"],
  alternates: { canonical: "https://www.edificationoverseas.com/countries/belarus" },
  openGraph: {
    title: "Study in Belarus from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
    description: "Complete guide to studying in Belarus. Visa process, top universities, scholarships and career pathways for Indian students. Affordable MBBS & Engineering.",
    url: "https://www.edificationoverseas.com/countries/belarus",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Study in Belarus from India — Edification Overseas Ahmedabad" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in Belarus from India 2026 | Edification Overseas",
    description: "Visa process, top universities, scholarships and career pathways for Indian students in Belarus. ICEF-accredited consultants in Ahmedabad.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{}</>;
}
