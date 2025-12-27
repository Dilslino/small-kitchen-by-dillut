import React from 'react';
import { Product } from '../types';
import { GlassCard } from './UI/GlassCard';
import { ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  index: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, index }) => {
  return (
    <div 
      className="w-full mb-6 transform transition-all duration-700 scroll-animate relative"
      style={{ 
        transitionDelay: `${index * 0.1}s`
      }}
    >
      <GlassCard hoverEffect={false} className="p-2 cursor-not-allowed relative overflow-hidden">
        {/* Blurred Content */}
        <div 
          className="flex flex-col h-full filter blur-[6px] opacity-60 pointer-events-none select-none transition-all duration-500"
        >
          {/* Visual Area */}
          <div className={`
            h-48 w-full rounded-[24px] 
            bg-gradient-to-br ${product.gradient}
            flex items-center justify-center
            relative overflow-hidden
          `}>
            {/* Abstract Shapes */}            
            <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-white/30 rounded-full blur-2xl" />
            <div className="absolute bottom-[-10%] left-[-10%] w-24 h-24 bg-brand-primary/40 rounded-full blur-xl" />
            
            {/* Badge */}
            <div className="absolute top-4 left-4
              bg-gradient-to-br from-white/70 to-white/40 
              backdrop-blur-xl border border-white/60 
              shadow-[0_4px_16px_rgba(216,167,177,0.15),inset_0_0_12px_rgba(255,255,255,0.4)]
              px-3 py-1.5 rounded-full flex items-center justify-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-dark">
                {product.priceTag}
              </span>
            </div>
          </div>

          {/* Text Content */}
          <div className="p-4 pt-5">
            <h3 className="font-heading text-xl font-bold text-brand-dark mb-1">
              {product.title}
            </h3>
            <p className="font-sans text-sm text-gray-500 leading-relaxed mb-2">
              {product.subtitle}
            </p>
            <span className="font-heading font-bold text-lg text-pink-500">
              {product.price}
            </span>
          </div>
        </div>

        {/* Aesthetic Overlay */}
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <div className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.1)] transform -rotate-3 border border-white/60 animate-float">
            <span className="font-heading font-bold italic text-2xl text-brand-dark tracking-[0.2em]">
              COMING SOON
            </span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};