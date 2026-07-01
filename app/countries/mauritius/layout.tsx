import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mauritius Visa Consultants in Ahmedabad | Study Abroad Experts",
  description: "Looking for Mauritius student visa consultants in Ahmedabad? Our Mauritius visa agents and study in Mauritius consultants provide expert assistance.",
  keywords: ["mauritius student visa consultants in ahmedabad", "mauritius visa consultants", "study in mauritius consultants", "mauritius visa agents"],
  alternates: { canonical: "https://www.edificationoverseas.com/countries/mauritius" },
  openGraph: {
    title: "Mauritius Visa Consultants in Ahmedabad | Study Abroad Experts",
    description: "Looking for Mauritius student visa consultants in Ahmedabad? Our Mauritius visa agents and study in Mauritius consultants provide expert assistance.",
    url: "https://www.edificationoverseas.com/countries/mauritius",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Mauritius Visa Consultants in Ahmedabad | Study Abroad Experts" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mauritius Visa Consultants in Ahmedabad | Study Abroad Experts",
    description: "Looking for Mauritius student visa consultants in Ahmedabad? Our Mauritius visa agents and study in Mauritius consultants provide expert assistance.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
