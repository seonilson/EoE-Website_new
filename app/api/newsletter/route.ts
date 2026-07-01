import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// ── Rate limiting (same pattern as contact form) ──────────────
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT    = 3;
const RATE_WINDOW   = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now   = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

export async function POST(req: Request) {
  try {
    // ── Rate limit ────────────────────────────────────────────
    const forwarded = req.headers.get('x-forwarded-for');
    const ip        = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json({ success: false, message: 'Too many requests.' }, { status: 429 });
    }

    // ── Parse & validate ──────────────────────────────────────
    const { email } = await req.json();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, message: 'Invalid email address.' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    // ── Read existing subscribers ─────────────────────────────
    const filePath = path.join(process.cwd(), 'data', 'newsletter.json');
    let subscribers: { email: string; date: string; ip: string }[] = [];

    try {
      const raw = fs.readFileSync(filePath, 'utf-8');
      subscribers = JSON.parse(raw);
    } catch {
      // File doesn't exist yet — start fresh
      subscribers = [];
    }

    // ── Check duplicate ───────────────────────────────────────
    const already = subscribers.some(s => s.email === cleanEmail);
    if (already) {
      return NextResponse.json({ success: true, message: 'You are already subscribed!' });
    }

    // ── Add new subscriber ────────────────────────────────────
    subscribers.push({
      email: cleanEmail,
      date:  new Date().toISOString(),
      ip,
    });

    // ── Write back ────────────────────────────────────────────
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(subscribers, null, 2), 'utf-8');

    return NextResponse.json({ success: true, message: 'Subscribed successfully!' });

  } catch (error) {
    console.error('Newsletter error:', error);
    return NextResponse.json({ success: false, message: 'Server error. Please try again.' }, { status: 500 });
  }
}
