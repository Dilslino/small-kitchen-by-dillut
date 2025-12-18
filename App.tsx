import React, { useEffect, useState, useRef } from 'react';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { ProductCard } from './components/ProductCard';
import { MusicPlayer } from './components/MusicPlayer'; // Import MusicPlayer
import { PRODUCTS, WHATSAPP_NUMBER } from './constants';
import { ShoppingBag, Instagram } from 'lucide-react';

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.scroll-animate').forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const handleOrder = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen relative bg-[#FDF6F6]">
      {/* Sticky Header / Navbar */}
      <nav className={`
        fixed top-0 left-0 right-0 z-50 px-6 py-4 
        transition-all duration-300
        ${isScrolled ? 'bg-white/70 backdrop-blur-lg border-b border-white/20 shadow-sm' : 'bg-transparent'}
      `}>
        <div className="max-w-md mx-auto flex justify-between items-center">
           <span className={`font-heading font-bold text-lg text-brand-dark transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}>
             Small Kitchen by Dillut
           </span>
           <button
             className="w-10 h-10 rounded-full 
               bg-gradient-to-br from-white/60 to-white/30 
               backdrop-blur-xl border border-white/60 
               shadow-[0_4px_16px_rgba(216,167,177,0.15),inset_0_0_16px_rgba(255,255,255,0.3)]
               flex items-center justify-center active:scale-90 transition-all hover:scale-105"
             onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
           >
             <ShoppingBag size={18} className="text-brand-dark" />
           </button>
        </div>
      </nav>

      <main className="max-w-md mx-auto w-full relative pb-20">
        {/* Hero Section */}
        <Hero />

        {/* Announcement */}
        <div className="mb-12 scroll-animate">
            <Marquee />
        </div>

        {/* Product Showcase */}
        <section id="products" className="px-6 relative z-10">
          <div className="flex flex-col items-center mb-10 text-center scroll-animate">
            <span className="text-brand-secondary font-heading font-bold uppercase tracking-widest text-xs mb-2">Menu Spesial</span>
          </div>
          
          <div className="flex flex-col gap-2">
            {PRODUCTS.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={index}
                onClick={handleOrder}
              />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 px-6 py-10 text-center border-t border-brand-secondary/20 scroll-animate">
          {/* Instagram Link */}
          <a 
            href="https://instagram.com/dillaadrr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-pink-400 via-rose-400 to-orange-300 text-white shadow-lg mb-6 hover:scale-110 hover:rotate-6 transition-all duration-300 animate-float"
          >
            <Instagram size={24} />
          </a>
          
          <div className="mt-14 mb-4">
            <p className="font-sans text-[10px] text-gray-300 uppercase tracking-widest">
              © 2025 Small Kitchen by Dillut.
            </p>
            <span className="text-[9px] text-gray-300 opacity-60 normal-case mt-1 block">Made with 🩷</span>
          </div>
        </footer>
      </main>

      {/* Floating Elements Container */}
      
      {/* 1. Music Player (Bottom Left) */}
      <MusicPlayer />

    </div>
  );
};

export default App;