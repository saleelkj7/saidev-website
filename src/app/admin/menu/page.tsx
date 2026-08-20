'use client';
import { useEffect, useState } from 'react';

export default function AdminMenuPage() {
  const [data, setData] = useState<any>({ categories: [], items: [] });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editItem, setEditItem] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    const res = await fetch('/api/admin/menu');
    const d = await res.json();
    setData(d);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const filtered = data.items.filter((i: any) =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  async function toggleAvailability(item: any) {
    await fetch(`/api/admin/menu/${item.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isAvailable: !item.is_available }),
    });
    load();
  }

  async function saveEdit() {
    if (!editItem) return;
    setSaving(true);
    await fetch(`/api/admin/menu/${editItem.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editItem.name, price: Number(editItem.price), categoryId: editItem.category_id, description: editItem.description }),
    });
    setSaving(false);
    setEditItem(null);
    load();
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#c8a84b] tracking-wider">MENU MANAGEMENT</h1>
        <p className="text-[#8fbc8f] text-sm">{data.items.length} items · {data.categories.length} categories</p>
      </div>

      {/* Search */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search menu items..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-[#1a3a2a] border border-[#c8a84b22] text-[#d4c89a] px-3 py-2 text-sm focus:outline-none focus:border-[#c8a84b] placeholder-[#4a6b4a] w-72"
        />
      </div>

      {/* Table */}
      <div className="bg-[#1a3a2a] border border-[#c8a84b22] overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#c8a84b22]">
              {['Item', 'Category', 'Price', 'Status', 'Actions'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[#8fbc8f] text-xs tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-[#8fbc8f]">Loading...</td></tr>
            ) : filtered.map((item: any) => (
              <tr key={item.id} className={`border-b border-[#c8a84b11] hover:bg-[#c8a84b08] transition-colors ${!item.is_available ? 'opacity-50' : ''}`}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border border-green-600 rounded-sm flex-shrink-0 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
                    </div>
                    <span className="text-[#d4c89a]">{item.name}</span>
                  </div>
                  {item.description && <p className="text-[#6b8f6b] text-xs ml-5 mt-0.5">{item.description}</p>}
                </td>
                <td className="px-4 py-3 text-[#8fbc8f] text-xs">{item.category_name}</td>
                <td className="px-4 py-3 text-[#c8a84b] font-medium">₹{item.price}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded ${item.is_available ? 'bg-green-900/40 text-green-400' : 'bg-red-900/40 text-red-400'}`}>
                    {item.is_available ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => setEditItem({ ...item })} className="text-[#c8a84b] text-xs hover:underline">Edit</button>
                    <button onClick={() => toggleAvailability(item)} className={`text-xs hover:underline ${item.is_available ? 'text-red-400' : 'text-green-400'}`}>
                      {item.is_available ? 'Disable' : 'Enable'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit modal */}
      {editItem && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setEditItem(null)}>
          <div className="bg-[#1a3a2a] border border-[#c8a84b22] p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <h3 className="text-[#c8a84b] font-bold tracking-wider mb-5">EDIT MENU ITEM</h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs text-[#8fbc8f] mb-1 tracking-wider">ITEM NAME</label>
                <input value={editItem.name} onChange={e => setEditItem((p: any) => ({ ...p, name: e.target.value }))}
                  className="w-full bg-[#0f2419] border border-[#c8a84b22] text-[#d4c89a] px-3 py-2.5 text-sm focus:outline-none focus:border-[#c8a84b]" />
              </div>
              <div>
                <label className="block text-xs text-[#8fbc8f] mb-1 tracking-wider">PRICE (₹)</label>
                <input type="number" value={editItem.price} onChange={e => setEditItem((p: any) => ({ ...p, price: e.target.value }))}
                  className="w-full bg-[#0f2419] border border-[#c8a84b22] text-[#d4c89a] px-3 py-2.5 text-sm focus:outline-none focus:border-[#c8a84b]" />
              </div>
              <div>
                <label className="block text-xs text-[#8fbc8f] mb-1 tracking-wider">CATEGORY</label>
                <select value={editItem.category_id} onChange={e => setEditItem((p: any) => ({ ...p, category_id: e.target.value }))}
                  className="w-full bg-[#0f2419] border border-[#c8a84b22] text-[#d4c89a] px-3 py-2.5 text-sm focus:outline-none">
                  {data.categories.map((cat: any) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#8fbc8f] mb-1 tracking-wider">DESCRIPTION</label>
                <input value={editItem.description || ''} onChange={e => setEditItem((p: any) => ({ ...p, description: e.target.value }))}
                  className="w-full bg-[#0f2419] border border-[#c8a84b22] text-[#d4c89a] px-3 py-2.5 text-sm focus:outline-none focus:border-[#c8a84b]" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={saveEdit} disabled={saving}
                className="flex-1 bg-[#c8a84b] text-[#1a3a2a] py-2.5 text-sm tracking-widest font-bold hover:bg-[#e0bc5e] transition-colors disabled:opacity-60">
                {saving ? 'SAVING...' : 'SAVE CHANGES'}
              </button>
              <button onClick={() => setEditItem(null)} className="px-4 border border-[#c8a84b22] text-[#8fbc8f] hover:text-[#c8a84b] text-sm transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
