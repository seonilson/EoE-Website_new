import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function auth(req: Request): boolean {
  const cookie = req.headers.get('cookie') || '';
  const token  = cookie.split(';').find(c => c.trim().startsWith('admin_token='))?.split('=')[1]?.trim();
  return !!process.env.ADMIN_PASSWORD && token === process.env.ADMIN_PASSWORD;
}

const FILE = () => path.join(process.cwd(), 'data', 'events.json');

function readEvents() {
  try { return JSON.parse(fs.readFileSync(FILE(), 'utf-8')); } catch { return []; }
}

// ── Helper: safely delete physical file ───────────────────────
function deletePhysicalFile(src: string): { deleted: boolean; reason?: string } {
  try {
    if (!src || !src.startsWith('/images/')) {
      return { deleted: false, reason: 'Path outside /images/ — skipped for safety.' };
    }
    const filePath = path.join(process.cwd(), 'public', src);
    const publicDir = path.join(process.cwd(), 'public');
    if (!filePath.startsWith(publicDir)) {
      return { deleted: false, reason: 'Invalid path.' };
    }
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return { deleted: true };
    }
    return { deleted: false, reason: 'File not found on disk.' };
  } catch (e) {
    return { deleted: false, reason: `Could not delete file: ${e}` };
  }
}

// ── ADD ───────────────────────────────────────────────────────
export async function POST(req: Request) {
  if (!auth(req)) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  try {
    const { title, desc, src } = await req.json();
    if (!src?.trim()) return NextResponse.json({ success: false, message: 'File path is required.' }, { status: 400 });

    const items = readEvents();
    items.push({
      id:    Date.now().toString(),
      title: title || 'Event Photo',
      desc:  desc  || 'Edification Overseas Seminar',
      src:   src.trim(),
    });
    fs.writeFileSync(FILE(), JSON.stringify(items, null, 2), 'utf-8');
    return NextResponse.json({ success: true, message: 'Event photo added.' });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, message: 'Server error.' }, { status: 500 });
  }
}

// ── DELETE entry + physical file ─────────────────────────────
export async function DELETE(req: Request) {
  if (!auth(req)) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  try {
    const { id, deleteFile } = await req.json();

    const items = readEvents();
    const target = items.find((i: { id: string }) => i.id === id);

    if (!target) {
      return NextResponse.json({ success: false, message: 'Photo not found.' }, { status: 404 });
    }

    // Remove from JSON
    const updated = items.filter((i: { id: string }) => i.id !== id);
    fs.writeFileSync(FILE(), JSON.stringify(updated, null, 2), 'utf-8');

    // ── TypeScript Fix Applied Here ──
    // We explicitly define the type so it allows "reason" to be undefined
    let fileResult: { deleted: boolean; reason?: string } = { deleted: false, reason: 'File deletion not requested.' };
    
    if (deleteFile && target.src) {
      fileResult = deletePhysicalFile(target.src);
    }

    return NextResponse.json({
      success: true,
      message: 'Photo removed from events gallery.',
      fileDeleted: fileResult.deleted,
      fileNote: fileResult.reason,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, message: 'Server error.' }, { status: 500 });
  }
}