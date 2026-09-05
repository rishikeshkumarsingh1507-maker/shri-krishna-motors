import React from 'react';
import { Link } from 'react-router-dom';
import { Car, ArrowLeft, Sparkles } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 text-center relative overflow-hidden">
      {/* Radial glow background */}
      <div className="absolute inset-0 ambient-glow pointer-events-none opacity-40" />

      <div className="premium-card p-10 sm:p-12 rounded-3xl max-w-md w-full space-y-6 relative z-10 shadow-2xl">
        <div className="w-20 h-20 rounded-3xl bg-[var(--theme-accent-bg)] border border-[var(--theme-accent-border)] flex items-center justify-center mx-auto text-[var(--theme-primary)] shadow-lg shadow-[var(--theme-primary-glow)]">
          <Car className="w-10 h-10" />
        </div>
        
        <div className="space-y-2">
          <span className="text-5xl font-black text-luxury-gradient block">404</span>
          <h1 className="text-xl font-bold text-white">Showroom Page Not Found</h1>
          <p className="text-xs text-neutral-400 leading-relaxed">
            The page you are looking for doesn't exist or has moved. Return to the main showroom to browse available cars.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl btn-luxury text-xs shadow-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Showroom</span>
        </Link>
      </div>
    </div>
  );
};
