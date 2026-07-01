import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study in Malaysia from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
  description: "Complete guide to studying in Malaysia for Indian students. Student visa process, top universities, scholarships, cost of living and career pathways. Expert guidance by ICEF-accredited consultants in Ahmedabad. Affordable, English-Medium, Asian Hub.",
  keywords: ["study in Malaysia from India", "Malaysia student visa India", "Malaysian university admissions India", "study in Malaysia Ahmedabad"],
  alternates: { canonical: "https://www.edificationoverseas.com/countries/malaysia" },
  openGraph: {
    title: "Study in Malaysia from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
    description: "Complete guide to studying in Malaysia. Visa process, top universities, scholarships and career pathways for Indian students. Affordable, English-Medium, Asian Hub.",
    url: "https://www.edificationoverseas.com/countries/malaysia",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Study in Malaysia from India — Edification Overseas Ahmedabad" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in Malaysia from India 2026 | Edification Overseas",
    description: "Visa process, top universities, scholarships and career pathways for Indian students in Malaysia. ICEF-accredited consultants in Ahmedabad.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{}</>;
}
