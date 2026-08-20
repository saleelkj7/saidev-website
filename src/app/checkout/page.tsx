'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import { useApp } from '@/context/AppContext';

export default function CheckoutPage() {
  const { user, cart, cartTotal, clearCart, toast } = useApp();
  const router = useRouter();
  const [step, setStep] = useState<'auth' | 'verify' | 'address' | 'payment' | 'placing'>('auth');
  const [form, setForm] = useState({ phone: '', flat: '', street: '', landmark: '', city: 'Mumbai', state: 'Maharashtra', pincode: '', notes: '' });
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'UPI'>('CASH');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (!user) { setStep('auth'); return; }
    if (!user.emailVerified) { setStep('verify'); return; }
    setStep('address');
  }, [user]);

  useEffect(() => {
    if (cart.length === 0 && step !== 'placing') router.push('/menu');
  }, [cart, step, router]);

  async function resendVerification() {
    setResending(true);
    await fetch('/api/auth/resend-verification', { method: 'POST' });
    toast('Verification email sent!', 'info');
    setResending(false);
  }

  async function placeOrder() {
    if (!form.phone || !form.flat || !form.street || !form.city || !form.pincode) {
      setError('Please fill all required fields'); return;
    }
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map(i => ({ menuItemId: i.id, quantity: i.quantity })),
          deliveryAddress: form,
          paymentMethod,
          phone: form.phone,
          notes: form.notes,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      clearCart();
      router.push(`/orders/${data.orderId}?new=1`);
    } catch {
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const f = (key: string, val: string) => setForm(p => ({ ...p, [key]: val }));

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#faf6ee] py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-[#1a3a2a] tracking-wider mb-8">CHECKOUT</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">

              {/* Not logged in */}
              {step === 'auth' && (
                <div className="bg-white border border-[#e8dfc8] p-8 text-center">
                  <div className="text-4xl mb-4">🔐</div>
                  <h2 className="text-[#1a3a2a] font-bold text-xl mb-2">Sign in to continue</h2>
                  <p className="text-[#6b6b6b] text-sm mb-6">Create your SAIDEV account to place your order</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/login?returnTo=/checkout" className="flex-1 bg-[#1a3a2a] text-[#c8a84b] py-3 text-sm tracking-widest text-center hover:bg-[#122b1e] transition-colors">SIGN IN</Link>
                    <Link href="/register" className="flex-1 border border-[#1a3a2a] text-[#1a3a2a] py-3 text-sm tracking-widest text-center hover:bg-[#1a3a2a] hover:text-[#c8a84b] transition-colors">REGISTER</Link>
                  </div>
                </div>
              )}

              {/* Email not verified */}
              {step === 'verify' && (
                <div className="bg-white border border-[#e8dfc8] p-8 text-center">
                  <div className="text-4xl mb-4">📧</div>
                  <h2 className="text-[#1a3a2a] font-bold text-xl mb-2">Verify your email</h2>
                  <p className="text-[#6b6b6b] text-sm mb-6">Please verify your email address before placing an order.</p>
                  <button
                    onClick={resendVerification}
                    disabled={resending}
                    className="bg-[#1a3a2a] text-[#c8a84b] px-6 py-3 text-sm tracking-widest hover:bg-[#122b1e] transition-colors disabled:opacity-60"
                  >
                    {resending ? 'SENDING...' : 'RESEND VERIFICATION EMAIL'}
                  </button>
                </div>
              )}

              {/* Delivery address */}
              {(step === 'address' || step === 'payment') && (
                <div className="bg-white border border-[#e8dfc8] p-6 mb-4">
                  <h2 className="text-[#1a3a2a] font-bold text-lg mb-5 pb-3 border-b border-[#e8dfc8]">Delivery Details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs text-[#6b6b6b] tracking-wider mb-1 uppercase">Mobile Number *</label>
                      <input value={form.phone} onChange={e => f('phone', e.target.value)} required placeholder="10-digit mobile number" className="w-full border border-[#e8dfc8] px-3 py-2.5 text-sm focus:outline-none focus:border-[#c8a84b] bg-[#faf6ee]" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs text-[#6b6b6b] tracking-wider mb-1 uppercase">House / Flat / Building *</label>
                      <input value={form.flat} onChange={e => f('flat', e.target.value)} required placeholder="Flat no, Building name" className="w-full border border-[#e8dfc8] px-3 py-2.5 text-sm focus:outline-none focus:border-[#c8a84b] bg-[#faf6ee]" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs text-[#6b6b6b] tracking-wider mb-1 uppercase">Street / Area *</label>
                      <input value={form.street} onChange={e => f('street', e.target.value)} required placeholder="Street, Area, Colony" className="w-full border border-[#e8dfc8] px-3 py-2.5 text-sm focus:outline-none focus:border-[#c8a84b] bg-[#faf6ee]" />
                    </div>
                    <div>
                      <label className="block text-xs text-[#6b6b6b] tracking-wider mb-1 uppercase">Landmark</label>
                      <input value={form.landmark} onChange={e => f('landmark', e.target.value)} placeholder="Near..." className="w-full border border-[#e8dfc8] px-3 py-2.5 text-sm focus:outline-none focus:border-[#c8a84b] bg-[#faf6ee]" />
                    </div>
                    <div>
                      <label className="block text-xs text-[#6b6b6b] tracking-wider mb-1 uppercase">PIN Code *</label>
                      <input value={form.pincode} onChange={e => f('pincode', e.target.value)} required placeholder="400001" className="w-full border border-[#e8dfc8] px-3 py-2.5 text-sm focus:outline-none focus:border-[#c8a84b] bg-[#faf6ee]" />
                    </div>
                    <div>
                      <label className="block text-xs text-[#6b6b6b] tracking-wider mb-1 uppercase">City</label>
                      <input value={form.city} onChange={e => f('city', e.target.value)} className="w-full border border-[#e8dfc8] px-3 py-2.5 text-sm focus:outline-none focus:border-[#c8a84b] bg-[#faf6ee]" />
                    </div>
                    <div>
                      <label className="block text-xs text-[#6b6b6b] tracking-wider mb-1 uppercase">State</label>
                      <input value={form.state} onChange={e => f('state', e.target.value)} className="w-full border border-[#e8dfc8] px-3 py-2.5 text-sm focus:outline-none focus:border-[#c8a84b] bg-[#faf6ee]" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs text-[#6b6b6b] tracking-wider mb-1 uppercase">Delivery Instructions</label>
                      <textarea value={form.notes} onChange={e => f('notes', e.target.value)} rows={2} placeholder="Any special instructions..." className="w-full border border-[#e8dfc8] px-3 py-2.5 text-sm focus:outline-none focus:border-[#c8a84b] bg-[#faf6ee] resize-none" />
                    </div>
                  </div>
                </div>
              )}

              {/* Payment */}
              {(step === 'address' || step === 'payment') && (
                <div className="bg-white border border-[#e8dfc8] p-6">
                  <h2 className="text-[#1a3a2a] font-bold text-lg mb-5 pb-3 border-b border-[#e8dfc8]">Payment Method</h2>
                  <p className="text-[#6b6b6b] text-xs mb-4">Payment is collected at the time of delivery.</p>
                  <div className="flex flex-col gap-3">
                    {[
                      { value: 'CASH', icon: '💵', label: 'Cash on Delivery', desc: 'Pay with cash when your order arrives' },
                      { value: 'UPI', icon: '📱', label: 'UPI on Delivery', desc: 'Pay via UPI (GPay, PhonePe, Paytm) on delivery' },
                    ].map(opt => (
                      <label key={opt.value} className={`flex items-center gap-4 p-4 border rounded cursor-pointer transition-colors ${paymentMethod === opt.value ? 'border-[#1a3a2a] bg-[#1a3a2a08]' : 'border-[#e8dfc8] hover:border-[#c8a84b55]'}`}>
                        <input type="radio" name="payment" value={opt.value} checked={paymentMethod === opt.value} onChange={() => setPaymentMethod(opt.value as 'CASH' | 'UPI')} className="accent-[#1a3a2a]" />
                        <span className="text-xl">{opt.icon}</span>
                        <div>
                          <p className="font-medium text-[#1a3a2a] text-sm">{opt.label}</p>
                          <p className="text-[#6b6b6b] text-xs">{opt.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>

                  {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 mt-4 rounded">{error}</div>}

                  <button
                    onClick={placeOrder}
                    disabled={loading}
                    className="w-full mt-6 bg-[#1a3a2a] text-[#c8a84b] py-4 text-sm tracking-widest font-medium hover:bg-[#122b1e] transition-colors disabled:opacity-60"
                  >
                    {loading ? 'PLACING ORDER...' : `PLACE ORDER — ₹${cartTotal}`}
                  </button>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-[#e8dfc8] p-5 sticky top-24">
                <h3 className="text-[#1a3a2a] font-bold mb-4 pb-3 border-b border-[#e8dfc8]">Order Summary</h3>
                <div className="flex flex-col gap-2 mb-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-[#555] truncate pr-2">{item.name} × {item.quantity}</span>
                      <span className="text-[#1a3a2a] font-medium flex-shrink-0">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[#e8dfc8] pt-3 flex flex-col gap-1.5">
                  <div className="flex justify-between text-sm text-[#6b6b6b]">
                    <span>Subtotal</span><span>₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Delivery</span><span>FREE</span>
                  </div>
                  <div className="flex justify-between font-bold text-[#1a3a2a] text-lg mt-1 pt-2 border-t border-[#e8dfc8]">
                    <span>Total</span><span>₹{cartTotal}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
