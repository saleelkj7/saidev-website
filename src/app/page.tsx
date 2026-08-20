import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* HERO */}
        <section className="relative min-h-[90vh] bg-[#0f2419] flex items-center overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #c8a84b 0%, transparent 50%), radial-gradient(circle at 80% 20%, #2e7d32 0%, transparent 40%)`
          }} />
          
          {/* Decorative leaf motif */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:flex items-center justify-center opacity-20">
            <svg viewBox="0 0 400 500" className="w-96 h-96 text-[#c8a84b]" fill="currentColor">
              <ellipse cx="200" cy="250" rx="160" ry="220" transform="rotate(-15 200 250)" opacity="0.3"/>
              <ellipse cx="200" cy="250" rx="100" ry="180" transform="rotate(-15 200 250)" opacity="0.5"/>
              <line x1="200" y1="70" x2="200" y2="430" stroke="currentColor" strokeWidth="3" transform="rotate(-15 200 250)"/>
              {[80,120,160,200,240,280,320,360].map((y, i) => (
                <line key={i} x1={180-i*3} y1={y} x2={220+i*3} y2={y} stroke="currentColor" strokeWidth="1.5" transform={`rotate(-15 200 250)`}/>
              ))}
            </svg>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
            <div className="max-w-2xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 border border-[#c8a84b55] px-4 py-1.5 mb-6">
                <div className="veg-badge"><div className="veg-dot" /></div>
                <span className="text-[#c8a84b] text-xs tracking-[0.2em]">FREE HOME DELIVERY</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-[0.08em] leading-none mb-2">
                TRULY
              </h1>
              <h1 className="text-5xl md:text-7xl font-bold text-[#c8a84b] tracking-[0.08em] leading-none mb-6">
                VEGETARIAN
              </h1>
              
              <p className="text-lg text-[#a8c4a0] leading-relaxed mb-8 max-w-lg">
                Authentic vegetarian flavours, freshly prepared and delivered to your doorstep. South Indian, Punjabi, Chinese and more.
              </p>

              <div className="flex items-center gap-2 text-[#8fbc8f] text-sm mb-10">
                <svg className="w-4 h-4 text-[#c8a84b]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                JB Nagar, Andheri East, Mumbai &nbsp;·&nbsp;
                <a href="tel:02228257979" className="hover:text-[#c8a84b] transition-colors">022-2825 7979</a>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/menu" className="bg-[#c8a84b] text-[#1a3a2a] px-8 py-4 text-sm tracking-widest font-bold hover:bg-[#e0bc5e] transition-colors text-center">
                  ORDER ONLINE
                </Link>
                <Link href="/menu" className="border border-[#c8a84b55] text-[#c8a84b] px-8 py-4 text-sm tracking-widest hover:border-[#c8a84b] hover:bg-[#c8a84b15] transition-colors text-center">
                  VIEW MENU
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section id="about" className="py-20 bg-[#faf6ee]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-[#c8a84b] text-xs tracking-[0.3em] mb-3 uppercase">Our Restaurant</p>
                <h2 className="text-4xl text-[#1a3a2a] font-bold leading-tight mb-6">
                  A Taste You&apos;ll Keep<br />Coming Back For
                </h2>
                <p className="text-[#5a5a5a] leading-relaxed mb-4">
                  A very warm greeting to our wonderful customers. We are excited to inform you that your favourite restaurant has started free home deliveries and takeaways with a new menu tailored to suit your budget.
                </p>
                <p className="text-[#5a5a5a] leading-relaxed mb-8">
                  We look forward to welcoming you in a safe and sanitized environment and having a continued strong relationship with you as always.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {['South Indian', 'Punjabi', 'Chinese', 'Starters', 'Paneer Dishes', 'Dal Speciality', 'Basmati Rice', 'Faloodas', 'Sandwiches', 'Pizza', 'Milk Shakes', 'Fresh Juices'].map(item => (
                    <div key={item} className="flex items-center gap-2 text-sm text-[#5a5a5a]">
                      <div className="w-1 h-1 rounded-full bg-[#c8a84b] flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="bg-[#1a3a2a] rounded-lg p-8 text-center">
                  <div className="text-[#c8a84b] text-5xl mb-3">🌿</div>
                  <h3 className="text-white text-xl font-bold tracking-wider mb-2">100% VEGETARIAN</h3>
                  <p className="text-[#8fbc8f] text-sm">Every item on our menu is purely vegetarian. No exceptions.</p>
                  <div className="mt-6 grid grid-cols-3 gap-4">
                    {[['27+', 'Categories'], ['160+', 'Dishes'], ['Free', 'Delivery']].map(([val, label]) => (
                      <div key={label}>
                        <p className="text-[#c8a84b] text-2xl font-bold">{val}</p>
                        <p className="text-[#8fbc8f] text-xs">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <p className="text-[#c8a84b] text-xs tracking-[0.3em] mb-2 uppercase">Our Menu</p>
              <h2 className="text-3xl text-[#1a3a2a] font-bold">Something for Everyone</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[
                { icon: '🫓', name: 'South Indian', desc: 'Dosas, Idlis & more' },
                { icon: '🍛', name: 'Punjabi', desc: 'Rich & flavourful' },
                { icon: '🍜', name: 'Chinese', desc: 'Fried rice & noodles' },
                { icon: '🧀', name: 'Paneer Dishes', desc: 'Butter masala & more' },
                { icon: '🍕', name: 'Pizza & Sandwich', desc: 'Casual favourites' },
                { icon: '🥤', name: 'Juices & Shakes', desc: 'Fresh drinks' },
                { icon: '🍚', name: 'Basmati Special', desc: 'Biryani & pulav' },
                { icon: '🍮', name: 'Falooda', desc: 'Desserts & sweets' },
              ].map(cat => (
                <Link key={cat.name} href="/menu" className="group bg-[#faf6ee] border border-[#e8dfc8] p-5 hover:border-[#c8a84b] hover:shadow-md transition-all text-center">
                  <div className="text-3xl mb-2">{cat.icon}</div>
                  <p className="text-[#1a3a2a] font-medium text-sm">{cat.name}</p>
                  <p className="text-[#6b6b6b] text-xs mt-0.5">{cat.desc}</p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/menu" className="inline-block bg-[#1a3a2a] text-[#c8a84b] px-8 py-3 text-sm tracking-widest hover:bg-[#122b1e] transition-colors">
                VIEW FULL MENU
              </Link>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-16 bg-[#faf6ee]">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <p className="text-[#c8a84b] text-xs tracking-[0.3em] mb-2 uppercase">How It Works</p>
            <h2 className="text-3xl text-[#1a3a2a] font-bold mb-10">Order in 3 Easy Steps</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { n: '01', icon: '📋', title: 'Browse the Menu', desc: 'Explore our wide selection of vegetarian dishes from South Indian to Chinese.' },
                { n: '02', icon: '🛒', title: 'Add to Cart', desc: 'Pick your favourites, set quantities, and proceed to checkout.' },
                { n: '03', icon: '🏠', title: 'We Deliver Free', desc: 'Pay on delivery with Cash or UPI. We bring it to your door.' },
              ].map(step => (
                <div key={step.n} className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-[#1a3a2a] flex items-center justify-center text-2xl">
                    {step.icon}
                  </div>
                  <h3 className="text-[#1a3a2a] font-bold">{step.title}</h3>
                  <p className="text-[#6b6b6b] text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-16 bg-[#1a3a2a]">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-[#c8a84b] text-3xl font-bold tracking-wide mb-1">SAIDEV</h2>
              <p className="text-[#8fbc8f] text-xs tracking-[0.25em]">TRULY VEGETARIAN</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-[#c8a84b] text-2xl mb-3">📍</div>
                <h4 className="text-[#c8a84b] text-xs tracking-[0.2em] mb-2">LOCATION</h4>
                <p className="text-[#a8c4a0] text-sm">JB Nagar, Andheri East,<br />Mumbai</p>
                <a
                  href="https://www.google.com/search?q=SAIDEV+restaurant+JB+Nagar+Andheri+East+Mumbai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-[#c8a84b] text-xs border border-[#c8a84b55] px-3 py-1.5 hover:bg-[#c8a84b] hover:text-[#1a3a2a] transition-colors"
                >
                  Find on Maps
                </a>
              </div>
              <div>
                <div className="text-[#c8a84b] text-2xl mb-3">📞</div>
                <h4 className="text-[#c8a84b] text-xs tracking-[0.2em] mb-2">PHONE</h4>
                <div className="flex flex-col gap-1 text-sm">
                  {['022-2825 7979', '022-2838 9288', '022-2839 0654', '022-2822 7957'].map(n => (
                    <a key={n} href={`tel:${n.replace(/-|\s/g,'')}`} className="text-[#a8c4a0] hover:text-[#c8a84b] transition-colors">{n}</a>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[#c8a84b] text-2xl mb-3">📸</div>
                <h4 className="text-[#c8a84b] text-xs tracking-[0.2em] mb-2">INSTAGRAM</h4>
                <a
                  href="https://www.instagram.com/saidev.restaurant/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#a8c4a0] hover:text-[#c8a84b] transition-colors text-sm"
                >
                  @saidev.restaurant
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
