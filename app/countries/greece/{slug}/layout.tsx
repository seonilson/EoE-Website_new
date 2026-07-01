import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study in Greece from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
  description: "Complete guide to studying in Greece for Indian students. Student visa process, top universities, scholarships, cost of living and career pathways. Expert guidance by ICEF-accredited consultants in Ahmedabad. EU Degree, Rich History, Affordable Living.",
  keywords: ["study in Greece from India", "Greece student visa India", "Greece university admissions India", "study in Greece Ahmedabad"],
  alternates: { canonical: "https://www.edificationoverseas.com/countries/greece" },
  openGraph: {
    title: "Study in Greece from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
    description: "Complete guide to studying in Greece. Visa process, top universities, scholarships and career pathways for Indian students. EU Degree, Rich History, Affordable Living.",
    url: "https://www.edificationoverseas.com/countries/greece",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Study in Greece from India — Edification Overseas Ahmedabad" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in Greece from India 2026 | Edification Overseas",
    description: "Visa process, top universities, scholarships and career pathways for Indian students in Greece. ICEF-accredited consultants in Ahmedabad.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{}</>;
}
