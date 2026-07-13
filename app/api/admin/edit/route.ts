import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function escapeStr(s: unknown): string {
  if (s === null || s === undefined) return '';
  return String(s).trim();
}

export async function POST(req: Request) {
  try {
    // ── Auth ──────────────────────────────────────────────────
    const cookie = req.headers.get('cookie') || '';
    const token  = cookie.split(';').find(c => c.trim().startsWith('admin_token='))?.split('=')[1]?.trim();
    if (!process.env.ADMIN_PASSWORD || token !== process.env.ADMIN_PASSWORD) { return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });}

    const { slug, form } = await req.json();
    const { title, excerpt, category, coverImage, metaKeywords, author, authorRole, readTime, blocks } = form;

    if (!slug) return NextResponse.json({ success: false, message: 'Slug is required.' }, { status: 400 });
    if (!title?.trim()) return NextResponse.json({ success: false, message: 'Title is required.' }, { status: 400 });

    // ── Build content ─────────────────────────────────────────
    const content: object[] = [];
    for (const b of blocks) {
      switch (b.type) {
        case 'intro':
        case 'p':
          if (b.content?.trim()) content.push({ type: 'p', content: escapeStr(b.content) });
          break;
        case 'h2':
          if (b.heading?.trim()) content.push({ type: 'h2', content: escapeStr(b.heading) });
          if (b.content?.trim()) content.push({ type: 'p', content: escapeStr(b.content) });
          break;
        case 'quote':
          if (b.content?.trim()) content.push({ type: 'quote', content: escapeStr(b.content) });
          break;
        case 'list': {
          const items = (b.items || []).map((i: string) => escapeStr(i)).filter(Boolean);
          if (items.length) content.push({ type: 'list', items });
          break;
        }
      }
    }

    // ── Read blogs.json ───────────────────────────────────────
    const filePath = path.join(process.cwd(), 'data', 'blogs.json');
    let posts: Record<string, unknown>[] = [];
    try {
      posts = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch {
      return NextResponse.json({ success: false, message: 'Could not read blogs.json' }, { status: 500 });
    }

    const index = posts.findIndex(p => p.slug === slug);
    if (index === -1) {
      return NextResponse.json({ success: false, message: 'Post not found.' }, { status: 404 });
    }

    // ── Merge update (keep id, slug, date) ────────────────────
    posts[index] = {
      ...posts[index],
      title:        escapeStr(title),
      excerpt:      escapeStr(excerpt),
      category:     escapeStr(category),
      coverImage:   escapeStr(coverImage) || posts[index].coverImage,
      metaKeywords: escapeStr(metaKeywords),
      author:       escapeStr(author) || 'Edification Team',
      authorRole:   escapeStr(authorRole) || 'Editorial',
      readTime:     escapeStr(readTime) || '5 min read',
      metaTitle: form.metaTitle || "",      
      metaDescription: form.metaDescription || "",
      slug:form.slug || "",
      content,
      faqs: (form.faqs || []).map((faq: any) => ({ question: escapeStr(faq.question), answer: escapeStr(faq.answer),})),
    };

    fs.writeFileSync(filePath, JSON.stringify(posts, null, 2), 'utf-8');

    return NextResponse.json({ success: true, message: 'Post updated successfully!' });

  } catch (error) {
    console.error('Edit error:', error);
    return NextResponse.json({ success: false, message: 'Server error.' }, { status: 500 });
  }
}