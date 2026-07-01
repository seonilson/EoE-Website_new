import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Edification Overseas Education",
  description: "Read the privacy policy of Edification Overseas Education. How we collect, use and protect your personal data on our website and services.",
  keywords: ["edification overseas privacy policy, data protection overseas education"],
  alternates: { canonical: "https://www.edificationoverseas.com/privacy" },
  openGraph: {
    title: "Privacy Policy — Edification Overseas Education",
    description: "Read the privacy policy of Edification Overseas Education. How we collect, use and protect your personal data on our website and services.",
    url: "https://www.edificationoverseas.com/privacy",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Privacy Policy — Edification Overseas Education" }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Privacy Policy — Edification Overseas Education", description: "Read the privacy policy of Edification Overseas Education. How we collect, use and protect your personal data on our website and services.", images: ["/images/og-default.jpg"] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
