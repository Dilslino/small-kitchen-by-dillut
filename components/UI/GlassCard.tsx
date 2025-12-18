import React, { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hoverEffect = false }) => {
  return (
    <div
      className={`
        relative overflow-hidden 
        backdrop-blur-2xl bg-gradient-to-br from-white/50 to-white/30
        border border-white/70
        shadow-[0_8px_32px_rgba(216,167,177,0.2),inset_0_0_32px_rgba(255,255,255,0.3)]
        rounded-[32px]
        before:absolute before:inset-0 before:rounded-[32px] before:bg-gradient-to-br before:from-white/20 before:to-transparent before:pointer-events-none
        transition-all duration-500 ease-out
        ${hoverEffect ? 'hover:scale-[1.02] hover:bg-white/50 hover:shadow-lg' : ''}
        ${className}
      `}
    >
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};