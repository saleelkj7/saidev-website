'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useApp();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      if (data.user.role !== 'ADMIN') { setError('Access denied'); return; }
      login(data.user);
      router.push('/admin');
    } catch { setError('Login failed'); }
    finally { setLoading(false); }
  }

  return (
    <main className="min-h-screen bg-[#0f2419] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-[#c8a84b] text-3xl font-bold tracking-[0.2em] mb-1">SAIDEV</h1>
          <p className="text-[#8fbc8f] text-xs tracking-[0.3em]">ADMIN PORTAL</p>
        </div>
        <div className="bg-[#1a3a2a] border border-[#c8a84b22] p-8">
          <h2 className="text-[#c8a84b] font-bold text-lg mb-6 text-center tracking-wider">SIGN IN</h2>
          {error && <div className="bg-red-900/30 border border-red-500/30 text-red-400 text-sm px-4 py-3 mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs text-[#8fbc8f] tracking-wider mb-1.5">EMAIL</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                className="w-full bg-[#0f2419] border border-[#c8a84b22] px-3 py-3 text-[#d4c89a] text-sm focus:outline-none focus:border-[#c8a84b] placeholder-[#4a6b4a]"
                placeholder="admin@saidev.in" />
            </div>
            <div>
              <label className="block text-xs text-[#8fbc8f] tracking-wider mb-1.5">PASSWORD</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                className="w-full bg-[#0f2419] border border-[#c8a84b22] px-3 py-3 text-[#d4c89a] text-sm focus:outline-none focus:border-[#c8a84b]"
                placeholder="••••••••" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-[#c8a84b] text-[#1a3a2a] py-3.5 text-sm tracking-widest font-bold hover:bg-[#e0bc5e] transition-colors disabled:opacity-60 mt-2">
              {loading ? 'SIGNING IN...' : 'SIGN IN'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
