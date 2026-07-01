import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Immigration Consultants in Ahmedabad | Expert Visa Immigration Services",
  description: "Trusted immigration consultants offering expert visa immigration in Ahmedabad. Edification Overseas is leading immigration visa consultant & visa agent in Ahmedabad.",
  keywords: [
    "immigration consultants in Ahmedabad",
    "immigration visa consultants in Ahmedabad",
    "expert visa immigration in Ahmedabad",
    "visa agent in Ahmedabad"
  ],
  alternates: { canonical: "https://www.edificationoverseas.com/services" },
  openGraph: {
    title: "Immigration Consultants in Ahmedabad | Expert Visa Immigration Services",
    description: "Trusted immigration consultants offering expert visa immigration in Ahmedabad. Edification Overseas is leading immigration visa consultant & visa agent in Ahmedabad.",
    url: "https://www.edificationoverseas.com/services",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Immigration Consultants in Ahmedabad | Expert Visa Immigration Services" }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Immigration Consultants in Ahmedabad | Expert Visa Immigration Services", description: "Trusted immigration consultants offering expert visa immigration in Ahmedabad. Edification Overseas is leading immigration visa consultant & visa agent in Ahmedabad.", images: ["/images/og-default.jpg"] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}