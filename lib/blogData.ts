// ─────────────────────────────────────────────────────────────
// blogData.ts
// Only TypeScript interfaces live here.
// Actual post data is served by /api/blogs (server-side).
// Client components fetch from /api/blogs at runtime.
// ─────────────────────────────────────────────────────────────

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogSection {
  type: 'h2' | 'h3' | 'p' | 'list' | 'quote';
  content?: string;
  items?: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  coverImage: string;
  metaKeywords: string;
  author: string;
  authorRole: string;
  authorImage: string;
  metaTitle?: string;
  metaDescription?: string;
  content: BlogSection[];
  faqs?: BlogFaq[];
}