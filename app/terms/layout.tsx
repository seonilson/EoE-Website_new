import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions — Edification Overseas Education",
  description: "Read the terms and conditions of Edification Overseas Education. Service terms, refund policy and disclaimer for visa and study abroad consultancy services.",
  keywords: ["edification overseas terms conditions, visa consultancy terms, study abroad service terms"],
  alternates: { canonical: "https://www.edificationoverseas.com/terms" },
  openGraph: {
    title: "Terms & Conditions — Edification Overseas Education",
    description: "Read the terms and conditions of Edification Overseas Education. Service terms, refund policy and disclaimer for visa and study abroad consultancy services.",
    url: "https://www.edificationoverseas.com/terms",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Terms & Conditions — Edification Overseas Education" }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Terms & Conditions — Edification Overseas Education", description: "Read the terms and conditions of Edification Overseas Education. Service terms, refund policy and disclaimer for visa and study abroad consultancy services.", images: ["/images/og-default.jpg"] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
