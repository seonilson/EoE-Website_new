import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apostille & Document Attestation Services in Ahmedabad | Edification Overseas",
  description: "MEA apostille, document attestation and certified English translation services in Ahmedabad. Expert document preparation for student visa, business visa and overseas education. ICEF-accredited consultants at Edification Overseas.",
  keywords: ["apostille services Ahmedabad", "MEA apostille Gujarat", "document attestation Ahmedabad", "HRD attestation Gujarat", "document translation services Ahmedabad", "certified translation India", "apostille for student visa India", "document attestation overseas education Ahmedabad"],
  alternates: { canonical: "https://www.edificationoverseas.com/services/apostille" },
  openGraph: {
    title: "Apostille & Document Attestation Services in Ahmedabad | Edification Overseas",
    description: "MEA apostille, document attestation and certified English translation services in Ahmedabad. Expert document preparation for student visa, business visa and overseas education. ICEF-accredited consultants at Edification Overseas.",
    url: "https://www.edificationoverseas.com/services/apostille",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Apostille & Document Attestation Services in Ahmedabad | Edification Overseas" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apostille & Document Attestation Services in Ahmedabad | Edification Overseas",
    description: "MEA apostille, document attestation and certified English translation services in Ahmedabad. Expert document preparation for student visa, business visa and overseas education. ICEF-accredited consultants at Edification Overseas.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{}</>;
}
