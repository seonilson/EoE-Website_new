import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study in Dubai (UAE) from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
  description: "Complete guide to studying in Dubai (UAE) for Indian students. Student visa process, top universities, scholarships, cost of living and career pathways. Expert guidance by ICEF-accredited consultants in Ahmedabad. Tax-Free Career Hub, No IELTS for Many.",
  keywords: ["study in Dubai from India", "Dubai student visa India", "UAE university admissions India", "study in UAE Ahmedabad", "Dubai overseas education India"],
  alternates: { canonical: "https://www.edificationoverseas.com/countries/dubai" },
  openGraph: {
    title: "Study in Dubai (UAE) from India 2026 — Visa, Universities & Scholarships | Edification Overseas",
    description: "Complete guide to studying in Dubai (UAE). Visa process, top universities, scholarships and career pathways for Indian students. Tax-Free Career Hub, No IELTS for Many.",
    url: "https://www.edificationoverseas.com/countries/dubai",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Study in Dubai (UAE) from India — Edification Overseas Ahmedabad" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in Dubai (UAE) from India 2026 | Edification Overseas",
    description: "Visa process, top universities, scholarships and career pathways for Indian students in Dubai (UAE). ICEF-accredited consultants in Ahmedabad.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{}</>;
}
