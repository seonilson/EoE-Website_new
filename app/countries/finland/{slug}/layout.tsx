import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study in Finland from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
  description: "Complete guide to studying in Finland for Indian students. Student visa process, top universities, scholarships, cost of living and career pathways. Expert guidance by ICEF-accredited consultants in Ahmedabad. Top Education System, Free Public Universities.",
  keywords: ["study in Finland from India", "Finland student visa India", "Finnish university admissions India", "study in Finland Ahmedabad"],
  alternates: { canonical: "https://www.edificationoverseas.com/countries/finland" },
  openGraph: {
    title: "Study in Finland from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
    description: "Complete guide to studying in Finland. Visa process, top universities, scholarships and career pathways for Indian students. Top Education System, Free Public Universities.",
    url: "https://www.edificationoverseas.com/countries/finland",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Study in Finland from India — Edification Overseas Ahmedabad" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in Finland from India 2026 | Edification Overseas",
    description: "Visa process, top universities, scholarships and career pathways for Indian students in Finland. ICEF-accredited consultants in Ahmedabad.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{}</>;
}
