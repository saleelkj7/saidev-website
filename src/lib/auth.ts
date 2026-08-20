import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import crypto from 'crypto';
import getDb from './db';

const JWT_SECRET = process.env.AUTH_SECRET || 'saidev-secret-key-change-in-production';
const TOKEN_EXPIRY = '7d';

export function generateId(): string {
  return crypto.randomUUID();
}

export function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateJWT(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

export function verifyJWT(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('saidev_session')?.value;
    if (!token) return null;
    const payload = verifyJWT(token);
    if (!payload) return null;
    const db = getDb();
    const user = db.prepare('SELECT id, name, email, phone, role, email_verified FROM users WHERE id = ?').get(payload.userId) as any;
    return user || null;
  } catch {
    return null;
  }
}

export function generateOrderNumber(): string {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, '');
  const db = getDb();
  const count = (db.prepare('SELECT COUNT(*) as count FROM orders').get() as any).count + 1;
  return `SAI-${date}-${String(count).padStart(6, '0')}`;
}
