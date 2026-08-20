'use client';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useApp();
  const router = useRouter();

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-[80]" onClick={onClose} />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-[#faf6ee] z-[90] shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-[#1a3a2a]">
          <div>
            <h2 className="text-[#c8a84b] font-bold tracking-widest text-sm">YOUR CART</h2>
            <p className="text-[#8fbc8f] text-xs mt-0.5">{cart.length} item{cart.length !== 1 ? 's' : ''}</p>
          </div>
          <button onClick={onClose} className="text-[#8fbc8f] hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-[#e8dfc8] flex items-center justify-center">
                <svg className="w-8 h-8 text-[#c8a84b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 6M7 13l-2 9m14-9l2 9" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-[#1a3a2a]">Your cart is empty</p>
                <p className="text-sm text-[#6b6b6b] mt-1">Explore our delicious vegetarian menu</p>
              </div>
              <button
                onClick={() => { onClose(); router.push('/menu'); }}
                className="bg-[#1a3a2a] text-[#c8a84b] px-6 py-2.5 text-sm tracking-widest hover:bg-[#122b1e] transition-colors"
              >
                VIEW MENU
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-3 bg-white p-3 rounded border border-[#e8dfc8]">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <div className="veg-badge"><div className="veg-dot" /></div>
                      <p className="text-sm font-medium text-[#1a3a2a] truncate">{item.name}</p>
                    </div>
                    <p className="text-sm text-[#c8a84b] font-medium">₹{item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded border border-[#c8a84b] text-[#1a3a2a] flex items-center justify-center hover:bg-[#c8a84b] hover:text-white transition-colors text-sm font-bold"
                    >−</button>
                    <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded border border-[#c8a84b] text-[#1a3a2a] flex items-center justify-center hover:bg-[#c8a84b] hover:text-white transition-colors text-sm font-bold"
                    >+</button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-600 ml-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}

              {/* Free delivery badge */}
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded p-2.5 text-green-700 text-sm">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                FREE HOME DELIVERY
              </div>

              <button onClick={clearCart} className="text-xs text-[#6b6b6b] hover:text-red-500 text-center mt-1 transition-colors">
                Clear cart
              </button>
            </div>
          )}
        </div>

        {/* Footer with total and CTA */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-[#e8dfc8] bg-white">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-[#6b6b6b]">Subtotal</span>
              <span className="text-sm font-medium">₹{cartTotal}</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-[#6b6b6b]">Delivery</span>
              <span className="text-sm text-green-600 font-medium">FREE</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-[#1a3a2a]">Total</span>
              <span className="font-bold text-[#1a3a2a] text-lg">₹{cartTotal}</span>
            </div>
            <button
              onClick={() => { onClose(); router.push('/checkout'); }}
              className="w-full bg-[#1a3a2a] text-[#c8a84b] py-3.5 text-sm tracking-widest font-medium hover:bg-[#122b1e] transition-colors"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        )}
      </div>
    </>
  );
}
