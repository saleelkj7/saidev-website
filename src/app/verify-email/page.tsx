'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import { Suspense } from 'react';

function VerifyContent() {
  const params = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const token = params.get('token');
    if (!token) { setStatus('error'); setMsg('Invalid verification link'); return; }
    fetch('/api/auth/verify-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    }).then(r => r.json()).then(data => {
      if (data.error) { setStatus('error'); setMsg(data.error); }
      else { setStatus('success'); }
    }).catch(() => { setStatus('error'); setMsg('Verification failed'); });
  }, [params]);

  return (
    <div className="max-w-md w-full bg-white border border-[#e8dfc8] p-8 text-center shadow-sm">
      {status === 'loading' && (
        <>
          <div className="w-12 h-12 border-4 border-[#c8a84b] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#6b6b6b]">Verifying your email...</p>
        </>
      )}
      {status === 'success' && (
        <>
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-[#1a3a2a] font-bold text-xl mb-2">Email Verified!</h2>
          <p className="text-[#6b6b6b] text-sm mb-6">Your email has been verified. You can now place orders.</p>
          <Link href="/login" className="block w-full bg-[#1a3a2a] text-[#c8a84b] py-3 text-sm tracking-widest hover:bg-[#122b1e] transition-colors">
            SIGN IN
          </Link>
        </>
      )}
      {status === 'error' && (
        <>
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-[#1a3a2a] font-bold text-xl mb-2">Verification Failed</h2>
          <p className="text-[#6b6b6b] text-sm mb-6">{msg}</p>
          <Link href="/login" className="block w-full bg-[#1a3a2a] text-[#c8a84b] py-3 text-sm tracking-widest hover:bg-[#122b1e] transition-colors">
            BACK TO LOGIN
          </Link>
        </>
      )}
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#faf6ee] flex items-center justify-center px-4">
        <Suspense fallback={<div className="text-[#6b6b6b]">Loading...</div>}>
          <VerifyContent />
        </Suspense>
      </main>
    </>
  );
}
