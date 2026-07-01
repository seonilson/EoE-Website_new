import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study Abroad Consultants in Surat — Edification Overseas Gujarat",
  description:
    "Trusted study abroad & visa consultants serving Surat, Gujarat. ICEF-accredited overseas education guidance for student visa, UK, Canada, Singapore, Germany & 30+ countries. Edification Overseas — Ahmedabad's top-rated consultancy, serving Surat students. Book a free consultation.",
  keywords: [
    "study abroad consultants Surat",
    "overseas education consultants Surat",
    "visa consultants Surat Gujarat",
    "student visa consultants Surat",
    "study abroad Surat Gujarat",
    "UK student visa Surat",
    "Canada student visa Surat",
    "Singapore student visa Surat",
    "overseas education consultancy Surat",
    "IELTS guidance Surat",
    "immigration consultants Surat Gujarat",
    "best overseas consultants Surat",
    "study abroad after 12th Surat",
    "study in UK from Surat",
    "study in Canada from Surat",
  ],
  alternates: { canonical: "https://www.edificationoverseas.com/study-abroad-consultants-surat" },
  openGraph: {
    title: "Study Abroad Consultants in Surat — Edification Overseas Gujarat",
    description: "ICEF-accredited overseas education consultants serving Surat, Gujarat. UK, Canada, Singapore, Germany & 30+ destinations. 98% visa success rate.",
    url: "https://www.edificationoverseas.com/study-abroad-consultants-surat",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Study Abroad Consultants in Surat — Edification Overseas" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study Abroad Consultants in Surat — Edification Overseas Gujarat",
    description: "ICEF-accredited study abroad & visa consultants serving Surat, Gujarat. Book a free consultation.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
