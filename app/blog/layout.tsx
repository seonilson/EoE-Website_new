import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study Abroad Consultants in Vadodara — Edification Overseas Gujarat",
  description:
    "Trusted overseas education & visa consultants serving Vadodara (Baroda), Gujarat. ICEF-accredited guidance for student visa, UK, Canada, Singapore, Germany & 30+ countries. Edification Overseas — Gujarat's top-rated consultancy. Book a free consultation.",
  keywords: [
    "study abroad consultants Vadodara",
    "overseas education consultants Vadodara",
    "visa consultants Vadodara",
    "study abroad Baroda Gujarat",
    "student visa consultants Vadodara",
    "UK student visa Vadodara",
    "Canada student visa Vadodara",
    "Singapore student visa Vadodara",
    "Germany student visa Vadodara",
    "overseas consultants Baroda",
    "immigration consultants Vadodara Gujarat",
    "best study abroad consultants Vadodara",
    "study in UK from Vadodara",
    "overseas education Vadodara",
  ],
  alternates: { canonical: "https://www.edificationoverseas.com/study-abroad-consultants-vadodara" },
  openGraph: {
    title: "Study Abroad Consultants in Vadodara — Edification Overseas Gujarat",
    description: "ICEF-accredited overseas education consultants serving Vadodara, Gujarat. UK, Canada, Singapore, Germany & 30+ destinations. Book a free consultation.",
    url: "https://www.edificationoverseas.com/study-abroad-consultants-vadodara",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Study Abroad Consultants in Vadodara — Edification Overseas" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study Abroad Consultants in Vadodara — Edification Overseas Gujarat",
    description: "ICEF-accredited study abroad consultants serving Vadodara (Baroda), Gujarat. Book a free consultation.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}