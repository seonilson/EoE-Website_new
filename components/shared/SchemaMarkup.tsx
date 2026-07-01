// ── SchemaMarkup.tsx ────────────────────────────────────────────
// Injects all structured data (JSON-LD) for Edification Overseas.
// Covers: Organization, LocalBusiness, WebSite, BreadcrumbList,
//         EducationalOrganization, FAQPage
// ────────────────────────────────────────────────────────────────

const BASE_URL = "https://www.edificationoverseas.com";

// ── 1. Organization + LocalBusiness (merged) ────────────────────
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "EducationalOrganization"],
  "@id": `${BASE_URL}/#organization`,
  name: "Edification Overseas Education",
  alternateName: ["Edification Overseas", "EOE"],
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/images/logo-main.png`,
    width: 200,
    height: 60,
  },
  image: `${BASE_URL}/images/og-default.jpg`,
  description:
    "ICEF-accredited overseas education and visa consultancy based in Ahmedabad, Gujarat. Expert guidance for student visa, business visa, dependent visa and work permit for UK, Canada, Singapore, Germany, Cyprus, Australia and 30+ more countries.",
  foundingDate: "2020",
  address: {
    "@type": "PostalAddress",
    streetAddress: "A-411 & A-1123, Sun West Bank, Ashram Road",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    postalCode: "380009",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 23.0225,
    longitude: 72.5714,
  },
  hasMap: "https://maps.app.goo.gl/JBjxvyVDGLJQVVZw7",
  telephone: ["+91-87994-50049", "+91-70163-51347", "+91-93768-78378"],
  email: "info@edificationoverseas.in",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-87994-50049",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi", "Gujarati"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+65-8078-2915",
      contactType: "customer service",
      areaServed: "SG",
      availableLanguage: ["English"],
    },
  ],
  sameAs: [
    "https://www.facebook.com/EdificationOverseas/",
    "https://www.instagram.com/edificationoverseas/",
    "https://www.linkedin.com/company/edification-overseas-education/",
    "https://www.youtube.com/@edification_overseas",
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:30",
      closes: "18:30",
    },
  ],
  priceRange: "₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, Credit Card, Bank Transfer, UPI",
  areaServed: [
    { "@type": "City", name: "Ahmedabad" },
    { "@type": "City", name: "Surat" },
    { "@type": "City", name: "Vadodara" },
    { "@type": "City", name: "Rajkot" },
    { "@type": "City", name: "Gandhinagar" },
    { "@type": "State", name: "Gujarat" },
    { "@type": "Country", name: "India" },
  ],
  knowsAbout: [
    "Student Visa",
    "Business Visa",
    "Dependent Visa",
    "Visitor Visa",
    "Work Permit",
    "Study Abroad",
    "Overseas Education",
    "University Admissions",
    "Scholarship Guidance",
    "IELTS Preparation",
    "Apostille Services",
    "Document Translation",
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "ICEF Accredited Agency",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "ISO Certified",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "British Council Authorised",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "126",
    bestRating: "5",
  },
};

// ── 2. WebSite with SearchAction ────────────────────────────────
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  url: BASE_URL,
  name: "Edification Overseas",
  description:
    "Looking for trusted abroad education consultants in Ahmedabad? Our overseas education consultants in Ahmedabad help with admissions, visas, and study abroad guidance.",
  publisher: { "@id": `${BASE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/blog?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// ── 3. Homepage FAQ Schema ───────────────────────────────────────
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Where is Edification Overseas located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Edification Overseas Education is headquartered at A-411 & A-1123, Sun West Bank, Ashram Road, Ahmedabad, Gujarat – 380009. We also have a branch office in Singapore.",
      },
    },
    {
      "@type": "Question",
      name: "Which countries does Edification Overseas cover for study abroad?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We cover 33+ study abroad destinations including UK, Canada, Australia, Singapore, Germany, Cyprus, Malta, Mauritius, Georgia, Moldova, Belarus, Russia, Dubai, Greece, and many more.",
      },
    },
    {
      "@type": "Question",
      name: "Is Edification Overseas ICEF accredited?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Edification Overseas Education is ICEF-accredited, ISO certified, British Council authorised, and a certified partner of Pearson, IDP and UniAgents.",
      },
    },
    {
      "@type": "Question",
      name: "What is the visa success rate of Edification Overseas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Edification Overseas maintains a 98% visa success rate across student, business, dependent, and visitor visa categories.",
      },
    },
    {
      "@type": "Question",
      name: "How can I book a free consultation with Edification Overseas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can book a free consultation by visiting our website at edificationoverseas.com/book-consultation, calling us at +91 87994 50049, or emailing info@edificationoverseas.in.",
      },
    },
    {
      "@type": "Question",
      name: "Does Edification Overseas help with scholarships?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Our counsellors provide complete scholarship guidance for Indian students applying to universities in the UK, Canada, Germany, Singapore, Cyprus, and other countries.",
      },
    },
    {
      "@type": "Question",
      name: "What services does Edification Overseas offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer student visa, business visa, visitor visa, dependent visa, work permit, apostille services, document translation, accommodation guidance, and forex assistance.",
      },
    },
  ],
};

// ── 4. BreadcrumbList (Sitewide) ────────────────────────────────
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Study Abroad", item: `${BASE_URL}/countries` },
    { "@type": "ListItem", position: 3, name: "Services", item: `${BASE_URL}/services` },
    { "@type": "ListItem", position: 4, name: "Blog", item: `${BASE_URL}/blog` },
    { "@type": "ListItem", position: 5, name: "Contact", item: `${BASE_URL}/contact` },
  ],
};

// ── Renderer ────────────────────────────────────────────────────
export default function SchemaMarkup() {
  const schemas = [
    organizationSchema,
    websiteSchema,
    faqSchema,
    breadcrumbSchema,
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}