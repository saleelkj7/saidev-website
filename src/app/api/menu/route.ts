import { NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { seedDatabase } from '@/lib/seed';

export async function GET() {
  try {
    await seedDatabase();
    const db = getDb();
    const categories = db.prepare(
      'SELECT id, name, sort_order FROM menu_categories WHERE is_active = 1 ORDER BY sort_order'
    ).all();
    const items = db.prepare(
      'SELECT id, name, description, category_id, price, image, is_available, is_vegetarian, sort_order FROM menu_items ORDER BY sort_order'
    ).all();
    return NextResponse.json({ categories, items });
  } catch (err) {
    console.error('Menu API error:', err);
    return NextResponse.json({ error: 'Failed to load menu' }, { status: 500 });
  }
}
