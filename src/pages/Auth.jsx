import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Logo } from '../components/Logo';
import { 
  Car, 
  Lock, 
  Mail, 
  User, 
  Phone, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2,
  Crown,
  ShieldAlert,
  AlertCircle
} from 'lucide-react';

export const Auth = () => {
  const navigate = useNavigate();
  const { login, registerUser, dealerInfo, currentUser } = useData();

  const [mode, setMode] = useState('login'); // 'login', 'register', 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'forgot') {
      setResetSent(true);
      return;
    }

    if (mode === 'register') {
      if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
        setError('A valid 10-digit mobile number is mandatory to register and bid.');
        return;
      }
      try {
        const newUser = registerUser({
          full_name: fullName,
          email,
          phone,
          password,
          role: 'visitor'
        });
        navigate('/stock');
      } catch (err) {
        setError(err.message);
      }
      return;
    }

    // Login mode
    const user = login(email || dealerInfo.email, password);
    if (user.role === 'owner' || user.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/stock');
    }
  };

  const handleQuickLogin = (roleType) => {
    if (roleType === 'owner') {
      const user = login(dealerInfo.email, 'password123');
      navigate('/admin');
    } else if (roleType === 'admin') {
      const user = login('admin.daltonganj@shreekrishnamotors.com', 'password123');
      navigate('/admin');
    } else {
      const user = login('rahul.tiwari@gmail.com', 'password123');
      navigate('/stock');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        
        {/* Brand Header with Luxury Logo */}
        <div className="text-center space-y-3 flex flex-col items-center">
          <Logo variant="icon" size="xl" />
          <div>
            <h1 className="text-2xl font-black text-white">{dealerInfo.name}</h1>
            <p className="text-xs text-neutral-400 mt-1">Owner, Admin & Verified Bidder Portal</p>
          </div>
        </div>

        {/* Auth Card */}
        <div className="p-8 rounded-3xl premium-card shadow-2xl space-y-6 border border-white/10">
          
          {/* Mode Switcher */}
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-neutral-950 border border-white/10 text-xs font-bold">
            <button
              onClick={() => { setMode('login'); setResetSent(false); setError(''); }}
              className={`py-2.5 rounded-xl transition-all cursor-pointer ${
                mode === 'login' ? 'btn-luxury text-neutral-950 font-extrabold shadow-md' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('register'); setResetSent(false); setError(''); }}
              className={`py-2.5 rounded-xl transition-all cursor-pointer ${
                mode === 'register' ? 'btn-luxury text-neutral-950 font-extrabold shadow-md' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Register for Bidding
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          {mode === 'forgot' ? (
            resetSent ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-base font-bold text-white">Reset Instructions Sent</h3>
                <p className="text-xs text-neutral-400">
                  Password reset details have been dispatched to <strong>{email}</strong>.
                </p>
                <button
                  onClick={() => setMode('login')}
                  className="text-xs font-bold text-[var(--theme-primary)] hover:underline pt-2 cursor-pointer"
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">Your Registered Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700/80 text-white text-xs outline-none focus:border-[var(--theme-primary)]"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl btn-luxury text-neutral-950 font-black text-xs shadow-md cursor-pointer"
                >
                  Send Reset Link
                </button>
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-xs text-neutral-400 hover:text-white cursor-pointer"
                  >
                    Back to Login
                  </button>
                </div>
              </form>
            )
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700/80 text-white text-xs outline-none focus:border-[var(--theme-primary)]"
                      required
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-bold text-neutral-300">Mobile / WhatsApp Number *</label>
                      <span className="text-[10px] text-[var(--theme-primary)] font-bold bg-[var(--theme-accent-bg)] px-1.5 py-0.2 rounded border border-[var(--theme-accent-border)]">
                        Required for Bidding
                      </span>
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit mobile number (e.g. 98351 00000)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700/80 text-white text-xs outline-none focus:border-[var(--theme-primary)]"
                      required
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1.5">Email Address *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700/80 text-white text-xs outline-none focus:border-[var(--theme-primary)]"
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-neutral-300">Password *</label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-[11px] text-[var(--theme-primary)] hover:underline cursor-pointer"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700/80 text-white text-xs outline-none focus:border-[var(--theme-primary)]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl btn-luxury text-neutral-950 font-black text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{mode === 'login' ? 'Sign In to Portal' : 'Register & Start Bidding'}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </form>
          )}

          {/* Quick 1-Click Role Logins */}
          <div className="pt-4 border-t border-white/10 space-y-2.5">
            <p className="text-[10px] text-center font-black text-neutral-400 uppercase tracking-widest">
              1-Click Fast Role Sign In
            </p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleQuickLogin('owner')}
                className="p-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-[var(--theme-accent-border)] text-[var(--theme-primary)] font-bold transition-all text-center text-[11px] cursor-pointer"
              >
                <Crown className="w-3.5 h-3.5 mx-auto mb-1 text-[var(--theme-primary)]" />
                <span>Owner</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                className="p-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-blue-500/40 text-blue-300 font-bold transition-all text-center text-[11px] cursor-pointer"
              >
                <ShieldAlert className="w-3.5 h-3.5 mx-auto mb-1 text-blue-400" />
                <span>Admin</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('customer')}
                className="p-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 font-semibold transition-all text-center text-[11px] cursor-pointer"
              >
                <User className="w-3.5 h-3.5 mx-auto mb-1 text-neutral-400" />
                <span>Visitor / Bidder</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

