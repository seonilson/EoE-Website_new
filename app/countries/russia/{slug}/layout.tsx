import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study in Russia from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
  description: "Complete guide to studying in Russia for Indian students. Student visa process, top universities, scholarships, cost of living and career pathways. Expert guidance by ICEF-accredited consultants in Ahmedabad. Affordable MBBS, Engineering & Sciences.",
  keywords: ["study in Russia from India", "Russia student visa India", "MBBS in Russia India", "Russian university admissions India"],
  alternates: { canonical: "https://www.edificationoverseas.com/countries/russia" },
  openGraph: {
    title: "Study in Russia from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
    description: "Complete guide to studying in Russia. Visa process, top universities, scholarships and career pathways for Indian students. Affordable MBBS, Engineering & Sciences.",
    url: "https://www.edificationoverseas.com/countries/russia",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Study in Russia from India — Edification Overseas Ahmedabad" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in Russia from India 2026 | Edification Overseas",
    description: "Visa process, top universities, scholarships and career pathways for Indian students in Russia. ICEF-accredited consultants in Ahmedabad.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{}</>;
}
