import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import { 
  BadgePercent, 
  ShieldCheck, 
  CheckCircle2, 
  Car, 
  IndianRupee, 
  Phone, 
  User, 
  UploadCloud, 
  Sparkles, 
  ArrowRight,
  Clock,
  Check
} from 'lucide-react';
import { DeviceImagePicker } from '../components/DeviceImagePicker';

export const SellCar = () => {
  const { submitSellRequest, dealerInfo, currentUser, formatCurrency } = useData();

  const [formData, setFormData] = useState({
    car_name: '',
    brand: '',
    model_year: new Date().getFullYear() - 3,
    fuel: 'Petrol',
    range_driven: '',
    ownership: '1st Owner',
    expected_price: '',
    photos: [],
    photo_url: '',
    notes: '',
    seller_name: currentUser?.full_name || '',
    seller_phone: currentUser?.phone || '',
    seller_email: currentUser?.email || ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    const photos = formData.photos && formData.photos.length > 0 
      ? formData.photos 
      : (formData.photo_url.trim() ? [formData.photo_url.trim()] : [
          "/images/cars/tata-nexon/nexon-1.jpg"
        ]);

    submitSellRequest({
      ...formData,
      photos
    });

    setSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full theme-pill-badge text-xs font-bold uppercase tracking-wider">
          <BadgePercent className="w-3.5 h-3.5" />
          <span>Top Dollar Car Valuation & Instant Spot Payment</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Sell or Exchange Your Car in <span className="text-luxury-gradient">Daltonganj</span>
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          Get the highest market appraisal, immediate cash settlement, and 100% guaranteed free RC transfer directly from Shri Krishna Motors.
        </p>
      </div>

      {/* 3 Step Selling Advantage (Luminous Light Luxury Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 rounded-3xl duo-card-light space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-slate-900 text-[var(--theme-primary)] flex items-center justify-center font-black text-base shadow-sm">
            1
          </div>
          <h3 className="font-black text-slate-950 text-base">Online Valuation</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">Submit vehicle specifications & expected price in under 2 minutes.</p>
        </div>
        <div className="p-6 rounded-3xl duo-card-light space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-slate-900 text-[var(--theme-primary)] flex items-center justify-center font-black text-base shadow-sm">
            2
          </div>
          <h3 className="font-black text-slate-950 text-base">Showroom Inspection</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">Quick 20-minute physical appraisal at our Ranchi Road yard.</p>
        </div>
        <div className="p-6 rounded-3xl duo-card-light space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-slate-900 text-[var(--theme-primary)] flex items-center justify-center font-black text-base shadow-sm">
            3
          </div>
          <h3 className="font-black text-slate-950 text-base">Instant Payment & RC</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">Immediate bank transfer on the spot with complete legal indemnity.</p>
        </div>
      </div>

      {/* Valuation Submission Form (Luminous Light Studio) */}
      {isSubmitted ? (
        <div className="p-10 rounded-3xl duo-card-light text-center space-y-5 shadow-2xl animate-fade-in">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center border border-emerald-300 shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-950">Car Valuation Request Received!</h2>
            <p className="text-sm text-slate-700 max-w-lg mx-auto leading-relaxed font-medium">
              Thank you, <strong>{formData.seller_name}</strong>. Managing Director Abhishek Verma and the Shri Krishna Motors team will review your <strong>{formData.brand} {formData.car_name}</strong> and contact you at <strong>{formData.seller_phone}</strong> shortly with an offer.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/stock"
              className="px-6 py-3 rounded-2xl btn-luxury text-neutral-950 font-black text-sm shadow-md"
            >
              Browse Stock for Exchange
            </Link>
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-md cursor-pointer"
            >
              Submit Another Vehicle
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-8 sm:p-10 rounded-3xl duo-card-light shadow-2xl space-y-8">
          
          {/* Section 1: Vehicle Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-black text-slate-950 border-b border-slate-200 pb-2">
              <Car className="w-4 h-4 text-amber-600 stroke-[2.5]" />
              <span>1. Vehicle Details</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Brand / Make *</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="e.g. Hyundai, Maruti, Mahindra"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[var(--theme-primary)] focus:ring-2 focus:ring-[var(--theme-primary)]/20 outline-none shadow-xs font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Car Model & Variant *</label>
                <input
                  type="text"
                  name="car_name"
                  value={formData.car_name}
                  onChange={handleChange}
                  placeholder="e.g. Creta SX (O) Diesel, Swift ZXi"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[var(--theme-primary)] focus:ring-2 focus:ring-[var(--theme-primary)]/20 outline-none shadow-xs font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Year of Manufacturing *</label>
                <input
                  type="number"
                  name="model_year"
                  min="2005"
                  max={new Date().getFullYear()}
                  value={formData.model_year}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[var(--theme-primary)] focus:ring-2 focus:ring-[var(--theme-primary)]/20 outline-none shadow-xs font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Fuel Type *</label>
                <select
                  name="fuel"
                  value={formData.fuel}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[var(--theme-primary)] outline-none shadow-xs font-medium"
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
                  name="range_driven"
                  value={formData.range_driven}
                  onChange={handleChange}
                  placeholder="e.g. 35000"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[var(--theme-primary)] focus:ring-2 focus:ring-[var(--theme-primary)]/20 outline-none shadow-xs font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Ownership *</label>
                <select
                  name="ownership"
                  value={formData.ownership}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[var(--theme-primary)] outline-none shadow-xs font-medium"
                >
                  <option value="1st Owner">1st Owner</option>
                  <option value="2nd Owner">2nd Owner</option>
                  <option value="3rd Owner">3rd Owner</option>
                  <option value="4th+ Owner">4th+ Owner</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Expected Price & Photos */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-black text-slate-950 border-b border-slate-200 pb-2">
              <IndianRupee className="w-4 h-4 text-amber-600 stroke-[2.5]" />
              <span>2. Expected Valuation & Photos</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">Expected Price (₹) *</label>
              <input
                type="number"
                name="expected_price"
                value={formData.expected_price}
                onChange={handleChange}
                placeholder="e.g. 750000"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[var(--theme-primary)] focus:ring-2 focus:ring-[var(--theme-primary)]/20 outline-none shadow-xs font-medium"
                required
              />
            </div>

            {/* Device Image Picker */}
            <DeviceImagePicker
              photos={formData.photos}
              onChange={(newPhotos) => setFormData(prev => ({ ...prev, photos: newPhotos }))}
              minPhotos={1}
              maxPhotos={6}
              label="Car Photos (Upload from Device)"
              description="Upload exterior (front, side, rear) and interior photos from your phone or computer. Images are optimized automatically."
              theme="light"
            />

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">Additional Vehicle Notes / Condition Details</label>
              <textarea
                name="notes"
                rows="3"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Mention any service records, scratch/dent details, insurance status, or if you want to exchange with a specific car in our stock."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[var(--theme-primary)] focus:ring-2 focus:ring-[var(--theme-primary)]/20 outline-none shadow-xs font-medium"
              />
            </div>
          </div>

          {/* Section 3: Contact Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-black text-slate-950 border-b border-slate-200 pb-2">
              <User className="w-4 h-4 text-amber-600 stroke-[2.5]" />
              <span>3. Seller Contact Details</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Your Full Name *</label>
                <input
                  type="text"
                  name="seller_name"
                  value={formData.seller_name}
                  onChange={handleChange}
                  placeholder="e.g. Amit Kumar Singh"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[var(--theme-primary)] focus:ring-2 focus:ring-[var(--theme-primary)]/20 outline-none shadow-xs font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Mobile / WhatsApp Number *</label>
                <input
                  type="tel"
                  name="seller_phone"
                  value={formData.seller_phone}
                  onChange={handleChange}
                  placeholder="e.g. 93042 00000"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[var(--theme-primary)] focus:ring-2 focus:ring-[var(--theme-primary)]/20 outline-none shadow-xs font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Email Address</label>
                <input
                  type="email"
                  name="seller_email"
                  value={formData.seller_email}
                  onChange={handleChange}
                  placeholder="e.g. name@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[var(--theme-primary)] focus:ring-2 focus:ring-[var(--theme-primary)]/20 outline-none shadow-xs font-medium"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-black text-base shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-101"
          >
            <span>{submitting ? 'Submitting Valuation Request...' : 'Submit Car to Shri Krishna Motors'}</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5] text-[var(--theme-primary)]" />
          </button>

        </form>
      )}

    </div>
  );
};

