import { NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const db = getDb();
  const customers = db.prepare(`
    SELECT u.id, u.name, u.email, u.phone, u.email_verified, u.created_at,
      COUNT(o.id) as order_count,
      COALESCE(SUM(o.total_amount), 0) as total_spent,
      MAX(o.created_at) as last_order_at
    FROM users u
    LEFT JOIN orders o ON o.customer_id = u.id
    WHERE u.role = 'CUSTOMER'
    GROUP BY u.id
    ORDER BY u.created_at DESC
  `).all();

  return NextResponse.json({ customers });
}
