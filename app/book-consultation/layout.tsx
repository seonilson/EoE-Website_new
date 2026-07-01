import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Free Consultation — Edification Overseas Education",
  description: "Book your free study abroad consultation with Edification Overseas. Our certified counsellors will map your university, visa and scholarship pathway in one session.",
  keywords: [
    "book free consultation study abroad Ahmedabad",
    "overseas education consultation Gujarat",
    "free visa consultation Ahmedabad",
    "study abroad counselling session India",
    "free student visa consultation Gujarat",
    "ICEF counsellor consultation Ahmedabad",
  ],
  alternates: { canonical: "https://www.edificationoverseas.com/book-consultation" },
  openGraph: {
    title: "Book a Free Consultation — Edification Overseas Education",
    description: "Book your free study abroad consultation with Edification Overseas. Our certified counsellors will map your university, visa and scholarship pathway in one session.",
    url: "https://www.edificationoverseas.com/book-consultation",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Book a Free Consultation — Edification Overseas Education" }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Book a Free Consultation — Edification Overseas Education", description: "Book your free study abroad consultation with Edification Overseas. Our certified counsellors will map your university, visa and scholarship pathway in one session.", images: ["/images/og-default.jpg"] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}