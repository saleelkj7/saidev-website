'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import CartDrawer from '@/components/cart/CartDrawer';

export default function Navbar() {
  const { user, logout, cartCount } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#1a3a2a] border-b border-[#c8a84b33]">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-[#c8a84b] font-bold tracking-[0.2em] text-lg leading-none">SAIDEV</span>
              <span className="text-[#8fbc8f] text-[9px] tracking-[0.25em] leading-none">TRULY VEGETARIAN</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/menu">Menu</NavLink>
            <NavLink href="/#about">About</NavLink>
            <NavLink href="/#contact">Contact</NavLink>
            {user && <NavLink href="/my-orders">My Orders</NavLink>}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-1 text-[#c8a84b] hover:text-white transition-colors p-2"
              aria-label="Open cart"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 6M7 13l-2 9m14-9l2 9M9 21h6" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#c8a84b] text-[#1a3a2a] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center cart-pop">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User */}
            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <div className="flex items-center gap-2">
                  <Link href="/account" className="text-[#c8a84b] text-sm hover:text-white transition-colors">{user.name.split(' ')[0]}</Link>
                  <button onClick={handleLogout} className="text-[#8fbc8f] text-sm hover:text-white transition-colors px-2">Logout</button>
                </div>
              ) : (
                <Link href="/login" className="text-[#c8a84b] text-sm border border-[#c8a84b55] px-3 py-1.5 hover:bg-[#c8a84b] hover:text-[#1a3a2a] transition-colors">
                  Login
                </Link>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-[#c8a84b] p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#122b1e] border-t border-[#c8a84b22] py-3">
            <div className="flex flex-col">
              <MobileNavLink href="/" onClick={() => setMenuOpen(false)}>Home</MobileNavLink>
              <MobileNavLink href="/menu" onClick={() => setMenuOpen(false)}>Menu</MobileNavLink>
              <MobileNavLink href="/#about" onClick={() => setMenuOpen(false)}>About</MobileNavLink>
              <MobileNavLink href="/#contact" onClick={() => setMenuOpen(false)}>Contact</MobileNavLink>
              {user && <MobileNavLink href="/my-orders" onClick={() => setMenuOpen(false)}>My Orders</MobileNavLink>}
              {user && <MobileNavLink href="/account" onClick={() => setMenuOpen(false)}>Account</MobileNavLink>}
              {user
                ? <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="text-left px-5 py-3 text-[#8fbc8f] hover:bg-[#1a3a2a] text-sm">Logout</button>
                : <MobileNavLink href="/login" onClick={() => setMenuOpen(false)}>Login / Register</MobileNavLink>
              }
            </div>
          </div>
        )}
      </nav>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-[#d4c89a] hover:text-[#c8a84b] text-sm tracking-wide transition-colors">
      {children}
    </Link>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link href={href} onClick={onClick} className="px-5 py-3 text-[#d4c89a] hover:bg-[#1a3a2a] text-sm border-b border-[#c8a84b11]">
      {children}
    </Link>
  );
}
