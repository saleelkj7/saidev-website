import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1a3a2a] text-[#d4c89a] mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-[#c8a84b] text-xl font-bold tracking-[0.2em] mb-1">SAIDEV</h3>
            <p className="text-[#8fbc8f] text-xs tracking-[0.25em] mb-4">TRULY VEGETARIAN</p>
            <p className="text-sm text-[#a8b8a0] leading-relaxed max-w-xs">
              A warm vegetarian dining experience at JB Nagar, Andheri East, Mumbai. Free home deliveries and takeaways.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#c8a84b] text-xs tracking-[0.2em] mb-4 uppercase">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[['/', 'Home'], ['/menu', 'Menu'], ['/my-orders', 'My Orders'], ['/#contact', 'Contact']].map(([href, label]) => (
                <Link key={href} href={href} className="text-sm text-[#a8b8a0] hover:text-[#c8a84b] transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#c8a84b] text-xs tracking-[0.2em] mb-4 uppercase">Contact</h4>
            <div className="flex flex-col gap-2 text-sm text-[#a8b8a0]">
              <p>JB Nagar, Andheri East,</p>
              <p>Mumbai</p>
              <div className="flex flex-col gap-1 mt-2">
                <a href="tel:02228257979" className="hover:text-[#c8a84b] transition-colors">022-2825 7979</a>
                <a href="tel:02228389288" className="hover:text-[#c8a84b] transition-colors">022-2838 9288</a>
              </div>
              <a
                href="https://www.instagram.com/saidev.restaurant/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 mt-3 text-[#c8a84b] hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                @saidev.restaurant
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#c8a84b22] mt-10 pt-6 text-center">
          <p className="text-xs text-[#6b8f6b]">© SAIDEV. All Rights Reserved. JB Nagar, Andheri East, Mumbai.</p>
          <p className="text-xs text-[#4a6b4a] mt-1">We Accept Credit & Debit Cards, PayTM, Visa, MasterCard and other payment methods.</p>
        </div>
      </div>
    </footer>
  );
}
