import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery — Student Success Stories & Events | Edification Overseas",
  description: "Photos and moments from Edification Overseas Education. Student success celebrations, visa approvals, university fairs and counselling events in Ahmedabad, Gujarat.",
  keywords: ["edification overseas gallery, student visa success photos, overseas education events, study abroad success stories India"],
  alternates: { canonical: "https://www.edificationoverseas.com/gallery" },
  openGraph: {
    title: "Gallery — Student Success Stories & Events | Edification Overseas",
    description: "Photos and moments from Edification Overseas Education. Student success celebrations, visa approvals, university fairs and counselling events in Ahmedabad, Gujarat.",
    url: "https://www.edificationoverseas.com/gallery",
    siteName: "Edification Overseas",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Gallery — Student Success Stories & Events | Edification Overseas" }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Gallery — Student Success Stories & Events | Edification Overseas", description: "Photos and moments from Edification Overseas Education. Student success celebrations, visa approvals, university fairs and counselling events in Ahmedabad, Gujarat.", images: ["/images/og-default.jpg"] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}