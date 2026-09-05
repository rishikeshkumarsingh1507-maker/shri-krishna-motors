import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({ 
  variant = 'full', // 'full' | 'icon' | 'badge'
  size = 'md',      // 'sm' | 'md' | 'lg' | 'xl'
  className = '',
  linkTo = '/',
  showTagline = true
}) => {
  // Dimensions map
  const iconSizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-13 h-13',
    xl: 'w-16 h-16'
  };

  const titleSizeMap = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  const LogoGraphic = (
    <div className={`relative flex items-center justify-center shrink-0 ${iconSizeMap[size] || iconSizeMap.md} rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-black p-1 shadow-lg shadow-black/60 border border-amber-500/30 group-hover:border-amber-400/60 transition-all duration-300`}>
      {/* Ambient background glow */}
      <div className="absolute inset-0 rounded-2xl bg-[var(--theme-gradient)] opacity-20 blur-sm group-hover:opacity-40 transition-opacity" />
      
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full relative z-10 drop-shadow-[0_2px_8px_rgba(245,158,11,0.35)]"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="skmGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="35%" stopColor="#F59E0B" />
            <stop offset="70%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>
          <linearGradient id="skmSilverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <linearGradient id="skmShieldBg" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0B0F17" stopOpacity="0.95" />
          </linearGradient>
          <filter id="skmGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Shield Outer Crest */}
        <path 
          d="M50 8 L85 20 C85 55 68 78 50 92 C32 78 15 55 15 20 Z" 
          fill="url(#skmShieldBg)" 
          stroke="url(#skmGoldGrad)" 
          strokeWidth="3"
        />
        
        {/* Inner Shield Accent Line */}
        <path 
          d="M50 14 L80 24.5 C80 53 65 73 50 85 C35 73 20 53 20 24.5 Z" 
          fill="none" 
          stroke="url(#skmGoldGrad)" 
          strokeWidth="1" 
          strokeOpacity="0.5"
          strokeDasharray="2 1"
        />

        {/* Royal Feather / Crown Crest at top */}
        <path 
          d="M45 15 C47 11 50 9 50 9 C50 9 53 11 55 15 C52 17 48 17 45 15 Z" 
          fill="url(#skmGoldGrad)" 
        />
        <circle cx="50" cy="18" r="1.5" fill="#FFFBEB" />

        {/* Aerodynamic Luxury Car Silhouette */}
        <path 
          d="M30 46 C32 40 40 37 50 37 C60 37 68 40 70 46 L75 51 C77 52 77 54 75 56 C71 58 64 59 50 59 C36 59 29 58 25 56 C23 54 23 52 25 51 Z" 
          fill="url(#skmSilverGrad)" 
          fillOpacity="0.3"
          stroke="url(#skmGoldGrad)" 
          strokeWidth="1.8" 
          strokeLinejoin="round"
        />
        {/* Car Windshield & Roof Curve */}
        <path 
          d="M37 45 C41 40 46 39 50 39 C54 39 59 40 63 45" 
          stroke="url(#skmGoldGrad)" 
          strokeWidth="2" 
          strokeLinecap="round" 
        />

        {/* Monogram SKM Bold Typography in Center */}
        <text 
          x="50" 
          y="72" 
          fontFamily="'Outfit', 'Plus Jakarta Sans', sans-serif" 
          fontSize="17" 
          fontWeight="900" 
          letterSpacing="1.5" 
          textAnchor="middle" 
          fill="url(#skmGoldGrad)"
          filter="url(#skmGlow)"
        >
          SKM
        </text>

        {/* Dynamic Speed Wings Flares */}
        <path 
          d="M27 52 L19 46 M73 52 L81 46" 
          stroke="url(#skmGoldGrad)" 
          strokeWidth="2" 
          strokeLinecap="round"
        />
        <path 
          d="M29 57 L21 54 M71 57 L79 54" 
          stroke="url(#skmSilverGrad)" 
          strokeWidth="1.2" 
          strokeLinecap="round"
          strokeOpacity="0.8"
        />

        {/* Bottom Year / Star */}
        <circle cx="50" cy="79" r="1.5" fill="url(#skmGoldGrad)" />
      </svg>
    </div>
  );

  if (variant === 'icon') {
    return linkTo ? (
      <Link to={linkTo} className={`inline-block group ${className}`} aria-label="Shri Krishna Motors Home">
        {LogoGraphic}
      </Link>
    ) : (
      <div className={`inline-block ${className}`}>{LogoGraphic}</div>
    );
  }

  const content = (
    <div className={`flex items-center gap-3 group select-none ${className}`}>
      {LogoGraphic}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className={`font-black tracking-tight text-white group-hover:text-[var(--theme-primary)] transition-colors ${titleSizeMap[size] || titleSizeMap.md}`}>
            Shri Krishna <span className="text-[var(--theme-primary)]">Motors</span>
          </span>
          <span className="hidden xl:inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30">
            Daltonganj
          </span>
        </div>
        {showTagline && (
          <p className="text-[11px] text-neutral-400 font-medium tracking-wide">
            Used Car • Buy • Sell • Exchange
          </p>
        )}
      </div>
    </div>
  );

  return linkTo ? (
    <Link to={linkTo} className="inline-block" aria-label="Shri Krishna Motors Home">
      {content}
    </Link>
  ) : (
    content
  );
};
