'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loadingUser, logout } = useApp();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loadingUser && (!user || user.role !== 'ADMIN')) {
      router.push('/admin/login');
    }
  }, [user, loadingUser, router]);

  if (loadingUser || !user || user.role !== 'ADMIN') {
    return <div className="min-h-screen bg-[#0f2419] flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-[#c8a84b] border-t-transparent rounded-full animate-spin" />
    </div>;
  }

  const nav = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/orders', label: 'Orders', icon: '📋' },
    { href: '/admin/menu', label: 'Menu', icon: '🍽' },
    { href: '/admin/customers', label: 'Customers', icon: '👥' },
  ];

  const handleLogout = async () => {
    await logout();
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#0a1f10] flex">
      {/* Sidebar */}
      <aside className="w-56 bg-[#1a3a2a] flex flex-col border-r border-[#c8a84b22] fixed top-0 left-0 h-full z-10">
        <div className="p-5 border-b border-[#c8a84b22]">
          <h1 className="text-[#c8a84b] font-bold tracking-[0.2em] text-lg">SAIDEV</h1>
          <p className="text-[#8fbc8f] text-[9px] tracking-[0.2em]">ADMIN PORTAL</p>
        </div>
        <nav className="flex-1 p-3 flex flex-col gap-1">
          {nav.map(n => (
            <Link key={n.href} href={n.href}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded transition-colors ${pathname === n.href ? 'bg-[#c8a84b] text-[#1a3a2a] font-medium' : 'text-[#d4c89a] hover:bg-[#c8a84b15]'}`}>
              <span>{n.icon}</span>{n.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-[#c8a84b22]">
          <p className="text-[#8fbc8f] text-xs px-3 mb-2">{user.name}</p>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-[#8fbc8f] hover:text-[#c8a84b] hover:bg-[#c8a84b15] rounded transition-colors">
            <span>🚪</span>Logout
          </button>
          <Link href="/" target="_blank" className="flex items-center gap-3 px-3 py-2.5 text-sm text-[#8fbc8f] hover:text-[#c8a84b] hover:bg-[#c8a84b15] rounded transition-colors">
            <span>🌐</span>View Site
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-56 flex-1 min-h-screen text-[#d4c89a]">
        {children}
      </main>
    </div>
  );
}
