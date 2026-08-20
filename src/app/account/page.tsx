'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import { useApp } from '@/context/AppContext';

export default function AccountPage() {
  const { user, loadingUser, logout, refreshUser } = useApp();
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (!loadingUser && !user) router.push('/login?returnTo=/account');
    if (user) {
      setName(user.name);
      fetch('/api/orders').then(r => r.json()).then(d => setOrders((d.orders || []).slice(0, 3)));
    }
  }, [user, loadingUser, router]);

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch('/api/account', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone }),
    });
    setSaving(false);
    if (res.ok) { setMsg('Profile updated!'); refreshUser(); setTimeout(() => setMsg(''), 3000); }
  }

  const handleLogout = async () => { await logout(); router.push('/'); };

  if (!user) return null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#faf6ee] py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-[#1a3a2a] tracking-wider">MY ACCOUNT</h1>
            <button onClick={handleLogout} className="text-sm text-[#6b6b6b] hover:text-red-500 transition-colors">Logout</button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-[#e8dfc8] p-6 mb-5">
                <h2 className="text-[#1a3a2a] font-bold mb-5 pb-3 border-b border-[#e8dfc8] text-sm tracking-wider">PROFILE DETAILS</h2>
                {msg && <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-2 mb-4 rounded">{msg}</div>}
                <form onSubmit={saveProfile} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs text-[#6b6b6b] tracking-wider mb-1.5 uppercase">Full Name</label>
                    <input value={name} onChange={e => setName(e.target.value)} required
                      className="w-full border border-[#e8dfc8] px-3 py-2.5 text-sm focus:outline-none focus:border-[#c8a84b] bg-[#faf6ee]" />
                  </div>
                  <div>
                    <label className="block text-xs text-[#6b6b6b] tracking-wider mb-1.5 uppercase">Email Address</label>
                    <input value={user.email} disabled className="w-full border border-[#e8dfc8] px-3 py-2.5 text-sm bg-[#f0ece4] text-[#6b6b6b] cursor-not-allowed" />
                    <p className="text-xs text-[#6b6b6b] mt-1">
                      {user.emailVerified
                        ? '✓ Email verified'
                        : <span className="text-orange-600">Email not verified — <Link href="/verify-email" className="underline">verify now</Link></span>
                      }
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs text-[#6b6b6b] tracking-wider mb-1.5 uppercase">Mobile Number</label>
                    <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="10-digit mobile"
                      className="w-full border border-[#e8dfc8] px-3 py-2.5 text-sm focus:outline-none focus:border-[#c8a84b] bg-[#faf6ee]" />
                  </div>
                  <button type="submit" disabled={saving}
                    className="bg-[#1a3a2a] text-[#c8a84b] py-3 text-sm tracking-widest hover:bg-[#122b1e] transition-colors disabled:opacity-60 w-fit px-8">
                    {saving ? 'SAVING...' : 'SAVE CHANGES'}
                  </button>
                </form>
              </div>

              {/* Recent orders */}
              <div className="bg-white border border-[#e8dfc8] p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[#1a3a2a] font-bold text-sm tracking-wider">RECENT ORDERS</h2>
                  <Link href="/my-orders" className="text-xs text-[#c8a84b] hover:underline">View all</Link>
                </div>
                {orders.length === 0 ? (
                  <p className="text-[#6b6b6b] text-sm">No orders yet.</p>
                ) : orders.map((o: any) => (
                  <div key={o.id} className="flex items-center justify-between py-3 border-b border-[#f0e8d8] last:border-0">
                    <div>
                      <p className="text-[#1a3a2a] text-sm font-medium">#{o.order_number}</p>
                      <p className="text-[#6b6b6b] text-xs">{new Date(o.created_at).toLocaleDateString('en-IN')}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[#1a3a2a] font-medium">₹{o.total_amount}</span>
                      <Link href={`/orders/${o.id}`} className="text-xs text-[#c8a84b] hover:underline">View</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-4">
              <div className="bg-[#1a3a2a] p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-[#c8a84b] flex items-center justify-center text-[#1a3a2a] text-2xl font-bold mx-auto mb-3">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <p className="text-[#c8a84b] font-bold">{user.name}</p>
                <p className="text-[#8fbc8f] text-xs mt-1">{user.email}</p>
              </div>
              <div className="bg-white border border-[#e8dfc8] p-5">
                <h3 className="text-[#1a3a2a] font-bold text-sm mb-3 tracking-wider">QUICK LINKS</h3>
                <div className="flex flex-col gap-2">
                  <Link href="/my-orders" className="text-sm text-[#555] hover:text-[#c8a84b] transition-colors">📋 My Orders</Link>
                  <Link href="/menu" className="text-sm text-[#555] hover:text-[#c8a84b] transition-colors">🍽 Browse Menu</Link>
                  <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-600 text-left transition-colors">🚪 Sign Out</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
