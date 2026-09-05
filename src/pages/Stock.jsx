import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { CarCard } from '../components/CarCard';
import { 
  Search, 
  Car, 
  Gavel, 
  RefreshCw,
  Sparkles,
  ShieldCheck,
  BadgePercent
} from 'lucide-react';

export const Stock = () => {
  const { cars } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFuel, setSelectedFuel] = useState('All');
  const [selectedTransmission, setSelectedTransmission] = useState('All');
  const [selectedSort, setSelectedSort] = useState('newest');
  const [activeView, setActiveView] = useState('all'); // 'all', 'auctions_only', 'direct_sale'

  const fuelOptions = ['All', 'Petrol', 'Diesel'];
  const transmissionOptions = ['All', 'Manual', 'Automatic'];

  const filteredCars = useMemo(() => {
    let result = [...cars];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c => 
        c.title.toLowerCase().includes(q) ||
        c.brand.toLowerCase().includes(q) ||
        (c.model && c.model.toLowerCase().includes(q))
      );
    }

    // Fuel filter
    if (selectedFuel !== 'All') {
      result = result.filter(c => c.fuel.toLowerCase() === selectedFuel.toLowerCase());
    }

    // Transmission filter
    if (selectedTransmission !== 'All') {
      result = result.filter(c => c.transmission.toLowerCase() === selectedTransmission.toLowerCase());
    }

    // View filter (all vs auctions only vs direct sale)
    if (activeView === 'auctions_only') {
      result = result.filter(c => c.bid_enabled && c.status === 'Available');
    } else if (activeView === 'direct_sale') {
      result = result.filter(c => c.status === 'Available');
    }

    // Sorting
    if (selectedSort === 'price_low') {
      result.sort((a, b) => (a.current_bid || a.price) - (b.current_bid || b.price));
    } else if (selectedSort === 'price_high') {
      result.sort((a, b) => (b.current_bid || b.price) - (a.current_bid || a.price));
    } else if (selectedSort === 'highest_bid') {
      result.sort((a, b) => (b.current_bid || 0) - (a.current_bid || 0));
    } else {
      // newest
      result.sort((a, b) => new Date(b.created_date || 0) - new Date(a.created_date || 0));
    }

    return result;
  }, [cars, searchQuery, selectedFuel, selectedTransmission, selectedSort, activeView]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedFuel('All');
    setSelectedTransmission('All');
    setSelectedSort('newest');
    setActiveView('all');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full theme-pill-badge text-xs font-bold uppercase tracking-wider mb-2">
            <Car className="w-3.5 h-3.5" />
            <span>Unified Live Stock & Digital Auctions</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Pre-Owned Inventory & <span className="text-luxury-gradient">Live Bidding</span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Browse verified inventory or place your highest digital bid directly on active vehicle auctions.
          </p>
        </div>

        <button
          onClick={resetFilters}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 text-neutral-300 text-xs font-bold transition-colors shadow-sm cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>

      {/* Unified Tab Switcher (All vs Live Bids) */}
      <div className="flex items-center gap-2 p-1 rounded-2xl bg-neutral-900/90 border border-white/10 max-w-md backdrop-blur-xl">
        <button
          onClick={() => setActiveView('all')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeView === 'all'
              ? 'btn-luxury text-neutral-950 shadow-md font-extrabold'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Car className="w-3.5 h-3.5" />
          <span>All Stock ({cars.length})</span>
        </button>
        <button
          onClick={() => setActiveView('auctions_only')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeView === 'auctions_only'
              ? 'btn-luxury text-neutral-950 shadow-md font-extrabold'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Gavel className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Place Highest Bid Now</span>
        </button>
      </div>

      {/* Filter Bar: Luminous Light Luxury Panel */}
      <div className="p-5 rounded-3xl duo-card-light space-y-4">
        
        {/* Top Row: Search & Sort */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by make, model, variant (e.g. Nexon, Swift)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-300 text-slate-900 text-xs outline-none focus:border-[var(--theme-primary)] focus:ring-2 focus:ring-[var(--theme-primary)]/20 shadow-xs font-semibold placeholder:text-slate-400"
            />
          </div>

          {/* Sort Select */}
          <div className="sm:col-span-4">
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-slate-300 text-slate-900 text-xs outline-none focus:border-[var(--theme-primary)] font-bold shadow-xs cursor-pointer"
            >
              <option value="newest">Sort: Newest Listed</option>
              <option value="price_low">Sort: Price: Low to High</option>
              <option value="price_high">Sort: Price: High to Low</option>
              <option value="highest_bid">Sort: Highest Bids</option>
            </select>
          </div>
        </div>

        {/* Bottom Row: Fuel & Gearbox */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-200">
          
          {/* Fuel Options */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-slate-700 mr-1">Fuel:</span>
            {fuelOptions.map(fuel => (
              <button
                key={fuel}
                onClick={() => setSelectedFuel(fuel)}
                className={`px-3.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedFuel === fuel
                    ? 'bg-slate-950 text-white font-extrabold shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300 shadow-xs'
                }`}
              >
                {fuel}
              </button>
            ))}
          </div>

          {/* Transmission Options */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-slate-700 mr-1">Transmission:</span>
            {transmissionOptions.map(tx => (
              <button
                key={tx}
                onClick={() => setSelectedTransmission(tx)}
                className={`px-3.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedTransmission === tx
                    ? 'bg-slate-950 text-white font-extrabold shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300 shadow-xs'
                }`}
              >
                {tx}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Inventory Grid */}
      {filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl premium-card space-y-4">
          <Car className="w-12 h-12 text-neutral-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Vehicles Matching Criteria</h3>
          <p className="text-xs text-neutral-400 max-w-md mx-auto">
            Try adjusting your search query or reset fuel filters to view all available cars in Daltonganj.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 rounded-xl btn-luxury text-neutral-950 font-black text-xs cursor-pointer shadow-md"
          >
            Clear All Filters
          </button>
        </div>
      )}

    </div>
  );
};

