import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Singapore Visa Consultants in Ahmedabad | Visa Agents & Work Visa Experts",
  description: "Looking for Singapore visa consultants in Ahmedabad? Our expert visa agents and work visa consultants in ahmedabad provide complete visa assistance and support.",
  keywords: ["Singapore visa consultants in Ahmedabad", "Singapore visa agents in Ahmedabad", "Singapore work visa consultants in Ahmedabad",],
  alternates: { canonical: "https://www.edificationoverseas.com/countries/singapore" },
  openGraph: {
    title: "Singapore Visa Consultants in Ahmedabad | Visa Agents & Work Visa Experts",
    description: "Looking for Singapore visa consultants in Ahmedabad? Our expert visa agents and work visa consultants in ahmedabad provide complete visa assistance and support.",
    url: "https://www.edificationoverseas.com/countries/singapore",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Singapore Visa Consultants in Ahmedabad | Visa Agents & Work Visa Experts" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Singapore Visa Consultants in Ahmedabad | Visa Agents & Work Visa Experts",
    description: "Looking for Singapore visa consultants in Ahmedabad? Our expert visa agents and work visa consultants in ahmedabad provide complete visa assistance and support.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
