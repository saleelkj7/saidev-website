import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { generateId, generateToken } from '@/lib/auth';
import { sendPasswordResetEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

    const db = getDb();
    const user = db.prepare('SELECT id, name, email FROM users WHERE email = ?').get(email.toLowerCase()) as any;
    
    // Always return success to prevent enumeration
    if (user) {
      const token = generateToken();
      const expires = new Date(Date.now() + 60 * 60 * 1000).toISOString();
      db.prepare('INSERT INTO password_reset_tokens (id, token, user_id, expires_at) VALUES (?, ?, ?, ?)').run(generateId(), token, user.id, expires);
      await sendPasswordResetEmail(user.name, user.email, token);
    }

    return NextResponse.json({ message: 'If the account exists, a reset email has been sent' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
