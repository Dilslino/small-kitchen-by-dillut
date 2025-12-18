import React from 'react';
import { MARQUEE_TEXT } from '../constants';

export const Marquee: React.FC = () => {
  return (
    <div className="w-full py-4 overflow-hidden relative z-20">
       <div className="absolute inset-0 
         bg-gradient-to-r from-pink-100/60 via-rose-100/50 to-pink-100/60
         backdrop-blur-xl border-y border-pink-200/40 
         shadow-[inset_0_0_20px_rgba(216,167,177,0.2)]
         transform skew-y-[-2deg] scale-110 origin-center"></div>
       <div className="relative flex whitespace-nowrap overflow-hidden py-1 mask-linear-gradient">
        <div className="animate-marquee flex min-w-full shrink-0 items-center justify-around">
          <span className="text-sm font-heading font-bold tracking-widest text-brand-secondary uppercase px-4">
            {MARQUEE_TEXT}
          </span>
          <span className="text-sm font-heading font-bold tracking-widest text-brand-secondary uppercase px-4">
            {MARQUEE_TEXT}
          </span>
        </div>
        <div className="animate-marquee flex min-w-full shrink-0 items-center justify-around">
          <span className="text-sm font-heading font-bold tracking-widest text-brand-secondary uppercase px-4">
            {MARQUEE_TEXT}
          </span>
          <span className="text-sm font-heading font-bold tracking-widest text-brand-secondary uppercase px-4">
            {MARQUEE_TEXT}
          </span>
        </div>
      </div>
    </div>
  );
};