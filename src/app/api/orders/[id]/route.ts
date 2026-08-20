import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });

    const { id } = await params;
    const db = getDb();
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(id) as any;
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

    // Authorization: customers can only see their own orders
    if (session.role !== 'ADMIN' && order.customer_id !== session.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(id);
    const history = db.prepare('SELECT * FROM order_status_history WHERE order_id = ? ORDER BY created_at ASC').all(id);

    return NextResponse.json({ order, items, history });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
  }
}
