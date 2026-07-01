import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visitor Visa Consultants in Ahmedabad — Tourism & Short-Stay Visa | Edification Overseas",
  description: "Expert visitor and tourist visa consultancy in Ahmedabad, Gujarat. UK visitor visa, Schengen visa, US visitor visa, Canada visitor visa and more. ICEF-accredited consultants at Edification Overseas.",
  keywords: ["visitor visa consultants Ahmedabad", "tourist visa consultants Gujarat", "Schengen visa consultants Ahmedabad", "UK visitor visa India", "Canada visitor visa India", "US tourist visa Ahmedabad", "short stay visa consultants India", "tourism visa consultants Gujarat"],
  alternates: { canonical: "https://www.edificationoverseas.com/services/visitor" },
  openGraph: {
    title: "Visitor Visa Consultants in Ahmedabad — Tourism & Short-Stay Visa | Edification Overseas",
    description: "Expert visitor and tourist visa consultancy in Ahmedabad, Gujarat. UK visitor visa, Schengen visa, US visitor visa, Canada visitor visa and more. ICEF-accredited consultants at Edification Overseas.",
    url: "https://www.edificationoverseas.com/services/visitor",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Visitor Visa Consultants in Ahmedabad — Tourism & Short-Stay Visa | Edification Overseas" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Visitor Visa Consultants in Ahmedabad — Tourism & Short-Stay Visa | Edification Overseas",
    description: "Expert visitor and tourist visa consultancy in Ahmedabad, Gujarat. UK visitor visa, Schengen visa, US visitor visa, Canada visitor visa and more. ICEF-accredited consultants at Edification Overseas.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{}</>;
}
