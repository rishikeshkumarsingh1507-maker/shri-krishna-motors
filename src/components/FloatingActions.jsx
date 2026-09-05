import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { MessageSquare, Instagram, ArrowUp } from 'lucide-react';

export const FloatingActions = () => {
  const { dealerInfo } = useData();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
      
      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to Top"
          className="pointer-events-auto p-3 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-[var(--theme-primary)] border border-neutral-700/80 shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-110 group animate-fade-in cursor-pointer"
          title="Back to top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

      {/* Instagram Floating Icon */}
      <a
        href={dealerInfo.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow us on Instagram"
        className="pointer-events-auto flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-600 to-purple-600 text-white shadow-xl hover:shadow-pink-500/30 hover:scale-110 transition-all duration-300 group border border-white/20"
        title="Follow us on Instagram @shreekrishnamotors19"
      >
        <Instagram className="w-5 h-5 group-hover:rotate-12 transition-transform" />
      </a>

      {/* WhatsApp Floating Icon */}
      <a
        href={dealerInfo.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Shri Krishna Motors on WhatsApp"
        className="pointer-events-auto relative flex items-center justify-center w-13 h-13 p-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 shadow-2xl shadow-emerald-500/30 hover:scale-110 transition-all duration-300 group border-2 border-emerald-400/50"
        title="Chat on WhatsApp (+91 93042 35814)"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300 border-2 border-neutral-950" />
        </span>
        <MessageSquare className="w-6 h-6 stroke-[2.5] group-hover:scale-110 transition-transform" />
      </a>

    </div>
  );
};
