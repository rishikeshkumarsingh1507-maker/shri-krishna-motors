import React from 'react';

export const LuxuryBackground = () => {
  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
    >
      {/* 1. Deep Midnight Base Gradient */}
      <div className="absolute inset-0 bg-[#060913]" />

      {/* 2. Top Showroom Ambient Radial Glow */}
      <div 
        className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1200px] h-[700px] rounded-full opacity-60 blur-[130px] transition-colors duration-1000"
        style={{
          background: 'radial-gradient(ellipse at center, var(--theme-primary-glow) 0%, rgba(30, 58, 138, 0.15) 50%, transparent 80%)'
        }}
      />

      {/* 3. Floating Secondary Ambient Light Orb (Left Side) */}
      <div 
        className="absolute top-[35%] -left-[10%] w-[600px] h-[600px] rounded-full opacity-40 blur-[120px] animate-ambient-drift-1"
        style={{
          background: 'radial-gradient(circle, var(--theme-primary-glow) 0%, rgba(15, 23, 42, 0) 70%)'
        }}
      />

      {/* 4. Floating Tertiary Ambient Light Orb (Right Side) */}
      <div 
        className="absolute top-[65%] -right-[10%] w-[650px] h-[650px] rounded-full opacity-35 blur-[140px] animate-ambient-drift-2"
        style={{
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, var(--theme-primary-glow) 50%, transparent 75%)'
        }}
      />

      {/* 5. Executive Showroom Architectural Micro-Grid */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at 50% 30%, black 40%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, black 40%, transparent 95%)'
        }}
      />

      {/* 6. Subtle Luxury Carbon Fiber Micro-Texture */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* 7. Bottom Edge Grounding Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-[#04060b] via-[#060913]/80 to-transparent" />
    </div>
  );
};
