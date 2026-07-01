// ── CityPageSchema.tsx ───────────────────────────────────────────
// Injects LocalBusiness + BreadcrumbList + FAQPage schema
// for each Gujarat city landing page.
// Usage: <CityPageSchema city="ahmedabad" />
// ────────────────────────────────────────────────────────────────

const BASE_URL = "https://www.edificationoverseas.com";

type City = "ahmedabad" | "surat" | "vadodara" | "rajkot";

const cityData: Record<City, {
  name: string;
  slug: string;
  areaServed: string;
  description: string;
  faqs: Array<{ q: string; a: string }>;
}> = {
  ahmedabad: {
    name: "Ahmedabad",
    slug: "study-abroad-consultants-ahmedabad",
    areaServed: "Ahmedabad, Gujarat",
    description:
      "ICEF-accredited study abroad and visa consultants in Ahmedabad. Expert guidance for student visa, business visa, dependent visa and overseas education for UK, Canada, Singapore, Germany, Cyprus and 30+ countries. Head office at Sun West Bank, Ashram Road, Ahmedabad.",
    faqs: [
      { q: "Where is Edification Overseas located in Ahmedabad?", a: "Our head office is at A-411 & A-1123, Sun West Bank, Ashram Road, Ahmedabad – 380009, near Ellis Bridge." },
      { q: "Is a free consultation available in Ahmedabad?", a: "Yes. We offer free in-person and online consultations at our Ahmedabad office. Call +91 87994 50049 or book online." },
      { q: "What is the visa success rate of Edification Overseas Ahmedabad?", a: "We maintain a 98% visa success rate with a 5.0★ Google rating from 126 verified reviews." },
    ],
  },
  surat: {
    name: "Surat",
    slug: "study-abroad-consultants-surat",
    areaServed: "Surat, Gujarat",
    description:
      "ICEF-accredited study abroad and visa consultants serving Surat, Gujarat. Expert overseas education guidance for UK, Canada, Singapore, Germany, Cyprus and 30+ countries. Free online and in-person consultations available for Surat students.",
    faqs: [
      { q: "Can Surat students consult Edification Overseas?", a: "Yes. We serve Surat students via free online consultations and in-person sessions at our Ahmedabad office on Ashram Road." },
      { q: "Which countries are best for Surat students?", a: "UK, Canada, Singapore, Germany, Cyprus, and Malta are popular among Surat students. We tailor recommendations to your profile and budget." },
      { q: "Is IELTS mandatory for Surat students?", a: "Not always. Singapore waives IELTS for English-medium students. Cyprus and Malta accept alternatives. We assess each profile individually." },
    ],
  },
  vadodara: {
    name: "Vadodara",
    slug: "study-abroad-consultants-vadodara",
    areaServed: "Vadodara, Gujarat",
    description:
      "ICEF-accredited study abroad and visa consultants serving Vadodara (Baroda), Gujarat. Expert overseas education guidance for engineering, science, and management students. UK, Canada, Singapore, Germany, Cyprus and 30+ countries.",
    faqs: [
      { q: "Can Vadodara students consult Edification Overseas?", a: "Yes. We serve Vadodara students via free online consultations and in-person sessions at our Ahmedabad office." },
      { q: "Does Edification Overseas help MSU Baroda students?", a: "Yes. Engineering, science, and management graduates from M.S. University of Baroda are well-placed for UK, Canada, Germany, and Singapore programs." },
      { q: "What is the minimum budget to study abroad from Vadodara?", a: "Countries like Cyprus and Mauritius offer programs from ₹6–8 lakhs per year. We match options to your budget." },
    ],
  },
  rajkot: {
    name: "Rajkot",
    slug: "study-abroad-consultants-rajkot",
    areaServed: "Rajkot, Saurashtra, Gujarat",
    description:
      "ICEF-accredited study abroad and visa consultants serving Rajkot and Saurashtra, Gujarat. Expert overseas education guidance for UK, Canada, Singapore, Germany, Cyprus and 30+ countries. Free online consultations for Rajkot students.",
    faqs: [
      { q: "Can Rajkot students consult Edification Overseas?", a: "Yes. We serve Rajkot students via free online consultations and in-person sessions at our Ahmedabad office on Ashram Road." },
      { q: "Which countries are popular for Rajkot students?", a: "UK, Canada, Singapore, Germany, Cyprus, and Malta are popular. We tailor recommendations based on profile and budget." },
      { q: "Does Edification Overseas help students from Saurashtra University?", a: "Yes. Students from Saurashtra University and RK University have been successfully placed by us at universities across 30+ countries." },
    ],
  },
};

export default function CityPageSchema({ city }: { city: City }) {
  const data = cityData[city];
  const pageUrl = `${BASE_URL}/${data.slug}`;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "EducationalOrganization"],
    "@id": `${pageUrl}#localbusiness`,
    name: `Edification Overseas Education — ${data.name}`,
    description: data.description,
    url: pageUrl,
    telephone: ["+91-87994-50049", "+91-70163-51347"],
    email: "info@edificationoverseas.in",
    address: {
      "@type": "PostalAddress",
      streetAddress: "A-411 & A-1123, Sun West Bank, Ashram Road",
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      postalCode: "380009",
      addressCountry: "IN",
    },
    areaServed: [
      { "@type": "City", name: data.name },
      { "@type": "State", name: "Gujarat" },
    ],
    parentOrganization: { "@id": `${BASE_URL}/#organization` },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "126",
      bestRating: "5",
    },
    hasCredential: [
      { "@type": "EducationalOccupationalCredential", credentialCategory: "certification", name: "ICEF Accredited Agency" },
      { "@type": "EducationalOccupationalCredential", credentialCategory: "certification", name: "ISO Certified" },
    ],
    sameAs: [`${BASE_URL}/#organization`],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: `Study Abroad Consultants in ${data.name}`, item: pageUrl },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <>
      {[localBusinessSchema, breadcrumbSchema, faqSchema].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}