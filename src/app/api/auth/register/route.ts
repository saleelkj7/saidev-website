import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { generateId, generateToken, hashPassword } from '@/lib/auth';
import { sendVerificationEmail } from '@/lib/email';
import { seedDatabase } from '@/lib/seed';

export async function POST(req: NextRequest) {
  try {
    await seedDatabase();
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    const db = getDb();
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email.toLowerCase());
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });
    }

    const id = generateId();
    const hash = await hashPassword(password);
    db.prepare(
      'INSERT INTO users (id, name, email, password_hash) VALUES (?, ?, ?, ?)'
    ).run(id, name.trim(), email.toLowerCase(), hash);

    const token = generateToken();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    db.prepare(
      'INSERT INTO email_verification_tokens (id, token, user_id, expires_at) VALUES (?, ?, ?, ?)'
    ).run(generateId(), token, id, expires);

    await sendVerificationEmail(name, email, token);

    return NextResponse.json({ message: 'Registration successful. Please verify your email.' });
  } catch (err: any) {
    console.error('Register error:', err);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
