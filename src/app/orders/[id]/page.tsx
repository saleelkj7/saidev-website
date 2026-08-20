'use client';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';

const STATUS_STEPS = ['PENDING', 'CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED'];
const STATUS_LABELS: Record<string, string> = {
  PENDING: 'Order Placed',
  CONFIRMED: 'Confirmed',
  PREPARING: 'Preparing',
  OUT_FOR_DELIVERY: 'Out for Delivery',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
};

export default function OrderPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const isNew = searchParams.get('new') === '1';
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => { setLoading(false); });
  }, [id]);

  function downloadInvoice() {
    // Generate simple invoice in new tab
    const { order, items } = data;
    const html = generateInvoiceHTML(order, items);
    const w = window.open('', '_blank');
    if (w) { w.document.write(html); w.document.close(); w.print(); }
  }

  if (loading) return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#faf6ee] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#c8a84b] border-t-transparent rounded-full animate-spin" />
      </div>
    </>
  );

  if (!data?.order) return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#faf6ee] flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-[#6b6b6b] mb-4">Order not found.</p>
          <Link href="/my-orders" className="text-[#c8a84b] underline">My Orders</Link>
        </div>
      </div>
    </>
  );

  const { order, items, history } = data;
  const currentIdx = STATUS_STEPS.indexOf(order.order_status);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#faf6ee] py-8 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Success banner */}
          {isNew && (
            <div className="bg-green-50 border border-green-200 rounded p-5 mb-6 text-center">
              <div className="text-3xl mb-2">✓</div>
              <h2 className="text-green-800 font-bold text-xl mb-1">Order Placed Successfully!</h2>
              <p className="text-green-700 text-sm">Thank you for ordering from SAIDEV. We&apos;ll get started on your order shortly.</p>
            </div>
          )}

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-[#1a3a2a] tracking-wider">#{order.order_number}</h1>
              <p className="text-[#6b6b6b] text-sm mt-1">{new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <button onClick={downloadInvoice} className="flex items-center gap-2 border border-[#1a3a2a] text-[#1a3a2a] px-4 py-2 text-xs tracking-wider hover:bg-[#1a3a2a] hover:text-[#c8a84b] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              INVOICE
            </button>
          </div>

          {/* Status tracker */}
          {order.order_status !== 'CANCELLED' ? (
            <div className="bg-white border border-[#e8dfc8] p-6 mb-4">
              <h3 className="text-[#1a3a2a] font-bold mb-5 text-sm tracking-wider">ORDER STATUS</h3>
              <div className="flex items-center gap-1">
                {STATUS_STEPS.map((status, idx) => (
                  <div key={status} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${idx <= currentIdx ? 'bg-[#1a3a2a] text-[#c8a84b]' : 'bg-[#e8dfc8] text-[#6b6b6b]'}`}>
                        {idx < currentIdx ? '✓' : idx === currentIdx ? '●' : '○'}
                      </div>
                      <p className="text-[9px] text-center mt-1.5 leading-tight text-[#555] max-w-14">{STATUS_LABELS[status]}</p>
                    </div>
                    {idx < STATUS_STEPS.length - 1 && (
                      <div className={`h-0.5 flex-1 mb-5 ${idx < currentIdx ? 'bg-[#1a3a2a]' : 'bg-[#e8dfc8]'}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 p-4 mb-4 rounded text-red-700 font-medium text-sm">
              This order has been cancelled.
            </div>
          )}

          {/* Items */}
          <div className="bg-white border border-[#e8dfc8] p-6 mb-4">
            <h3 className="text-[#1a3a2a] font-bold mb-4 text-sm tracking-wider">ITEMS ORDERED</h3>
            <div className="flex flex-col gap-2">
              {items.map((item: any) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-[#f0e8d8] last:border-0">
                  <div className="flex items-center gap-2">
                    <div className="veg-badge"><div className="veg-dot" /></div>
                    <span className="text-sm text-[#333]">{item.item_name}</span>
                    <span className="text-xs text-[#6b6b6b]">× {item.quantity}</span>
                  </div>
                  <span className="text-sm font-medium text-[#1a3a2a]">₹{item.total_price}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-[#e8dfc8] flex flex-col gap-1">
              <div className="flex justify-between text-sm text-[#6b6b6b]">
                <span>Subtotal</span><span>₹{order.subtotal}</span>
              </div>
              <div className="flex justify-between text-sm text-green-600">
                <span>Delivery</span><span>FREE</span>
              </div>
              <div className="flex justify-between font-bold text-[#1a3a2a] text-lg mt-1">
                <span>Total</span><span>₹{order.total_amount}</span>
              </div>
            </div>
          </div>

          {/* Delivery & Payment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="bg-white border border-[#e8dfc8] p-5">
              <h3 className="text-[#1a3a2a] font-bold mb-3 text-sm tracking-wider">DELIVERY ADDRESS</h3>
              <p className="text-[#555] text-sm leading-relaxed">{order.customer_name}</p>
              <p className="text-[#555] text-sm">{order.customer_phone}</p>
              <p className="text-[#555] text-sm mt-1 leading-relaxed">{order.delivery_address}</p>
            </div>
            <div className="bg-white border border-[#e8dfc8] p-5">
              <h3 className="text-[#1a3a2a] font-bold mb-3 text-sm tracking-wider">PAYMENT</h3>
              <p className="text-[#555] text-sm">{order.payment_method === 'CASH' ? '💵 Cash on Delivery' : '📱 UPI on Delivery'}</p>
              <span className={`inline-block mt-2 px-2 py-0.5 text-xs rounded ${order.payment_status === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {order.payment_status}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <Link href="/my-orders" className="border border-[#1a3a2a] text-[#1a3a2a] px-5 py-2.5 text-sm tracking-wider hover:bg-[#1a3a2a] hover:text-[#c8a84b] transition-colors">
              MY ORDERS
            </Link>
            <Link href="/menu" className="bg-[#1a3a2a] text-[#c8a84b] px-5 py-2.5 text-sm tracking-wider hover:bg-[#122b1e] transition-colors">
              ORDER AGAIN
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

function generateInvoiceHTML(order: any, items: any[]) {
  const itemRows = items.map(i => `
    <tr>
      <td style="padding:8px;border-bottom:1px solid #eee">${i.item_name}</td>
      <td style="padding:8px;border-bottom:1px solid #eee;text-align:center">${i.quantity}</td>
      <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">₹${i.unit_price}</td>
      <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">₹${i.total_price}</td>
    </tr>
  `).join('');
  return `<!DOCTYPE html>
<html>
<head><title>Invoice ${order.order_number}</title>
<style>body{font-family:Georgia,serif;max-width:700px;margin:40px auto;color:#333;}h1{color:#1a3a2a;letter-spacing:3px;}table{width:100%;border-collapse:collapse;}th{background:#1a3a2a;color:#c8a84b;padding:10px;text-align:left;}@media print{body{margin:0;}}</style>
</head>
<body>
<div style="text-align:center;border-bottom:2px solid #1a3a2a;padding-bottom:20px;margin-bottom:20px">
  <h1>SAIDEV</h1>
  <p style="color:#6b6b6b;letter-spacing:2px;font-size:12px">TRULY VEGETARIAN</p>
  <p style="color:#555;font-size:13px">JB Nagar, Andheri East, Mumbai</p>
  <p style="color:#555;font-size:13px">022-2825 7979 / 022-2838 9288 / 022-2839 0654 / 022-2822 7957</p>
</div>
<h2 style="color:#1a3a2a">Invoice</h2>
<table style="margin-bottom:20px;width:auto">
  <tr><td style="padding:4px 16px 4px 0;color:#666">Order Number</td><td><strong>${order.order_number}</strong></td></tr>
  <tr><td style="padding:4px 16px 4px 0;color:#666">Date</td><td>${new Date(order.created_at).toLocaleString('en-IN')}</td></tr>
  <tr><td style="padding:4px 16px 4px 0;color:#666">Customer</td><td>${order.customer_name}</td></tr>
  <tr><td style="padding:4px 16px 4px 0;color:#666">Phone</td><td>${order.customer_phone}</td></tr>
  <tr><td style="padding:4px 16px 4px 0;color:#666">Delivery Address</td><td>${order.delivery_address}</td></tr>
  <tr><td style="padding:4px 16px 4px 0;color:#666">Payment</td><td>${order.payment_method === 'CASH' ? 'Cash on Delivery' : 'UPI on Delivery'}</td></tr>
  <tr><td style="padding:4px 16px 4px 0;color:#666">Status</td><td>${order.order_status}</td></tr>
</table>
<table>
  <thead><tr><th>Item</th><th style="text-align:center">Qty</th><th style="text-align:right">Unit Price</th><th style="text-align:right">Total</th></tr></thead>
  <tbody>${itemRows}</tbody>
  <tfoot>
    <tr><td colspan="3" style="text-align:right;padding:8px;color:#666">Subtotal</td><td style="text-align:right;padding:8px">₹${order.subtotal}</td></tr>
    <tr><td colspan="3" style="text-align:right;padding:8px;color:#666">Delivery</td><td style="text-align:right;padding:8px;color:green">FREE</td></tr>
    <tr style="font-weight:bold;font-size:16px"><td colspan="3" style="text-align:right;padding:8px;color:#1a3a2a">GRAND TOTAL</td><td style="text-align:right;padding:8px;color:#1a3a2a">₹${order.total_amount}</td></tr>
  </tfoot>
</table>
<div style="text-align:center;margin-top:40px;color:#6b6b6b;font-size:13px;border-top:1px solid #eee;padding-top:20px">
  <p>Thank you for ordering from SAIDEV.</p>
  <p style="font-size:11px">© SAIDEV. All Rights Reserved.</p>
</div>
</body></html>`;
}
