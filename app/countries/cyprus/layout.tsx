import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cyprus Student Visa Consultants in Ahmedabad | Study in Cyprus",
  description: "Edification Overseas is leading Cyprus student visa consultants in Ahmedabad provide support through experienced Cyprus work visa consultants and visa consultants.",
  keywords: ["cyprus student visa consultants in ahmedabad", "cyprus work visa consultants", "cyprus visa consultants", "study in cyprus consultants"],
  alternates: { canonical: "https://www.edificationoverseas.com/countries/cyprus" },
  openGraph: {
    title: "Cyprus Student Visa Consultants in Ahmedabad | Study in Cyprus",
    description: "Edification Overseas is leading Cyprus student visa consultants in Ahmedabad provide support through experienced Cyprus work visa consultants and visa consultants.",
    url: "https://www.edificationoverseas.com/countries/cyprus",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Cyprus Student Visa Consultants in Ahmedabad | Study in Cyprus" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cyprus Student Visa Consultants in Ahmedabad | Study in Cyprus",
    description: "Edification Overseas is leading Cyprus student visa consultants in Ahmedabad provide support through experienced Cyprus work visa consultants and visa consultants.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
