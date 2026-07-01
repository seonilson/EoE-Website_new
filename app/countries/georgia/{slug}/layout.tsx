import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study in Georgia from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
  description: "Complete guide to studying in Georgia for Indian students. Student visa process, top universities, scholarships, cost of living and career pathways. Expert guidance by ICEF-accredited consultants in Ahmedabad. Low Tuition, English Medium, Easy Visa.",
  keywords: ["study in Georgia from India", "Georgia student visa India", "Georgia university admissions India", "cheap study abroad Georgia India", "study in Georgia Ahmedabad"],
  alternates: { canonical: "https://www.edificationoverseas.com/countries/georgia" },
  openGraph: {
    title: "Study in Georgia from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
    description: "Complete guide to studying in Georgia. Visa process, top universities, scholarships and career pathways for Indian students. Low Tuition, English Medium, Easy Visa.",
    url: "https://www.edificationoverseas.com/countries/georgia",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Study in Georgia from India — Edification Overseas Ahmedabad" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in Georgia from India 2026 | Edification Overseas",
    description: "Visa process, top universities, scholarships and career pathways for Indian students in Georgia. ICEF-accredited consultants in Ahmedabad.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{}</>;
}
