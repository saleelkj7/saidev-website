'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import Navbar from '@/components/layout/Navbar';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, toast } = useApp();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      login(data.user);
      toast('Welcome back, ' + data.user.name.split(' ')[0] + '!');
      if (data.user.role === 'ADMIN') {
        router.push('/admin');
      } else {
        const returnTo = new URLSearchParams(window.location.search).get('returnTo');
        router.push(returnTo || '/');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#faf6ee] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-[#1a3a2a] text-3xl font-bold tracking-wider mb-1">SAIDEV</h1>
            <p className="text-[#6b6b6b] text-xs tracking-[0.25em]">TRULY VEGETARIAN</p>
          </div>

          <div className="bg-white border border-[#e8dfc8] p-8 shadow-sm">
            <h2 className="text-[#1a3a2a] font-bold text-xl mb-6 text-center">Sign In</h2>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 mb-5 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs text-[#6b6b6b] tracking-wider mb-1.5 uppercase">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full border border-[#e8dfc8] px-3 py-3 text-sm focus:outline-none focus:border-[#c8a84b] bg-[#faf6ee]"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-xs text-[#6b6b6b] tracking-wider mb-1.5 uppercase">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full border border-[#e8dfc8] px-3 py-3 text-sm focus:outline-none focus:border-[#c8a84b] bg-[#faf6ee]"
                  placeholder="••••••••"
                />
              </div>
              <div className="text-right">
                <Link href="/forgot-password" className="text-xs text-[#c8a84b] hover:underline">Forgot password?</Link>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1a3a2a] text-[#c8a84b] py-3.5 text-sm tracking-widest font-medium hover:bg-[#122b1e] transition-colors disabled:opacity-60"
              >
                {loading ? 'SIGNING IN...' : 'SIGN IN'}
              </button>
            </form>

            <p className="text-center text-sm text-[#6b6b6b] mt-6">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-[#c8a84b] hover:underline font-medium">Register</Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
