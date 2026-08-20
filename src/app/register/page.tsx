'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirm) { setError('Passwords do not match'); return; }
    if (form.password.length < 8) { setError('Password must be at least 8 characters'); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      setSuccess(form.email);
    } catch {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#faf6ee] flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white border border-[#e8dfc8] p-8 text-center shadow-sm">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-[#1a3a2a] font-bold text-xl mb-2">Check Your Email</h2>
            <p className="text-[#6b6b6b] text-sm mb-2">We&apos;ve sent a verification email to:</p>
            <p className="text-[#1a3a2a] font-medium mb-4">{success}</p>
            <p className="text-[#6b6b6b] text-sm mb-6">Please verify your email address before placing your order.</p>
            <button onClick={() => router.push('/login')} className="w-full bg-[#1a3a2a] text-[#c8a84b] py-3 text-sm tracking-widest hover:bg-[#122b1e] transition-colors">
              GO TO LOGIN
            </button>
          </div>
        </main>
      </>
    );
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
            <h2 className="text-[#1a3a2a] font-bold text-xl mb-6 text-center">Create Account</h2>
            {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 mb-5 rounded">{error}</div>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {[
                { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Your full name' },
                { label: 'Email Address', key: 'email', type: 'email', placeholder: 'you@example.com' },
                { label: 'Password', key: 'password', type: 'password', placeholder: 'Min 8 characters' },
                { label: 'Confirm Password', key: 'confirm', type: 'password', placeholder: 'Repeat password' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs text-[#6b6b6b] tracking-wider mb-1.5 uppercase">{f.label}</label>
                  <input
                    type={f.type}
                    value={form[f.key as keyof typeof form]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    required
                    placeholder={f.placeholder}
                    className="w-full border border-[#e8dfc8] px-3 py-3 text-sm focus:outline-none focus:border-[#c8a84b] bg-[#faf6ee]"
                  />
                </div>
              ))}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1a3a2a] text-[#c8a84b] py-3.5 text-sm tracking-widest font-medium hover:bg-[#122b1e] transition-colors disabled:opacity-60 mt-2"
              >
                {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
              </button>
            </form>
            <p className="text-center text-sm text-[#6b6b6b] mt-6">
              Already have an account?{' '}
              <Link href="/login" className="text-[#c8a84b] hover:underline font-medium">Sign In</Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
