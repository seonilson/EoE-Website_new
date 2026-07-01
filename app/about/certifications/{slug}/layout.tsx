import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accreditations & Certifications — ICEF, ISO, British Council | Edification Overseas",
  description: "Edification Overseas Education is ICEF-accredited, ISO-certified, British Council authorised, and a certified partner of Pearson, IDP and UniAgents. View all our accreditations and certifications.",
  keywords: ["Edification Overseas certifications", "ICEF accredited consultancy Ahmedabad", "ISO certified overseas education India", "British Council authorised consultants Gujarat", "Pearson certified counsellors India", "IDP partner consultants Ahmedabad", "UniAgents certified consultancy India", "accredited overseas education Ahmedabad"],
  alternates: { canonical: "https://www.edificationoverseas.com/about/certifications" },
  openGraph: {
    title: "Accreditations & Certifications — ICEF, ISO, British Council | Edification Overseas",
    description: "Edification Overseas Education is ICEF-accredited, ISO-certified, British Council authorised, and a certified partner of Pearson, IDP and UniAgents. View all our accreditations and certifications.",
    url: "https://www.edificationoverseas.com/about/certifications",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Accreditations & Certifications — ICEF, ISO, British Council | Edification Overseas" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Accreditations & Certifications — ICEF, ISO, British Council | Edification Overseas",
    description: "Edification Overseas Education is ICEF-accredited, ISO-certified, British Council authorised, and a certified partner of Pearson, IDP and UniAgents. View all our accreditations and certifications.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{}</>;
}
