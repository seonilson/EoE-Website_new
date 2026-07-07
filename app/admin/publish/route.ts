import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function escapeStr(s: unknown): string {
  if (s === null || s === undefined) return '';
  return String(s).trim();
}

function makeSlug(input: string): string {
  return input.toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function POST(req: Request) {
  try {
    // ── Auth check ────────────────────────────────────────────
    const cookie = req.headers.get('cookie') || '';
    const token = cookie.split(';').find(c => c.trim().startsWith('admin_token='))?.split('=')[1]?.trim();
    if (!process.env.ADMIN_PASSWORD || token !== process.env.ADMIN_PASSWORD) { return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });}

    const { form } = await req.json();
    const { title, excerpt, category, coverImage, metaKeywords, author, authorRole, readTime, blocks } = form;

    // ── Validation ────────────────────────────────────────────
    if (!title?.trim()) return NextResponse.json({ success: false, message: 'Title is required.' }, { status: 400 });
    if (!excerpt?.trim()) return NextResponse.json({ success: false, message: 'Excerpt is required.' }, { status: 400 });
    if (!blocks?.length) return NextResponse.json({ success: false, message: 'At least one content block is required.' }, { status: 400 });

    // ── Build final slug — form.slug (user-edited) ko priority, warna title se auto-generate ──
    const finalSlug = form.slug?.trim() ? makeSlug(form.slug) : makeSlug(title);

    if (!finalSlug) {
      return NextResponse.json({ success: false, message: 'Could not generate a valid slug. Please check the title or slug field.' }, { status: 400 });
    }

    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });

    // ── Build content array ───────────────────────────────────
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

    // ── Build new post object ─────────────────────────────────
    const newPost = {
      id: Date.now().toString(),
      slug: finalSlug,
      title: escapeStr(title),
      excerpt: escapeStr(excerpt),
      category: escapeStr(category),
      date,
      readTime: escapeStr(readTime) || '5 min read',
      coverImage: escapeStr(coverImage) || `/images/blogs/${finalSlug}.jpg`,
      metaKeywords: escapeStr(metaKeywords),
      author: escapeStr(author) || 'Edification Team',
      authorRole: escapeStr(authorRole) || 'Editorial',
      authorImage: '/images/logo-icon.png',
      content,
      metaTitle: form.metaTitle || "",
      metaDescription: form.metaDescription || "",
    };

    // ── Read blogs.json ───────────────────────────────────────
    const filePath = path.join(process.cwd(), 'data', 'blogs.json');
    let posts: object[] = [];

    try {
      const raw = fs.readFileSync(filePath, 'utf-8');
      posts = JSON.parse(raw);
    } catch {
      // File missing or empty — start fresh
      posts = [];
    }

    // ── Check for duplicate slug ──────────────────────────────
    const isDuplicate = (posts as { slug: string }[]).some(p => p.slug === finalSlug);
    if (isDuplicate) {
      return NextResponse.json(
        { success: false, message: `A post with slug "${finalSlug}" already exists. Change the title or slug slightly.` },
        { status: 409 }
      );
    }

    // ── Prepend new post (newest first) ───────────────────────
    posts.unshift(newPost);

    // ── Write back to blogs.json ──────────────────────────────
    fs.writeFileSync(filePath, JSON.stringify(posts, null, 2), 'utf-8');

    return NextResponse.json({ success: true, slug: finalSlug, message: 'Blog post published successfully!' });

  } catch (error) {
    console.error('Publish error:', error);
    return NextResponse.json({ success: false, message: 'Server error. Please try again.' }, { status: 500 });
  }
}