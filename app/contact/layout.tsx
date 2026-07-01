import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Edification Overseas — Book a Free Consultation in Ahmedabad",
  description: "Get in touch with Edification Overseas Education in Ahmedabad, Gujarat. Book a free consultation with our ICEF-accredited counsellors. Expert guidance for student visa, business visa, dependent visa and study abroad. Offices on Ashram Road, Ahmedabad & Singapore.",
  keywords: [
    "contact Edification Overseas",
    "visa consultants Ahmedabad",
    "book consultation study abroad Ahmedabad",
    "overseas education consultants contact Ahmedabad",
    "free visa consultation Gujarat",
    "study abroad consultation Ahmedabad",
    "ICEF counsellors Ahmedabad",
    "overseas education office Ahmedabad",
    "visa consultancy Ashram Road Ahmedabad",
    "free student visa consultation India",
  ],
  alternates: { canonical: "https://www.edificationoverseas.com/contact" },
  openGraph: {
    title: "Contact Edification Overseas — Book a Free Consultation in Ahmedabad",
    description: "Get in touch with Edification Overseas Education in Ahmedabad, Gujarat. Book a free consultation with our ICEF-accredited counsellors for student visa, business visa and study abroad guidance.",
    url: "https://www.edificationoverseas.com/contact",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Contact Edification Overseas — Book a Free Consultation" }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Contact Edification Overseas — Book a Free Consultation in Ahmedabad", description: "Get in touch with Edification Overseas Education in Ahmedabad, Gujarat. ICEF-accredited counsellors. Student visa, business visa & study abroad guidance.", images: ["/images/og-default.jpg"] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}