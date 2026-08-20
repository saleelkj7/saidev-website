'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  emailVerified: boolean;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  categoryId: string;
}

interface AppContextType {
  user: User | null;
  loadingUser: boolean;
  login: (user: User) => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  toast: (message: string, type?: 'success' | 'error' | 'info') => void;
  toasts: Array<{ id: string; message: string; type: string }>;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: string }>>([]);

  const refreshUser = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
    // Load cart from sessionStorage
    try {
      const saved = sessionStorage.getItem('saidev_cart');
      if (saved) setCart(JSON.parse(saved));
    } catch {}
  }, [refreshUser]);

  useEffect(() => {
    try {
      sessionStorage.setItem('saidev_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const login = (u: User) => setUser(u);

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    setCart([]);
  };

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) {
        return prev.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(c => c.id !== id));

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
    } else {
      setCart(prev => prev.map(c => c.id === id ? { ...c, quantity: qty } : c));
    }
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  };

  return (
    <AppContext.Provider value={{
      user, loadingUser, login, logout, refreshUser,
      cart, addToCart, removeFromCart, updateQuantity, clearCart,
      cartTotal, cartCount, toast, toasts
    }}>
      {children}
      {/* Toast notifications */}
      <div className="fixed top-4 right-4 z-[200] flex flex-col gap-2 max-w-sm">
        {toasts.map(t => (
          <div key={t.id} className={`flex items-center gap-2 px-4 py-3 rounded shadow-lg text-sm font-medium toast-enter ${
            t.type === 'error' ? 'bg-red-600 text-white' :
            t.type === 'info' ? 'bg-blue-600 text-white' :
            'bg-[#1a3a2a] text-[#c8a84b]'
          }`}>
            <span>{t.type === 'error' ? '✕' : t.type === 'info' ? 'ℹ' : '✓'}</span>
            {t.message}
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
