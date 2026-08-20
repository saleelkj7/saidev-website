import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { getSession, generateId, generateOrderNumber } from '@/lib/auth';
import { sendAdminNewOrderEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    if (!session.email_verified) return NextResponse.json({ error: 'Please verify your email before placing an order' }, { status: 403 });

    const { items, deliveryAddress, paymentMethod, phone, notes } = await req.json();

    if (!items?.length) return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    if (!deliveryAddress) return NextResponse.json({ error: 'Delivery address required' }, { status: 400 });
    if (!['CASH', 'UPI'].includes(paymentMethod)) return NextResponse.json({ error: 'Invalid payment method' }, { status: 400 });

    const db = getDb();

    // Server-side price calculation - NEVER trust frontend prices
    let subtotal = 0;
    const resolvedItems: Array<{ menuItem: any; quantity: number; unitPrice: number; totalPrice: number }> = [];
    for (const item of items) {
      const menuItem = db.prepare('SELECT id, name, price, is_available FROM menu_items WHERE id = ?').get(item.menuItemId) as any;
      if (!menuItem) return NextResponse.json({ error: `Item not found: ${item.menuItemId}` }, { status: 400 });
      if (!menuItem.is_available) return NextResponse.json({ error: `${menuItem.name} is currently unavailable` }, { status: 400 });
      if (!item.quantity || item.quantity < 1) return NextResponse.json({ error: 'Invalid quantity' }, { status: 400 });

      const itemTotal = menuItem.price * item.quantity;
      subtotal += itemTotal;
      resolvedItems.push({ menuItem, quantity: item.quantity, unitPrice: menuItem.price, totalPrice: itemTotal });
    }

    const deliveryCharge = 0;
    const totalAmount = subtotal + deliveryCharge;
    const orderNumber = generateOrderNumber();
    const orderId = generateId();

    const addressStr = typeof deliveryAddress === 'object'
      ? `${deliveryAddress.flat}, ${deliveryAddress.street}, ${deliveryAddress.landmark ? deliveryAddress.landmark + ', ' : ''}${deliveryAddress.city}, ${deliveryAddress.state} - ${deliveryAddress.pincode}`
      : deliveryAddress;

    const createOrder = db.transaction(() => {
      db.prepare(`
        INSERT INTO orders (id, order_number, customer_id, customer_name, customer_email, customer_phone, subtotal, delivery_charge, total_amount, payment_method, delivery_address, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(orderId, orderNumber, session.id, session.name, session.email, phone || '', subtotal, deliveryCharge, totalAmount, paymentMethod, addressStr, notes || null);

      for (const item of resolvedItems) {
        db.prepare(`
          INSERT INTO order_items (id, order_id, menu_item_id, item_name, unit_price, quantity, total_price)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `).run(generateId(), orderId, item.menuItem.id, item.menuItem.name, item.unitPrice, item.quantity, item.totalPrice);
      }

      db.prepare(`
        INSERT INTO order_status_history (id, order_id, status, changed_by)
        VALUES (?, ?, 'PENDING', ?)
      `).run(generateId(), orderId, session.name);
    });

    createOrder();

    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId) as any;
    const orderItems = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(orderId) as any[];

    // Send admin notification
    await sendAdminNewOrderEmail(order, orderItems);

    return NextResponse.json({ orderId, orderNumber, totalAmount });
  } catch (err) {
    console.error('Order creation error:', err);
    return NextResponse.json({ error: 'Failed to place order' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });

    const db = getDb();
    const orders = db.prepare(`
      SELECT o.*, 
        (SELECT COUNT(*) FROM order_items WHERE order_id = o.id) as item_count
      FROM orders o
      WHERE o.customer_id = ?
      ORDER BY o.created_at DESC
    `).all(session.id);

    return NextResponse.json({ orders });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
