import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { 
  Fuel, 
  Gauge, 
  Gavel, 
  ArrowRight, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { LiveBiddingModal } from './LiveBiddingModal';

export const CarCard = ({ car }) => {
  const { formatCurrency, formatKM } = useData();
  const [biddingOpen, setBiddingOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const photos = car.photos && car.photos.length > 0 
    ? car.photos 
    : ['/images/cars/tata-nexon/nexon-1.jpg'];

  const isSold = car.status === 'Sold';
  const isReserved = car.status === 'Reserved';
  const hasAuction = car.bid_enabled && !isSold;

  // Auto-cycle slideshow synchronized across cards
  useEffect(() => {
    if (photos.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % photos.length);
    }, 3500); // 3.5s smooth transition interval

    return () => clearInterval(interval);
  }, [photos.length, isHovered]);

  const handlePrevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleNextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % photos.length);
  };

  return (
    <>
      <div 
        className="group relative rounded-3xl overflow-hidden flex flex-col border border-slate-800/80 hover:border-[var(--theme-accent-border)] transition-all duration-300 shadow-2xl hover:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.8),0_0_35px_-5px_var(--theme-primary-glow)] hover:-translate-y-1.5"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
        {/* Synchronized Image Slideshow Container (Cinematic Dark Showcase) */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-950">
          
          {/* Photos transition */}
          {photos.map((photo, idx) => (
            <img
              key={idx}
              src={photo}
              alt={`${car.title} - photo ${idx + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105 ${
                idx === currentImageIndex 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-102 pointer-events-none'
              }`}
              loading="lazy"
            />
          ))}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080b11]/90 via-transparent to-black/40 pointer-events-none" />
          
          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
            {/* Status Badge */}
            <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wider shadow-lg uppercase backdrop-blur-md border ${
              isSold ? 'bg-red-500/80 text-white border-red-400/40' :
              isReserved ? 'bg-yellow-500/90 text-neutral-950 border-yellow-400/50' :
              'bg-emerald-500/90 text-neutral-950 border-emerald-400/50'
            }`}>
              {car.status}
            </span>

            {/* Live Auction Indicator */}
            {hasAuction && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black btn-luxury text-neutral-950 shadow-xl border border-white/20 backdrop-blur-md animate-pulse">
                <span className="w-2 h-2 rounded-full bg-neutral-950 animate-ping" />
                <span>Live Bidding</span>
              </span>
            )}
          </div>

          {/* Manual Arrow Controls (Visible on hover if multiple images) */}
          {photos.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <button
                onClick={handlePrevImage}
                aria-label="Previous photo"
                className="p-1.5 rounded-full bg-neutral-950/70 hover:bg-neutral-950 text-white border border-neutral-700/60 shadow-lg backdrop-blur-md transition-transform active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextImage}
                aria-label="Next photo"
                className="p-1.5 rounded-full bg-neutral-950/70 hover:bg-neutral-950 text-white border border-neutral-700/60 shadow-lg backdrop-blur-md transition-transform active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Image Pagination Dots */}
          {photos.length > 1 && (
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 z-10 px-2 py-1 rounded-full bg-neutral-950/75 backdrop-blur-md border border-white/10">
              {photos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImageIndex(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentImageIndex 
                      ? 'w-4 bg-[var(--theme-primary)]' 
                      : 'w-1.5 bg-neutral-500 hover:bg-neutral-300'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}

          {/* Accidental Verified Badge */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-950/80 backdrop-blur-md text-[11px] font-semibold text-neutral-200 border border-white/10 z-10">
            <ShieldCheck className="w-3.5 h-3.5 text-[var(--theme-primary)]" />
            <span>{car.accidental || 'Non-Accidental Certified'}</span>
          </div>
        </div>

        {/* Content Body: High-Contrast Luminous Light Luxury Panel */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#f1f5f9] text-slate-900 border-t border-slate-200">
          
          <div>
            {/* Title & Year */}
            <div className="flex items-start justify-between gap-2">
              <Link to={`/car/${car.id}`} className="flex-1">
                <h3 className="text-base font-black text-slate-900 group-hover:text-[var(--theme-primary-hover)] transition-colors line-clamp-1">
                  {car.title}
                </h3>
              </Link>
              <span className="shrink-0 px-2.5 py-0.5 rounded-md bg-slate-900 text-white text-xs font-bold font-mono shadow-sm">
                {car.model_year}
              </span>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-200/80 text-xs text-slate-700">
              <div className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-slate-200 shadow-xs">
                <Fuel className="w-3.5 h-3.5 text-[var(--theme-primary)] shrink-0 stroke-[2.5]" />
                <span className="truncate font-bold text-slate-800">{car.fuel}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-slate-200 shadow-xs">
                <Gauge className="w-3.5 h-3.5 text-[var(--theme-primary)] shrink-0 stroke-[2.5]" />
                <span className="truncate font-bold text-slate-800">{formatKM(car.range_driven)}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[var(--theme-primary)] font-black shrink-0 text-[11px]">Tx:</span>
                <span className="truncate font-bold text-slate-800">{car.transmission}</span>
              </div>
            </div>
          </div>

          {/* Pricing & CTA Section */}
          <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between gap-3">
            <div>
              {hasAuction ? (
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-extrabold">
                    Current Top Bid
                  </p>
                  <p className="text-lg font-black text-slate-950">
                    {formatCurrency(car.current_bid || car.starting_bid || car.price)}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-extrabold">
                    Offer Price
                  </p>
                  <p className="text-lg font-black text-slate-950">
                    {formatCurrency(car.price)}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {hasAuction && (
                <button
                  onClick={() => setBiddingOpen(true)}
                  className="px-3.5 py-2 rounded-xl btn-luxury text-neutral-950 text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Gavel className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Bid</span>
                </button>
              )}
              <Link
                to={`/car/${car.id}`}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center gap-1 shadow-md hover:shadow-lg"
              >
                <span>Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Live Bidding Modal */}
      {biddingOpen && (
        <LiveBiddingModal car={car} onClose={() => setBiddingOpen(false)} />
      )}
    </>
  );
};

