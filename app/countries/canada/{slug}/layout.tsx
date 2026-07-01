import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study in Canada from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
  description: "Complete guide to studying in Canada for Indian students. Student visa process, top universities, scholarships, cost of living and career pathways. Expert guidance by ICEF-accredited consultants in Ahmedabad. PGWP Up to 3 Years, Clear PR Pathway.",
  keywords: ["Canada student visa India", "study in Canada from India", "Canada PGWP 2026", "study permit Canada Indian students", "Canada PR pathway India", "Canadian university admissions India", "study in Canada Ahmedabad", "Express Entry Canada"],
  alternates: { canonical: "https://www.edificationoverseas.com/countries/canada" },
  openGraph: {
    title: "Study in Canada from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
    description: "Complete guide to studying in Canada. Visa process, top universities, scholarships and career pathways for Indian students. PGWP Up to 3 Years, Clear PR Pathway.",
    url: "https://www.edificationoverseas.com/countries/canada",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Study in Canada from India — Edification Overseas Ahmedabad" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in Canada from India 2026 | Edification Overseas",
    description: "Visa process, top universities, scholarships and career pathways for Indian students in Canada. ICEF-accredited consultants in Ahmedabad.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{}</>;
}
