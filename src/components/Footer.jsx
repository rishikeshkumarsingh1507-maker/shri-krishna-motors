import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Logo } from './Logo';
import { 
  Car, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Award, 
  Heart,
  Instagram,
  Facebook,
  MessageSquare,
  Navigation,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const Footer = () => {
  const { dealerInfo } = useData();

  return (
    <footer className="bg-neutral-950 border-t border-white/10 text-neutral-400 text-sm relative overflow-hidden">
      
      {/* Top Value Assurance Banner */}
      <div className="border-b border-white/5 bg-neutral-900/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="p-3.5 rounded-2xl bg-[var(--theme-accent-bg)] text-[var(--theme-primary)] border border-[var(--theme-accent-border)] shadow-lg shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base">100% Non-Accidental Certified</h4>
              <p className="text-xs text-neutral-400">120-point chassis, engine & flood inspection guarantee</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="p-3.5 rounded-2xl bg-[var(--theme-accent-bg)] text-[var(--theme-primary)] border border-[var(--theme-accent-border)] shadow-lg shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base">Established in {dealerInfo.established}</h4>
              <p className="text-xs text-neutral-400">Daltonganj's most reputable automotive marketplace</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-lg shrink-0">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base">Instant WhatsApp Valuation</h4>
              <p className="text-xs text-neutral-400">Direct trade-in appraisal & test drive booking</p>
            </div>
          </div>
        </div>
      </div>

      {/* Showroom Location Map & Details Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Showroom Info Card */}
          <div className="lg:col-span-5 rounded-3xl premium-card p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full theme-pill-badge text-xs font-bold">
                <MapPin className="w-3.5 h-3.5 text-[var(--theme-primary)]" />
                <span>Showroom & Yard Location</span>
              </div>
              <h3 className="text-2xl font-black text-white">
                Visit <span className="text-luxury-gradient">{dealerInfo.name}</span> in Daltonganj
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {dealerInfo.address}
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/5 text-xs">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[var(--theme-primary)] shrink-0" />
                <div className="flex items-center gap-2">
                  <a href={`tel:${dealerInfo.phone.replace(/\s+/g, '')}`} className="font-bold text-white hover:text-[var(--theme-primary)]">
                    {dealerInfo.phone}
                  </a>
                  <span className="text-neutral-600">|</span>
                  <a href={`tel:${dealerInfo.phone2.replace(/\s+/g, '')}`} className="text-neutral-300 hover:text-[var(--theme-primary)]">
                    {dealerInfo.phone2}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[var(--theme-primary)] shrink-0" />
                <span className="text-neutral-300">Open Mon – Sat: 9:00 AM – 6:00 PM (Sunday by Appointment)</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[var(--theme-primary)] shrink-0" />
                <a href={`mailto:${dealerInfo.email}`} className="text-neutral-300 hover:text-[var(--theme-primary)] truncate">
                  {dealerInfo.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(dealerInfo.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl btn-luxury text-xs flex items-center justify-center gap-2 shadow-lg"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Driving Directions</span>
              </a>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-white/10 bg-neutral-950 shadow-2xl relative min-h-[300px]">
            <iframe
              title="Shri Krishna Motors Daltonganj Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14592.549244670208!2d84.072218!3d24.037145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398c715555555555%3A0x123456789abcdef!2sShree%20Krishna%20Motors%20Daltonganj!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              className="w-full h-full min-h-[340px] border-0 grayscale contrast-125 opacity-85 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute bottom-4 left-4 bg-neutral-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-neutral-800 text-[11px] font-semibold text-[var(--theme-primary)] flex items-center gap-2 pointer-events-none">
              <MapPin className="w-3 h-3" />
              <span>In Front of Chiyanki, Ranchi Road</span>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Links & Bio */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand & Socials */}
        <div className="space-y-4">
          <Logo size="sm" showTagline={true} />
          <p className="text-xs text-neutral-400 leading-relaxed">
            Daltonganj's premier destination for certified pre-owned cars. Founded by Managing Director <strong>{dealerInfo.md}</strong> in 2021, providing transparent pricing, live auctions, and verified RC transfer.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <a
              href={dealerInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-neutral-900 hover:bg-pink-600/20 text-neutral-300 hover:text-pink-400 transition-colors border border-white/10"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={dealerInfo.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-neutral-900 hover:bg-blue-600/20 text-neutral-300 hover:text-blue-400 transition-colors border border-white/10"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href={dealerInfo.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-neutral-900 hover:bg-emerald-600/20 text-neutral-300 hover:text-emerald-400 transition-colors border border-white/10"
              aria-label="WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold text-xs tracking-wider uppercase mb-4">
            Navigation
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link to="/stock" className="hover:text-[var(--theme-primary)] transition-colors">Verified Live Inventory</Link>
            </li>
            <li>
              <Link to="/sell-your-car" className="hover:text-[var(--theme-primary)] transition-colors">Sell / Exchange Your Car</Link>
            </li>
            <li>
              <Link to="/assistant" className="hover:text-[var(--theme-primary)] transition-colors">AI Vehicle Assistant</Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:text-[var(--theme-primary)] transition-colors">Customer Deliveries Gallery</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[var(--theme-primary)] transition-colors">About Dealership & Founder</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[var(--theme-primary)] transition-colors">Contact & Test Drive</Link>
            </li>
          </ul>
        </div>

        {/* Available Stock Quick Filter */}
        <div>
          <h4 className="text-white font-bold text-xs tracking-wider uppercase mb-4">
            Live Models in Stock
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link to="/stock" className="hover:text-[var(--theme-primary)] transition-colors">Tata Nexon XZ+ (O) Diesel</Link>
            </li>
            <li>
              <Link to="/stock" className="hover:text-[var(--theme-primary)] transition-colors">Maruti Suzuki Swift VXi</Link>
            </li>
            <li>
              <Link to="/stock" className="hover:text-[var(--theme-primary)] transition-colors">Mahindra XUV 700 AX7 Luxury</Link>
            </li>
            <li>
              <Link to="/stock" className="hover:text-[var(--theme-primary)] transition-colors">Honda City ZX CVT Automatic</Link>
            </li>
          </ul>
        </div>

        {/* Rating & Trust Credentials */}
        <div>
          <h4 className="text-white font-bold text-xs tracking-wider uppercase mb-4">
            Trust & Ratings
          </h4>
          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-2xl premium-card space-y-1">
              <p className="text-[var(--theme-primary)] font-black text-base">{dealerInfo.rating} ★★★★★</p>
              <p className="text-neutral-400 text-[11px]">Based on {dealerInfo.reviewsCount} verified customer reviews in Palamu</p>
            </div>
            <p className="text-[11px] text-neutral-400">
              Founder: <strong>{dealerInfo.md}</strong> • Daltonganj, Jharkhand
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-white/5 py-6 text-center text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} {dealerInfo.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> in Daltonganj, Jharkhand
          </p>
        </div>
      </div>
    </footer>
  );
};
