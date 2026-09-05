import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { LiveBiddingModal } from '../components/LiveBiddingModal';
import { EMICalculator } from '../components/EMICalculator';
import { 
  ArrowLeft, 
  Fuel, 
  Gauge, 
  Calendar, 
  ShieldCheck, 
  Gavel, 
  MessageSquare, 
  Phone, 
  Share2, 
  CheckCircle2, 
  Car, 
  Video,
  Award,
  FileText,
  Clock,
  Sparkles
} from 'lucide-react';

export const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cars, bids, dealerInfo, formatCurrency, formatKM, showToast } = useData();

  const car = cars.find(c => c.id === id);

  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState(0);
  const [biddingOpen, setBiddingOpen] = useState(false);
  const [testDriveModalOpen, setTestDriveModalOpen] = useState(false);
  const [testDriveName, setTestDriveName] = useState('');
  const [testDrivePhone, setTestDrivePhone] = useState('');
  const [testDriveDate, setTestDriveDate] = useState('');

  if (!car) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <Car className="w-16 h-16 text-neutral-600 mx-auto" />
        <h2 className="text-2xl font-bold text-white">Car Not Found</h2>
        <p className="text-sm text-neutral-400">The vehicle you are looking for might have been sold or removed.</p>
        <Link to="/stock" className="inline-flex px-5 py-2.5 rounded-xl btn-luxury text-neutral-950 font-bold text-sm">
          Browse Available Stock
        </Link>
      </div>
    );
  }

  const carBids = bids.filter(b => b.car_id === car.id);
  const isSold = car.status === 'Sold';
  const hasAuction = car.bid_enabled && !isSold;
  const currentTopBid = car.current_bid || car.starting_bid || car.price * 0.85;

  const photos = car.photos && car.photos.length > 0 
    ? car.photos 
    : ['https://images.unsplash.com/photo-1549924231-f129b16371b3?auto=format&fit=crop&w=1200&q=80'];

  const specsList = [
    { label: "Kilometers Driven", value: formatKM(car.range_driven), icon: Gauge },
    { label: "Fuel Type", value: car.fuel, icon: Fuel },
    { label: "Transmission", value: car.transmission, icon: Car },
    { label: "Model Year", value: car.model_year, icon: Calendar },
    { label: "Ownership Tier", value: car.ownership || "1st Owner", icon: Award },
    { label: "Accidental Status", value: car.accidental || "Non-Accidental Certified", icon: ShieldCheck },
    { label: "Fuel Efficiency", value: car.mileage ? `${car.mileage} kmpl` : "16.5 kmpl", icon: Sparkles },
    { label: "RC & RTO Status", value: car.rc_status || "Verified (JH-03)", icon: FileText }
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${car.title} | Shri Krishna Motors`,
        text: `Check out this ${car.title} in Daltonganj!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("Link Copied!", "Vehicle URL copied to clipboard.", "info");
    }
  };

  const handleTestDriveSubmit = (e) => {
    e.preventDefault();
    setTestDriveModalOpen(false);
    showToast("Test Drive Booked!", `Thank you ${testDriveName}. Our team will prepare the ${car.title} for your visit.`, "success");
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Shri Krishna Motors, I am interested in *${car.title}* (Model: ${car.model_year}, Price: ₹${(car.price).toLocaleString('en-IN')}). Is it available for inspection at Daltonganj? Link: ${window.location.href}`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Top Breadcrumb & Share */}
      <div className="flex items-center justify-between">
        <Link
          to="/stock"
          className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-400 hover:text-[var(--theme-primary)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Stock</span>
        </Link>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 text-xs font-semibold transition-colors cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share Vehicle</span>
        </button>
      </div>

      {/* Main Hero Showcase: Gallery + Buy/Bid Action Center */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Gallery & Video (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Large Photo */}
          <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden bg-neutral-950 border border-white/10 shadow-2xl">
            <img
              src={photos[selectedPhotoIdx]}
              alt={car.title}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay Badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-extrabold shadow-md uppercase backdrop-blur-md border ${
                car.status === 'Sold' ? 'bg-red-500/80 text-white border-red-400/40' :
                car.status === 'Reserved' ? 'bg-yellow-500/90 text-neutral-950 border-yellow-400/50' :
                'bg-emerald-500/80 text-white border-emerald-400/50'
              }`}>
                {car.status}
              </span>
              {hasAuction && (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold btn-luxury text-neutral-950 shadow-md animate-pulse">
                  <Gavel className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Live Auction</span>
                </span>
              )}
            </div>
          </div>

          {/* Thumbnail Strip */}
          {photos.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {photos.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPhotoIdx(idx)}
                  className={`relative w-24 h-16 rounded-2xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    selectedPhotoIdx === idx
                      ? 'border-[var(--theme-primary)] scale-95 shadow-md shadow-[var(--theme-glow)]'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Video Walkaround Box (if available) */}
          {car.video && (
            <div className="p-5 rounded-2xl premium-card space-y-2 border border-white/10">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Video className="w-4 h-4 text-[var(--theme-primary)]" />
                <span>Video Walkaround</span>
              </div>
              <p className="text-xs text-neutral-400">
                Watch the full 360-degree exterior & interior video walkthrough of this car.
              </p>
              <a
                href={car.video}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--theme-primary)] hover:underline pt-1"
              >
                <span>Open Video in New Tab</span>
                <ArrowLeft className="w-3 h-3 rotate-180" />
              </a>
            </div>
          )}

        </div>

        {/* Right Column: Pricing, Bidding & Dealership Action Box (5 cols - Luminous Light Card) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-6 sm:p-8 rounded-3xl duo-card-light space-y-6 shadow-2xl">
            
            {/* Title & Brand */}
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-600 font-bold uppercase tracking-wider mb-1">
                <span>{car.brand}</span>
                <span>•</span>
                <span>{car.model_year} Model</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950">
                {car.title}
              </h1>
              <p className="text-xs text-slate-500 mt-1 font-semibold">
                Stock ID: <span className="font-mono text-slate-800 font-bold">{car.id}</span> • Location: <span className="text-slate-900 font-bold">Daltonganj, JH</span>
              </p>
            </div>

            {/* Pricing / Auction High Box */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              {hasAuction ? (
                <div>
                  <div className="flex justify-between items-center text-xs text-slate-500 font-bold">
                    <span>Current Highest Bid:</span>
                    <span className="text-emerald-600 font-extrabold">{carBids.length} bids placed</span>
                  </div>
                  <div className="text-3xl font-black text-slate-950 mt-1">
                    {formatCurrency(currentTopBid)}
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 pt-2 border-t border-slate-200">
                    <span>Buy Now Price:</span>
                    <span className="text-slate-950 font-black">{formatCurrency(car.price)}</span>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-xs text-slate-500 font-bold">Fixed Offer Price:</p>
                  <p className="text-3xl font-black text-slate-950 mt-1">
                    {formatCurrency(car.price)}
                  </p>
                </div>
              )}
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-3">
              {hasAuction && (
                <button
                  onClick={() => setBiddingOpen(true)}
                  className="w-full py-4 rounded-2xl btn-luxury text-neutral-950 font-black text-base transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Gavel className="w-5 h-5 stroke-[2.5]" />
                  <span>Place Your Bid Now</span>
                </button>
              )}

              {/* WhatsApp Dealership */}
              <a
                href={`https://wa.me/919304235814?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 stroke-[2.5]" />
                <span>Chat on WhatsApp</span>
              </a>

              {/* Book Test Drive Button */}
              <button
                onClick={() => setTestDriveModalOpen(true)}
                className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Car className="w-4 h-4 text-[var(--theme-primary)]" />
                <span>Schedule Showroom Test Drive</span>
              </button>

              {/* Call Direct */}
              <a
                href={`tel:${dealerInfo.phone.replace(/\s+/g, '')}`}
                className="w-full py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold transition-all flex items-center justify-center gap-2 border border-slate-300 shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-[var(--theme-primary)]" />
                <span>Direct Call: {dealerInfo.phone}</span>
              </a>
            </div>

            {/* Quick Guarantees */}
            <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-3 text-xs text-slate-700 font-semibold">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Non-Accidental Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Instant RC Transfer</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Bank Loan Available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Trade-in / Exchange</span>
              </div>
            </div>

          </div>

          {/* Live Bids History on this Car */}
          {hasAuction && carBids.length > 0 && (
            <div className="p-5 rounded-2xl duo-card-dark space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                  <Gavel className="w-3.5 h-3.5 text-[var(--theme-primary)]" />
                  <span>Recent Bid Activity</span>
                </h4>
                <span className="text-[11px] text-neutral-400">{carBids.length} Bids</span>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {carBids.map((bid, idx) => (
                  <div key={bid.id || idx} className="flex items-center justify-between text-xs p-2 rounded-lg bg-white/5 border border-white/10">
                    <div>
                      <p className="font-semibold text-white">{bid.bidder_name || 'Verified Bidder'}</p>
                      <p className="text-[10px] text-neutral-400">{new Date(bid.created_date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[var(--theme-primary)]">{formatCurrency(bid.amount)}</p>
                      <span className="text-[10px] text-emerald-400 font-semibold">{bid.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Complete Specifications Matrix (Luminous Light Luxury Grid) */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-white">
          Technical Specifications & <span className="text-luxury-gradient">Vehicle Overview</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {specsList.map((spec, idx) => {
            const Icon = spec.icon;
            return (
              <div key={idx} className="p-4 rounded-2xl duo-card-light space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
                  <Icon className="w-4 h-4 text-amber-600 stroke-[2.5]" />
                  <span>{spec.label}</span>
                </div>
                <p className="text-base font-black text-slate-950">{spec.value}</p>
              </div>
            );
          })}
        </div>

        {/* Description / Condition Details */}
        <div className="p-6 rounded-3xl duo-card-light space-y-3">
          <h3 className="text-sm font-black text-slate-950 uppercase tracking-wider">
            Vehicle Condition & Inspection Report
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed font-medium">
            {car.description || "This vehicle has undergone Shri Krishna Motors' standard 120-point mechanical, electrical, and structural inspection. Certified non-accidental with authentic odometer reading."}
          </p>
          <div className="flex flex-wrap items-center gap-6 pt-3 border-t border-slate-200 text-xs text-slate-600 font-semibold">
            <div>Insurance Validity: <strong className="text-slate-950">{car.insurance_validity || "Valid"}</strong></div>
            <div>RTO Registration: <strong className="text-slate-950">{car.rc_status || "Verified & Transferable"}</strong></div>
            <div>Location: <strong className="text-slate-950">{dealerInfo.city}</strong></div>
          </div>
        </div>
      </section>

      {/* EMI Calculator Section for this car */}
      <section>
        <EMICalculator carPrice={car.price} />
      </section>

      {/* Bidding Modal */}
      {biddingOpen && (
        <LiveBiddingModal car={car} onClose={() => setBiddingOpen(false)} />
      )}

      {/* Test Drive Modal */}
      {testDriveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-2xl bg-neutral-900 border border-neutral-800 p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-lg text-white">Book Test Drive: {car.title}</h3>
            <p className="text-xs text-neutral-400">
              Our Daltonganj showroom team will have this car sanitized and ready for your test drive.
            </p>

            <form onSubmit={handleTestDriveSubmit} className="space-y-3">
              <div>
                <label className="block text-xs text-neutral-300 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  value={testDriveName}
                  onChange={(e) => setTestDriveName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-sm outline-none focus:border-[var(--theme-primary)]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-300 mb-1">Mobile / WhatsApp Number *</label>
                <input
                  type="tel"
                  value={testDrivePhone}
                  onChange={(e) => setTestDrivePhone(e.target.value)}
                  placeholder="e.g. 98351 00000"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-sm outline-none focus:border-[var(--theme-primary)]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-300 mb-1">Preferred Date *</label>
                <input
                  type="date"
                  value={testDriveDate}
                  onChange={(e) => setTestDriveDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-sm outline-none focus:border-[var(--theme-primary)]"
                  required
                />
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setTestDriveModalOpen(false)}
                  className="w-1/3 py-2.5 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-xl btn-luxury text-neutral-950 text-xs font-bold shadow-md cursor-pointer"
                >
                  Confirm Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
