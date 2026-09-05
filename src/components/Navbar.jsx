import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Logo } from './Logo';
import { 
  Car, 
  MessageSquare, 
  Sparkles, 
  Menu, 
  X, 
  User, 
  LogOut, 
  LayoutDashboard,
  Images,
  Info,
  Phone,
  BadgePercent,
  Crown,
  ShieldAlert,
  ChevronDown,
  Palette,
  Check
} from 'lucide-react';

export const Navbar = () => {
  const { dealerInfo, currentUser, logout, switchRole, theme, setTheme } = useData();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navLinks = [
    { label: 'Stock', path: '/stock', icon: Car },
    { label: 'Sell Your Car', path: '/sell-your-car', icon: BadgePercent },
    { label: 'AI Assistant', path: '/assistant', icon: Sparkles, badge: 'AI' },
    { label: 'Gallery', path: '/gallery', icon: Images },
    { label: 'About', path: '/about', icon: Info },
    { label: 'Contact', path: '/contact', icon: Phone }
  ];

  const themes = [
    { id: 'gold', name: 'Imperial Gold', icon: '👑', desc: 'Royal Amber & Gold Aura', dot: 'bg-amber-400' },
    { id: 'platinum', name: 'Sapphire Platinum', icon: '💎', desc: 'Ice Blue & Silver Sheen', dot: 'bg-sky-400' },
    { id: 'emerald', name: 'Emerald Royale', icon: '🌿', desc: 'British Racing Green', dot: 'bg-emerald-400' },
    { id: 'amethyst', name: 'Velvet Amethyst', icon: '🔮', desc: 'Regal Imperial Violet', dot: 'bg-purple-400' },
    { id: 'ruby', name: 'Ruby Rose Gold', icon: '🍷', desc: 'Sunset Luxury Copper', dot: 'bg-rose-400' },
    { id: 'stealth', name: 'Obsidian Stealth', icon: '🌑', desc: 'Matte Titanium Monolith', dot: 'bg-slate-300' }
  ];

  const currentThemeObj = themes.find(t => t.id === theme) || themes[0];

  const getRoleBadge = (role) => {
    switch (role) {
      case 'owner':
        return { label: 'Owner', color: 'bg-[var(--theme-accent-bg)] text-[var(--theme-primary)] border-[var(--theme-accent-border)]', icon: Crown };
      case 'admin':
        return { label: 'Admin', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40', icon: ShieldAlert };
      default:
        return { label: 'Visitor', color: 'bg-neutral-800 text-neutral-300 border-neutral-700', icon: User };
    }
  };

  const currentRoleBadge = getRoleBadge(currentUser?.role || 'visitor');
  const RoleIcon = currentRoleBadge.icon;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#06080e]/95 backdrop-blur-2xl transition-all shadow-2xl">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-[1650px] mx-auto">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* LEFTMOST SECTION: Brand Logo */}
          <div className="flex items-center gap-6 shrink-0">
            <Logo size="md" />

            {/* Desktop Navigation Links starting immediately after brand */}
            <nav className="hidden lg:flex items-center gap-1 pl-3 border-l border-white/10">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                      active
                        ? 'text-[var(--theme-primary)] bg-[var(--theme-accent-bg)] shadow-sm border border-[var(--theme-accent-border)]'
                        : 'text-neutral-300 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${active ? 'text-[var(--theme-primary)]' : 'text-neutral-400'}`} />
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-[var(--theme-gradient)] text-neutral-950 uppercase shadow-sm">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* RIGHT ACTION BUTTONS */}
          <div className="hidden sm:flex items-center gap-2.5">
            
            {/* Theme Switcher - Compact Luxury Icon Button */}
            <div className="relative">
              <button
                onClick={() => {
                  setThemeDropdownOpen(!themeDropdownOpen);
                  setRoleDropdownOpen(false);
                }}
                className={`relative flex items-center justify-center w-9 h-9 sm:w-9.5 sm:h-9.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border transition-all shadow-sm group ${
                  themeDropdownOpen 
                    ? 'border-[var(--theme-primary)] ring-1 ring-[var(--theme-primary-glow)] bg-neutral-800 text-white' 
                    : 'border-white/10 hover:border-white/25 text-neutral-300 hover:text-white'
                }`}
                title={`Theme & Aesthetics: ${currentThemeObj.name} (Click to switch)`}
                aria-label="Select Theme and Aesthetics"
              >
                <Palette className="w-4 h-4 text-[var(--theme-primary)] group-hover:rotate-12 transition-transform duration-200" />
                {/* Active Theme Color Pip */}
                <span 
                  className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ring-2 ring-[#06080e] shadow-sm transition-all"
                  style={{ backgroundColor: 'var(--theme-primary)' }}
                />
              </button>

              {themeDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-3xl bg-neutral-950/98 border border-white/15 shadow-2xl p-2.5 z-50 animate-fade-in space-y-1 backdrop-blur-2xl">
                  <div className="px-3 py-1.5 border-b border-white/5 flex items-center justify-between">
                    <p className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest">
                      Luxury Color Palettes
                    </p>
                    <span className="text-[10px] text-[var(--theme-primary)] font-bold">6 Presets</span>
                  </div>
                  <div className="space-y-1 pt-1">
                    {themes.map(t => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setTheme(t.id);
                          setThemeDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-2xl text-xs font-semibold text-left transition-all ${
                          theme === t.id 
                            ? 'bg-white/10 text-white border border-white/20 shadow-sm' 
                            : 'text-neutral-300 hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base">{t.icon}</span>
                          <div>
                            <p className="font-bold leading-tight">{t.name}</p>
                            <p className="text-[10px] text-neutral-400">{t.desc}</p>
                          </div>
                        </div>
                        {theme === t.id && <Check className="w-4 h-4 text-[var(--theme-primary)] shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick WhatsApp Support */}
            <a
              href={dealerInfo.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-900/50 text-xs font-semibold transition-all shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">WhatsApp</span>
            </a>

            {/* Authenticated User Menu & Log Out Option */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                {/* User Profile Pill & Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setRoleDropdownOpen(!roleDropdownOpen);
                      setThemeDropdownOpen(false);
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${currentRoleBadge.color}`}
                    title={currentUser.email}
                  >
                    <RoleIcon className="w-3.5 h-3.5" />
                    <span className="max-w-[120px] truncate">{currentUser.full_name?.split(' ')[0] || currentRoleBadge.label}</span>
                    <span className="opacity-70 text-[10px] hidden xl:inline">({currentRoleBadge.label})</span>
                    <ChevronDown className="w-3 h-3 opacity-60" />
                  </button>

                  {roleDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-neutral-950/98 border border-white/15 shadow-2xl p-3 z-50 animate-fade-in space-y-3 backdrop-blur-2xl">
                      <div className="border-b border-white/10 pb-2.5">
                        <p className="text-xs font-extrabold text-white truncate">{currentUser.full_name}</p>
                        <p className="text-[11px] text-neutral-400 font-mono truncate">{currentUser.email}</p>
                        <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${currentRoleBadge.color}`}>
                          {currentRoleBadge.label}
                        </span>
                      </div>

                      {(currentUser.role === 'owner' || currentUser.role === 'admin') && (
                        <Link
                          to="/admin"
                          onClick={() => setRoleDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--theme-accent-bg)] hover:bg-[var(--theme-primary)] text-[var(--theme-primary)] hover:text-neutral-950 text-xs font-bold transition-all"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          <span>Dealership Dashboard</span>
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          logout();
                          setRoleDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-red-950/30 hover:bg-red-900/60 text-red-400 hover:text-red-300 border border-red-500/20 text-xs font-bold transition-all cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Direct Dashboard Link for Admin/Owner */}
                {(currentUser.role === 'owner' || currentUser.role === 'admin') && (
                  <Link
                    to="/admin"
                    className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl btn-luxury text-xs font-black shadow-md"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>Dashboard</span>
                  </Link>
                )}

                {/* Direct Log Out Button */}
                <button
                  onClick={() => logout()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-red-950/40 text-neutral-300 hover:text-red-400 border border-neutral-700/80 hover:border-red-500/40 text-xs font-bold transition-all cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5 text-red-400" />
                  <span className="hidden sm:inline">Log Out</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-xl btn-luxury text-neutral-950 text-xs font-black shadow-md transition-all"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </Link>
            )}

          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-neutral-900 text-neutral-300 hover:text-white border border-white/10"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/10 bg-[#06080e] px-4 pt-3 pb-6 space-y-3 animate-fade-in">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold ${
                  active
                    ? 'text-[var(--theme-primary)] bg-[var(--theme-accent-bg)] border border-[var(--theme-accent-border)]'
                    : 'text-neutral-300 hover:bg-neutral-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${active ? 'text-[var(--theme-primary)]' : 'text-neutral-400'}`} />
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[var(--theme-gradient)] text-neutral-950">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}

          {/* Mobile Theme Selector with 6 presets */}
          <div className="pt-2 border-t border-white/10">
            <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">
              Select Luxury Theme
            </p>
            <div className="grid grid-cols-3 gap-2">
              {themes.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-2xl text-xs font-bold transition-all border ${
                    theme === t.id
                      ? 'bg-[var(--theme-accent-bg)] text-[var(--theme-primary)] border-[var(--theme-accent-border)] shadow-md'
                      : 'bg-neutral-900/90 text-neutral-400 border-white/5'
                  }`}
                >
                  <span className="text-base">{t.icon}</span>
                  <span className="text-[10px] mt-0.5 truncate">{t.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            {currentUser ? (
              <>
                {(currentUser.role === 'owner' || currentUser.role === 'admin') && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl btn-luxury text-sm shadow-md"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Admin Dealership Portal</span>
                  </Link>
                )}

                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-950/30 hover:bg-red-900/50 border border-red-500/30 text-red-400 font-bold text-sm transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out ({currentUser.full_name?.split(' ')[0] || 'User'})</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl btn-luxury text-neutral-950 font-bold text-sm shadow-md"
              >
                <User className="w-4 h-4" />
                <span>Sign In / Register</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

