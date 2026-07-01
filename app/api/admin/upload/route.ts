import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// ── Auth ──────────────────────────────────────────────────────
function auth(req: Request): boolean {
  const cookie = req.headers.get('cookie') || '';
  const token  = cookie.split(';').find(c => c.trim().startsWith('admin_token='))?.split('=')[1]?.trim();
  return !!process.env.ADMIN_PASSWORD && token === process.env.ADMIN_PASSWORD;
}

// ── Allowed types ─────────────────────────────────────────────
const ALLOWED_TYPES: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/jpg':  '.jpg',
  'image/png':  '.png',
  'image/webp': '.webp',
  'image/gif':  '.gif',
  'video/mp4':  '.mp4',
  'video/webm': '.webm',
  'video/ogg':  '.ogv',
};

const MAX_SIZE_MB = 20;
const MAX_SIZE    = MAX_SIZE_MB * 1024 * 1024;

// ── UPLOAD (POST) ─────────────────────────────────────────────
export async function POST(req: Request) {
  if (!auth(req)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file     = formData.get('file') as File | null;
    const folder   = formData.get('folder') as string | null;

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file received.' }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ success: false, message: `File too large. Max ${MAX_SIZE_MB}MB allowed.` }, { status: 400 });
    }

    const ext = ALLOWED_TYPES[file.type];
    if (!ext) {
      return NextResponse.json({ success: false, message: 'File type not allowed. Use JPG, PNG, WebP, GIF, MP4 or WebM.' }, { status: 400 });
    }

    const allowedFolders = ['gallery', 'gallery/event', 'blogs'];
    const targetFolder   = allowedFolders.includes(folder || '') ? folder! : 'gallery';

    // Build unique filename
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '-').toLowerCase();
    const baseName     = originalName.replace(/\.[^/.]+$/, '');
    const timestamp    = Date.now();
    const fileName     = `${baseName}-${timestamp}${ext}`;

    // Ensure directory exists
    const publicDir = path.join(process.cwd(), 'public', 'images', targetFolder);
    fs.mkdirSync(publicDir, { recursive: true });

    // Write file
    const filePath    = path.join(publicDir, fileName);
    const arrayBuffer = await file.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(arrayBuffer));

    const publicPath = `/images/${targetFolder}/${fileName}`;

    return NextResponse.json({
      success:  true,
      path:     publicPath,
      fileName: fileName,
      size:     file.size,
      type:     file.type,
      message:  'File uploaded successfully!',
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ success: false, message: 'Upload failed. Please try again.' }, { status: 500 });
  }
}

// ── DELETE FILE FROM DISK (DELETE) ────────────────────────────
export async function DELETE(req: Request) {
  if (!auth(req)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { src } = await req.json();

    if (!src || typeof src !== 'string') {
      return NextResponse.json({ success: false, message: 'File path is required.' }, { status: 400 });
    }

    // ── Security: only allow deletion within /public/images/ ──
    if (!src.startsWith('/images/')) {
      return NextResponse.json({ success: false, message: 'Only files inside /images/ can be deleted.' }, { status: 403 });
    }

    const filePath  = path.join(process.cwd(), 'public', src);
    const publicDir = path.join(process.cwd(), 'public');

    // Prevent path traversal
    if (!filePath.startsWith(publicDir)) {
      return NextResponse.json({ success: false, message: 'Invalid file path.' }, { status: 403 });
    }

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ success: false, message: 'File not found on server.' }, { status: 404 });
    }

    fs.unlinkSync(filePath);

    return NextResponse.json({
      success: true,
      message: `File deleted: ${src}`,
    });

  } catch (error) {
    console.error('Delete file error:', error);
    return NextResponse.json({ success: false, message: 'Could not delete file.' }, { status: 500 });
  }
}