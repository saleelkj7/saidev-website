import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const { id } = await params;
    const db = getDb();
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(id) as any;
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

    const items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(id);
    const history = db.prepare('SELECT * FROM order_status_history WHERE order_id = ? ORDER BY created_at ASC').all(id);

    return NextResponse.json({ order, items, history });
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
