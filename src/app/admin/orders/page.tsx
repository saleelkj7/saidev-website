'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-yellow-900/40 text-yellow-300',
  CONFIRMED: 'bg-blue-900/40 text-blue-300',
  PREPARING: 'bg-purple-900/40 text-purple-300',
  OUT_FOR_DELIVERY: 'bg-green-900/40 text-green-300',
  DELIVERED: 'bg-emerald-900/40 text-emerald-300',
  CANCELLED: 'bg-red-900/40 text-red-300',
};

const STATUSES = ['', 'PENDING', 'CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  function load() {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page) });
    if (status) params.set('status', status);
    if (search) params.set('search', search);
    fetch(`/api/admin/orders?${params}`)
      .then(r => r.json())
      .then(d => { setOrders(d.orders || []); setTotal(d.total || 0); setLoading(false); });
  }

  useEffect(() => { load(); }, [page, status]);
  useEffect(() => { const t = setTimeout(load, 400); return () => clearTimeout(t); }, [search]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#c8a84b] tracking-wider">ORDERS</h1>
        <p className="text-[#8fbc8f] text-sm">{total} total orders</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Search order, customer..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-[#1a3a2a] border border-[#c8a84b22] text-[#d4c89a] px-3 py-2 text-sm focus:outline-none focus:border-[#c8a84b] placeholder-[#4a6b4a] w-64"
        />
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="bg-[#1a3a2a] border border-[#c8a84b22] text-[#d4c89a] px-3 py-2 text-sm focus:outline-none"
        >
          <option value="">All Statuses</option>
          {STATUSES.filter(s => s).map(s => (
            <option key={s} value={s}>{s.replace('_', ' ')}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#1a3a2a] border border-[#c8a84b22] overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#c8a84b22]">
              {['Order', 'Customer', 'Amount', 'Payment', 'Status', 'Date', 'Action'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[#8fbc8f] text-xs tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-[#8fbc8f]">Loading...</td></tr>
            ) : orders.length === 0 ? (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-[#8fbc8f]">No orders found</td></tr>
            ) : orders.map((order: any) => (
              <tr key={order.id} className="border-b border-[#c8a84b11] hover:bg-[#c8a84b08] transition-colors">
                <td className="px-4 py-3 text-[#c8a84b] font-mono text-xs">{order.order_number}</td>
                <td className="px-4 py-3">
                  <p className="text-[#d4c89a]">{order.customer_name}</p>
                  <p className="text-[#8fbc8f] text-xs">{order.customer_email}</p>
                </td>
                <td className="px-4 py-3 text-[#d4c89a] font-medium">₹{order.total_amount}</td>
                <td className="px-4 py-3 text-[#8fbc8f] text-xs">{order.payment_method}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded ${STATUS_COLORS[order.order_status] || ''}`}>
                    {order.order_status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#8fbc8f] text-xs">{new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/orders/${order.id}`} className="text-[#c8a84b] text-xs hover:underline">View →</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {total > 20 && (
        <div className="flex gap-2 mt-4 justify-center">
          {Array.from({ length: Math.ceil(total / 20) }).map((_, i) => (
            <button key={i} onClick={() => setPage(i + 1)}
              className={`w-8 h-8 text-sm ${page === i + 1 ? 'bg-[#c8a84b] text-[#1a3a2a]' : 'bg-[#1a3a2a] text-[#8fbc8f] hover:text-[#c8a84b]'} transition-colors`}>
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
