'use client';
import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';

function ResetForm() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get('token') || '';
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) { setError('Passwords do not match'); return; }
    if (password.length < 8) { setError('Password must be at least 8 characters'); return; }
    setLoading(true); setError('');
    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error); setLoading(false); return; }
    setSuccess(true);
    setTimeout(() => router.push('/login'), 2000);
  }

  if (success) return (
    <div className="text-center">
      <div className="text-4xl mb-4">✅</div>
      <h2 className="text-[#1a3a2a] font-bold text-xl mb-2">Password Reset!</h2>
      <p className="text-[#6b6b6b] text-sm">Redirecting to login...</p>
    </div>
  );

  return (
    <>
      <h2 className="text-[#1a3a2a] font-bold text-xl mb-6 text-center">Set New Password</h2>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 mb-4 rounded">{error}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs text-[#6b6b6b] tracking-wider mb-1.5 uppercase">New Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
            className="w-full border border-[#e8dfc8] px-3 py-3 text-sm focus:outline-none focus:border-[#c8a84b] bg-[#faf6ee]" placeholder="Min 8 characters" />
        </div>
        <div>
          <label className="block text-xs text-[#6b6b6b] tracking-wider mb-1.5 uppercase">Confirm Password</label>
          <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required
            className="w-full border border-[#e8dfc8] px-3 py-3 text-sm focus:outline-none focus:border-[#c8a84b] bg-[#faf6ee]" placeholder="Repeat password" />
        </div>
        <button type="submit" disabled={loading}
          className="w-full bg-[#1a3a2a] text-[#c8a84b] py-3.5 text-sm tracking-widest hover:bg-[#122b1e] transition-colors disabled:opacity-60">
          {loading ? 'RESETTING...' : 'RESET PASSWORD'}
        </button>
      </form>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#faf6ee] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-[#1a3a2a] text-3xl font-bold tracking-wider">SAIDEV</h1>
          </div>
          <div className="bg-white border border-[#e8dfc8] p-8 shadow-sm">
            <Suspense fallback={<p className="text-center text-[#6b6b6b]">Loading...</p>}>
              <ResetForm />
            </Suspense>
          </div>
          <p className="text-center text-sm text-[#6b6b6b] mt-4">
            <Link href="/login" className="text-[#c8a84b] hover:underline">Back to login</Link>
          </p>
        </div>
      </main>
    </>
  );
}
