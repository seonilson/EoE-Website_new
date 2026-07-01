import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study Abroad Consultants in Ahmedabad — Edification Overseas",
  description:
    "Top-rated study abroad & visa consultants in Ahmedabad, Gujarat. ICEF-accredited counsellors at Sun West Bank, Ashram Road. Expert guidance for student visa, UK, Canada, Singapore, Germany & 30+ countries. 98% visa success rate. Book a free consultation today.",
  keywords: [
    "study abroad consultants Ahmedabad",
    "overseas education consultants Ahmedabad",
    "visa consultants Ahmedabad",
    "student visa consultants Ahmedabad",
    "best overseas consultants Ahmedabad",
    "study abroad Ahmedabad Gujarat",
    "ICEF consultants Ahmedabad",
    "UK student visa Ahmedabad",
    "Canada student visa Ahmedabad",
    "Singapore student visa Ahmedabad",
    "Germany student visa Ahmedabad",
    "study in UK from Ahmedabad",
    "study in Canada from Ahmedabad",
    "overseas education Ashram Road Ahmedabad",
    "immigration consultants Ahmedabad",
    "free consultation study abroad Ahmedabad",
  ],
  alternates: { canonical: "https://www.edificationoverseas.com/study-abroad-consultants-ahmedabad" },
  openGraph: {
    title: "Study Abroad Consultants in Ahmedabad — Edification Overseas",
    description:
      "ICEF-accredited study abroad & visa consultants in Ahmedabad. Expert guidance for UK, Canada, Singapore, Germany & 30+ countries. 98% visa success rate.",
    url: "https://www.edificationoverseas.com/study-abroad-consultants-ahmedabad",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Study Abroad Consultants in Ahmedabad — Edification Overseas" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study Abroad Consultants in Ahmedabad — Edification Overseas",
    description: "ICEF-accredited study abroad & visa consultants in Ahmedabad, Gujarat. UK, Canada, Singapore & more. Book a free consultation.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
