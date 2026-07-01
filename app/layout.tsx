import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ReadingProgress from "@/components/shared/ReadingProgress";
import PopupModal from "@/components/PopupModal";
import SchemaMarkup from "@/components/shared/SchemaMarkup";

const primaryFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const BASE_URL = "https://www.edificationoverseas.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: "%s",
    default: "Abroad Education Consultants Ahmedabad | Overseas Education Consultants",
  },
  description:  "Looking for trusted abroad education consultants in Ahmedabad? Our overseas education consultants in Ahmedabad help with admissions, visas, and study abroad guidance.",
      verification: {
      google:"2Nhq1rke6a6y2eR2Zt8yEwaEiH8x6jJiNDy_l7Yt4gA"
    },
    keywords: [
    // Brand
    "abroad education consultants Ahmedabad",
    "overseas education consultants in Ahmedabad",
  ],
  authors: [{ name: "Edification Overseas Education" }],
  creator: "Edification Overseas Education",
  publisher: "Edification Overseas Education",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Edification Overseas",
    title: "Abroad Education Consultants Ahmedabad | Overseas Education Consultants",
    description:
      "Looking for trusted abroad education consultants in Ahmedabad? Our overseas education consultants in Ahmedabad help with admissions, visas, and study abroad guidance.",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Abroad Education Consultants Ahmedabad | Overseas Education Consultants",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abroad Education Consultants Ahmedabad | Overseas Education Consultants",
    description:
      "Looking for trusted abroad education consultants in Ahmedabad? Our overseas education consultants in Ahmedabad help with admissions, visas, and study abroad guidance.",
    images: ["/images/og-default.jpg"],
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={primaryFont.className} data-scroll-behavior="smooth">
      <head>
        <SchemaMarkup />
        <style>{`
          .goog-te-banner-frame { display: none !important; }
          .goog-te-gadget { display: none !important; }
          body { top: 0 !important; }
          .goog-tooltip { display: none !important; }
          .goog-tooltip:hover { display: none !important; }
          .goog-text-highlight { background-color: transparent !important; border: none !important; box-shadow: none !important; }
        `}</style>
  
        

      </head>


      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }} suppressHydrationWarning>
        
        {/* Google Analytics (GA4) */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-GMVBEMSTPL"
            strategy="afterInteractive"
          />

          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              
              gtag('config', 'G-GMVBEMSTPL');
            `}
          </Script>

        <div id="google_translate_element" style={{ display: "none" }}></div>
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />

        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'en',
                autoDisplay: false
              }, 'google_translate_element');
            }
          `}
        </Script>

        <ReadingProgress />
        <Header />
        <main style={{ flex: 1 }}>{children}</main>
        
        {/* ── HIGH-CONVERTING GLASS POPUP MODAL ── */}
        <PopupModal />
        
        <Footer />
      </body>
    </html>
  );
}