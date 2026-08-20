const RESEND_API_KEY = process.env.EMAIL_API_KEY || '';
const FROM_EMAIL = process.env.EMAIL_FROM || 'noreply@saidev.in';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'skannanj7@gmail.com';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

async function sendEmail(to: string, subject: string, html: string) {
  if (!RESEND_API_KEY) {
    console.log(`[EMAIL MOCK] To: ${to}\nSubject: ${subject}\n${html.replace(/<[^>]*>/g, '').slice(0, 200)}`);
    return { success: true };
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
    });
    const data = await res.json();
    return { success: res.ok, data };
  } catch (err) {
    console.error('Email error:', err);
    return { success: false };
  }
}

export async function sendVerificationEmail(name: string, email: string, token: string) {
  const link = `${APP_URL}/verify-email?token=${token}`;
  return sendEmail(email, 'Verify your SAIDEV account', `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#faf8f3;border:1px solid #d4c89a">
      <div style="background:#1a3a2a;padding:32px;text-align:center">
        <h1 style="color:#d4af37;margin:0;font-size:28px;letter-spacing:3px">SAIDEV</h1>
        <p style="color:#8fbc8f;margin:4px 0 0;font-size:12px;letter-spacing:2px">TRULY VEGETARIAN</p>
      </div>
      <div style="padding:40px 32px">
        <h2 style="color:#1a3a2a;font-size:22px">Welcome, ${name}!</h2>
        <p style="color:#555;line-height:1.6">Thank you for creating your SAIDEV account. Please verify your email address to start ordering.</p>
        <div style="text-align:center;margin:32px 0">
          <a href="${link}" style="background:#1a3a2a;color:#d4af37;padding:14px 32px;text-decoration:none;font-size:14px;letter-spacing:2px;display:inline-block">VERIFY EMAIL</a>
        </div>
        <p style="color:#888;font-size:13px">This link expires in 24 hours. If you did not create an account, please ignore this email.</p>
      </div>
      <div style="background:#1a3a2a;padding:16px;text-align:center">
        <p style="color:#8fbc8f;font-size:12px;margin:0">© SAIDEV. All Rights Reserved. JB Nagar, Andheri East, Mumbai.</p>
      </div>
    </div>
  `);
}

export async function sendPasswordResetEmail(name: string, email: string, token: string) {
  const link = `${APP_URL}/reset-password?token=${token}`;
  return sendEmail(email, 'Reset your SAIDEV password', `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#faf8f3;border:1px solid #d4c89a">
      <div style="background:#1a3a2a;padding:32px;text-align:center">
        <h1 style="color:#d4af37;margin:0;font-size:28px;letter-spacing:3px">SAIDEV</h1>
        <p style="color:#8fbc8f;margin:4px 0 0;font-size:12px;letter-spacing:2px">TRULY VEGETARIAN</p>
      </div>
      <div style="padding:40px 32px">
        <h2 style="color:#1a3a2a">Reset Your Password</h2>
        <p style="color:#555;line-height:1.6">Hi ${name}, we received a request to reset your SAIDEV account password.</p>
        <div style="text-align:center;margin:32px 0">
          <a href="${link}" style="background:#1a3a2a;color:#d4af37;padding:14px 32px;text-decoration:none;font-size:14px;letter-spacing:2px;display:inline-block">RESET PASSWORD</a>
        </div>
        <p style="color:#888;font-size:13px">This link expires in 1 hour. If you did not request a reset, ignore this email.</p>
      </div>
    </div>
  `);
}

export async function sendAdminNewOrderEmail(order: any, items: any[]) {
  const itemsList = items.map(i => `<tr><td style="padding:8px;border-bottom:1px solid #eee">${i.item_name}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:center">${i.quantity}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:right">₹${i.total_price}</td></tr>`).join('');
  const adminLink = `${APP_URL}/admin/orders/${order.id}`;
  return sendEmail(ADMIN_EMAIL, `New SAIDEV Order — #${order.order_number}`, `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#faf8f3;border:1px solid #d4c89a">
      <div style="background:#1a3a2a;padding:32px;text-align:center">
        <h1 style="color:#d4af37;margin:0;font-size:28px;letter-spacing:3px">SAIDEV</h1>
        <p style="color:#8fbc8f;margin:4px 0 0;font-size:12px;letter-spacing:2px">NEW ORDER RECEIVED</p>
      </div>
      <div style="padding:40px 32px">
        <h2 style="color:#1a3a2a">Order #${order.order_number}</h2>
        <table style="width:100%;border-collapse:collapse;margin:16px 0">
          <tr><td style="color:#888;width:40%">Customer</td><td style="color:#333">${order.customer_name}</td></tr>
          <tr><td style="color:#888">Email</td><td style="color:#333">${order.customer_email}</td></tr>
          <tr><td style="color:#888">Phone</td><td style="color:#333">${order.customer_phone}</td></tr>
          <tr><td style="color:#888">Payment</td><td style="color:#333">${order.payment_method === 'CASH' ? 'Cash on Delivery' : 'UPI on Delivery'}</td></tr>
          <tr><td style="color:#888">Total</td><td style="color:#1a3a2a;font-size:18px;font-weight:bold">₹${order.total_amount}</td></tr>
        </table>
        <h3 style="color:#1a3a2a">Items Ordered</h3>
        <table style="width:100%;border-collapse:collapse">
          <thead><tr style="background:#1a3a2a;color:#d4af37"><th style="padding:8px;text-align:left">Item</th><th style="padding:8px;text-align:center">Qty</th><th style="padding:8px;text-align:right">Total</th></tr></thead>
          <tbody>${itemsList}</tbody>
        </table>
        <h3 style="color:#1a3a2a;margin-top:24px">Delivery Address</h3>
        <p style="color:#555;white-space:pre-line">${order.delivery_address}</p>
        <div style="text-align:center;margin:32px 0">
          <a href="${adminLink}" style="background:#1a3a2a;color:#d4af37;padding:14px 32px;text-decoration:none;font-size:14px;letter-spacing:2px;display:inline-block">VIEW IN ADMIN PANEL</a>
        </div>
      </div>
    </div>
  `);
}

export async function sendOrderStatusEmail(order: any, status: string) {
  const statusMessages: Record<string, string> = {
    CONFIRMED: 'Your order has been confirmed! We are preparing it for you.',
    PREPARING: 'Your order is being prepared fresh for you.',
    OUT_FOR_DELIVERY: 'Your order is on its way! Our delivery team is heading to you.',
    DELIVERED: 'Your order has been delivered. Enjoy your meal!',
    CANCELLED: 'Unfortunately, your order has been cancelled. Please contact us for assistance.',
  };
  const msg = statusMessages[status];
  if (!msg) return;
  return sendEmail(order.customer_email, `SAIDEV Order Update — #${order.order_number}`, `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#faf8f3;border:1px solid #d4c89a">
      <div style="background:#1a3a2a;padding:32px;text-align:center">
        <h1 style="color:#d4af37;margin:0;font-size:28px;letter-spacing:3px">SAIDEV</h1>
      </div>
      <div style="padding:40px 32px">
        <h2 style="color:#1a3a2a">Order #${order.order_number}</h2>
        <p style="color:#555;font-size:16px;line-height:1.6">${msg}</p>
        <a href="${APP_URL}/orders/${order.id}" style="background:#1a3a2a;color:#d4af37;padding:14px 32px;text-decoration:none;font-size:14px;letter-spacing:2px;display:inline-block;margin-top:16px">VIEW ORDER</a>
      </div>
    </div>
  `);
}
