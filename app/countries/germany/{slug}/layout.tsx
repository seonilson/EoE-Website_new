import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study in Germany from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
  description: "Complete guide to studying in Germany for Indian students. Student visa process, top universities, scholarships, cost of living and career pathways. Expert guidance by ICEF-accredited consultants in Ahmedabad. Tuition-Free Public Universities, 18-Month Job Seeker Visa.",
  keywords: ["study in Germany from India", "Germany student visa India", "tuition free universities Germany India", "APS certificate Germany India", "study in Germany Ahmedabad", "Germany blocked account India", "German university admissions India", "study in Germany 2026"],
  alternates: { canonical: "https://www.edificationoverseas.com/countries/germany" },
  openGraph: {
    title: "Study in Germany from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
    description: "Complete guide to studying in Germany. Visa process, top universities, scholarships and career pathways for Indian students. Tuition-Free Public Universities, 18-Month Job Seeker Visa.",
    url: "https://www.edificationoverseas.com/countries/germany",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Study in Germany from India — Edification Overseas Ahmedabad" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in Germany from India 2026 | Edification Overseas",
    description: "Visa process, top universities, scholarships and career pathways for Indian students in Germany. ICEF-accredited consultants in Ahmedabad.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{}</>;
}
