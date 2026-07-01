import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team — ICEF-Certified Counsellors at Edification Overseas Ahmedabad",
  description: "Meet the expert team at Edification Overseas Education. ICEF-certified counsellors and visa specialists in Ahmedabad with deep expertise in UK, Canada, Singapore, Germany and 30+ study abroad destinations.",
  keywords: ["Edification Overseas team", "overseas education counsellors Ahmedabad", "visa consultants team Gujarat", "Himal Chauhan Edification Overseas", "ICEF certified counsellors Ahmedabad", "study abroad counsellors Gujarat", "overseas education experts Ahmedabad"],
  alternates: { canonical: "https://www.edificationoverseas.com/about/our-team" },
  openGraph: {
    title: "Our Team — ICEF-Certified Counsellors at Edification Overseas Ahmedabad",
    description: "Meet the expert team at Edification Overseas Education. ICEF-certified counsellors and visa specialists in Ahmedabad with deep expertise in UK, Canada, Singapore, Germany and 30+ study abroad destinations.",
    url: "https://www.edificationoverseas.com/about/our-team",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Our Team — ICEF-Certified Counsellors at Edification Overseas Ahmedabad" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Team — ICEF-Certified Counsellors at Edification Overseas Ahmedabad",
    description: "Meet the expert team at Edification Overseas Education. ICEF-certified counsellors and visa specialists in Ahmedabad with deep expertise in UK, Canada, Singapore, Germany and 30+ study abroad destinations.",
    images: ["/images/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{}</>;
}
