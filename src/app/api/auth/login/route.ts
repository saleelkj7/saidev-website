import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { generateJWT, verifyPassword } from '@/lib/auth';
import { seedDatabase } from '@/lib/seed';

export async function POST(req: NextRequest) {
  try {
    await seedDatabase();
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const db = getDb();
    const user = db.prepare(
      'SELECT id, name, email, password_hash, role, email_verified FROM users WHERE email = ?'
    ).get(email.toLowerCase()) as any;

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const token = generateJWT({ userId: user.id, role: user.role });
    const response = NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role, emailVerified: !!user.email_verified }
    });
    response.cookies.set('saidev_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });
    return response;
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
