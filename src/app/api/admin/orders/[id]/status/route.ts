import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { getSession, generateId } from '@/lib/auth';
import { sendOrderStatusEmail } from '@/lib/email';

const VALID_STATUSES = ['PENDING', 'CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'];

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;
    const { status } = await req.json();
    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const db = getDb();
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(id) as any;
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

    db.prepare('UPDATE orders SET order_status = ?, updated_at = datetime(\'now\') WHERE id = ?').run(status, id);
    db.prepare('INSERT INTO order_status_history (id, order_id, status, changed_by) VALUES (?, ?, ?, ?)').run(generateId(), id, status, session.name);

    // Send customer notification
    const updatedOrder = db.prepare('SELECT * FROM orders WHERE id = ?').get(id) as any;
    await sendOrderStatusEmail(updatedOrder, status);

    return NextResponse.json({ message: 'Status updated' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
  }
}
