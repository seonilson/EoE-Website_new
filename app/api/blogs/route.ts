import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'blogs.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    const posts = JSON.parse(raw);
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}