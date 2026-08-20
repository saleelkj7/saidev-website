import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });

  try {
    const { name, phone } = await req.json();
    if (!name?.trim()) return NextResponse.json({ error: 'Name is required' }, { status: 400 });

    const db = getDb();
    db.prepare("UPDATE users SET name = ?, phone = ?, updated_at = datetime('now') WHERE id = ?")
      .run(name.trim(), phone || null, session.id);

    return NextResponse.json({ message: 'Profile updated' });
  } catch {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
