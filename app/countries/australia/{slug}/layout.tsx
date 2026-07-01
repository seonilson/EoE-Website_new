import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study in Australia from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
  description: "Complete guide to studying in Australia for Indian students. Student visa process, top universities, scholarships, cost of living and career pathways. Expert guidance by ICEF-accredited consultants in Ahmedabad. 485 Post-Study Work Visa, World-Class Universities.",
  keywords: ["study in Australia from India", "Australia student visa India", "485 visa Australia India", "Australian university admissions India", "study in Australia Ahmedabad", "Australia PR pathway India", "Australian overseas education"],
  alternates: { canonical: "https://www.edificationoverseas.com/countries/australia" },
  openGraph: {
    title: "Study in Australia from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
    description: "Complete guide to studying in Australia. Visa process, top universities, scholarships and career pathways for Indian students. 485 Post-Study Work Visa, World-Class Universities.",
    url: "https://www.edificationoverseas.com/countries/australia",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Study in Australia from India — Edification Overseas Ahmedabad" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in Australia from India 2026 | Edification Overseas",
    description: "Visa process, top universities, scholarships and career pathways for Indian students in Australia. ICEF-accredited consultants in Ahmedabad.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{}</>;
}
