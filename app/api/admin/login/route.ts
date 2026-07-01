import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const res = NextResponse.json({ success: true });

    res.cookies.set('admin_token', process.env.ADMIN_PASSWORD!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });

    return res;
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}