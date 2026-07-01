import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study in Ireland from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
  description: "Complete guide to studying in Ireland for Indian students. Student visa process, top universities, scholarships, cost of living and career pathways. Expert guidance by ICEF-accredited consultants in Ahmedabad. 2-Year Post-Study Stay Back, English Medium.",
  keywords: ["study in Ireland from India", "Ireland student visa India", "Irish university admissions India", "study in Ireland Ahmedabad", "Ireland stay back visa India"],
  alternates: { canonical: "https://www.edificationoverseas.com/countries/ireland" },
  openGraph: {
    title: "Study in Ireland from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
    description: "Complete guide to studying in Ireland. Visa process, top universities, scholarships and career pathways for Indian students. 2-Year Post-Study Stay Back, English Medium.",
    url: "https://www.edificationoverseas.com/countries/ireland",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Study in Ireland from India — Edification Overseas Ahmedabad" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in Ireland from India 2026 | Edification Overseas",
    description: "Visa process, top universities, scholarships and career pathways for Indian students in Ireland. ICEF-accredited consultants in Ahmedabad.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{}</>;
}
