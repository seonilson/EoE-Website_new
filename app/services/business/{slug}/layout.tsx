import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Visa Consultants in Ahmedabad — Edification Overseas",
  description: "Professional business visa consultancy in Ahmedabad, Gujarat. Schengen business visa, UK business visa, UAE business visa and more. Expert documentation support by ICEF-accredited consultants at Edification Overseas.",
  keywords: ["business visa consultants Ahmedabad", "Schengen business visa India", "UK business visa Ahmedabad", "business visa Gujarat", "corporate travel visa Ahmedabad", "investor visa India", "business visa application India", "visa consultants business Ahmedabad"],
  alternates: { canonical: "https://www.edificationoverseas.com/services/business" },
  openGraph: {
    title: "Business Visa Consultants in Ahmedabad — Edification Overseas",
    description: "Professional business visa consultancy in Ahmedabad, Gujarat. Schengen business visa, UK business visa, UAE business visa and more. Expert documentation support by ICEF-accredited consultants at Edification Overseas.",
    url: "https://www.edificationoverseas.com/services/business",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Business Visa Consultants in Ahmedabad — Edification Overseas" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Visa Consultants in Ahmedabad — Edification Overseas",
    description: "Professional business visa consultancy in Ahmedabad, Gujarat. Schengen business visa, UK business visa, UAE business visa and more. Expert documentation support by ICEF-accredited consultants at Edification Overseas.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{}</>;
}
