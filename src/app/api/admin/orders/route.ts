import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const url = new URL(req.url);
    const status = url.searchParams.get('status');
    const search = url.searchParams.get('search');
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = 20;
    const offset = (page - 1) * limit;

    const db = getDb();
    let query = 'SELECT * FROM orders WHERE 1=1';
    const params: any[] = [];

    if (status) { query += ' AND order_status = ?'; params.push(status); }
    if (search) {
      query += ' AND (order_number LIKE ? OR customer_name LIKE ? OR customer_email LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const orders = db.prepare(query).all(...params);
    const total = (db.prepare('SELECT COUNT(*) as count FROM orders').get() as any).count;

    return NextResponse.json({ orders, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
