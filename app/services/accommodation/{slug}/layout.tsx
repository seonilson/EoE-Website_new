import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Accommodation Guidance — Overseas Housing Support | Edification Overseas",
  description: "Pre-arrival student accommodation guidance and housing shortlisting for students going abroad. Expert support for UK, Canada, Singapore, Germany and more by ICEF-accredited consultants at Edification Overseas, Ahmedabad.",
  keywords: ["student accommodation abroad India", "overseas student housing guidance", "pre arrival accommodation support India", "student housing UK India", "student accommodation Canada India", "student housing Singapore India", "overseas education accommodation Ahmedabad"],
  alternates: { canonical: "https://www.edificationoverseas.com/services/accommodation" },
  openGraph: {
    title: "Student Accommodation Guidance — Overseas Housing Support | Edification Overseas",
    description: "Pre-arrival student accommodation guidance and housing shortlisting for students going abroad. Expert support for UK, Canada, Singapore, Germany and more by ICEF-accredited consultants at Edification Overseas, Ahmedabad.",
    url: "https://www.edificationoverseas.com/services/accommodation",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Student Accommodation Guidance — Overseas Housing Support | Edification Overseas" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Accommodation Guidance — Overseas Housing Support | Edification Overseas",
    description: "Pre-arrival student accommodation guidance and housing shortlisting for students going abroad. Expert support for UK, Canada, Singapore, Germany and more by ICEF-accredited consultants at Edification Overseas, Ahmedabad.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{}</>;
}
