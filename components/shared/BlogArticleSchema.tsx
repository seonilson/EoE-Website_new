// ── BlogArticleSchema.tsx ────────────────────────────────────────
// Drop this into the blog/[slug]/page.tsx render to inject
// Article + BreadcrumbList structured data per post.
// Usage: <BlogArticleSchema post={blog} />
// ────────────────────────────────────────────────────────────────

const BASE_URL = "https://www.edificationoverseas.com";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  authorRole: string;
  coverImage: string;
  category: string;
  readTime: string;
}

export default function BlogArticleSchema({ post }: { post: BlogPost }) {
  // Convert "May 12, 2026" → "2026-05-12"
  const isoDate = new Date(post.date).toISOString();
  const postUrl = `${BASE_URL}/blog/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${postUrl}#article`,
    headline: post.title,
    description: post.excerpt,
    url: postUrl,
    datePublished: isoDate,
    dateModified: isoDate,
    author: {
      "@type": "Organization",
      name: post.author,
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Edification Overseas Education",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/logo-main.png`,
      },
    },
    image: {
      "@type": "ImageObject",
      url: `${BASE_URL}${post.coverImage}`,
      width: 1200,
      height: 630,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    articleSection: post.category,
    keywords: post.category,
    inLanguage: "en-IN",
    isPartOf: {
      "@type": "Blog",
      "@id": `${BASE_URL}/blog#blog`,
      name: "The Edification Journal",
      publisher: { "@id": `${BASE_URL}/#organization` },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}