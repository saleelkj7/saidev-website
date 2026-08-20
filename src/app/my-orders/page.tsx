'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import Navbar from '@/components/layout/Navbar';
import { useRouter } from 'next/navigation';

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-blue-100 text-blue-800',
  PREPARING: 'bg-purple-100 text-purple-800',
  OUT_FOR_DELIVERY: 'bg-green-100 text-green-800',
  DELIVERED: 'bg-emerald-100 text-emerald-800',
  CANCELLED: 'bg-red-100 text-red-800',
};

export default function MyOrdersPage() {
  const { user, loadingUser } = useApp();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!loadingUser && !user) router.push('/login?returnTo=/my-orders');
    if (user) {
      fetch('/api/orders').then(r => r.json()).then(d => { setOrders(d.orders || []); setLoading(false); });
    }
  }, [user, loadingUser, router]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#faf6ee] py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-[#1a3a2a] tracking-wider mb-8">MY ORDERS</h1>

          {loading ? (
            <div className="flex flex-col gap-4">
              {[1,2,3].map(i => <div key={i} className="skeleton h-28 rounded" />)}
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🍽</div>
              <h2 className="text-[#1a3a2a] font-bold text-xl mb-2">No orders yet</h2>
              <p className="text-[#6b6b6b] mb-6">You haven&apos;t placed any orders yet. Explore our menu!</p>
              <Link href="/menu" className="bg-[#1a3a2a] text-[#c8a84b] px-8 py-3 text-sm tracking-widest hover:bg-[#122b1e] transition-colors">
                VIEW MENU
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {orders.map((order: any) => (
                <div key={order.id} className="bg-white border border-[#e8dfc8] p-5 hover:border-[#c8a84b55] transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-[#1a3a2a]">#{order.order_number}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded font-medium ${STATUS_COLORS[order.order_status] || 'bg-gray-100 text-gray-700'}`}>
                          {order.order_status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-[#6b6b6b] text-sm">{new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                      <p className="text-[#6b6b6b] text-xs mt-1">{order.item_count} item{order.item_count !== 1 ? 's' : ''} · {order.payment_method === 'CASH' ? 'Cash on Delivery' : 'UPI on Delivery'}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-[#1a3a2a] text-lg">₹{order.total_amount}</p>
                      <div className="flex gap-2 mt-2">
                        <Link href={`/orders/${order.id}`} className="text-xs border border-[#1a3a2a] text-[#1a3a2a] px-3 py-1.5 hover:bg-[#1a3a2a] hover:text-[#c8a84b] transition-colors">
                          VIEW
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
