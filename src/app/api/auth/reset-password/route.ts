import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();
    if (!token || !password) return NextResponse.json({ error: 'Token and password required' }, { status: 400 });
    if (password.length < 8) return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });

    const db = getDb();
    const record = db.prepare('SELECT * FROM password_reset_tokens WHERE token = ? AND used = 0').get(token) as any;
    if (!record || new Date(record.expires_at) < new Date()) {
      return NextResponse.json({ error: 'Invalid or expired reset link' }, { status: 400 });
    }

    const hash = await hashPassword(password);
    db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(hash, record.user_id);
    db.prepare('UPDATE password_reset_tokens SET used = 1 WHERE id = ?').run(record.id);

    return NextResponse.json({ message: 'Password reset successfully' });
  } catch (err) {
    return NextResponse.json({ error: 'Reset failed' }, { status: 500 });
  }
}
