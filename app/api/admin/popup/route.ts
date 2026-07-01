import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function auth(req: Request): boolean {
  const cookie = req.headers.get('cookie') || '';
  const token  = cookie.split(';').find(c => c.trim().startsWith('admin_token='))?.split('=')[1]?.trim();
  return !!process.env.ADMIN_PASSWORD && token === process.env.ADMIN_PASSWORD;
}

const FILE = () => path.join(process.cwd(), 'data', 'popup.json');

export async function POST(req: Request) {
  if (!auth(req)) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

  try {
    const { announcementEnabled, announcementImage, announcementLink, announcementAlt } = await req.json();

    const data = {
      announcementEnabled: !!announcementEnabled,
      announcementImage:   announcementImage?.trim() || '',
      announcementLink:    announcementLink?.trim()  || '/contact',
      announcementAlt:     announcementAlt?.trim()   || 'Special Offer',
    };

    fs.writeFileSync(FILE(), JSON.stringify(data, null, 2), 'utf-8');
    return NextResponse.json({ success: true, message: 'Popup settings saved!' });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, message: 'Server error.' }, { status: 500 });
  }
}
