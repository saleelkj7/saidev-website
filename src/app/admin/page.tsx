'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-yellow-900/30 text-yellow-400 border-yellow-600/30',
  CONFIRMED: 'bg-blue-900/30 text-blue-400 border-blue-600/30',
  PREPARING: 'bg-purple-900/30 text-purple-400 border-purple-600/30',
  OUT_FOR_DELIVERY: 'bg-green-900/30 text-green-400 border-green-600/30',
  DELIVERED: 'bg-emerald-900/30 text-emerald-400 border-emerald-600/30',
  CANCELLED: 'bg-red-900/30 text-red-400 border-red-600/30',
};

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/dashboard').then(r => r.json()).then(d => { setData(d); setLoading(false); });
    const interval = setInterval(() => {
      fetch('/api/admin/dashboard').then(r => r.json()).then(d => setData(d));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="p-8 text-[#8fbc8f]">Loading dashboard...</div>;

  const stats = data?.stats || {};
  const orders = data?.recentOrders || [];

  const cards = [
    { label: "Today's Orders", value: stats.todayOrders, color: 'border-[#c8a84b]' },
    { label: 'Pending', value: stats.pendingOrders, color: 'border-yellow-500' },
    { label: 'Confirmed', value: stats.confirmedOrders, color: 'border-blue-400' },
    { label: 'Preparing', value: stats.preparingOrders, color: 'border-purple-400' },
    { label: 'Out for Delivery', value: stats.outForDelivery, color: 'border-green-400' },
    { label: 'Delivered', value: stats.deliveredOrders, color: 'border-emerald-400' },
    { label: "Today's Revenue", value: `₹${stats.todayRevenue || 0}`, color: 'border-[#c8a84b]' },
    { label: 'Total Orders', value: stats.totalOrders, color: 'border-[#8fbc8f]' },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#c8a84b] tracking-wider">DASHBOARD</h1>
          <p className="text-[#8fbc8f] text-sm mt-1">{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <Link href="/admin/orders" className="bg-[#c8a84b] text-[#1a3a2a] px-4 py-2 text-sm font-bold tracking-wider hover:bg-[#e0bc5e] transition-colors">
          VIEW ALL ORDERS
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {cards.map(card => (
          <div key={card.label} className={`bg-[#1a3a2a] border-l-4 ${card.color} p-4`}>
            <p className="text-[#8fbc8f] text-xs tracking-wider mb-1">{card.label.toUpperCase()}</p>
            <p className="text-[#c8a84b] text-2xl font-bold">{card.value ?? 0}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-[#1a3a2a] border border-[#c8a84b22]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#c8a84b22]">
          <h2 className="text-[#c8a84b] font-bold tracking-wider text-sm">RECENT ORDERS</h2>
          <Link href="/admin/orders" className="text-xs text-[#8fbc8f] hover:text-[#c8a84b] transition-colors">View all →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#c8a84b22]">
                {['Order', 'Customer', 'Amount', 'Payment', 'Status', 'Time', 'Action'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[#8fbc8f] text-xs tracking-wider font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-[#8fbc8f]">No orders yet</td></tr>
              ) : orders.map((order: any) => (
                <tr key={order.id} className="border-b border-[#c8a84b11] hover:bg-[#c8a84b08] transition-colors">
                  <td className="px-4 py-3 text-[#c8a84b] font-mono text-xs">{order.order_number}</td>
                  <td className="px-4 py-3 text-[#d4c89a]">{order.customer_name}</td>
                  <td className="px-4 py-3 text-[#d4c89a] font-medium">₹{order.total_amount}</td>
                  <td className="px-4 py-3 text-[#8fbc8f] text-xs">{order.payment_method}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded border ${STATUS_COLORS[order.order_status] || 'bg-gray-800 text-gray-400 border-gray-600'}`}>
                      {order.order_status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#8fbc8f] text-xs">{new Date(order.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/orders/${order.id}`} className="text-[#c8a84b] text-xs hover:underline">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
