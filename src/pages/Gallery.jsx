import React, { useState } from 'react';
import { galleryImages } from '../data/initialData';
import { Link } from 'react-router-dom';
import { Images, Eye, X, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const Gallery = () => {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="relative text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full theme-pill-badge text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[var(--theme-primary)]" />
          <span>Customer Delivery Moments</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Happy Deliveries & <span className="text-luxury-gradient">Showroom Moments</span>
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
          Celebrating over 500+ successful car keys handed over across Daltonganj, Garhwa, Latehar, Ranchi, and Jharkhand since 2021.
        </p>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((img) => (
          <div
            key={img.id}
            onClick={() => setActiveImage(img)}
            className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 hover:border-[var(--theme-accent-border)] cursor-pointer transition-all duration-500 shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:-translate-y-1"
          >
            <img
              src={img.url}
              alt={img.title}
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity flex flex-col justify-end p-6">
              <span className="text-[11px] font-mono text-[var(--theme-primary)] font-bold tracking-wider">{img.date}</span>
              <h3 className="text-base font-bold text-white group-hover:text-[var(--theme-primary-light)] transition-colors mt-0.5">{img.title}</h3>
            </div>
            
            {/* Hover Eye Badge */}
            <div className="absolute top-4 right-4 p-2.5 rounded-2xl bg-neutral-950/80 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-md border border-white/10 shadow-lg scale-90 group-hover:scale-100">
              <Eye className="w-4 h-4 text-[var(--theme-primary)]" />
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="premium-card p-10 rounded-3xl text-center space-y-5 max-w-3xl mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-[var(--theme-accent-bg)] text-[var(--theme-primary)] border border-[var(--theme-accent-border)] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-white">Ready to be our next happy customer?</h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto">
            Browse our inspected, certified pre-owned stock in Daltonganj and drive home your dream car today.
          </p>
        </div>
        <div>
          <Link
            to="/stock"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl btn-luxury text-sm shadow-xl"
          >
            <span>Explore Certified Stock</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full rounded-3xl overflow-hidden premium-card border border-white/15 space-y-3 shadow-2xl"
          >
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-neutral-950/80 text-white hover:bg-neutral-800 transition-colors border border-white/10 backdrop-blur-md"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-[16/10] w-full bg-neutral-950">
              <img
                src={activeImage.url}
                alt={activeImage.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-6 bg-neutral-950/90 border-t border-white/10 flex justify-between items-center text-sm">
              <div>
                <p className="font-bold text-white text-base">{activeImage.title}</p>
                <p className="text-xs text-neutral-400 mt-0.5">Shri Krishna Motors • Daltonganj Delivery Showcase</p>
              </div>
              <span className="text-xs text-[var(--theme-primary)] font-mono font-bold px-3 py-1 rounded-full bg-[var(--theme-accent-bg)] border border-[var(--theme-accent-border)]">
                {activeImage.date}
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
