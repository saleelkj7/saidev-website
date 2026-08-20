import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { getSession, generateId } from '@/lib/auth';

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const db = getDb();
  const categories = db.prepare('SELECT * FROM menu_categories ORDER BY sort_order').all();
  const items = db.prepare('SELECT mi.*, mc.name as category_name FROM menu_items mi JOIN menu_categories mc ON mi.category_id = mc.id ORDER BY mi.sort_order').all();
  return NextResponse.json({ categories, items });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const { name, description, categoryId, price, isAvailable, sortOrder } = await req.json();
    if (!name || !categoryId || !price) return NextResponse.json({ error: 'Name, category and price required' }, { status: 400 });

    const db = getDb();
    const id = generateId();
    db.prepare(
      'INSERT INTO menu_items (id, name, description, category_id, price, is_available, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).run(id, name, description || null, categoryId, price, isAvailable ? 1 : 0, sortOrder || 0);

    return NextResponse.json({ id, message: 'Item added' });
  } catch {
    return NextResponse.json({ error: 'Failed to add item' }, { status: 500 });
  }
}
