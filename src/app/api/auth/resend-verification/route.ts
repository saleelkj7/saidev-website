import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { generateId, generateToken, getSession } from '@/lib/auth';
import { sendVerificationEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    let email: string;
    if (session) {
      email = session.email;
    } else {
      const body = await req.json();
      email = body.email;
    }
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

    const db = getDb();
    const user = db.prepare('SELECT id, name, email, email_verified FROM users WHERE email = ?').get(email.toLowerCase()) as any;
    if (!user) return NextResponse.json({ message: 'If the account exists, a verification email has been sent' });
    if (user.email_verified) return NextResponse.json({ error: 'Email already verified' }, { status: 400 });

    const token = generateToken();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    db.prepare('INSERT INTO email_verification_tokens (id, token, user_id, expires_at) VALUES (?, ?, ?, ?)').run(generateId(), token, user.id, expires);
    await sendVerificationEmail(user.name, user.email, token);

    return NextResponse.json({ message: 'Verification email sent' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
