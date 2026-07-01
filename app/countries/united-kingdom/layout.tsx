import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UK Student Visa Consultants in Ahmedabad | Study in UK Experts",
  description: "Edification Overseas is leading UK student visa consultant in Ahmedabad offering complete support through expert UK visa consultants and study in UK consultants.",
  keywords: ["uk student visa consultants in ahmedabad", "uk visa consultants", "study in uk consultants"],
  alternates: { canonical: "https://www.edificationoverseas.com/countries/united-kingdom" },
  openGraph: {
    title: "UK Student Visa Consultants in Ahmedabad | Study in UK Experts",
    description: "Edification Overseas is leading UK student visa consultant in Ahmedabad offering complete support through expert UK visa consultants and study in UK consultants.",
    url: "https://www.edificationoverseas.com/countries/united-kingdom",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "UK Student Visa Consultants in Ahmedabad | Study in UK Experts" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UK Student Visa Consultants in Ahmedabad | Study in UK Experts",
    description: "Edification Overseas is leading UK student visa consultant in Ahmedabad offering complete support through expert UK visa consultants and study in UK consultants.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
