import { NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const db = getDb();
    const today = new Date().toISOString().slice(0, 10);

    const stats = {
      todayOrders: (db.prepare("SELECT COUNT(*) as c FROM orders WHERE date(created_at) = ?").get(today) as any).c,
      pendingOrders: (db.prepare("SELECT COUNT(*) as c FROM orders WHERE order_status = 'PENDING'").get() as any).c,
      confirmedOrders: (db.prepare("SELECT COUNT(*) as c FROM orders WHERE order_status = 'CONFIRMED'").get() as any).c,
      preparingOrders: (db.prepare("SELECT COUNT(*) as c FROM orders WHERE order_status = 'PREPARING'").get() as any).c,
      outForDelivery: (db.prepare("SELECT COUNT(*) as c FROM orders WHERE order_status = 'OUT_FOR_DELIVERY'").get() as any).c,
      deliveredOrders: (db.prepare("SELECT COUNT(*) as c FROM orders WHERE order_status = 'DELIVERED'").get() as any).c,
      todayRevenue: (db.prepare("SELECT COALESCE(SUM(total_amount),0) as r FROM orders WHERE date(created_at) = ? AND order_status != 'CANCELLED'").get(today) as any).r,
      totalOrders: (db.prepare("SELECT COUNT(*) as c FROM orders").get() as any).c,
    };

    const recentOrders = db.prepare('SELECT * FROM orders ORDER BY created_at DESC LIMIT 10').all();

    return NextResponse.json({ stats, recentOrders });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
