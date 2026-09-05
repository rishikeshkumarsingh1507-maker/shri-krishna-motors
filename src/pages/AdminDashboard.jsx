import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { 
  LayoutDashboard, 
  Car, 
  Gavel, 
  BadgePercent, 
  Users, 
  History, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Phone, 
  MessageSquare, 
  Eye, 
  ArrowUpRight, 
  ShieldAlert, 
  TrendingUp,
  X,
  Sparkles,
  ExternalLink,
  RotateCcw,
  Crown,
  User,
  AlertTriangle,
  Image as ImageIcon,
  Database,
  Check,
  Copy,
  RefreshCw,
  Server,
  HardDrive,
  Key,
  ShieldCheck
} from 'lucide-react';

export const AdminDashboard = () => {
  const { 
    cars, 
    bids, 
    sellRequests, 
    users, 
    currentUser, 
    addCar, 
    updateCar, 
    deleteCar, 
    toggleAuction, 
    resetCarBids,
    resetAllBids,
    updateUserRole,
    updateSellRequestStatus, 
    convertSellRequestToCar,
    switchRole,
    formatCurrency, 
    formatKM,
    isSupabaseConfigured,
    testSupabaseConnection,
    addUser,
    deleteUser
  } = useData();

  const [activeTab, setActiveTab] = useState('cars'); // 'cars', 'bids', 'requests', 'users', 'history', 'database'
  const [carSearch, setCarSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');
  
  // User Management Modal State
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [userFormData, setUserFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    role: 'visitor'
  });
  const [userFormError, setUserFormError] = useState('');

  const handleUserFormSubmit = (e) => {
    e.preventDefault();
    setUserFormError('');
    try {
      addUser(userFormData);
      setUserModalOpen(false);
      setUserFormData({ full_name: '', email: '', phone: '', role: 'visitor' });
    } catch (err) {
      setUserFormError(err.message);
    }
  };

  // Supabase Database Management State
  const [supabaseTestResult, setSupabaseTestResult] = useState(null);
  const [isTestingSupabase, setIsTestingSupabase] = useState(false);
  const [copiedSqlSuccess, setCopiedSqlSuccess] = useState(false);

  const handleTestSupabase = async () => {
    setIsTestingSupabase(true);
    setSupabaseTestResult(null);
    try {
      const res = await testSupabaseConnection();
      setSupabaseTestResult(res);
    } catch (err) {
      setSupabaseTestResult({ success: false, configured: true, message: err.message });
    } finally {
      setIsTestingSupabase(false);
    }
  };

  const handleCopySql = () => {
    const sqlText = `-- SHRI KRISHNA MOTORS SUPABASE SCHEMA
-- Open Supabase Dashboard > SQL Editor > Paste & Run
-- (Full schema is saved in supabase_schema.sql in the root directory)`;
    navigator.clipboard?.writeText(sqlText);
    setCopiedSqlSuccess(true);
    setTimeout(() => setCopiedSqlSuccess(false), 2500);
  };
  
  // Add / Edit Car Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCarId, setEditingCarId] = useState(null);
  const [carFormError, setCarFormError] = useState('');
  
  const [carFormData, setCarFormData] = useState({
    title: '',
    brand: '',
    model: '',
    model_year: 2022,
    fuel: 'Petrol',
    transmission: 'Manual',
    range_driven: '',
    ownership: '1st Owner',
    accidental: 'Non-Accidental Certified',
    mileage: '18.0 km/l',
    price: '',
    starting_bid: '',
    bid_enabled: true,
    status: 'Available',
    photos: [
      '/images/cars/tata-nexon/nexon-1.jpg',
      '/images/cars/tata-nexon/nexon-2.jpg',
      '/images/cars/tata-nexon/nexon-3.jpg'
    ],
    newPhotoInput: '',
    video: '',
    description: '',
    insurance_validity: 'Valid',
    rc_status: 'Verified (JH-03)'
  });

  // Calculate KPIs
  const availableCarsCount = cars.filter(c => c.status === 'Available').length;
  const activeAuctionsCount = cars.filter(c => c.bid_enabled && c.status === 'Available').length;
  const topBidAmount = bids.reduce((max, b) => Math.max(max, Number(b.amount) || 0), 0);
  const pendingRequestsCount = sellRequests.filter(r => r.status === 'Pending').length;

  // Filtered Cars for Table
  const filteredCars = cars.filter(c => 
    c.title.toLowerCase().includes(carSearch.toLowerCase()) ||
    c.brand.toLowerCase().includes(carSearch.toLowerCase()) ||
    (c.status && c.status.toLowerCase().includes(carSearch.toLowerCase()))
  );

  // Filtered Users for Table
  const filteredUsers = users.filter(u => 
    u.full_name?.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email?.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.phone?.includes(userSearch) ||
    u.role?.toLowerCase().includes(userSearch.toLowerCase())
  );

  // If unauthorized visitor
  if (currentUser?.role !== 'owner' && currentUser?.role !== 'admin') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto border border-red-500/30">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">Dealership Portal Restricted</h2>
        <p className="text-sm text-neutral-400">
          You are currently signed in as a Visitor. Switch role to Owner or Admin to access the Shri Krishna Motors Management Dashboard.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => switchRole('owner')}
            className="px-6 py-3 rounded-xl btn-luxury text-neutral-950 font-bold text-xs shadow-lg transition-all cursor-pointer"
          >
            Switch to Owner Mode
          </button>
          <button
            onClick={() => switchRole('admin')}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg transition-all cursor-pointer"
          >
            Switch to Admin Mode
          </button>
        </div>
      </div>
    );
  }

  const handleOpenAddModal = () => {
    setEditingCarId(null);
    setCarFormError('');
    setCarFormData({
      title: '',
      brand: '',
      model: '',
      model_year: 2022,
      fuel: 'Petrol',
      transmission: 'Manual',
      range_driven: '',
      ownership: '1st Owner',
      accidental: 'Non-Accidental Certified',
      mileage: '18.0 km/l',
      price: '',
      starting_bid: '',
      bid_enabled: true,
      status: 'Available',
      photos: [
        '/images/cars/tata-nexon/nexon-1.jpg',
        '/images/cars/tata-nexon/nexon-2.jpg',
        '/images/cars/tata-nexon/nexon-3.jpg'
      ],
      newPhotoInput: '',
      video: '',
      description: '',
      insurance_validity: 'Valid',
      rc_status: 'Verified (JH-03)'
    });
    setModalOpen(true);
  };

  const handleOpenEditModal = (car) => {
    setEditingCarId(car.id);
    setCarFormError('');
    setCarFormData({
      title: car.title,
      brand: car.brand,
      model: car.model || '',
      model_year: car.model_year,
      fuel: car.fuel,
      transmission: car.transmission,
      range_driven: car.range_driven,
      ownership: car.ownership || '1st Owner',
      accidental: car.accidental || 'Non-Accidental Certified',
      mileage: car.mileage || '18.0 km/l',
      price: car.price,
      starting_bid: car.starting_bid || car.current_bid || '',
      bid_enabled: !!car.bid_enabled,
      status: car.status || 'Available',
      photos: car.photos && car.photos.length > 0 ? [...car.photos] : [
        '/images/cars/tata-nexon/nexon-1.jpg',
        '/images/cars/tata-nexon/nexon-2.jpg',
        '/images/cars/tata-nexon/nexon-3.jpg'
      ],
      newPhotoInput: '',
      video: car.video || '',
      description: car.description || '',
      insurance_validity: car.insurance_validity || 'Valid',
      rc_status: car.rc_status || 'Verified'
    });
    setModalOpen(true);
  };

  const handleAddPhoto = () => {
    if (!carFormData.newPhotoInput.trim()) return;
    if (carFormData.photos.length >= 10) {
      setCarFormError('Maximum 10 images allowed.');
      return;
    }
    setCarFormData(prev => ({
      ...prev,
      photos: [...prev.photos, prev.newPhotoInput.trim()],
      newPhotoInput: ''
    }));
    setCarFormError('');
  };

  const handleRemovePhoto = (index) => {
    if (carFormData.photos.length <= 3) {
      setCarFormError('Minimum 3 images are required for publishing.');
      return;
    }
    setCarFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
    setCarFormError('');
  };

  const handleCarFormSubmit = (e) => {
    e.preventDefault();
    setCarFormError('');

    if (carFormData.photos.length < 3) {
      setCarFormError('Minimum 3 images are required before publishing to the site.');
      return;
    }

    if (carFormData.photos.length > 10) {
      setCarFormError('Maximum 10 images are allowed at the time of publishing.');
      return;
    }

    const carData = {
      title: carFormData.title,
      brand: carFormData.brand,
      model: carFormData.model || carFormData.title,
      model_year: Number(carFormData.model_year),
      fuel: carFormData.fuel,
      transmission: carFormData.transmission,
      range_driven: Number(carFormData.range_driven) || 0,
      ownership: carFormData.ownership,
      accidental: carFormData.accidental,
      mileage: carFormData.mileage,
      price: Number(carFormData.price),
      starting_bid: Number(carFormData.starting_bid) || Number(carFormData.price) * 0.8,
      bid_enabled: carFormData.bid_enabled,
      status: carFormData.status,
      photos: carFormData.photos,
      video: carFormData.video,
      description: carFormData.description,
      insurance_validity: carFormData.insurance_validity,
      rc_status: carFormData.rc_status
    };

    try {
      if (editingCarId) {
        updateCar(editingCarId, carData);
      } else {
        addCar(carData);
      }
      setModalOpen(false);
    } catch (err) {
      setCarFormError(err.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="flex items-center gap-4">
          <Logo variant="icon" size="md" />
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2.5">
                <LayoutDashboard className="w-7 h-7 text-[var(--theme-primary)]" />
                <span>Dealership Management Portal</span>
              </h1>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                currentUser?.role === 'owner' ? 'bg-[var(--theme-accent-bg)] text-[var(--theme-primary)] border-[var(--theme-accent-border)]' : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
              }`}>
                {currentUser?.role === 'owner' ? 'Owner Privileges' : 'Admin'}
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              Active: <strong className="text-white">{currentUser?.full_name}</strong> • Shri Krishna Motors Daltonganj
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Supabase Status Pill */}
          <button
            onClick={() => setActiveTab('database')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-bold transition-all shadow-sm cursor-pointer ${
              isSupabaseConfigured
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30 hover:bg-emerald-900/60'
                : 'bg-amber-950/60 text-amber-300 border-amber-500/30 hover:bg-amber-900/60'
            }`}
            title="Click to view database synchronization & credentials"
          >
            <Database className="w-3.5 h-3.5" />
            <span>{isSupabaseConfigured ? 'Supabase Live' : 'Supabase Offline / Demo'}</span>
            <span className={`w-2 h-2 rounded-full ${isSupabaseConfigured ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
          </button>

          {/* Owner Global Reset Bidding Button */}
          {currentUser?.role === 'owner' && (
            <button
              onClick={() => {
                if (window.confirm("RESET ALL BIDS: Are you sure you want to reset all vehicle auctions back to their starting prices?")) {
                  resetAllBids();
                }
              }}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-950/60 hover:bg-red-900/60 text-red-400 border border-red-500/30 text-xs font-bold transition-all shadow-md"
              title="Reset all active vehicle bidding cycles"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset All Bids</span>
            </button>
          )}

          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl btn-luxury text-xs shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Car</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Cars */}
        <div className="premium-card premium-card-hover p-5 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span className="font-bold uppercase tracking-wider">Live Inventory</span>
            <Car className="w-4 h-4 text-[var(--theme-primary)]" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white">{cars.length}</p>
          <p className="text-[11px] text-emerald-400 font-medium">{availableCarsCount} Available for sale</p>
        </div>

        {/* KPI 2: Total Bids */}
        <div className="premium-card premium-card-hover p-5 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span className="font-bold uppercase tracking-wider">Total Bids</span>
            <Gavel className="w-4 h-4 text-[var(--theme-primary)]" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-[var(--theme-primary)]">{bids.length}</p>
          <p className="text-[11px] text-neutral-400">Top Bid: <strong className="text-white">{formatCurrency(topBidAmount)}</strong></p>
        </div>

        {/* KPI 3: Sell Requests */}
        <div className="premium-card premium-card-hover p-5 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span className="font-bold uppercase tracking-wider">Trade-in Leads</span>
            <BadgePercent className="w-4 h-4 text-[var(--theme-primary)]" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white">{sellRequests.length}</p>
          <p className="text-[11px] text-[var(--theme-primary)] font-medium">{pendingRequestsCount} Pending review</p>
        </div>

        {/* KPI 4: Users Directory */}
        <div className="premium-card premium-card-hover p-5 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span className="font-bold uppercase tracking-wider">Users Directory</span>
            <Users className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-sky-400">{users.length}</p>
          <p className="text-[11px] text-neutral-400">Owner, Admins & Visitors</p>
        </div>

      </div>

      {/* Main Tabs Navigation (Inventory separate from Users) */}
      <div className="space-y-6">
        
        <div className="flex items-center gap-2 p-2 rounded-2xl bg-neutral-900/80 border border-white/10 overflow-x-auto">
          {[
            { id: 'cars', label: `Cars Inventory (${cars.length})`, icon: Car },
            { id: 'bids', label: `Bids Log (${bids.length})`, icon: Gavel },
            { id: 'users', label: `Users & Roles (${users.length})`, icon: Users },
            { id: 'requests', label: `Sell Leads (${sellRequests.length})`, icon: BadgePercent, alert: pendingRequestsCount > 0 },
            { id: 'history', label: 'Auction History', icon: History },
            { id: 'database', label: 'Supabase Database', icon: Database, alert: !isSupabaseConfigured }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer ${
                  active
                    ? 'btn-luxury text-neutral-950 shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/80'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.alert && (
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: CARS INVENTORY MANAGEMENT */}
        {activeTab === 'cars' && (
          <div className="space-y-4">
            
            {/* Table Search Bar */}
            <div className="flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={carSearch}
                  onChange={(e) => setCarSearch(e.target.value)}
                  placeholder="Search inventory by title, make, or status..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs outline-none focus:border-[var(--theme-primary)]"
                />
              </div>
            </div>

            {/* Cars Table */}
            <div className="rounded-3xl bg-neutral-900 border border-neutral-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-neutral-300">
                  <thead className="bg-neutral-950 text-neutral-400 uppercase tracking-wider font-bold border-b border-neutral-800 text-[11px]">
                    <tr>
                      <th className="p-4">Car Details & Photos</th>
                      <th className="p-4">Specs</th>
                      <th className="p-4">Price / Top Bid</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Auction & Reset</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/80">
                    {filteredCars.map(car => (
                      <tr key={car.id} className="hover:bg-neutral-800/40 transition-colors">
                        
                        {/* Car Details with thumbnail */}
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={car.photos?.[0] || '/images/cars/tata-nexon/nexon-1.jpg'}
                              alt=""
                              className="w-14 h-11 rounded-xl object-cover bg-neutral-950 border border-neutral-800"
                            />
                            <div>
                              <Link to={`/car/${car.id}`} className="font-bold text-white hover:text-[var(--theme-primary)] line-clamp-1">
                                {car.title}
                              </Link>
                              <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 mt-0.5">
                                <span>{car.brand} • {car.model_year}</span>
                                <span>•</span>
                                <span className="text-[var(--theme-primary)] font-semibold">{car.photos?.length || 0} photos</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Specs */}
                        <td className="p-4">
                          <p className="font-semibold text-white">{car.fuel} • {car.transmission}</p>
                          <p className="text-neutral-400 text-[11px]">{formatKM(car.range_driven)}</p>
                        </td>

                        {/* Price */}
                        <td className="p-4 font-bold text-white">
                          <p className="text-sm font-extrabold">{formatCurrency(car.price)}</p>
                          {car.bid_enabled && (
                            <p className="text-[var(--theme-primary)] text-[11px]">Top Bid: {formatCurrency(car.current_bid || car.starting_bid)}</p>
                          )}
                        </td>

                        {/* Status Switcher */}
                        <td className="p-4">
                          <select
                            value={car.status}
                            onChange={(e) => updateCar(car.id, { status: e.target.value })}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold outline-none border ${
                              car.status === 'Available' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' :
                              car.status === 'Reserved' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' :
                              'bg-red-500/20 text-red-400 border-red-500/40'
                            }`}
                          >
                            <option value="Available" className="bg-neutral-900 text-white">Available</option>
                            <option value="Reserved" className="bg-neutral-900 text-white">Reserved</option>
                            <option value="Sold" className="bg-neutral-900 text-white">Sold</option>
                          </select>
                        </td>

                        {/* Auction & Reset Button */}
                        <td className="p-4">
                          <div className="flex flex-col gap-1.5">
                            <button
                              onClick={() => toggleAuction(car.id, !car.bid_enabled)}
                              className={`px-3 py-1 rounded-lg text-[11px] font-bold border transition-all text-center cursor-pointer ${
                                car.bid_enabled
                                  ? 'bg-[var(--theme-accent-bg)] text-[var(--theme-primary)] border-[var(--theme-accent-border)]'
                                  : 'bg-neutral-950 text-neutral-400 border-neutral-800'
                              }`}
                            >
                              {car.bid_enabled ? 'Bidding Active' : 'Auction Off'}
                            </button>

                            {/* Reset Single Car Bidding (Owner / Admin) */}
                            {car.bid_enabled && (
                              <button
                                onClick={() => {
                                  if (window.confirm(`Reset live bidding on ${car.title}? Top bid will revert to starting price.`)) {
                                    resetCarBids(car.id);
                                  }
                                }}
                                className="flex items-center justify-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-950 hover:bg-red-950/60 text-red-400 border border-neutral-800 hover:border-red-500/40 text-[10px] font-bold transition-all cursor-pointer"
                                title="Reset top bid back to starting bid"
                              >
                                <RotateCcw className="w-3 dot-3" />
                                <span>Reset Bids</span>
                              </button>
                            )}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              to={`/car/${car.id}`}
                              className="p-2 rounded-xl bg-neutral-800 text-neutral-300 hover:text-white"
                              title="View Public Listing"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                            <button
                              onClick={() => handleOpenEditModal(car)}
                              className="p-2 rounded-xl bg-neutral-800 text-[var(--theme-primary)] hover:bg-neutral-700 cursor-pointer"
                              title="Edit Car Details & Photos"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete ${car.title} from inventory?`)) {
                                  deleteCar(car.id);
                                }
                              }}
                              className="p-2 rounded-xl bg-neutral-800 text-red-400 hover:bg-neutral-700 cursor-pointer"
                              title="Delete Car"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: LIVE BIDS MANAGEMENT */}
        {activeTab === 'bids' && (
          <div className="rounded-3xl bg-neutral-900 border border-neutral-800 overflow-hidden shadow-xl space-y-4 p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
              <div>
                <h3 className="font-extrabold text-white text-base">All Live Bids Log</h3>
                <p className="text-xs text-neutral-400">Audited bids submitted with verified phone numbers.</p>
              </div>
              {currentUser?.role === 'owner' && (
                <button
                  onClick={() => {
                    if (window.confirm("Reset all active bids across all vehicles?")) {
                      resetAllBids();
                    }
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/60 text-red-400 border border-red-500/40 text-xs font-bold transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Bids</span>
                </button>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-neutral-300">
                <thead className="bg-neutral-950 text-neutral-400 uppercase tracking-wider text-[11px] border-b border-neutral-800 font-bold">
                  <tr>
                    <th className="p-4">Car Title</th>
                    <th className="p-4">Bidder Details</th>
                    <th className="p-4">Offer Amount</th>
                    <th className="p-4">Bid Status</th>
                    <th className="p-4">Date</th>
                    <th className="p-4 text-right">Quick Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {bids.map(bid => (
                    <tr key={bid.id} className="hover:bg-neutral-800/40">
                      <td className="p-4 font-bold text-white">
                        <Link to={`/car/${bid.car_id}`} className="hover:text-[var(--theme-primary)]">
                          {bid.car_title || 'Vehicle'}
                        </Link>
                      </td>
                      <td className="p-4">
                        <p className="font-bold text-white">{bid.bidder_name}</p>
                        <p className="text-[11px] text-[var(--theme-primary)] font-mono">{bid.bidder_phone}</p>
                        {bid.bidder_email && <p className="text-[10px] text-neutral-400">{bid.bidder_email}</p>}
                      </td>
                      <td className="p-4 font-black text-[var(--theme-primary)] text-sm">
                        {formatCurrency(bid.amount)}
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          bid.status === 'Active Top Bid' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                          bid.status.includes('Reset') ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                          'bg-neutral-800 text-neutral-400'
                        }`}>
                          {bid.status}
                        </span>
                      </td>
                      <td className="p-4 text-neutral-400 text-[11px]">
                        {new Date(bid.created_date).toLocaleString()}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`https://wa.me/${bid.bidder_phone?.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello ${bid.bidder_name}, this is Abhishek Verma from Shri Krishna Motors regarding your bid of ${formatCurrency(bid.amount)} on ${bid.car_title}.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-emerald-600/30 text-emerald-400 hover:bg-emerald-600/50"
                            title="WhatsApp Bidder"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={`tel:${bid.bidder_phone?.replace(/\s+/g, '')}`}
                            className="p-2 rounded-xl bg-neutral-800 text-[var(--theme-primary)] hover:bg-neutral-700"
                            title="Call Bidder"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: SEPARATE USERS & ROLE MANAGEMENT FUNCTION */}
        {activeTab === 'users' && (
          <div className="rounded-3xl bg-neutral-900 border border-neutral-800 overflow-hidden shadow-xl p-6 space-y-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
              <div>
                <h3 className="font-extrabold text-white text-base">Users & Access Control Directory</h3>
                <p className="text-xs text-neutral-400">
                  Manage registered users and assign permissions: <strong>Owner</strong>, <strong>Admin</strong>, or <strong>Visitor</strong>.
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    placeholder="Filter by name, email, role..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-xs outline-none focus:border-[var(--theme-primary)]"
                  />
                </div>

                {currentUser?.role === 'owner' && (
                  <button
                    onClick={() => {
                      setUserFormData({ full_name: '', email: '', phone: '', role: 'visitor' });
                      setUserFormError('');
                      setUserModalOpen(true);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl btn-luxury text-neutral-950 text-xs font-black shadow-md shrink-0 cursor-pointer"
                    title="Add new user or admin by email"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add User</span>
                  </button>
                )}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-neutral-300">
                <thead className="bg-neutral-950 text-neutral-400 uppercase tracking-wider text-[11px] border-b border-neutral-800 font-bold">
                  <tr>
                    <th className="p-4">User Name</th>
                    <th className="p-4">Email ID</th>
                    <th className="p-4">Mobile Number</th>
                    <th className="p-4">Current Role</th>
                    <th className="p-4 text-right">Role &amp; Account Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {filteredUsers.map(u => (
                    <tr key={u.id} className="hover:bg-neutral-800/40">
                      
                       {/* Name */}
                      <td className="p-4 font-bold text-white">
                        <div className="flex items-center gap-2">
                          {u.role === 'owner' && <Crown className="w-4 h-4 text-[var(--theme-primary)] shrink-0" />}
                          {u.role === 'admin' && <ShieldAlert className="w-4 h-4 text-blue-400 shrink-0" />}
                          {u.role === 'visitor' && <User className="w-4 h-4 text-neutral-400 shrink-0" />}
                          <span>{u.full_name}</span>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="p-4 text-neutral-300 font-mono text-[11px]">
                        {u.email}
                      </td>

                      {/* Phone */}
                      <td className="p-4 text-neutral-400 font-mono">
                        {u.phone || 'N/A'}
                      </td>

                      {/* Role Badge */}
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                          u.role === 'owner' ? 'bg-[var(--theme-accent-bg)] text-[var(--theme-primary)] border-[var(--theme-accent-border)]' :
                          u.role === 'admin' ? 'bg-blue-500/20 text-blue-300 border-blue-500/40' :
                          'bg-neutral-800 text-neutral-300 border-neutral-700'
                        }`}>
                          {u.role}
                        </span>
                      </td>

                      {/* Role Switching & Delete Actions */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => updateUserRole(u.id, 'owner')}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                              u.role === 'owner'
                                ? 'btn-luxury text-neutral-950 shadow-sm'
                                : 'bg-neutral-950 text-neutral-400 hover:text-[var(--theme-primary)] border border-neutral-800'
                            }`}
                            title="Set as Owner"
                          >
                            Owner
                          </button>
                          <button
                            onClick={() => updateUserRole(u.id, 'admin')}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                              u.role === 'admin'
                                ? 'bg-blue-500 text-white shadow-sm'
                                : 'bg-neutral-950 text-neutral-400 hover:text-blue-400 border border-neutral-800'
                            }`}
                            title="Set as Admin"
                          >
                            Admin
                          </button>
                          <button
                            onClick={() => updateUserRole(u.id, 'visitor')}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                              u.role === 'visitor'
                                ? 'bg-neutral-700 text-white shadow-sm'
                                : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
                            }`}
                            title="Set as Visitor"
                          >
                            Visitor
                          </button>

                          {/* Delete User/Admin Button (Only for Owner) */}
                          {currentUser?.role === 'owner' && (
                            <button
                              onClick={() => {
                                if (u.id === 'user-owner' || u.email === 'shreekrishnamotors19@gmail.com') {
                                  alert("The primary Managing Director account cannot be removed.");
                                  return;
                                }
                                if (window.confirm(`Are you sure you want to delete ${u.full_name} (${u.email})?`)) {
                                  deleteUser(u.id);
                                }
                              }}
                              disabled={u.id === 'user-owner' || u.email === 'shreekrishnamotors19@gmail.com'}
                              className={`p-1.5 rounded-lg border transition-all cursor-pointer ml-1 ${
                                u.id === 'user-owner' || u.email === 'shreekrishnamotors19@gmail.com'
                                  ? 'opacity-20 bg-neutral-900 border-neutral-800 text-neutral-600 cursor-not-allowed'
                                  : 'bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-red-300 border-red-500/30'
                              }`}
                              title={u.id === 'user-owner' || u.email === 'shreekrishnamotors19@gmail.com' ? "Primary owner cannot be removed" : `Delete ${u.role === 'admin' ? 'Admin' : 'User'}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 4: SELL LEADS CRM */}
        {activeTab === 'requests' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-white text-sm">Inbound Car Sell & Valuation Leads</h3>
                <p className="text-xs text-neutral-400">Leads submitted via the public Sell Your Car portal.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sellRequests.map(req => (
                <div key={req.id} className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4 shadow-xl flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold text-[var(--theme-primary)] uppercase tracking-wider">{req.brand} • {req.model_year}</span>
                        <h4 className="text-lg font-bold text-white">{req.car_name}</h4>
                      </div>
                      
                      <select
                        value={req.status}
                        onChange={(e) => updateSellRequestStatus(req.id, e.target.value)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold outline-none border ${
                          req.status === 'Pending' ? 'bg-[var(--theme-accent-bg)] text-[var(--theme-primary)] border-[var(--theme-accent-border)]' :
                          req.status === 'Reviewed' ? 'bg-blue-500/20 text-blue-400 border-blue-500/40' :
                          req.status === 'Contacted' ? 'bg-purple-500/20 text-purple-400 border-purple-500/40' :
                          'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                        }`}
                      >
                        <option value="Pending" className="bg-neutral-900 text-white">Pending</option>
                        <option value="Reviewed" className="bg-neutral-900 text-white">Reviewed</option>
                        <option value="Contacted" className="bg-neutral-900 text-white">Contacted</option>
                        <option value="Closed" className="bg-neutral-900 text-white">Closed</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs p-3 rounded-2xl bg-neutral-950 border border-neutral-800">
                      <div>
                        <span className="text-neutral-400">Expected Price:</span>
                        <p className="font-extrabold text-[var(--theme-primary)] text-sm">{formatCurrency(req.expected_price)}</p>
                      </div>
                      <div>
                        <span className="text-neutral-400">KM & Fuel:</span>
                        <p className="font-semibold text-white">{formatKM(req.range_driven)} • {req.fuel}</p>
                      </div>
                      <div className="col-span-2 pt-1 border-t border-neutral-800/80">
                        <span className="text-neutral-400">Seller Details:</span>
                        <p className="font-bold text-white">{req.seller_name} ({req.seller_phone})</p>
                        {req.notes && <p className="text-[11px] text-neutral-400 italic mt-0.5">"{req.notes}"</p>}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-neutral-800 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/${req.seller_phone?.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello ${req.seller_name}, this is Abhishek Verma from Shri Krishna Motors regarding your ${req.car_name}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-emerald-600/30 text-emerald-400 hover:bg-emerald-600/50 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                      <a
                        href={`tel:${req.seller_phone?.replace(/\s+/g, '')}`}
                        className="px-3 py-1.5 rounded-xl bg-neutral-800 text-neutral-300 hover:text-white text-xs font-semibold flex items-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call</span>
                      </a>
                    </div>

                    {req.status !== 'Closed' && (
                      <button
                        onClick={() => convertSellRequestToCar(req.id)}
                        className="px-3.5 py-1.5 rounded-xl btn-luxury text-neutral-950 text-xs font-bold shadow-sm flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Convert to Stock</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: AUCTION AUDIT & HISTORY */}
        {activeTab === 'history' && (
          <div className="rounded-3xl bg-neutral-900 border border-neutral-800 p-6 space-y-4 shadow-xl">
            <h3 className="font-extrabold text-white text-base">Auction Audit Trail & Historical Transactions</h3>
            <p className="text-xs text-neutral-400">
              Verified record of active bids, winning auctions, and reset transactions in Daltonganj.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h4 className="font-bold text-white text-sm">Tata Nexon XZ+ (O) Diesel</h4>
                  <p className="text-xs text-neutral-400">Top Bidder: <strong>Rahul Tiwari</strong> • Status: Active Top Bid</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-[var(--theme-primary)]">₹8,15,000</p>
                  <span className="text-[10px] text-neutral-400 font-mono">Live Auction</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h4 className="font-bold text-white text-sm">Mahindra XUV 700 AX7 Luxury Pack</h4>
                  <p className="text-xs text-neutral-400">Top Bidder: <strong>Amit Sharma</strong> • Status: Active Top Bid</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-emerald-400">₹18,30,000</p>
                  <span className="text-[10px] text-neutral-400 font-mono">Live Auction</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: SUPABASE DATABASE INTEGRATION & SYNC */}
        {activeTab === 'database' && (
          <div className="space-y-6">
            
            {/* Status & Diagnostic Header */}
            <div className="p-6 sm:p-8 rounded-3xl premium-card border border-white/10 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div className="flex items-center gap-3.5">
                  <div className={`p-3 rounded-2xl border ${
                    isSupabaseConfigured 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  }`}>
                    <Database className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-black text-white">Supabase PostgreSQL Cloud Database</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
                        isSupabaseConfigured 
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      }`}>
                        {isSupabaseConfigured ? 'Connected & Active' : 'Offline / Demo Mode'}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      {isSupabaseConfigured 
                        ? 'Your dealership website is linked to a live Supabase database with Realtime auction broadcasting.' 
                        : 'Currently operating in self-contained local storage mode. Connect Supabase to persist inventory and bids to the cloud.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={handleTestSupabase}
                    disabled={isTestingSupabase}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-white/15 text-xs font-bold transition-all cursor-pointer shadow-md disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isTestingSupabase ? 'animate-spin text-[var(--theme-primary)]' : ''}`} />
                    <span>{isTestingSupabase ? 'Testing Connection...' : 'Test Connection'}</span>
                  </button>

                  <a
                    href="https://supabase.com/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl btn-luxury text-neutral-950 text-xs font-bold shadow-md"
                  >
                    <span>Supabase Dashboard</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Diagnostic Test Result Banner */}
              {supabaseTestResult && (
                <div className={`p-4 rounded-2xl border text-xs font-medium flex items-center justify-between gap-3 animate-fade-in ${
                  supabaseTestResult.success 
                    ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300' 
                    : 'bg-amber-950/60 border-amber-500/40 text-amber-300'
                }`}>
                  <div className="flex items-center gap-2.5">
                    {supabaseTestResult.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    )}
                    <span>{supabaseTestResult.message}</span>
                  </div>
                  <button 
                    onClick={() => setSupabaseTestResult(null)}
                    className="text-neutral-400 hover:text-white p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Database Synced Data Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-neutral-950 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between text-neutral-400 text-xs">
                    <span className="font-semibold">Cars Table</span>
                    <Car className="w-4 h-4 text-[var(--theme-primary)]" />
                  </div>
                  <p className="text-xl font-bold text-white">{cars.length} Records</p>
                  <p className="text-[10px] text-emerald-400">Live Inventory Sync</p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-950 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between text-neutral-400 text-xs">
                    <span className="font-semibold">Bids Table</span>
                    <Gavel className="w-4 h-4 text-amber-400" />
                  </div>
                  <p className="text-xl font-bold text-white">{bids.length} Records</p>
                  <p className="text-[10px] text-sky-400">Realtime Broadcast On</p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-950 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between text-neutral-400 text-xs">
                    <span className="font-semibold">Sell Requests</span>
                    <BadgePercent className="w-4 h-4 text-rose-400" />
                  </div>
                  <p className="text-xl font-bold text-white">{sellRequests.length} Submissions</p>
                  <p className="text-[10px] text-neutral-400">Customer Trade-Ins</p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-950 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between text-neutral-400 text-xs">
                    <span className="font-semibold">Users & Roles</span>
                    <Users className="w-4 h-4 text-purple-400" />
                  </div>
                  <p className="text-xl font-bold text-white">{users.length} Profiles</p>
                  <p className="text-[10px] text-emerald-400">Owner & Admin RBAC</p>
                </div>
              </div>
            </div>

            {/* How to Connect Step-by-Step Guide */}
            <div className="p-6 sm:p-8 rounded-3xl premium-card border border-white/10 space-y-6">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Server className="w-5 h-5 text-[var(--theme-primary)]" />
                  <span>How to Connect Your Supabase Database in 3 Steps</span>
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Follow these steps to link your free Supabase cloud database to Shri Krishna Motors:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Step 1 */}
                <div className="p-5 rounded-2xl bg-neutral-950/80 border border-white/10 space-y-3 relative">
                  <div className="w-7 h-7 rounded-xl bg-[var(--theme-accent-bg)] text-[var(--theme-primary)] border border-[var(--theme-accent-border)] flex items-center justify-center text-xs font-black">
                    1
                  </div>
                  <h4 className="font-bold text-white text-sm">Create Free Project</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Sign up at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-[var(--theme-primary)] underline">supabase.com</a> and click <strong>"New Project"</strong>. Choose your database password and select region (e.g. Mumbai, India).
                  </p>
                </div>

                {/* Step 2 */}
                <div className="p-5 rounded-2xl bg-neutral-950/80 border border-white/10 space-y-3 relative">
                  <div className="w-7 h-7 rounded-xl bg-[var(--theme-accent-bg)] text-[var(--theme-primary)] border border-[var(--theme-accent-border)] flex items-center justify-center text-xs font-black">
                    2
                  </div>
                  <h4 className="font-bold text-white text-sm">Run Schema SQL</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Go to <strong>SQL Editor</strong> in Supabase dashboard, paste the contents of <code className="text-amber-400">supabase_schema.sql</code>, and click <strong>Run</strong>. This creates tables, RLS policies, and seed data.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="p-5 rounded-2xl bg-neutral-950/80 border border-white/10 space-y-3 relative">
                  <div className="w-7 h-7 rounded-xl bg-[var(--theme-accent-bg)] text-[var(--theme-primary)] border border-[var(--theme-accent-border)] flex items-center justify-center text-xs font-black">
                    3
                  </div>
                  <h4 className="font-bold text-white text-sm">Add Keys to .env.local</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Copy <strong>Project URL</strong> and <strong>anon key</strong> from <em>Project Settings &gt; API</em>. Paste them into <code className="text-amber-400">.env.local</code> in this project and restart the Vite server.
                  </p>
                </div>
              </div>

              {/* SQL Schema Copy Box */}
              <div className="p-5 rounded-2xl bg-neutral-950 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4 text-[var(--theme-primary)]" />
                    <span className="text-xs font-bold text-white">Pre-configured Database Migration File</span>
                    <span className="text-[11px] text-neutral-400">(supabase_schema.sql ready in project root)</span>
                  </div>
                  <button
                    onClick={handleCopySql}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-xs font-bold text-neutral-200 border border-white/10 transition-all cursor-pointer"
                  >
                    {copiedSqlSuccess ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSqlSuccess ? 'Copied Path!' : 'Copy Path Reference'}</span>
                  </button>
                </div>
                
                <div className="p-3.5 rounded-xl bg-black/60 font-mono text-xs text-neutral-300 border border-white/5 space-y-1">
                  <p className="text-neutral-500"># In your terminal or code editor, open:</p>
                  <p className="text-amber-400">supabase_schema.sql</p>
                  <p className="text-neutral-400 text-[11px] pt-1">
                    Includes tables: <span className="text-white font-semibold">cars, bids, sell_requests, dealership_users, inquiries</span> with RLS &amp; Realtime publication.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* ADD / EDIT CAR MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto animate-fade-in">
          <div className="premium-card max-w-2xl w-full rounded-3xl p-6 sm:p-8 space-y-6 my-8 border border-white/15 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[var(--theme-accent-bg)] text-[var(--theme-primary)] border border-[var(--theme-accent-border)]">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-white">
                    {editingCarId ? 'Edit Vehicle Details' : 'Publish New Certified Car'}
                  </h3>
                  <p className="text-xs text-neutral-400">Shri Krishna Motors Inventory Management</p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-full bg-neutral-900 text-neutral-400 hover:text-white border border-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {carFormError && (
              <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{carFormError}</span>
              </div>
            )}

            <form onSubmit={handleCarFormSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">Vehicle Title *</label>
                  <input
                    type="text"
                    value={carFormData.title}
                    onChange={(e) => setCarFormData({ ...carFormData, title: e.target.value })}
                    placeholder="e.g. Tata Nexon XZ+ (O) Diesel"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950/90 border border-neutral-700/80 text-white text-xs outline-none focus:border-[var(--theme-primary)]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">Brand / Make *</label>
                  <input
                    type="text"
                    value={carFormData.brand}
                    onChange={(e) => setCarFormData({ ...carFormData, brand: e.target.value })}
                    placeholder="e.g. Tata, Maruti, Mahindra, Honda"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950/90 border border-neutral-700/80 text-white text-xs outline-none focus:border-[var(--theme-primary)]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">Model Year *</label>
                  <input
                    type="number"
                    value={carFormData.model_year}
                    onChange={(e) => setCarFormData({ ...carFormData, model_year: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950/90 border border-neutral-700/80 text-white text-xs outline-none focus:border-[var(--theme-primary)]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">Fuel Type *</label>
                  <select
                    value={carFormData.fuel}
                    onChange={(e) => setCarFormData({ ...carFormData, fuel: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950/90 border border-neutral-700/80 text-white text-xs outline-none focus:border-[var(--theme-primary)] font-medium"
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="CNG">CNG</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">Transmission *</label>
                  <select
                    value={carFormData.transmission}
                    onChange={(e) => setCarFormData({ ...carFormData, transmission: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950/90 border border-neutral-700/80 text-white text-xs outline-none focus:border-[var(--theme-primary)] font-medium"
                  >
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">Kilometers Driven *</label>
                  <input
                    type="number"
                    value={carFormData.range_driven}
                    onChange={(e) => setCarFormData({ ...carFormData, range_driven: e.target.value })}
                    placeholder="e.g. 24000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950/90 border border-neutral-700/80 text-white text-xs outline-none focus:border-[var(--theme-primary)]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">Offer / Buy Price (₹) *</label>
                  <input
                    type="number"
                    value={carFormData.price}
                    onChange={(e) => setCarFormData({ ...carFormData, price: e.target.value })}
                    placeholder="e.g. 875000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950/90 border border-neutral-700/80 text-white text-xs outline-none focus:border-[var(--theme-primary)]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">Starting Bid (₹)</label>
                  <input
                    type="number"
                    value={carFormData.starting_bid}
                    onChange={(e) => setCarFormData({ ...carFormData, starting_bid: e.target.value })}
                    placeholder="e.g. 780000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950/90 border border-neutral-700/80 text-white text-xs outline-none focus:border-[var(--theme-primary)]"
                  />
                </div>
              </div>

              {/* IMAGE MANAGER SECTION: ENFORCES MIN 3, MAX 10 */}
              <div className="p-5 rounded-3xl bg-neutral-950/90 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[var(--theme-primary)]" />
                    <span className="text-xs font-bold text-white">Car Image Gallery</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    carFormData.photos.length >= 3 && carFormData.photos.length <= 10
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {carFormData.photos.length} / 10 Images (Min 3 required)
                  </span>
                </div>

                {/* Thumbnail Preview Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {carFormData.photos.map((photo, index) => (
                    <div key={index} className="relative group rounded-2xl overflow-hidden aspect-[4/3] bg-neutral-900 border border-neutral-800">
                      <img src={photo} alt="" className="w-full h-full object-cover" />
                      <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-neutral-950/80 text-[10px] font-bold text-white">
                        #{index + 1}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(index)}
                        className="absolute top-1.5 right-1.5 p-1 rounded-md bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove this photo"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Photo Input */}
                {carFormData.photos.length < 10 && (
                  <div className="flex gap-2 pt-2">
                    <input
                      type="text"
                      value={carFormData.newPhotoInput}
                      onChange={(e) => setCarFormData({ ...carFormData, newPhotoInput: e.target.value })}
                      placeholder="Enter photo path or URL (e.g. /images/cars/... or https://...)"
                      className="flex-1 px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs outline-none focus:border-[var(--theme-primary)]"
                    />
                    <button
                      type="button"
                      onClick={handleAddPhoto}
                      className="px-4 py-2 rounded-xl btn-luxury text-xs shrink-0"
                    >
                      Add Photo
                    </button>
                  </div>
                )}
              </div>

              {/* Status & Auction Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">Inventory Status</label>
                  <select
                    value={carFormData.status}
                    onChange={(e) => setCarFormData({ ...carFormData, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950/90 border border-neutral-700/80 text-white text-xs outline-none focus:border-[var(--theme-primary)] font-medium"
                  >
                    <option value="Available">Available</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Sold">Sold</option>
                  </select>
                </div>

                <div className="flex items-center gap-3 pt-6">
                  <input
                    type="checkbox"
                    id="bid_enabled"
                    checked={carFormData.bid_enabled}
                    onChange={(e) => setCarFormData({ ...carFormData, bid_enabled: e.target.checked })}
                    className="w-4 h-4 rounded text-[var(--theme-primary)] focus:ring-[var(--theme-primary)] bg-neutral-950 border-neutral-700"
                  />
                  <label htmlFor="bid_enabled" className="text-xs font-bold text-white">
                    Enable Live Public Bidding for this Car
                  </label>
                </div>
              </div>

              {/* Inspection Notes */}
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1.5">Inspection & Overview Notes</label>
                <textarea
                  rows="2"
                  value={carFormData.description}
                  onChange={(e) => setCarFormData({ ...carFormData, description: e.target.value })}
                  placeholder="Mention sunroof, tires, service history, and condition..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950/90 border border-neutral-700/80 text-white text-xs outline-none focus:border-[var(--theme-primary)]"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-bold hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl btn-luxury text-xs shadow-lg"
                >
                  {editingCarId ? 'Save Changes' : 'Publish Car to Stock'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ADD USER MODAL */}
      {userModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto animate-fade-in">
          <div className="premium-card max-w-lg w-full rounded-3xl p-6 sm:p-8 space-y-6 my-8 border border-white/15 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[var(--theme-accent-bg)] text-[var(--theme-primary)] border border-[var(--theme-accent-border)]">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-white">Add New User / Admin</h3>
                  <p className="text-xs text-neutral-400">Register email address directly with access role</p>
                </div>
              </div>
              <button
                onClick={() => setUserModalOpen(false)}
                className="p-2 rounded-full bg-neutral-900 text-neutral-400 hover:text-white border border-white/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {userFormError && (
              <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{userFormError}</span>
              </div>
            )}

            <form onSubmit={handleUserFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1.5">Full Name *</label>
                <input
                  type="text"
                  value={userFormData.full_name}
                  onChange={(e) => setUserFormData({ ...userFormData, full_name: e.target.value })}
                  placeholder="e.g. Rajesh Kumar"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-xs outline-none focus:border-[var(--theme-primary)]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1.5">Email Address *</label>
                <input
                  type="email"
                  value={userFormData.email}
                  onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
                  placeholder="e.g. rajesh.admin@shreekrishnamotors.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-xs outline-none focus:border-[var(--theme-primary)]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1.5">Mobile Number (Optional)</label>
                <input
                  type="tel"
                  value={userFormData.phone}
                  onChange={(e) => setUserFormData({ ...userFormData, phone: e.target.value })}
                  placeholder="e.g. +91 94311 00000"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-xs outline-none focus:border-[var(--theme-primary)]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-2">Assign System Role *</label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'visitor', label: 'Visitor', icon: User, desc: 'Customer / Bidder' },
                    { id: 'admin', label: 'Admin', icon: ShieldAlert, desc: 'Staff / Manager' },
                    { id: 'owner', label: 'Owner', icon: Crown, desc: 'Full Director Access' }
                  ].map(r => {
                    const Icon = r.icon;
                    const selected = userFormData.role === r.id;
                    return (
                      <button
                        type="button"
                        key={r.id}
                        onClick={() => setUserFormData({ ...userFormData, role: r.id })}
                        className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                          selected
                            ? 'bg-[var(--theme-accent-bg)] border-[var(--theme-accent-border)] text-[var(--theme-primary)] shadow-sm'
                            : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="font-bold text-xs">{r.label}</span>
                        <span className="text-[9px] opacity-70">{r.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setUserModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl btn-luxury text-neutral-950 text-xs font-bold shadow-lg cursor-pointer"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
