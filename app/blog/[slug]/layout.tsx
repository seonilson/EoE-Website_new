import type { Metadata } from "next";
import type { BlogPost } from "@/lib/blogData";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic"; 
export const revalidate = 0;    

async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(process.cwd(), "data", "blogs.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const posts: BlogPost[] = JSON.parse(raw);
    return posts.find(p => p.slug === slug) || null;
  } catch {
    return null;
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: "Article Not Found | Edification Overseas" };
  }

  const title = post.metaTitle || `${post.title} | Edification Overseas`; 
  const description = post.metaDescription || post.excerpt;

  return {
    title,
    description,
    alternates: { canonical: `https://www.edificationoverseas.com/blog/${post.slug}/` },
    openGraph: {
      title,
      description,
      url: `https://www.edificationoverseas.com/blog/${post.slug}/`,
      siteName: "Edification Overseas",
      images: post.coverImage ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }] : undefined,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default function BlogSlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}