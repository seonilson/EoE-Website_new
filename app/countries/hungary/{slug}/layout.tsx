import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study in Hungary from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
  description: "Complete guide to studying in Hungary for Indian students. Student visa process, top universities, scholarships, cost of living and career pathways. Expert guidance by ICEF-accredited consultants in Ahmedabad. EU Degree, Affordable MBBS & Engineering.",
  keywords: ["study in Hungary from India", "Hungary student visa India", "Hungarian university admissions India", "MBBS in Hungary India"],
  alternates: { canonical: "https://www.edificationoverseas.com/countries/hungary" },
  openGraph: {
    title: "Study in Hungary from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
    description: "Complete guide to studying in Hungary. Visa process, top universities, scholarships and career pathways for Indian students. EU Degree, Affordable MBBS & Engineering.",
    url: "https://www.edificationoverseas.com/countries/hungary",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Study in Hungary from India — Edification Overseas Ahmedabad" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in Hungary from India 2026 | Edification Overseas",
    description: "Visa process, top universities, scholarships and career pathways for Indian students in Hungary. ICEF-accredited consultants in Ahmedabad.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{}</>;
}
