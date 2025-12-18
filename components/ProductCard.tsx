import React from 'react';
import { Product } from '../types';
import { GlassCard } from './UI/GlassCard';
import { ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick: (message: string) => void;
  index: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, index }) => {
  return (
    <div 
      className="w-full mb-6 transform transition-all duration-700 hover:scale-[1.02] scroll-animate"
      style={{ 
        transitionDelay: `${index * 0.1}s`
      }}
    >
      <GlassCard hoverEffect={true} className="p-2 cursor-pointer group">
        <div 
          onClick={() => onClick(product.whatsappMessage)}
          className="flex flex-col h-full"
        >
          {/* Visual Area */}
          <div className={`
            h-48 w-full rounded-[24px] 
            bg-gradient-to-br ${product.gradient}
            flex items-center justify-center
            relative overflow-hidden
          `}>
            {/* Abstract Shapes with Enhanced Hover Animation */}            
            <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-white/30 rounded-full blur-2xl transition-all duration-1000 ease-in-out group-hover:scale-125 group-hover:rotate-45" />
            <div className="absolute bottom-[-10%] left-[-10%] w-24 h-24 bg-brand-primary/40 rounded-full blur-xl transition-all duration-1000 ease-in-out group-hover:translate-x-6 group-hover:-translate-y-6" />
            
            {/* Badge */}
            <div className="absolute top-4 left-4
              bg-gradient-to-br from-white/70 to-white/40 
              backdrop-blur-xl border border-white/60 
              shadow-[0_4px_16px_rgba(216,167,177,0.15),inset_0_0_12px_rgba(255,255,255,0.4)]
              px-3 py-1.5 rounded-full animate-float flex items-center justify-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-dark">
                {product.priceTag}
              </span>
            </div>

             {/* Action Icon */}
             <div className="absolute bottom-4 right-4 
               bg-gradient-to-br from-white/80 to-white/50 
               backdrop-blur-xl border border-white/60 
               shadow-[0_4px_16px_rgba(216,167,177,0.2),inset_0_0_12px_rgba(255,255,255,0.4)]
               rounded-full p-3 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-12">
               <ArrowUpRight size={20} className="text-brand-dark" />
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
      </GlassCard>
    </div>
  );
};