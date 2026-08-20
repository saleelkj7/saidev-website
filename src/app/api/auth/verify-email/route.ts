import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    if (!token) return NextResponse.json({ error: 'Token required' }, { status: 400 });

    const db = getDb();
    const record = db.prepare(
      'SELECT * FROM email_verification_tokens WHERE token = ? AND used = 0'
    ).get(token) as any;

    if (!record) return NextResponse.json({ error: 'Invalid or expired verification link' }, { status: 400 });
    if (new Date(record.expires_at) < new Date()) {
      return NextResponse.json({ error: 'Verification link has expired' }, { status: 400 });
    }

    db.prepare('UPDATE users SET email_verified = 1 WHERE id = ?').run(record.user_id);
    db.prepare('UPDATE email_verification_tokens SET used = 1 WHERE id = ?').run(record.id);

    return NextResponse.json({ message: 'Email verified successfully' });
  } catch (err) {
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}
