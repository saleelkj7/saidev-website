'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    setSent(true);
    setLoading(false);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#faf6ee] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-[#1a3a2a] text-3xl font-bold tracking-wider mb-1">SAIDEV</h1>
          </div>
          <div className="bg-white border border-[#e8dfc8] p-8 shadow-sm">
            {sent ? (
              <div className="text-center">
                <div className="text-4xl mb-4">📧</div>
                <h2 className="text-[#1a3a2a] font-bold text-xl mb-3">Check Your Email</h2>
                <p className="text-[#6b6b6b] text-sm mb-6">If an account exists for that email, we&apos;ve sent password reset instructions.</p>
                <Link href="/login" className="block w-full bg-[#1a3a2a] text-[#c8a84b] py-3 text-sm tracking-widest text-center hover:bg-[#122b1e] transition-colors">BACK TO LOGIN</Link>
              </div>
            ) : (
              <>
                <h2 className="text-[#1a3a2a] font-bold text-xl mb-2 text-center">Reset Password</h2>
                <p className="text-[#6b6b6b] text-sm text-center mb-6">Enter your email and we&apos;ll send you a reset link.</p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs text-[#6b6b6b] tracking-wider mb-1.5 uppercase">Email Address</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                      className="w-full border border-[#e8dfc8] px-3 py-3 text-sm focus:outline-none focus:border-[#c8a84b] bg-[#faf6ee]"
                      placeholder="you@example.com" />
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full bg-[#1a3a2a] text-[#c8a84b] py-3.5 text-sm tracking-widest hover:bg-[#122b1e] transition-colors disabled:opacity-60">
                    {loading ? 'SENDING...' : 'SEND RESET LINK'}
                  </button>
                </form>
                <p className="text-center text-sm text-[#6b6b6b] mt-6">
                  <Link href="/login" className="text-[#c8a84b] hover:underline">Back to login</Link>
                </p>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
