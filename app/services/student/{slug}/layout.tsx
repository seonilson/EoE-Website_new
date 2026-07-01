import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Visa Consultants in Ahmedabad — UK, Canada, Singapore & More | Edification Overseas",
  description: "Expert student visa guidance by ICEF-accredited consultants in Ahmedabad. We handle student visa applications for UK, Canada, Singapore, Germany, Cyprus, Australia and 30+ countries. 98% visa success rate. Free consultation.",
  keywords: ["student visa consultants Ahmedabad", "UK student visa Ahmedabad", "Canada student visa Gujarat", "Singapore student pass India", "Germany student visa Ahmedabad", "Cyprus student visa India", "overseas education visa consultants Gujarat", "study abroad visa assistance India", "student visa application help India", "ICEF student visa consultants Ahmedabad"],
  alternates: { canonical: "https://www.edificationoverseas.com/services/student" },
  openGraph: {
    title: "Student Visa Consultants in Ahmedabad — UK, Canada, Singapore & More | Edification Overseas",
    description: "Expert student visa guidance by ICEF-accredited consultants in Ahmedabad. We handle student visa applications for UK, Canada, Singapore, Germany, Cyprus, Australia and 30+ countries. 98% visa success rate. Free consultation.",
    url: "https://www.edificationoverseas.com/services/student",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Student Visa Consultants in Ahmedabad — UK, Canada, Singapore & More | Edification Overseas" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Visa Consultants in Ahmedabad — UK, Canada, Singapore & More | Edification Overseas",
    description: "Expert student visa guidance by ICEF-accredited consultants in Ahmedabad. We handle student visa applications for UK, Canada, Singapore, Germany, Cyprus, Australia and 30+ countries. 98% visa success rate. Free consultation.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{}</>;
}
