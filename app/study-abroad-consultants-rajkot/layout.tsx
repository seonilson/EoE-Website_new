import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study Abroad Consultants in Rajkot — Edification Overseas Gujarat",
  description:
    "Trusted overseas education & visa consultants serving Rajkot, Gujarat. ICEF-accredited guidance for student visa, UK, Canada, Singapore, Germany & 30+ countries. Edification Overseas — Gujarat's top-rated consultancy. Book a free consultation.",
  keywords: [
    "study abroad consultants Rajkot",
    "overseas education consultants Rajkot",
    "visa consultants Rajkot Gujarat",
    "student visa consultants Rajkot",
    "study abroad Rajkot Gujarat",
    "UK student visa Rajkot",
    "Canada student visa Rajkot",
    "Singapore student visa Rajkot",
    "Germany student visa Rajkot",
    "immigration consultants Rajkot",
    "best overseas consultants Rajkot",
    "study in UK from Rajkot",
    "study in Canada from Rajkot",
    "overseas education Saurashtra Gujarat",
    "study abroad Saurashtra students",
  ],
  alternates: { canonical: "https://www.edificationoverseas.com/study-abroad-consultants-rajkot" },
  openGraph: {
    title: "Study Abroad Consultants in Rajkot — Edification Overseas Gujarat",
    description: "ICEF-accredited overseas education consultants serving Rajkot, Gujarat. UK, Canada, Singapore, Germany & 30+ destinations. 98% visa success rate.",
    url: "https://www.edificationoverseas.com/study-abroad-consultants-rajkot",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Study Abroad Consultants in Rajkot — Edification Overseas" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study Abroad Consultants in Rajkot — Edification Overseas Gujarat",
    description: "ICEF-accredited study abroad consultants serving Rajkot, Saurashtra, Gujarat. Book a free consultation.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
