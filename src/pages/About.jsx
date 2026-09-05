import React from 'react';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import { 
  Award, 
  ShieldCheck, 
  Users, 
  Car, 
  MapPin, 
  CheckCircle2, 
  Phone,
  Mail,
  Clock,
  Briefcase,
  Star,
  MessageSquare,
  Sparkles,
  FileCheck2,
  Check
} from 'lucide-react';

export const About = () => {
  const { dealerInfo } = useData();

  const inspectionPoints = [
    "100% Non-accidental structural chassis check",
    "Engine compression & transmission diagnostics",
    "Electronic ECU & sensor health audit",
    "Suspension, steering & braking calibration",
    "Genuine odometer reading verification",
    "Comprehensive legal RC & RTO crime-free verification",
    "Tire tread depth & alloy integrity test",
    "AC cooling & cabin electronics inspection"
  ];

  const corePillars = [
    {
      title: "100% Non-Accidental Guarantee",
      desc: "Every car in our inventory passes strict multi-point structural checks. We strictly refuse flood-damaged or accidental vehicles."
    },
    {
      title: "Direct Pricing & Live Bidding",
      desc: "Zero hidden commission or broker fees. Our transparent digital bidding system ensures honest market value for buyers and sellers."
    },
    {
      title: "Guaranteed RC Ownership Transfer",
      desc: "Complete paperwork transfer assistance with Daltonganj RTO (JH-03) and state transport offices for 100% legal security."
    },
    {
      title: "Pre-Delivery Detailing & Servicing",
      desc: "Every vehicle is thoroughly serviced, detailed, and sanitized before keys are handed over at our showroom."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Top Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden premium-card p-8 sm:p-14 text-center space-y-4 border border-white/10">
        <div className="absolute inset-0 ambient-glow pointer-events-none" />
        
        <div className="relative z-10 space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full theme-pill-badge text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Established in {dealerInfo.established} • Daltonganj, Jharkhand</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            About <span className="text-luxury-gradient">{dealerInfo.name}</span>
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            Daltonganj's premier automotive destination for certified pre-owned cars, transparent live digital bidding, and top-dollar car exchange.
          </p>
        </div>
      </div>

      {/* Showroom Photo & Dealership Overview (Image from PDF) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Dealership Showroom Image */}
        <div className="lg:col-span-6">
          <div className="relative rounded-3xl overflow-hidden premium-card border border-white/10 shadow-2xl group">
            <img
              src="/images/about/dealership-showroom.jpg"
              alt="Shri Krishna Motors Dealership Showroom Daltonganj"
              className="w-full aspect-[16/11] object-cover group-hover:scale-103 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080b11] via-transparent to-transparent flex flex-col justify-end p-6">
              <span className="text-xs text-[var(--theme-primary)] font-bold uppercase tracking-wider">Showroom Front & Delivery Yard</span>
              <h3 className="text-xl font-black text-white">Shri Krishna Motors Showroom</h3>
              <p className="text-xs text-neutral-300">Ranchi Road, In Front of Chiyanki, Daltonganj</p>
            </div>
          </div>
        </div>

        {/* Dealership Story & MD Abhishek Verma */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs font-bold">
            <Briefcase className="w-3.5 h-3.5 text-[var(--theme-primary)]" />
            <span>Founder & Leadership</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
            "Delivering Trust, Authenticity & Peace of Mind to Every Jharkhand Motorist"
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
            <p>
              Founded in <strong>2021</strong> by Managing Director <strong>{dealerInfo.md}</strong>, Shri Krishna Motors was created with a single objective: to transform the pre-owned vehicle ecosystem across Palamu division.
            </p>
            <p>
              Operating from our dedicated showroom on <strong>Ranchi Road (In Front of Chiyanki, Daltonganj)</strong>, we combine thorough physical vehicle inspections with our proprietary <strong>Live Digital Bidding System</strong> to provide buyers and sellers with an honest, seamless, and commission-free experience.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-4 rounded-2xl bg-neutral-950/80 border border-white/10 text-center">
              <p className="text-2xl font-black text-[var(--theme-primary)]">500+</p>
              <p className="text-[11px] text-neutral-400 font-medium">Cars Delivered</p>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-950/80 border border-white/10 text-center">
              <p className="text-2xl font-black text-white">120+</p>
              <p className="text-[11px] text-neutral-400 font-medium">Checkpoints</p>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-950/80 border border-white/10 text-center">
              <p className="text-2xl font-black text-[var(--theme-primary)]">{dealerInfo.rating} ★</p>
              <p className="text-[11px] text-neutral-400 font-medium">{dealerInfo.reviewsCount} Reviews</p>
            </div>
          </div>
        </div>

      </div>

      {/* 120-Point Inspection Standards */}
      <div className="rounded-3xl premium-card p-8 sm:p-12 space-y-8 border border-white/10">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold text-[var(--theme-primary)] uppercase tracking-widest">
            Quality Assurance Protocol
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Our 120-Point Physical & Technical Inspection
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            Every car added to our inventory undergoes exhaustive evaluation by certified technicians before being certified.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {inspectionPoints.map((pt, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-neutral-950/90 border border-white/5 flex items-start gap-3">
              <div className="p-1 rounded-md bg-[var(--theme-accent-bg)] text-[var(--theme-primary)] shrink-0 mt-0.5 border border-[var(--theme-accent-border)]">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <p className="text-xs font-semibold text-neutral-200 leading-snug">{pt}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Core Quality Pillars */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Why Jharkhand Chooses <span className="text-luxury-gradient">Shri Krishna Motors</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            Our four pillars of automotive excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {corePillars.map((p, idx) => (
            <div key={idx} className="p-6 rounded-3xl premium-card space-y-3 shadow-lg border border-white/10">
              <div className="flex items-center gap-3 text-white font-bold text-base">
                <CheckCircle2 className="w-5 h-5 text-[var(--theme-primary)] shrink-0" />
                <span>{p.title}</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed pl-8">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Complete Showroom Address & Contact Information */}
      <div className="rounded-3xl premium-card p-8 sm:p-12 space-y-8 border border-white/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white">Complete Dealership Credentials</h3>
            <p className="text-xs text-neutral-400 mt-1">Direct contact & official showroom verification details.</p>
          </div>
          <a
            href={dealerInfo.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 stroke-[2.5]" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="p-5 rounded-2xl bg-neutral-950/90 border border-white/5 space-y-2">
            <div className="flex items-center gap-2 text-[var(--theme-primary)] font-bold">
              <MapPin className="w-4 h-4" />
              <span>Full Showroom Address</span>
            </div>
            <p className="text-neutral-300 leading-relaxed">
              {dealerInfo.address}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-950/90 border border-white/5 space-y-2">
            <div className="flex items-center gap-2 text-[var(--theme-primary)] font-bold">
              <Phone className="w-4 h-4" />
              <span>Direct Phone Lines</span>
            </div>
            <p className="text-white font-bold">{dealerInfo.phone}</p>
            <p className="text-neutral-300">{dealerInfo.phone2}</p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-950/90 border border-white/5 space-y-2">
            <div className="flex items-center gap-2 text-[var(--theme-primary)] font-bold">
              <Clock className="w-4 h-4" />
              <span>Showroom Timings</span>
            </div>
            <p className="text-white font-bold">{dealerInfo.hours}</p>
            <p className="text-neutral-400">Sunday: Online Inquiries / Prior Appointment</p>
          </div>
        </div>
      </div>

    </div>
  );
};

