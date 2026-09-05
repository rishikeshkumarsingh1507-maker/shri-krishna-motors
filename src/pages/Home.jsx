import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { CarCard } from '../components/CarCard';
import { 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Car, 
  Gavel, 
  BadgePercent, 
  Star, 
  MapPin, 
  Phone, 
  MessageSquare,
  Award,
  Users,
  Repeat,
  CheckCircle2,
  Check,
  ChevronRight,
  Shield,
  Zap
} from 'lucide-react';

export const Home = () => {
  const { dealerInfo, cars, submitSellRequest, formatCurrency } = useData();

  // Filter state for homepage stock showcase
  const [stockTab, setStockTab] = useState('all'); // 'all', 'auction', 'diesel', 'petrol'

  // Embedded Sell Your Car form state
  const [sellForm, setSellForm] = useState({
    brand: '',
    car_name: '',
    model_year: new Date().getFullYear() - 3,
    fuel: 'Petrol',
    range_driven: '',
    expected_price: '',
    seller_name: '',
    seller_phone: '',
    notes: ''
  });
  const [sellSubmitted, setSellSubmitted] = useState(false);
  const [sellSubmitting, setSellSubmitting] = useState(false);

  const filteredCars = cars.filter(c => {
    if (stockTab === 'auction') return c.bid_enabled && c.status === 'Available';
    if (stockTab === 'diesel') return c.fuel.toLowerCase() === 'diesel';
    if (stockTab === 'petrol') return c.fuel.toLowerCase() === 'petrol';
    return true;
  });

  const handleSellSubmit = (e) => {
    e.preventDefault();
    setSellSubmitting(true);
    submitSellRequest({
      ...sellForm,
      photos: ["/images/cars/tata-nexon/nexon-1.jpg"]
    });
    setSellSubmitting(false);
    setSellSubmitted(true);
  };

  const valueProps = [
    {
      icon: ShieldCheck,
      title: "100% Non-Accidental Certified",
      desc: "Every vehicle is physically verified on 120+ inspection points at our Daltonganj yard."
    },
    {
      icon: Gavel,
      title: "Transparent Live Bidding",
      desc: "Bid digitally in real-time or buy instantly at clear, commission-free dealer pricing."
    },
    {
      icon: Repeat,
      title: "Top-Value Car Exchange",
      desc: "Trade in your existing car with instant spot payment and transparent paperwork."
    },
    {
      icon: Award,
      title: "Guaranteed RC Transfer",
      desc: "End-to-end legal document verification and RTO transfer assistance across Jharkhand."
    }
  ];

  return (
    <div className="space-y-24 pb-24 overflow-hidden">
      
      {/* HERO SECTION: Featuring the White Toyota Fortuner */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-8 pb-16">
        
        {/* Background Fortuner Image with Ambient Glows */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero/fortuner-hero.jpg"
            alt="Shri Krishna Motors Premium SUV"
            className="w-full h-full object-cover object-center scale-105 filter brightness-[0.42] contrast-110 animate-fade-in"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080b11] via-[#080b11]/75 to-[#080b11]/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080b11] via-[#080b11]/60 to-transparent" />
          <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-[var(--theme-primary)]/15 blur-[150px] rounded-full pointer-events-none" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center lg:text-left grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-8 space-y-7">
            
            {/* Trust Badge Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full theme-pill-badge text-xs font-bold backdrop-blur-xl">
              <span className="flex h-2 w-2 rounded-full bg-[var(--theme-primary)] animate-ping" />
              <span>Daltonganj's Premier Automotive Marketplace • Est. {dealerInfo.established}</span>
              <span className="opacity-40">|</span>
              <span className="flex items-center gap-1 text-white">
                <Star className="w-3.5 h-3.5 fill-[var(--theme-primary)] text-[var(--theme-primary)]" />
                {dealerInfo.rating} ★
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08]">
              Buy, Sell & Bid on <br />
              <span className="text-luxury-gradient">
                Certified Quality Cars
              </span>
            </h1>

            <p className="text-base sm:text-xl text-neutral-300 max-w-2xl font-normal leading-relaxed">
              Explore 100% inspected non-accidental cars in Daltonganj, participate in live digital auctions, or receive instant spot valuation for your vehicle.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <a
                href="#stock-section"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl btn-luxury text-base flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <Car className="w-5 h-5 stroke-[2.5]" />
                <span>Explore Live Stock ({cars.length})</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
              </a>

              <a
                href="#sell-car-section"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-neutral-900/90 hover:bg-neutral-800 border border-white/10 text-white font-bold text-base transition-all backdrop-blur-xl flex items-center justify-center gap-2 shadow-lg"
              >
                <BadgePercent className="w-5 h-5 text-[var(--theme-primary)]" />
                <span>Value / Sell Your Car</span>
              </a>

              <Link
                to="/assistant"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-neutral-900/60 hover:bg-neutral-900 border border-white/10 text-neutral-200 hover:text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 backdrop-blur-md"
              >
                <Sparkles className="w-4 h-4 text-[var(--theme-primary)]" />
                <span>AI Advisor</span>
              </Link>
            </div>

            {/* Metrics Bar: Luminous High-Contrast Light Badges */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
              <div className="p-4 rounded-2xl bg-white/95 border border-white/80 shadow-2xl backdrop-blur-xl">
                <p className="text-2xl font-black text-slate-950">100%</p>
                <p className="text-xs text-slate-600 font-bold">Inspected Cars</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/95 border border-white/80 shadow-2xl backdrop-blur-xl">
                <p className="text-2xl font-black text-amber-600">₹0</p>
                <p className="text-xs text-slate-600 font-bold">Commission Fee</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/95 border border-white/80 shadow-2xl backdrop-blur-xl">
                <p className="text-2xl font-black text-slate-950">{dealerInfo.established}</p>
                <p className="text-xs text-slate-600 font-bold">Trusted Since</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/95 border border-white/80 shadow-2xl backdrop-blur-xl">
                <p className="text-2xl font-black text-amber-600">{dealerInfo.rating} ★</p>
                <p className="text-xs text-slate-600 font-bold">Google Rating</p>
              </div>
            </div>

          </div>

          {/* Right Spotlight Card */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="rounded-3xl duo-card-dark p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--theme-primary)] uppercase tracking-wider">Showroom Dealership</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Open Today
                </span>
              </div>
              <h3 className="text-xl font-black text-white">Shri Krishna Motors</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Ranchi Road, In Front of Chiyanki, Daltonganj, Palamu. Visit us for test drives, verified paperwork, and live bidding consultation.
              </p>
              <div className="pt-2 flex items-center justify-between text-xs text-neutral-300 border-t border-white/10">
                <span>Managing Director:</span>
                <strong className="text-white">{dealerInfo.md}</strong>
              </div>
              <a
                href={dealerInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <MessageSquare className="w-4 h-4 stroke-[2.5]" />
                <span>Instant WhatsApp Inquiry</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* VALUE PROPOSITIONS: Luminous Light Porcelain Certification Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueProps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl duo-card-light space-y-3.5 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-[var(--theme-primary)] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h3 className="text-base font-black text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 1: HOMEPAGE STOCK & LIVE BIDDING SHOWCASE */}
      <section id="stock-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full theme-pill-badge text-xs font-bold uppercase tracking-wider mb-2">
              <Car className="w-3.5 h-3.5" />
              <span>Verified Pre-Owned Stock & Live Auctions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Featured Inventory & Live Bidding
            </h2>
            <p className="text-sm text-neutral-400 mt-1">
              Photos change automatically in sync. Place your highest bid or purchase directly.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: `All Cars (${cars.length})` },
              { id: 'auction', label: 'Live Bidding' },
              { id: 'diesel', label: 'Diesel' },
              { id: 'petrol', label: 'Petrol' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setStockTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  stockTab === tab.id
                    ? 'btn-luxury font-black shadow-md'
                    : 'bg-neutral-900/90 text-neutral-300 hover:bg-neutral-800 border border-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
            <Link
              to="/stock"
              className="px-4 py-2 rounded-xl bg-neutral-900 border border-white/10 text-[var(--theme-primary)] hover:text-white text-xs font-bold flex items-center gap-1 transition-colors"
            >
              <span>Full Stock Page</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 4 Stock Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      {/* SECTION 2: HOMEPAGE EMBEDDED "SELL YOUR CAR / VALUATION" (Luminous Light Luxury Studio) */}
      <section id="sell-car-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="rounded-3xl duo-card-light p-8 sm:p-12 space-y-8">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-slate-200/90 pb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 text-[var(--theme-primary)] text-xs font-bold uppercase tracking-wider">
                <BadgePercent className="w-3.5 h-3.5" />
                <span>Instant Spot Valuation & Exchange</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
                Sell or Exchange Your Car at <span className="text-amber-600">{dealerInfo.name}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl font-medium">
                Get an instant fair appraisal from Managing Director Abhishek Verma and team with spot cash payment and free RC transfer.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="p-3.5 rounded-2xl bg-slate-900 text-white border border-slate-800 text-xs shadow-md">
                <span className="text-slate-400">Direct Helpline:</span>
                <p className="font-black text-[var(--theme-primary)] text-sm">{dealerInfo.phone}</p>
              </div>
            </div>
          </div>

          {/* Interactive Form with High-Contrast Light Inputs */}
          {sellSubmitted ? (
            <div className="p-8 text-center rounded-2xl bg-emerald-50 border border-emerald-300 space-y-4 animate-fade-in text-slate-900">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center border border-emerald-300 shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-emerald-950">Valuation Request Received!</h3>
              <p className="text-xs sm:text-sm text-slate-700 max-w-md mx-auto font-medium">
                Thank you, <strong>{sellForm.seller_name}</strong>. Our team will review your <strong>{sellForm.brand} {sellForm.car_name}</strong> and call you at <strong>{sellForm.seller_phone}</strong> with a competitive market offer.
              </p>
              <button
                onClick={() => setSellSubmitted(false)}
                className="px-5 py-2.5 rounded-xl btn-luxury text-xs font-bold"
              >
                Submit Another Vehicle
              </button>
            </div>
          ) : (
            <form onSubmit={handleSellSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Brand / Make *</label>
                  <input
                    type="text"
                    value={sellForm.brand}
                    onChange={(e) => setSellForm({ ...sellForm, brand: e.target.value })}
                    placeholder="e.g. Maruti, Tata, Mahindra"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs outline-none focus:border-[var(--theme-primary)] focus:ring-2 focus:ring-[var(--theme-primary)]/20 shadow-xs font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Model & Variant *</label>
                  <input
                    type="text"
                    value={sellForm.car_name}
                    onChange={(e) => setSellForm({ ...sellForm, car_name: e.target.value })}
                    placeholder="e.g. Swift VXi, Nexon, City"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs outline-none focus:border-[var(--theme-primary)] focus:ring-2 focus:ring-[var(--theme-primary)]/20 shadow-xs font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Model Year *</label>
                  <input
                    type="number"
                    value={sellForm.model_year}
                    onChange={(e) => setSellForm({ ...sellForm, model_year: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs outline-none focus:border-[var(--theme-primary)] focus:ring-2 focus:ring-[var(--theme-primary)]/20 shadow-xs font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Fuel Type *</label>
                  <select
                    value={sellForm.fuel}
                    onChange={(e) => setSellForm({ ...sellForm, fuel: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs outline-none focus:border-[var(--theme-primary)] focus:ring-2 focus:ring-[var(--theme-primary)]/20 shadow-xs font-medium"
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="CNG">CNG</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Kilometers Driven *</label>
                  <input
                    type="number"
                    value={sellForm.range_driven}
                    onChange={(e) => setSellForm({ ...sellForm, range_driven: e.target.value })}
                    placeholder="e.g. 35000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs outline-none focus:border-[var(--theme-primary)] focus:ring-2 focus:ring-[var(--theme-primary)]/20 shadow-xs font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Expected Price (₹) *</label>
                  <input
                    type="number"
                    value={sellForm.expected_price}
                    onChange={(e) => setSellForm({ ...sellForm, expected_price: e.target.value })}
                    placeholder="e.g. 450000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs outline-none focus:border-[var(--theme-primary)] focus:ring-2 focus:ring-[var(--theme-primary)]/20 shadow-xs font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Your Full Name *</label>
                  <input
                    type="text"
                    value={sellForm.seller_name}
                    onChange={(e) => setSellForm({ ...sellForm, seller_name: e.target.value })}
                    placeholder="e.g. Rajesh Singh"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs outline-none focus:border-[var(--theme-primary)] focus:ring-2 focus:ring-[var(--theme-primary)]/20 shadow-xs font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Mobile Number (10 digits) *</label>
                  <input
                    type="tel"
                    value={sellForm.seller_phone}
                    onChange={(e) => setSellForm({ ...sellForm, seller_phone: e.target.value })}
                    placeholder="e.g. 98351 00000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs outline-none focus:border-[var(--theme-primary)] focus:ring-2 focus:ring-[var(--theme-primary)]/20 shadow-xs font-medium"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-4 text-xs text-slate-700">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                    <span>Free Inspection</span>
                  </span>
                  <span className="flex items-center gap-1.5 font-bold">
                    <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                    <span>Instant Payment</span>
                  </span>
                  <span className="flex items-center gap-1.5 font-bold">
                    <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                    <span>Free RC Transfer</span>
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={sellSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white text-xs font-black shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-102"
                >
                  <BadgePercent className="w-4 h-4 stroke-[2.5] text-[var(--theme-primary)]" />
                  <span>{sellSubmitting ? 'Submitting...' : 'Request Instant Valuation'}</span>
                </button>
              </div>

            </form>
          )}

        </div>
      </section>

      {/* SECTION 3: ALTERNATING DARK LUXURY - 120-POINT YARD CERTIFICATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl duo-card-dark p-8 sm:p-12 relative overflow-hidden space-y-8">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--theme-primary)]/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-white/10 pb-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[var(--theme-primary)] text-xs font-bold uppercase tracking-wider mb-2 border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Uncompromising Quality Guarantee</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                The Shri Krishna Motors Benchmark
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Zero flood damage • Non-accidental certified chassis • 100% genuine odometer guarantee.
              </p>
            </div>
            <Link
              to="/about"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15 transition-colors flex items-center gap-1.5"
            >
              <span>Our Inspection Story</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {[
              { title: "Chassis & Structural Integrity", count: "32 Points", desc: "A-B-C pillar alignment, apron inspection, and zero frame welded repairs." },
              { title: "Engine & Transmission Testing", count: "38 Points", desc: "Compression, turbocharger, ECU diagnostics, oil sludge, and smooth gearbox shifts." },
              { title: "Suspension & Brake Systems", count: "26 Points", desc: "Brake pad thickness, caliper response, shock absorber damping, and tie-rod health." },
              { title: "Legal & Documentation Check", count: "24 Points", desc: "No active hypothecation, clear RTO NOC, zero pending challans, and fast RC transfer." }
            ].map((check, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[var(--theme-primary)]">{check.count}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <h4 className="text-sm font-bold text-white">{check.title}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">{check.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: ALTERNATING LUMINOUS LIGHT - VERIFIED CUSTOMER TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-[var(--theme-primary)] text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-[var(--theme-primary)]" />
            <span>Verified Customer Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Trusted by Over 500+ Families
          </h2>
          <p className="text-sm text-neutral-400 max-w-xl mx-auto">
            Read what car owners across Daltonganj, Ranchi, Garhwa, and Palamu say about their Shri Krishna Motors experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Anand Prakash Pandey",
              city: "Chiyanki, Daltonganj",
              car: "Tata Nexon XZ+ Diesel",
              rating: 5,
              review: "Abhishek ji provided 100% genuine details of the Nexon. The paperwork and insurance transfer were done in less than a week without any broker hassles. Highly recommended!"
            },
            {
              name: "Vikas K. Dubey",
              city: "Garhwa Road, Palamu",
              car: "Maruti Suzuki Swift VXi",
              rating: 5,
              review: "Participated in their live bidding and got the Swift at a phenomenal price. Clean interiors, authentic service records, and spot delivery. Truly transparent dealership."
            },
            {
              name: "Sunil Kumar Tiwari",
              city: "Ranchi Road, Daltonganj",
              car: "Sold Honda City",
              rating: 5,
              review: "Sold my car through their instant valuation. Within 45 minutes of yard inspection, money was credited directly to my bank account. Excellent staff and prompt service."
            }
          ].map((t, idx) => (
            <div key={idx} className="p-7 rounded-3xl duo-card-light space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, r) => (
                    <Star key={r} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium italic">
                  "{t.review}"
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-black text-slate-900">{t.name}</h4>
                  <p className="text-slate-500 font-semibold">{t.city}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-slate-900 text-white font-mono text-[10px] font-bold">
                  {t.car}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

