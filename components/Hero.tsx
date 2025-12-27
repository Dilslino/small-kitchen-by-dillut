import React from 'react';
import { BRAND_NAME } from '../constants';
import { ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Background Mesh Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-brand-primary rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-72 h-72 bg-brand-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[20%] left-[20%] w-72 h-72 bg-brand-accent rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Cute Dots */}
        <div className="absolute top-[15%] left-[10%] w-4 h-4 bg-pink-300 rounded-full animate-float opacity-60" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-[25%] right-[15%] w-3 h-3 bg-rose-300 rounded-full animate-float opacity-50" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-[35%] left-[15%] w-5 h-5 bg-pink-200 rounded-full animate-float opacity-40" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[30%] left-[25%] w-3 h-3 bg-amber-200 rounded-full animate-float opacity-50" style={{ animationDelay: '0.3s' }}></div>
        <div className="absolute top-[50%] right-[20%] w-2 h-2 bg-rose-200 rounded-full animate-float opacity-60" style={{ animationDelay: '1.3s' }}></div>
        <div className="absolute bottom-[25%] right-[30%] w-4 h-4 bg-pink-100 rounded-full animate-float opacity-50" style={{ animationDelay: '2.3s' }}></div>
      </div>

      <div className="relative z-10 max-w-md w-full">
        {/* Logo Video */}
        <div className="mb-8 flex justify-center animate-pop-in" style={{ animationDelay: '0.2s', opacity: 0 }}>
            <div className="w-32 h-32 rounded-2xl 
              bg-gradient-to-br from-white/60 to-white/30 
              backdrop-blur-2xl border border-white/60 
              shadow-[0_8px_32px_rgba(216,167,177,0.25),inset_0_0_32px_rgba(255,255,255,0.4)]
              flex items-center justify-center transform hover:rotate-6 transition-transform duration-300 animate-wiggle overflow-hidden">
                <video 
                  src="/logo.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover mix-blend-screen"
                />
            </div>
        </div>

        {/* Brand Typography */}
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-brand-dark leading-[1.2] tracking-tight mb-4 animate-slide-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
          <span className="inline-block hover:animate-wiggle">{BRAND_NAME}</span>
        </h1>

        {/* CTA Button */}
        <button 
          onClick={() => {
            document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group relative inline-flex items-center justify-center px-8 py-4 bg-brand-dark text-white rounded-full font-heading font-bold tracking-wide transition-all active:scale-95 shadow-xl hover:shadow-2xl hover:scale-105 overflow-hidden animate-pop-in mt-10"
          style={{ animationDelay: '0.6s', opacity: 0 }}
        >
          <span className="relative z-10">Pesan Sekarang</span>
          <div className="absolute inset-0 bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 animate-bounce text-brand-secondary/50 animate-slide-up" style={{ animationDelay: '0.8s', opacity: 0 }}>
        <ChevronDown size={32} />
      </div>
    </section>
  );
};