import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { id } = await params;
  const body = await req.json();
  const db = getDb();

  const fields: string[] = [];
  const values: any[] = [];

  if (body.name !== undefined) { fields.push('name = ?'); values.push(body.name); }
  if (body.description !== undefined) { fields.push('description = ?'); values.push(body.description); }
  if (body.price !== undefined) { fields.push('price = ?'); values.push(body.price); }
  if (body.categoryId !== undefined) { fields.push('category_id = ?'); values.push(body.categoryId); }
  if (body.isAvailable !== undefined) { fields.push('is_available = ?'); values.push(body.isAvailable ? 1 : 0); }
  if (body.sortOrder !== undefined) { fields.push('sort_order = ?'); values.push(body.sortOrder); }

  if (!fields.length) return NextResponse.json({ error: 'No fields to update' }, { status: 400 });

  fields.push("updated_at = datetime('now')");
  values.push(id);

  db.prepare(`UPDATE menu_items SET ${fields.join(', ')} WHERE id = ?`).run(...values);
  return NextResponse.json({ message: 'Updated' });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { id } = await params;
  const db = getDb();
  // Soft delete - just disable
  db.prepare('UPDATE menu_items SET is_available = 0 WHERE id = ?').run(id);
  return NextResponse.json({ message: 'Item disabled' });
}
