'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const TRANSITIONS: Record<string, string[]> = {
  PENDING: ['CONFIRMED', 'CANCELLED'],
  CONFIRMED: ['PREPARING', 'CANCELLED'],
  PREPARING: ['OUT_FOR_DELIVERY', 'CANCELLED'],
  OUT_FOR_DELIVERY: ['DELIVERED', 'CANCELLED'],
  DELIVERED: [],
  CANCELLED: [],
};

const STATUS_LABELS: Record<string, string> = {
  CONFIRMED: 'CONFIRM ORDER',
  PREPARING: 'MARK PREPARING',
  OUT_FOR_DELIVERY: 'OUT FOR DELIVERY',
  DELIVERED: 'MARK DELIVERED',
  CANCELLED: 'CANCEL ORDER',
};

export default function AdminOrderDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState('');

  async function load() {
    const res = await fetch(`/api/admin/orders/${id}`);
    const d = await res.json();
    setData(d);
    setLoading(false);
  }

  useEffect(() => { load(); }, [id]);

  async function updateStatus(status: string) {
    setUpdating(status);
    await fetch(`/api/admin/orders/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    await load();
    setUpdating('');
  }

  function downloadInvoice() {
    const { order, items } = data;
    const html = generateInvoiceHTML(order, items);
    const w = window.open('', '_blank');
    if (w) { w.document.write(html); w.document.close(); w.print(); }
  }

  if (loading) return <div className="p-8 text-[#8fbc8f]">Loading...</div>;
  if (!data?.order) return <div className="p-8 text-red-400">Order not found</div>;

  const { order, items, history } = data;
  const nextStatuses = TRANSITIONS[order.order_status] || [];

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/orders" className="text-[#8fbc8f] hover:text-[#c8a84b] text-sm">← Back</Link>
        <h1 className="text-xl font-bold text-[#c8a84b] tracking-wider">#{order.order_number}</h1>
        <span className="text-[#8fbc8f] text-sm">{new Date(order.created_at).toLocaleString('en-IN')}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Order + Items */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Status */}
          <div className="bg-[#1a3a2a] border border-[#c8a84b22] p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#c8a84b] text-sm font-bold tracking-wider">ORDER STATUS</h3>
              <span className="text-[#d4c89a] text-sm bg-[#0f2419] px-3 py-1">{order.order_status.replace('_', ' ')}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {nextStatuses.map(s => (
                <button key={s} onClick={() => updateStatus(s)} disabled={!!updating}
                  className={`px-4 py-2 text-xs tracking-widest font-medium transition-colors disabled:opacity-60 ${s === 'CANCELLED' ? 'border border-red-500/50 text-red-400 hover:bg-red-900/30' : 'bg-[#c8a84b] text-[#1a3a2a] hover:bg-[#e0bc5e]'}`}>
                  {updating === s ? 'UPDATING...' : STATUS_LABELS[s]}
                </button>
              ))}
              <button onClick={downloadInvoice} className="px-4 py-2 text-xs tracking-widest border border-[#c8a84b44] text-[#c8a84b] hover:bg-[#c8a84b] hover:text-[#1a3a2a] transition-colors">
                DOWNLOAD INVOICE
              </button>
            </div>
          </div>

          {/* Items */}
          <div className="bg-[#1a3a2a] border border-[#c8a84b22] p-5">
            <h3 className="text-[#c8a84b] text-sm font-bold tracking-wider mb-4">ITEMS ORDERED</h3>
            <table className="w-full text-sm">
              <thead><tr className="border-b border-[#c8a84b22] text-[#8fbc8f] text-xs">
                <th className="text-left pb-2">Item</th>
                <th className="text-center pb-2">Qty</th>
                <th className="text-right pb-2">Unit Price</th>
                <th className="text-right pb-2">Total</th>
              </tr></thead>
              <tbody>
                {items.map((item: any) => (
                  <tr key={item.id} className="border-b border-[#c8a84b11]">
                    <td className="py-2.5 text-[#d4c89a]">{item.item_name}</td>
                    <td className="py-2.5 text-center text-[#8fbc8f]">{item.quantity}</td>
                    <td className="py-2.5 text-right text-[#8fbc8f]">₹{item.unit_price}</td>
                    <td className="py-2.5 text-right text-[#d4c89a] font-medium">₹{item.total_price}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr><td colSpan={3} className="text-right pt-3 text-[#8fbc8f] text-xs">Subtotal</td><td className="text-right pt-3 text-[#d4c89a]">₹{order.subtotal}</td></tr>
                <tr><td colSpan={3} className="text-right pt-1 text-[#8fbc8f] text-xs">Delivery</td><td className="text-right pt-1 text-green-400">FREE</td></tr>
                <tr><td colSpan={3} className="text-right pt-2 font-bold text-[#c8a84b] text-sm">TOTAL</td><td className="text-right pt-2 font-bold text-[#c8a84b] text-lg">₹{order.total_amount}</td></tr>
              </tfoot>
            </table>
          </div>

          {/* Status History */}
          <div className="bg-[#1a3a2a] border border-[#c8a84b22] p-5">
            <h3 className="text-[#c8a84b] text-sm font-bold tracking-wider mb-4">STATUS HISTORY</h3>
            <div className="flex flex-col gap-2">
              {history.map((h: any) => (
                <div key={h.id} className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-[#c8a84b] flex-shrink-0" />
                  <span className="text-[#d4c89a] w-36">{h.status.replace('_', ' ')}</span>
                  <span className="text-[#8fbc8f] text-xs">{new Date(h.created_at).toLocaleString('en-IN')}</span>
                  {h.changed_by && <span className="text-[#6b8f6b] text-xs">by {h.changed_by}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Customer + Delivery */}
        <div className="flex flex-col gap-4">
          <div className="bg-[#1a3a2a] border border-[#c8a84b22] p-5">
            <h3 className="text-[#c8a84b] text-sm font-bold tracking-wider mb-3">CUSTOMER</h3>
            <p className="text-[#d4c89a]">{order.customer_name}</p>
            <p className="text-[#8fbc8f] text-sm">{order.customer_email}</p>
            <p className="text-[#8fbc8f] text-sm">{order.customer_phone}</p>
          </div>

          <div className="bg-[#1a3a2a] border border-[#c8a84b22] p-5">
            <h3 className="text-[#c8a84b] text-sm font-bold tracking-wider mb-3">DELIVERY ADDRESS</h3>
            <p className="text-[#d4c89a] text-sm leading-relaxed whitespace-pre-line">{order.delivery_address}</p>
            {order.notes && <p className="text-[#8fbc8f] text-xs mt-2 italic">{order.notes}</p>}
          </div>

          <div className="bg-[#1a3a2a] border border-[#c8a84b22] p-5">
            <h3 className="text-[#c8a84b] text-sm font-bold tracking-wider mb-3">PAYMENT</h3>
            <p className="text-[#d4c89a]">{order.payment_method === 'CASH' ? '💵 Cash on Delivery' : '📱 UPI on Delivery'}</p>
            <p className="text-[#8fbc8f] text-sm mt-1">Status: {order.payment_status}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function generateInvoiceHTML(order: any, items: any[]) {
  const rows = items.map(i => `<tr><td style="padding:8px;border-bottom:1px solid #eee">${i.item_name}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:center">${i.quantity}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:right">₹${i.unit_price}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:right">₹${i.total_price}</td></tr>`).join('');
  return `<!DOCTYPE html><html><head><title>Invoice ${order.order_number}</title><style>body{font-family:Georgia,serif;max-width:700px;margin:40px auto;color:#333;}h1{color:#1a3a2a;letter-spacing:3px;}table{width:100%;border-collapse:collapse;}th{background:#1a3a2a;color:#c8a84b;padding:10px;text-align:left;}@media print{body{margin:0;}}</style></head><body>
<div style="text-align:center;border-bottom:2px solid #1a3a2a;padding-bottom:20px;margin-bottom:20px"><h1>SAIDEV</h1><p style="color:#6b6b6b;letter-spacing:2px;font-size:12px">TRULY VEGETARIAN</p><p style="color:#555;font-size:13px">JB Nagar, Andheri East, Mumbai | 022-2825 7979</p></div>
<h2 style="color:#1a3a2a">Invoice</h2>
<table style="margin-bottom:20px;width:auto"><tr><td style="padding:4px 16px 4px 0;color:#666">Order Number</td><td><strong>${order.order_number}</strong></td></tr><tr><td style="padding:4px 16px 4px 0;color:#666">Date</td><td>${new Date(order.created_at).toLocaleString('en-IN')}</td></tr><tr><td style="padding:4px 16px 4px 0;color:#666">Customer</td><td>${order.customer_name}</td></tr><tr><td style="padding:4px 16px 4px 0;color:#666">Phone</td><td>${order.customer_phone}</td></tr><tr><td style="padding:4px 16px 4px 0;color:#666">Delivery Address</td><td>${order.delivery_address}</td></tr><tr><td style="padding:4px 16px 4px 0;color:#666">Payment</td><td>${order.payment_method === 'CASH' ? 'Cash on Delivery' : 'UPI on Delivery'}</td></tr><tr><td style="padding:4px 16px 4px 0;color:#666">Status</td><td>${order.order_status}</td></tr></table>
<table><thead><tr><th>Item</th><th style="text-align:center">Qty</th><th style="text-align:right">Unit Price</th><th style="text-align:right">Total</th></tr></thead><tbody>${rows}</tbody><tfoot><tr><td colspan="3" style="text-align:right;padding:8px;color:#666">Subtotal</td><td style="text-align:right;padding:8px">₹${order.subtotal}</td></tr><tr><td colspan="3" style="text-align:right;padding:8px;color:#666">Delivery</td><td style="text-align:right;padding:8px;color:green">FREE</td></tr><tr style="font-weight:bold;font-size:16px"><td colspan="3" style="text-align:right;padding:8px;color:#1a3a2a">GRAND TOTAL</td><td style="text-align:right;padding:8px;color:#1a3a2a">₹${order.total_amount}</td></tr></tfoot></table>
<div style="text-align:center;margin-top:40px;color:#6b6b6b;font-size:13px;border-top:1px solid #eee;padding-top:20px"><p>Thank you for ordering from SAIDEV.</p></div></body></html>`;
}
