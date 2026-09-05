import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  Navigation,
  ShieldCheck,
  Building2,
  Sparkles
} from 'lucide-react';

export const Contact = () => {
  const { dealerInfo, showToast } = useData();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast("Message Sent!", "Thank you for reaching out. Abhishek Verma or a team specialist will contact you shortly.", "success");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header with ambient glow */}
      <div className="relative text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full theme-pill-badge text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[var(--theme-primary)]" />
          <span>Connect With Our Dealership</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Get in Touch with <span className="text-luxury-gradient">{dealerInfo.name}</span>
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
          Visit our flagship showroom on Ranchi Road, Daltonganj or get in touch for certified vehicle sales, live auction inquiries, valuation, and finance assistance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Contact Cards & Map Info (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Address Card */}
          <div className="premium-card premium-card-hover p-6 rounded-3xl space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-2xl bg-[var(--theme-accent-bg)] text-[var(--theme-primary)] border border-[var(--theme-accent-border)] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-base">Showroom Location</h3>
                <p className="text-xs text-neutral-300 leading-relaxed">{dealerInfo.address}</p>
                <div className="inline-block px-2.5 py-1 rounded-lg bg-neutral-950/80 border border-neutral-800 text-[11px] text-[var(--theme-primary)] font-semibold mt-1">
                  Landmark: In front of Chiyanki, Ranchi Road
                </div>
              </div>
            </div>

            {/* Direct Directions Link */}
            <div className="pt-2 border-t border-white/5 flex items-center justify-between">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dealerInfo.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-[var(--theme-primary)] hover:underline"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Driving Directions</span>
                <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
              </a>
              <span className="text-[11px] text-neutral-500 font-mono">Palamu, JH</span>
            </div>
          </div>

          {/* Phone & WhatsApp Card */}
          <div className="premium-card premium-card-hover p-6 rounded-3xl space-y-5">
            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-2xl bg-[var(--theme-accent-bg)] text-[var(--theme-primary)] border border-[var(--theme-accent-border)] shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="font-bold text-white text-base">Direct Phone & Desk Support</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-neutral-950/80 border border-neutral-800">
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Primary Line</span>
                    <a href={`tel:${dealerInfo.phone.replace(/\s+/g, '')}`} className="text-white font-bold hover:text-[var(--theme-primary)] mt-0.5 block">
                      {dealerInfo.phone}
                    </a>
                  </div>
                  <div className="p-2.5 rounded-xl bg-neutral-950/80 border border-neutral-800">
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Desk Line</span>
                    <a href={`tel:${dealerInfo.phone2.replace(/\s+/g, '')}`} className="text-white font-bold hover:text-[var(--theme-primary)] mt-0.5 block">
                      {dealerInfo.phone2}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <a
              href={dealerInfo.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950/50"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Instant WhatsApp Discussion</span>
            </a>
          </div>

          {/* Hours & Email */}
          <div className="premium-card p-6 rounded-3xl space-y-3.5 text-xs">
            <div className="flex items-center gap-3 text-neutral-300">
              <div className="p-2 rounded-xl bg-neutral-950 border border-neutral-800 text-[var(--theme-primary)]">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">Showroom Hours</span>
                <span className="font-medium text-white">{dealerInfo.hours}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-neutral-300 pt-2 border-t border-white/5">
              <div className="p-2 rounded-xl bg-neutral-950 border border-neutral-800 text-[var(--theme-primary)]">
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">Official Inquiries</span>
                <a href={`mailto:${dealerInfo.email}`} className="text-white font-medium hover:text-[var(--theme-primary)] truncate block">
                  {dealerInfo.email}
                </a>
              </div>
            </div>
          </div>

          {/* Dealership Trust Banner */}
          <div className="p-4 rounded-2xl bg-neutral-950/60 border border-white/5 flex items-center gap-3 text-xs text-neutral-400">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Govt. GST Registered & Certified Pre-Owned Dealership in Jharkhand</span>
          </div>

        </div>

        {/* Right Column: Interactive Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="premium-card p-8 sm:p-10 rounded-3xl space-y-6">
            
            <div className="border-b border-neutral-800 pb-5">
              <h2 className="text-xl sm:text-2xl font-black text-white">Send Us a Direct Inquiry</h2>
              <p className="text-xs text-neutral-400 mt-1">
                Have questions regarding stock availability, auction process, financing, or trade-in? Our team responds within 1 hour.
              </p>
            </div>

            {submitted ? (
              <div className="p-10 text-center space-y-4 rounded-2xl bg-neutral-950/60 border border-emerald-500/30">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white">Message Received!</h3>
                <p className="text-xs text-neutral-300 max-w-sm mx-auto leading-relaxed">
                  Thank you for contacting Shri Krishna Motors. Abhishek Verma or a vehicle specialist will contact you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold transition-all"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-neutral-300">Your Full Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Singh"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950/90 border border-neutral-700/80 text-white text-sm focus:border-[var(--theme-primary)] outline-none transition-all placeholder:text-neutral-600"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-neutral-300">Mobile / WhatsApp *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 98351 00000"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950/90 border border-neutral-700/80 text-white text-sm focus:border-[var(--theme-primary)] outline-none transition-all placeholder:text-neutral-600"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-neutral-300">Email Address (Optional)</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950/90 border border-neutral-700/80 text-white text-sm focus:border-[var(--theme-primary)] outline-none transition-all placeholder:text-neutral-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-neutral-300">Inquiry Purpose</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950/90 border border-neutral-700/80 text-white text-sm focus:border-[var(--theme-primary)] outline-none transition-all"
                    >
                      <option value="General Inquiry">General Dealership Inquiry</option>
                      <option value="Buying a Car">Buying a Car from Stock</option>
                      <option value="Selling/Exchanging">Selling / Exchanging My Vehicle</option>
                      <option value="Live Bidding Help">Live Bidding / Auction Question</option>
                      <option value="Loan/Finance Support">Car Loan & Finance Support</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-neutral-300">Your Message / Requirement *</label>
                  <textarea
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what vehicle you are interested in, or describe your query..."
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950/90 border border-neutral-700/80 text-white text-sm focus:border-[var(--theme-primary)] outline-none transition-all placeholder:text-neutral-600"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl btn-luxury text-sm flex items-center justify-center gap-2 mt-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Dealership</span>
                </button>
              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
