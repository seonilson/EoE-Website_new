import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study in Denmark from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
  description: "Complete guide to studying in Denmark for Indian students. Student visa process, top universities, scholarships, cost of living and career pathways. Expert guidance by ICEF-accredited consultants in Ahmedabad. Innovation Hub, Strong English Programs.",
  keywords: ["study in Denmark from India", "Denmark student visa India", "Danish university admissions India", "study in Denmark Ahmedabad"],
  alternates: { canonical: "https://www.edificationoverseas.com/countries/denmark" },
  openGraph: {
    title: "Study in Denmark from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
    description: "Complete guide to studying in Denmark. Visa process, top universities, scholarships and career pathways for Indian students. Innovation Hub, Strong English Programs.",
    url: "https://www.edificationoverseas.com/countries/denmark",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Study in Denmark from India — Edification Overseas Ahmedabad" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in Denmark from India 2026 | Edification Overseas",
    description: "Visa process, top universities, scholarships and career pathways for Indian students in Denmark. ICEF-accredited consultants in Ahmedabad.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{}</>;
}
