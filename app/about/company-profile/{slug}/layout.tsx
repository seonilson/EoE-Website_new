import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Edification Overseas — ICEF-Accredited Study Abroad Consultants in Ahmedabad",
  description: "Learn about Edification Overseas Education — Ahmedabad's most trusted ICEF-accredited overseas education consultancy. Our story, mission, values and why 1000+ Gujarat students trust us for their global journey.",
  keywords: ["about Edification Overseas", "overseas education consultants Ahmedabad about", "ICEF accredited consultancy Gujarat", "Edification Overseas company profile", "best study abroad consultants Ahmedabad", "overseas education agency Ahmedabad", "Edification Overseas Education history"],
  alternates: { canonical: "https://www.edificationoverseas.com/about/company-profile" },
  openGraph: {
    title: "About Edification Overseas — ICEF-Accredited Study Abroad Consultants in Ahmedabad",
    description: "Learn about Edification Overseas Education — Ahmedabad's most trusted ICEF-accredited overseas education consultancy. Our story, mission, values and why 1000+ Gujarat students trust us for their global journey.",
    url: "https://www.edificationoverseas.com/about/company-profile",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "About Edification Overseas — ICEF-Accredited Study Abroad Consultants in Ahmedabad" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Edification Overseas — ICEF-Accredited Study Abroad Consultants in Ahmedabad",
    description: "Learn about Edification Overseas Education — Ahmedabad's most trusted ICEF-accredited overseas education consultancy. Our story, mission, values and why 1000+ Gujarat students trust us for their global journey.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{}</>;
}
