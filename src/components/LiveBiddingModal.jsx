import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { 
  Gavel, 
  X, 
  AlertCircle, 
  CheckCircle2, 
  Phone, 
  User, 
  LogIn, 
  Crown, 
  ShieldAlert, 
  Lock, 
  UserPlus,
  ShieldCheck,
  Check
} from 'lucide-react';

export const LiveBiddingModal = ({ car, onClose }) => {
  const { placeBid, formatCurrency, currentUser, login, registerUser } = useData();
  
  const currentTopBid = car.current_bid || car.starting_bid || car.price * 0.85;
  const minRequiredBid = currentTopBid + 5000;

  // View state: if logged in -> 'bid', if not -> 'login' or 'register'
  const [viewState, setViewState] = useState(currentUser ? 'bid' : 'login');
  
  // Bidding form fields
  const [bidAmount, setBidAmount] = useState(minRequiredBid);
  const [verifiedPhone, setVerifiedPhone] = useState(currentUser?.phone || '');
  const [verifiedName, setVerifiedName] = useState(currentUser?.full_name || '');

  // Login / Register form fields
  const [loginEmailOrPhone, setLoginEmailOrPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regFullName, setRegFullName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Sync state if currentUser changes
  useEffect(() => {
    if (currentUser) {
      setVerifiedName(currentUser.full_name || '');
      setVerifiedPhone(currentUser.phone || '');
      setViewState('bid');
    }
  }, [currentUser]);

  const quickIncrements = [5000, 10000, 25000, 50000];

  // Handle Login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!loginEmailOrPhone.trim()) {
      setError('Please enter your registered mobile number or email.');
      return;
    }

    try {
      const user = login(loginEmailOrPhone, loginPassword || 'password');
      setVerifiedName(user.full_name);
      setVerifiedPhone(user.phone);
      setViewState('bid');
    } catch (err) {
      setError(err.message || 'Login failed.');
    }
  };

  // Handle Registration
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setError('');

    const cleanPhone = regPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('A valid 10-digit mobile number is mandatory to register and bid.');
      return;
    }

    if (!regFullName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    try {
      const user = registerUser({
        full_name: regFullName,
        email: regEmail || `${cleanPhone}@bidder.in`,
        phone: regPhone,
        password: regPassword || 'password123',
        role: 'visitor'
      });
      setVerifiedName(user.full_name);
      setVerifiedPhone(user.phone);
      setViewState('bid');
    } catch (err) {
      setError(err.message || 'Registration failed.');
    }
  };

  // 1-Click Fast Bidder Auth for demo testing
  const handleQuickDemoLogin = (roleType) => {
    setError('');
    let user;
    if (roleType === 'owner') {
      user = login('shreekrishnamotors19@gmail.com', 'owner123');
    } else if (roleType === 'admin') {
      user = login('admin.daltonganj@shreekrishnamotors.com', 'admin123');
    } else {
      user = login('rahul.tiwari@gmail.com', 'user123');
    }
    setVerifiedName(user.full_name);
    setVerifiedPhone(user.phone);
    setViewState('bid');
  };

  // Handle Bidding Submission
  const handleBidSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!currentUser) {
      setViewState('login');
      setError('Please sign in or register with your mobile number to place a bid.');
      return;
    }

    const cleanPhone = (verifiedPhone || '').replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('A verified 10-digit mobile number is required before placing a bid.');
      return;
    }

    if (Number(bidAmount) <= currentTopBid) {
      setError(`Your bid must be higher than current top bid ₹${(currentTopBid).toLocaleString('en-IN')}. Minimum bid is ₹${(minRequiredBid).toLocaleString('en-IN')}`);
      return;
    }

    setIsSubmitting(true);
    try {
      placeBid(car.id, {
        bidder_name: verifiedName,
        bidder_phone: verifiedPhone,
        bidder_email: currentUser.email,
        amount: Number(bidAmount)
      });
      setSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 2500);
    } catch (err) {
      setError(err.message || 'Could not place bid.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-800 bg-neutral-950/70">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[var(--theme-accent-bg)] text-[var(--theme-primary)] border border-[var(--theme-accent-border)]">
              <Gavel className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base text-white">Live Digital Auction</h3>
              <p className="text-xs text-neutral-400 truncate max-w-xs">{car.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Confirmation Screen */}
        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-black text-white">Bid Recorded Successfully!</h4>
            <p className="text-sm text-neutral-300">
              Your highest bid of <strong className="text-[var(--theme-primary)]">{formatCurrency(bidAmount)}</strong> is now active on <strong>{car.title}</strong>.
            </p>
            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 space-y-1 max-w-sm mx-auto">
              <p>Bidder Name: <strong className="text-white">{verifiedName}</strong></p>
              <p>Verified Mobile: <strong className="text-[var(--theme-primary)]">{verifiedPhone}</strong></p>
              <p className="text-[11px] text-neutral-400 pt-1">Managing Director Abhishek Verma & team will contact you upon auction finalization.</p>
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            
            {/* CURRENT TOP BID INFO BANNER */}
            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between shadow-inner">
              <div>
                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Current Top Bid</p>
                <p className="text-xl font-black text-[var(--theme-primary)]">{formatCurrency(currentTopBid)}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Min. Next Bid</p>
                <p className="text-sm font-extrabold text-white">{formatCurrency(minRequiredBid)}</p>
              </div>
            </div>

            {/* ERROR ALERT */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* SCREEN 1: USER IS NOT LOGGED IN -> REQUIRE LOGIN / REGISTRATION WITH PHONE */}
            {viewState === 'login' && (
              <div className="space-y-4">
                
                {/* Gate Notice */}
                <div className="p-3.5 rounded-2xl bg-[var(--theme-accent-bg)] border border-[var(--theme-accent-border)] text-xs text-neutral-300 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[var(--theme-primary)] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[var(--theme-primary)] block font-bold">Login & Mobile Number Required</strong>
                    <span>To prevent fake offers and ensure genuine auctions, you must be logged in with a valid 10-digit mobile number to bid.</span>
                  </div>
                </div>

                {/* Sub-Tabs: Sign In vs Quick Register */}
                <div className="grid grid-cols-2 p-1 rounded-2xl bg-neutral-950 border border-neutral-800 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => { setViewState('login'); setError(''); }}
                    className="py-2.5 rounded-xl btn-luxury text-neutral-950 font-black shadow-md cursor-pointer"
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => { setViewState('register'); setError(''); }}
                    className="py-2.5 rounded-xl text-neutral-400 hover:text-white cursor-pointer"
                  >
                    New Register (with Mobile)
                  </button>
                </div>

                {/* Sign In Form */}
                <form onSubmit={handleLoginSubmit} className="space-y-3 pt-1">
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1">Mobile Number or Email *</label>
                    <input
                      type="text"
                      value={loginEmailOrPhone}
                      onChange={(e) => setLoginEmailOrPhone(e.target.value)}
                      placeholder="e.g. 9835100000 or email@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-xs outline-none focus:border-[var(--theme-primary)]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1">Password *</label>
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-xs outline-none focus:border-[var(--theme-primary)]"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl btn-luxury text-neutral-950 font-black text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In & Continue to Bid</span>
                  </button>
                </form>

                {/* 1-Click Fast Bidder Auth for demo testing */}
                <div className="pt-3 border-t border-neutral-800 space-y-2">
                  <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest text-center">
                    Or 1-Click Fast Bidder Sign In
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => handleQuickDemoLogin('visitor')}
                      className="p-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 font-bold text-center text-[11px] cursor-pointer"
                    >
                      Visitor (Buyer)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickDemoLogin('admin')}
                      className="p-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-blue-500/40 text-blue-300 font-bold text-center text-[11px] cursor-pointer"
                    >
                      Admin
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickDemoLogin('owner')}
                      className="p-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-[var(--theme-accent-border)] text-[var(--theme-primary)] font-bold text-center text-[11px] cursor-pointer"
                    >
                      Owner
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* SCREEN 2: REGISTRATION FORM WITH MANDATORY PHONE */}
            {viewState === 'register' && (
              <div className="space-y-4">
                
                {/* Gate Notice */}
                <div className="p-3.5 rounded-2xl bg-[var(--theme-accent-bg)] border border-[var(--theme-accent-border)] text-xs text-neutral-300 flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-[var(--theme-primary)] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[var(--theme-primary)] block font-bold">10-Digit Mobile Required for Registration</strong>
                    <span>Your phone number will be used for SMS and WhatsApp bid status notifications.</span>
                  </div>
                </div>

                {/* Sub-Tabs: Sign In vs Quick Register */}
                <div className="grid grid-cols-2 p-1 rounded-2xl bg-neutral-950 border border-neutral-800 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => { setViewState('login'); setError(''); }}
                    className="py-2.5 rounded-xl text-neutral-400 hover:text-white cursor-pointer"
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => { setViewState('register'); setError(''); }}
                    className="py-2.5 rounded-xl btn-luxury text-neutral-950 font-black shadow-md cursor-pointer"
                  >
                    New Register (with Mobile)
                  </button>
                </div>

                {/* Register Form */}
                <form onSubmit={handleRegisterSubmit} className="space-y-3 pt-1">
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={regFullName}
                      onChange={(e) => setRegFullName(e.target.value)}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-xs outline-none focus:border-[var(--theme-primary)]"
                      required
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-neutral-300">Mobile Number (10 Digits) *</label>
                      <span className="text-[10px] text-[var(--theme-primary)] font-bold bg-[var(--theme-accent-bg)] px-1.5 py-0.2 rounded border border-[var(--theme-accent-border)]">
                        Mandatory
                      </span>
                    </div>
                    <input
                      type="tel"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="e.g. 98351 00000"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-xs outline-none focus:border-[var(--theme-primary)]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1">Email Address *</label>
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-xs outline-none focus:border-[var(--theme-primary)]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1">Create Password *</label>
                    <input
                      type="password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-xs outline-none focus:border-[var(--theme-primary)]"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl btn-luxury text-neutral-950 font-black text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Register & Place Bid</span>
                  </button>
                </form>

              </div>
            )}

            {/* SCREEN 3: USER IS LOGGED IN WITH VERIFIED PHONE -> BIDDING FORM */}
            {viewState === 'bid' && (
              <form onSubmit={handleBidSubmit} className="space-y-5">
                
                {/* Verified User & Mobile Banner */}
                <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[var(--theme-accent-bg)] text-[var(--theme-primary)] flex items-center justify-center border border-[var(--theme-accent-border)]">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-white">{verifiedName || currentUser?.full_name}</span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase">
                          {currentUser?.role || 'Verified'}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 font-mono flex items-center gap-1">
                        <Phone className="w-3 h-3 text-[var(--theme-primary)]" />
                        <span>{verifiedPhone || currentUser?.phone || 'Mobile required'}</span>
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setViewState('login')}
                    className="text-[11px] text-[var(--theme-primary)] hover:underline font-bold cursor-pointer"
                  >
                    Switch User
                  </button>
                </div>

                {/* If phone is missing in account, require user to enter it */}
                {(!verifiedPhone || verifiedPhone.replace(/\D/g, '').length < 10) && (
                  <div>
                    <label className="block text-xs font-bold text-red-400 mb-1">
                      Enter Verified 10-Digit Mobile Number *
                    </label>
                    <input
                      type="tel"
                      value={verifiedPhone}
                      onChange={(e) => setVerifiedPhone(e.target.value)}
                      placeholder="e.g. 98351 00000"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-red-500 text-white text-xs outline-none"
                      required
                    />
                  </div>
                )}

                {/* Bid Amount Input */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                    Enter Your Highest Offer Amount (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 font-bold text-lg">
                      ₹
                    </span>
                    <input
                      type="number"
                      min={minRequiredBid}
                      step="1000"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      className="w-full pl-9 pr-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-700 text-white font-black text-lg focus:border-[var(--theme-primary)] focus:ring-1 focus:ring-[var(--theme-primary)] outline-none"
                      placeholder="Enter bid amount"
                      required
                    />
                  </div>

                  {/* Quick Increment Chips */}
                  <div className="flex items-center gap-2 mt-2.5">
                    <span className="text-[11px] text-neutral-400 font-medium">Quick add:</span>
                    {quickIncrements.map((inc) => (
                      <button
                        key={inc}
                        type="button"
                        onClick={() => setBidAmount(currentTopBid + inc)}
                        className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-[var(--theme-accent-bg)] text-neutral-300 hover:text-[var(--theme-primary)] border border-neutral-700 text-xs font-bold transition-all cursor-pointer"
                      >
                        +{formatCurrency(inc).replace('₹', '')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-2 border-t border-neutral-800">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-1/3 py-3 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-2/3 py-3 rounded-2xl btn-luxury text-neutral-950 text-xs font-black shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Gavel className="w-4 h-4" />
                    <span>{isSubmitting ? 'Recording Bid...' : `Confirm Bid of ${formatCurrency(bidAmount)}`}</span>
                  </button>
                </div>

              </form>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
