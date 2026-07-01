import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function auth(req: Request): boolean {
  const cookie = req.headers.get('cookie') || '';
  const token  = cookie.split(';').find(c => c.trim().startsWith('admin_token='))?.split('=')[1]?.trim();
  return !!process.env.ADMIN_PASSWORD && token === process.env.ADMIN_PASSWORD;
}

const FILE = () => path.join(process.cwd(), 'data', 'events-slide.json');

// ── SAVE (full replace) ───────────────────────────────────────
export async function POST(req: Request) {
  if (!auth(req)) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  try {
    const { badge, title, dateLocation, description, buttonText, buttonLink } = await req.json();

    if (!title?.trim()) return NextResponse.json({ success: false, message: 'Event title is required.' }, { status: 400 });

    const data = {
      badge:        badge        || 'Upcoming Event',
      title:        title.trim(),
      dateLocation: dateLocation || '',
      description:  description  || '',
      buttonText:   buttonText   || 'Register →',
      buttonLink:   buttonLink   || '/contact',
    };

    fs.writeFileSync(FILE(), JSON.stringify(data, null, 2), 'utf-8');
    return NextResponse.json({ success: true, message: 'Event slide updated successfully!' });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, message: 'Server error.' }, { status: 500 });
  }
}
