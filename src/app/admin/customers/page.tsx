'use client';
import { useEffect, useState } from 'react';

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/admin/customers').then(r => r.json()).then(d => { setCustomers(d.customers || []); setLoading(false); });
  }, []);

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    (c.phone || '').includes(search)
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#c8a84b] tracking-wider">CUSTOMERS</h1>
        <p className="text-[#8fbc8f] text-sm">{customers.length} registered</p>
      </div>

      <div className="mb-5">
        <input
          type="text"
          placeholder="Search by name, email, phone..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-[#1a3a2a] border border-[#c8a84b22] text-[#d4c89a] px-3 py-2 text-sm focus:outline-none focus:border-[#c8a84b] placeholder-[#4a6b4a] w-72"
        />
      </div>

      <div className="bg-[#1a3a2a] border border-[#c8a84b22] overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#c8a84b22]">
              {['Customer', 'Phone', 'Email Verified', 'Orders', 'Total Spent', 'Joined', 'Last Order'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[#8fbc8f] text-xs tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-[#8fbc8f]">Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-[#8fbc8f]">No customers found</td></tr>
            ) : filtered.map((customer: any) => (
              <tr key={customer.id} className="border-b border-[#c8a84b11] hover:bg-[#c8a84b08] transition-colors">
                <td className="px-4 py-3">
                  <p className="text-[#d4c89a]">{customer.name}</p>
                  <p className="text-[#8fbc8f] text-xs">{customer.email}</p>
                </td>
                <td className="px-4 py-3 text-[#8fbc8f] text-xs">{customer.phone || '—'}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded ${customer.email_verified ? 'bg-green-900/40 text-green-400' : 'bg-yellow-900/40 text-yellow-400'}`}>
                    {customer.email_verified ? 'Verified' : 'Pending'}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#d4c89a] text-center">{customer.order_count}</td>
                <td className="px-4 py-3 text-[#c8a84b] font-medium">₹{customer.total_spent}</td>
                <td className="px-4 py-3 text-[#8fbc8f] text-xs">{new Date(customer.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                <td className="px-4 py-3 text-[#8fbc8f] text-xs">{customer.last_order_at ? new Date(customer.last_order_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
