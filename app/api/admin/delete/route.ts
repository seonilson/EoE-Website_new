import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    // ── Auth ──────────────────────────────────────────────────
    const cookie = req.headers.get('cookie') || '';
    const token  = cookie.split(';').find(c => c.trim().startsWith('admin_token='))?.split('=')[1]?.trim();
    if (!process.env.ADMIN_PASSWORD || token !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { slug } = await req.json();

    if (!slug) return NextResponse.json({ success: false, message: 'Slug is required.' }, { status: 400 });

    // ── Read blogs.json ───────────────────────────────────────
    const filePath = path.join(process.cwd(), 'data', 'blogs.json');
    let posts: Record<string, unknown>[] = [];
    try {
      posts = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch {
      return NextResponse.json({ success: false, message: 'Could not read blogs.json' }, { status: 500 });
    }

    const before = posts.length;
    posts = posts.filter(p => p.slug !== slug);

    if (posts.length === before) {
      return NextResponse.json({ success: false, message: 'Post not found.' }, { status: 404 });
    }

    fs.writeFileSync(filePath, JSON.stringify(posts, null, 2), 'utf-8');

    return NextResponse.json({ success: true, message: `Post "${slug}" deleted successfully.` });

  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ success: false, message: 'Server error.' }, { status: 500 });
  }
}