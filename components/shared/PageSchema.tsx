// ── PageSchema.tsx ─────────────────────────────────────────────
// Injects BreadcrumbList + page-type schema for country, service, about pages.
// Usage: <PageSchema type="country" slug="australia" name="Australia" />

const BASE_URL = "https://www.edificationoverseas.com";

type PageType = "country" | "service" | "about";

interface PageSchemaProps {
  type: PageType;
  slug: string;
  name: string;
  description?: string;
}

function getSection(type: PageType): string {
  if (type === "country") return "countries";
  if (type === "service") return "services";
  return "about";
}

export default function PageSchema({ type, slug, name, description }: PageSchemaProps) {
  const section = getSection(type);
  const pageUrl = BASE_URL + "/" + section + "/" + slug;

  const parentLabel = type === "country" ? "Study Abroad Destinations" : type === "service" ? "Our Services" : "About Us";
  const parentPath = type === "country" ? "/countries" : type === "service" ? "/services" : "/about/company-profile";

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: parentLabel, item: BASE_URL + parentPath },
      { "@type": "ListItem", position: 3, name: name, item: pageUrl },
    ],
  };

  const pageSchema = type === "country" ? {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Study in " + name + " from India — Edification Overseas",
    description: description || "Complete guide to studying in " + name + " for Indian students.",
    url: pageUrl,
    publisher: { "@id": BASE_URL + "/#organization" },
  } : type === "service" ? {
    "@context": "https://schema.org",
    "@type": "Service",
    name: name + " — Edification Overseas",
    description: description || "Professional " + name + " consultancy in Ahmedabad by ICEF-accredited counsellors.",
    url: pageUrl,
    provider: { "@id": BASE_URL + "/#organization" },
    areaServed: [
      { "@type": "City", name: "Ahmedabad" },
      { "@type": "State", name: "Gujarat" },
      { "@type": "Country", name: "India" },
    ],
  } : null;

  const schemas = pageSchema ? [breadcrumb, pageSchema] : [breadcrumb];

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