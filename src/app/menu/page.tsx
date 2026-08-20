'use client';
import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useApp } from '@/context/AppContext';

interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  category_id: string;
  price: number;
  is_available: number;
  is_vegetarian: number;
  sort_order: number;
}

interface Category {
  id: string;
  name: string;
  sort_order: number;
}

export default function MenuPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [modal, setModal] = useState<MenuItem | null>(null);
  const [qty, setQty] = useState(1);
  const { addToCart, cart, toast } = useApp();
  const catBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/menu')
      .then(r => r.json())
      .then(data => {
        setCategories(data.categories || []);
        setItems(data.items || []);
        setLoading(false);
      });
  }, []);

  const filtered = items.filter(item => {
    const matchCat = selectedCat === 'all' || item.category_id === selectedCat;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const groupedByCat = categories.map(cat => ({
    ...cat,
    items: filtered.filter(i => i.category_id === cat.id),
  })).filter(g => g.items.length > 0);

  function cartQty(id: string) {
    return cart.find(c => c.id === id)?.quantity || 0;
  }

  function handleAddToCart(item: MenuItem) {
    if (!item.is_available) return;
    addToCart({ id: item.id, name: item.name, price: item.price, categoryId: item.category_id });
    toast(`${item.name} added to cart`);
  }

  function openModal(item: MenuItem) {
    setModal(item);
    setQty(cartQty(item.id) || 1);
  }

  function handleModalAdd() {
    if (!modal) return;
    for (let i = 0; i < qty; i++) {
      addToCart({ id: modal.id, name: modal.name, price: modal.price, categoryId: modal.category_id });
    }
    toast(`${modal.name} added to cart`);
    setModal(null);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#faf6ee]">
        {/* Header */}
        <div className="bg-[#1a3a2a] py-10 px-4 text-center">
          <p className="text-[#c8a84b] text-xs tracking-[0.3em] mb-1">SAIDEV</p>
          <h1 className="text-3xl font-bold text-white tracking-wider">OUR MENU</h1>
          <p className="text-[#8fbc8f] text-sm mt-2">All dishes are purely vegetarian</p>
        </div>

        {/* Search + category bar */}
        <div className="sticky top-16 z-30 bg-white border-b border-[#e8dfc8] shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-2">
            {/* Search */}
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b6b6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search dishes..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-[#e8dfc8] rounded text-sm focus:outline-none focus:border-[#c8a84b] bg-[#faf6ee]"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6b6b] text-xs">✕</button>
              )}
            </div>

            {/* Category tabs */}
            <div ref={catBarRef} className="flex gap-2 overflow-x-auto pb-1 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
              <button
                onClick={() => setSelectedCat('all')}
                className={`flex-shrink-0 px-3 py-1.5 text-xs rounded transition-colors ${selectedCat === 'all' ? 'bg-[#1a3a2a] text-[#c8a84b]' : 'bg-[#faf6ee] text-[#555] border border-[#e8dfc8] hover:border-[#c8a84b]'}`}
              >
                All
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.id)}
                  className={`flex-shrink-0 px-3 py-1.5 text-xs rounded whitespace-nowrap transition-colors ${selectedCat === cat.id ? 'bg-[#1a3a2a] text-[#c8a84b]' : 'bg-[#faf6ee] text-[#555] border border-[#e8dfc8] hover:border-[#c8a84b]'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu content */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="skeleton h-28 rounded" />
              ))}
            </div>
          ) : groupedByCat.length === 0 ? (
            <div className="text-center py-16 text-[#6b6b6b]">
              <p className="text-xl mb-2">No items found</p>
              <button onClick={() => { setSearch(''); setSelectedCat('all'); }} className="text-[#c8a84b] text-sm underline">Clear filters</button>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {groupedByCat.map(group => (
                <div key={group.id} id={`cat-${group.id}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-[#1a3a2a] font-bold text-lg">{group.name}</h2>
                    <div className="flex-1 h-px bg-[#e8dfc8]" />
                    <span className="text-xs text-[#6b6b6b]">{group.items.length} items</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {group.items.map(item => (
                      <MenuCard key={item.id} item={item} cartQty={cartQty(item.id)} onAdd={() => handleAddToCart(item)} onOpen={() => openModal(item)} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mobile sticky cart */}
        <MobileStickyCart />
      </main>
      <Footer />

      {/* Item modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-end sm:items-center justify-center p-4" onClick={() => setModal(null)}>
          <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-xl p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="veg-badge"><div className="veg-dot" /></div>
                <h3 className="text-[#1a3a2a] font-bold text-lg">{modal.name}</h3>
              </div>
              <button onClick={() => setModal(null)} className="text-[#6b6b6b] hover:text-[#1a3a2a] text-xl">✕</button>
            </div>

            {modal.description && (
              <p className="text-[#6b6b6b] text-sm mb-4">{modal.description}</p>
            )}

            <div className="text-[#c8a84b] text-2xl font-bold mb-6">₹{modal.price}</div>

            {!modal.is_available ? (
              <p className="text-red-500 text-sm text-center py-3">Sorry, this item is currently unavailable.</p>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm text-[#6b6b6b]">Quantity</span>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-9 h-9 rounded border border-[#c8a84b] text-[#1a3a2a] flex items-center justify-center hover:bg-[#c8a84b] hover:text-white transition-colors font-bold">−</button>
                    <span className="w-8 text-center font-bold">{qty}</span>
                    <button onClick={() => setQty(q => q + 1)} className="w-9 h-9 rounded border border-[#c8a84b] text-[#1a3a2a] flex items-center justify-center hover:bg-[#c8a84b] hover:text-white transition-colors font-bold">+</button>
                  </div>
                </div>
                <button
                  onClick={handleModalAdd}
                  className="w-full bg-[#1a3a2a] text-[#c8a84b] py-3.5 text-sm tracking-widest font-medium hover:bg-[#122b1e] transition-colors"
                >
                  ADD TO CART — ₹{modal.price * qty}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function MenuCard({ item, cartQty, onAdd, onOpen }: { item: MenuItem; cartQty: number; onAdd: () => void; onOpen: () => void }) {
  return (
    <div
      className={`bg-white border rounded overflow-hidden transition-all cursor-pointer hover:shadow-md hover:border-[#c8a84b55] ${!item.is_available ? 'opacity-60' : ''}`}
      style={{ borderColor: '#e8dfc8' }}
      onClick={onOpen}
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 flex-1 min-w-0">
            <div className="veg-badge flex-shrink-0"><div className="veg-dot" /></div>
            <h3 className="text-[#1a3a2a] text-sm font-medium leading-tight">{item.name}</h3>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-[#c8a84b] font-bold">₹{item.price}</span>
          {!item.is_available ? (
            <span className="text-xs text-red-400 border border-red-200 px-2 py-0.5 rounded">Unavailable</span>
          ) : cartQty > 0 ? (
            <div className="flex items-center gap-1.5 bg-[#1a3a2a] rounded px-2 py-1" onClick={e => e.stopPropagation()}>
              <span className="text-[#c8a84b] text-xs">{cartQty} in cart</span>
            </div>
          ) : (
            <button
              onClick={e => { e.stopPropagation(); onAdd(); }}
              className="bg-[#1a3a2a] text-[#c8a84b] px-3 py-1.5 text-xs tracking-wider hover:bg-[#122b1e] transition-colors rounded"
            >
              ADD
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function MobileStickyCart() {
  const { cartCount, cartTotal } = useApp();
  const [cartOpen, setCartOpen] = useState(false);
  const CartDrawerImport = require('@/components/cart/CartDrawer').default;

  if (cartCount === 0) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-3 bg-transparent">
        <button
          onClick={() => setCartOpen(true)}
          className="w-full bg-[#1a3a2a] text-[#c8a84b] py-4 flex items-center justify-between px-5 shadow-2xl"
        >
          <div className="flex items-center gap-2">
            <span className="bg-[#c8a84b] text-[#1a3a2a] text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">{cartCount}</span>
            <span className="text-sm tracking-wider">VIEW CART</span>
          </div>
          <span className="font-bold">₹{cartTotal}</span>
        </button>
      </div>
      <CartDrawerImport open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
