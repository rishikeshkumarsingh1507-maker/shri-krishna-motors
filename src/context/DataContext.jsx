import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialCars, initialBids, initialSellRequests, initialUsers, dealerInfo } from '../data/initialData';
import { 
  supabase, 
  isSupabaseConfigured, 
  testSupabaseConnection,
  dbFetchCars, 
  dbAddCar, 
  dbUpdateCar, 
  dbDeleteCar,
  dbFetchBids, 
  dbSaveBid, 
  dbResetCarBids, 
  dbResetAllBids,
  dbFetchSellRequests, 
  dbSaveSellRequest, 
  dbUpdateSellRequestStatus,
  dbFetchUsers, 
  dbSaveUser, 
  dbUpdateUserRole,
  dbDeleteUser
} from '../lib/supabase';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // Theme state ('gold' | 'platinum' | 'emerald' | 'amethyst' | 'ruby' | 'stealth')
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('skm_theme') || 'gold';
  });

  useEffect(() => {
    localStorage.setItem('skm_theme', theme);
    if (theme === 'gold') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  // Cars state (retains Tata Nexon, Maruti Swift, Mahindra Scorpio-N, Hyundai Creta)
  const [cars, setCars] = useState(() => {
    const saved = localStorage.getItem('skm_cars_v4');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {}
    }
    return initialCars;
  });

  // Bids state
  const [bids, setBids] = useState(() => {
    const saved = localStorage.getItem('skm_bids_v4');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return initialBids;
  });

  // Sell Requests state
  const [sellRequests, setSellRequests] = useState(() => {
    const saved = localStorage.getItem('skm_sell_requests_v2');
    return saved ? JSON.parse(saved) : initialSellRequests;
  });

  // Users state
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('skm_users_v2');
    return saved ? JSON.parse(saved) : initialUsers;
  });

  // Current logged in user (defaults to Owner / Managing Director)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('skm_current_user_v2');
    return saved ? JSON.parse(saved) : {
      id: "user-owner",
      full_name: "Abhishek Verma (Owner)",
      email: "shreekrishnamotors19@gmail.com",
      role: "owner",
      phone: "+91 93042 35814"
    };
  });

  // Toast notifications
  const [toast, setToast] = useState(null);

  const showToast = (title, message, type = 'success') => {
    setToast({ title, message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Sync to localStorage as offline cache
  useEffect(() => {
    localStorage.setItem('skm_cars_v4', JSON.stringify(cars));
  }, [cars]);

  useEffect(() => {
    localStorage.setItem('skm_bids_v4', JSON.stringify(bids));
  }, [bids]);

  useEffect(() => {
    localStorage.setItem('skm_sell_requests_v2', JSON.stringify(sellRequests));
  }, [sellRequests]);

  useEffect(() => {
    localStorage.setItem('skm_users_v2', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('skm_current_user_v2', JSON.stringify(currentUser));
  }, [currentUser]);

  // --------------------------------------------------------------------------
  // SUPABASE DATABASE INITIALIZATION & REALTIME SYNCHRONIZATION
  // --------------------------------------------------------------------------
  useEffect(() => {
    let isMounted = true;

    const initSupabaseData = async () => {
      if (!isSupabaseConfigured || !supabase) return;

      try {
        const [carsRes, bidsRes, reqsRes, usersRes] = await Promise.allSettled([
          dbFetchCars(),
          dbFetchBids(),
          dbFetchSellRequests(),
          dbFetchUsers()
        ]);

        if (!isMounted) return;

        if (carsRes.status === 'fulfilled' && Array.isArray(carsRes.value) && carsRes.value.length > 0) {
          setCars(carsRes.value);
        }
        if (bidsRes.status === 'fulfilled' && Array.isArray(bidsRes.value) && bidsRes.value.length > 0) {
          setBids(bidsRes.value);
        }
        if (reqsRes.status === 'fulfilled' && Array.isArray(reqsRes.value) && reqsRes.value.length > 0) {
          setSellRequests(reqsRes.value);
        }
        if (usersRes.status === 'fulfilled' && Array.isArray(usersRes.value) && usersRes.value.length > 0) {
          setUsers(usersRes.value);
        }
      } catch (err) {
        console.warn('Supabase sync warning (using offline/local cache):', err.message);
      }
    };

    initSupabaseData();

    // Subscribe to real-time events on bids & inventory
    let realtimeChannel = null;
    if (isSupabaseConfigured && supabase) {
      realtimeChannel = supabase
        .channel('skm-realtime-public')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'bids' }, (payload) => {
          if (payload.eventType === 'INSERT') {
            const newBid = payload.new;
            setBids(prev => {
              if (prev.some(b => b.id === newBid.id)) return prev;
              return [newBid, ...prev.map(b => b.car_id === newBid.car_id ? { ...b, status: "Outbid" } : b)];
            });
            setCars(prev => prev.map(c => c.id === newBid.car_id ? { ...c, current_bid: newBid.amount } : c));
          }
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'cars' }, (payload) => {
          if (payload.eventType === 'INSERT') {
            setCars(prev => prev.some(c => c.id === payload.new.id) ? prev : [payload.new, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setCars(prev => prev.map(c => c.id === payload.new.id ? { ...c, ...payload.new } : c));
          } else if (payload.eventType === 'DELETE') {
            setCars(prev => prev.filter(c => c.id !== payload.old.id));
          }
        })
        .subscribe();
    }

    return () => {
      isMounted = false;
      if (realtimeChannel && supabase) {
        supabase.removeChannel(realtimeChannel);
      }
    };
  }, []);

  // --------------------------------------------------------------------------
  // CAR OPERATIONS
  // --------------------------------------------------------------------------
  const addCar = (newCar) => {
    const photos = Array.isArray(newCar.photos) ? newCar.photos.filter(p => p && p.trim()) : [];
    if (photos.length < 3) {
      showToast("Publishing Error", "Minimum 3 images are required to publish a car.", "error");
      throw new Error("Minimum 3 images are required to publish a car.");
    }
    if (photos.length > 10) {
      showToast("Publishing Error", "Maximum 10 images allowed per vehicle listing.", "error");
      throw new Error("Maximum 10 images allowed per vehicle listing.");
    }

    const car = {
      ...newCar,
      id: `car-${Date.now()}`,
      photos,
      current_bid: Number(newCar.starting_bid) || 0,
      created_date: new Date().toISOString()
    };

    // Optimistic UI state update
    setCars(prev => [car, ...prev]);
    showToast("Car Added", `${car.title} is now published in live stock!`, "success");

    // Supabase cloud persistence
    if (isSupabaseConfigured) {
      dbAddCar(car).catch(err => {
        console.error("Supabase addCar error:", err);
      });
    }

    return car;
  };

  const updateCar = (id, updatedFields) => {
    if (updatedFields.photos) {
      const photos = Array.isArray(updatedFields.photos) ? updatedFields.photos.filter(p => p && p.trim()) : [];
      if (photos.length < 3) {
        showToast("Validation Error", "Minimum 3 images are required for this car.", "error");
        throw new Error("Minimum 3 images are required for this car.");
      }
      if (photos.length > 10) {
        showToast("Validation Error", "Maximum 10 images allowed.", "error");
        throw new Error("Maximum 10 images allowed.");
      }
      updatedFields.photos = photos;
    }

    setCars(prev => prev.map(car => car.id === id ? { ...car, ...updatedFields } : car));
    showToast("Car Updated", "Vehicle information saved successfully.", "success");

    if (isSupabaseConfigured) {
      dbUpdateCar(id, updatedFields).catch(err => {
        console.error("Supabase updateCar error:", err);
      });
    }
  };

  const deleteCar = (id) => {
    setCars(prev => prev.filter(car => car.id !== id));
    showToast("Car Removed", "Vehicle deleted from inventory.", "info");

    if (isSupabaseConfigured) {
      dbDeleteCar(id).catch(err => {
        console.error("Supabase deleteCar error:", err);
      });
    }
  };

  const toggleAuction = (id, enabled) => {
    setCars(prev => prev.map(car => car.id === id ? { ...car, bid_enabled: enabled } : car));
    showToast("Auction Status", `Live bidding has been ${enabled ? 'enabled' : 'disabled'}.`, "info");

    if (isSupabaseConfigured) {
      dbUpdateCar(id, { bid_enabled: enabled }).catch(err => {
        console.error("Supabase toggleAuction error:", err);
      });
    }
  };

  // --------------------------------------------------------------------------
  // BID OPERATIONS
  // --------------------------------------------------------------------------
  const placeBid = (carId, { bidder_name, bidder_phone, bidder_email, amount }) => {
    const car = cars.find(c => c.id === carId);
    if (!car) throw new Error("Car not found");

    const cleanPhone = (bidder_phone || '').replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      throw new Error("A valid 10-digit mobile number is required to place a bid.");
    }

    if (!bidder_name || !bidder_name.trim()) {
      throw new Error("Bidder name is required.");
    }
    
    const numericAmount = Number(amount);
    
    if (numericAmount <= (car.current_bid || 0)) {
      throw new Error(`Your bid must be higher than current top bid ₹${(car.current_bid).toLocaleString('en-IN')}`);
    }

    const newBid = {
      id: `bid-${Date.now()}`,
      car_id: carId,
      car_title: car.title,
      bidder_name: bidder_name.trim(),
      bidder_phone: bidder_phone.trim(),
      bidder_email: bidder_email || `${cleanPhone}@bidder.in`,
      amount: numericAmount,
      status: "Active Top Bid",
      created_date: new Date().toISOString()
    };

    // Update local state
    setBids(prev => [
      newBid,
      ...prev.map(b => b.car_id === carId ? { ...b, status: "Outbid" } : b)
    ]);

    setCars(prev => prev.map(c => c.id === carId ? { ...c, current_bid: numericAmount } : c));

    // Register or update bidder user profile
    const bidderUser = {
      id: `user-${Date.now()}`,
      full_name: bidder_name.trim(),
      email: bidder_email || `${cleanPhone}@customer.in`,
      phone: bidder_phone.trim(),
      role: "visitor",
      created_date: new Date().toISOString()
    };

    setUsers(prev => {
      const existing = prev.find(u => u.phone?.replace(/\D/g, '') === cleanPhone || (bidder_email && u.email?.toLowerCase() === bidder_email.toLowerCase()));
      if (!existing) {
        return [...prev, bidderUser];
      }
      return prev;
    });

    // Supabase sync
    if (isSupabaseConfigured) {
      dbSaveBid(newBid).catch(err => console.error("Supabase saveBid error:", err));
      dbSaveUser(bidderUser).catch(err => console.error("Supabase saveUser error:", err));
    }

    showToast("Bid Placed Successfully!", `Your bid of ₹${numericAmount.toLocaleString('en-IN')} is now active.`, "success");
    return newBid;
  };

  const resetCarBids = (carId) => {
    const car = cars.find(c => c.id === carId);
    if (!car) return;

    const resetBidAmount = Number(car.starting_bid) || 0;
    setCars(prev => prev.map(c => c.id === carId ? { ...c, current_bid: resetBidAmount } : c));
    setBids(prev => prev.map(b => b.car_id === carId ? { ...b, status: "Archived / Reset" } : b));
    showToast("Bidding Reset", `Live bidding for ${car.title} reset to starting price.`, "info");

    if (isSupabaseConfigured) {
      dbResetCarBids(carId, resetBidAmount).catch(err => console.error("Supabase resetCarBids error:", err));
    }
  };

  const resetAllBids = () => {
    setCars(prev => prev.map(c => ({
      ...c,
      current_bid: Number(c.starting_bid) || 0
    })));
    setBids(prev => prev.map(b => ({ ...b, status: "Archived / Reset" })));
    showToast("All Bids Reset", "The live bidding cycle has been reset by Owner.", "info");

    if (isSupabaseConfigured) {
      dbResetAllBids().catch(err => console.error("Supabase resetAllBids error:", err));
    }
  };

  // --------------------------------------------------------------------------
  // USER & ROLE MANAGEMENT
  // --------------------------------------------------------------------------
  const updateUserRole = (userId, newRole) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    if (currentUser && currentUser.id === userId) {
      setCurrentUser(prev => ({ ...prev, role: newRole }));
    }
    showToast("Role Updated", `User role set to ${newRole.toUpperCase()}.`, "success");

    if (isSupabaseConfigured) {
      dbUpdateUserRole(userId, newRole).catch(err => console.error("Supabase updateUserRole error:", err));
    }
  };

  const registerUser = ({ full_name, email, phone, password, role = 'visitor' }) => {
    const cleanPhone = (phone || '').replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      throw new Error("A valid 10-digit mobile number is mandatory for account registration.");
    }
    if (!full_name || !full_name.trim()) {
      throw new Error("Full name is required.");
    }
    if (!email || !email.includes('@')) {
      throw new Error("A valid email address is required.");
    }

    const newUser = {
      id: `user-${Date.now()}`,
      full_name: full_name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      role: role,
      created_date: new Date().toISOString()
    };

    setUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    showToast("Account Created", `Welcome to Shri Krishna Motors, ${newUser.full_name}!`, "success");

    if (isSupabaseConfigured) {
      dbSaveUser(newUser).catch(err => console.error("Supabase registerUser error:", err));
    }

    return newUser;
  };

  const addUser = ({ full_name, email, phone = '', role = 'visitor' }) => {
    const cleanEmail = email?.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      showToast("Validation Error", "A valid email ID is required.", "error");
      throw new Error("A valid email ID is required.");
    }
    if (!full_name || !full_name.trim()) {
      showToast("Validation Error", "User full name is required.", "error");
      throw new Error("User full name is required.");
    }

    const existing = users.find(u => u.email?.toLowerCase() === cleanEmail);
    if (existing) {
      updateUserRole(existing.id, role);
      showToast("User Updated", `${cleanEmail} updated to ${role.toUpperCase()}.`, "success");
      return existing;
    }

    const newUser = {
      id: `user-${Date.now()}`,
      full_name: full_name.trim(),
      email: cleanEmail,
      phone: phone ? phone.trim() : '',
      role: role,
      created_date: new Date().toISOString()
    };

    setUsers(prev => [newUser, ...prev]);
    showToast("User Created", `${newUser.full_name} (${cleanEmail}) added as ${role.toUpperCase()}!`, "success");

    if (isSupabaseConfigured) {
      dbSaveUser(newUser).catch(err => console.error("Supabase addUser error:", err));
    }

    return newUser;
  };

  const deleteUser = (userId) => {
    const targetUser = users.find(u => u.id === userId);
    if (!targetUser) return;

    if (targetUser.id === 'user-owner' || targetUser.email === dealerInfo.email) {
      showToast("Action Forbidden", "Primary Managing Director (Owner) cannot be removed.", "error");
      throw new Error("Primary Managing Director (Owner) cannot be removed.");
    }

    setUsers(prev => prev.filter(u => u.id !== userId));
    showToast("User Removed", `Removed ${targetUser.email} from directory.`, "info");

    if (isSupabaseConfigured) {
      dbDeleteUser(userId).catch(err => console.error("Supabase deleteUser error:", err));
    }
  };

  // --------------------------------------------------------------------------
  // SELL REQUEST OPERATIONS
  // --------------------------------------------------------------------------
  const submitSellRequest = (requestData) => {
    const newReq = {
      ...requestData,
      id: `req-${Date.now()}`,
      status: "Pending",
      created_date: new Date().toISOString()
    };
    setSellRequests(prev => [newReq, ...prev]);
    showToast("Valuation Request Sent!", "Our valuation team will contact you shortly.", "success");

    if (isSupabaseConfigured) {
      dbSaveSellRequest(newReq).catch(err => console.error("Supabase submitSellRequest error:", err));
    }

    return newReq;
  };

  const updateSellRequestStatus = (id, status) => {
    setSellRequests(prev => prev.map(req => req.id === id ? { ...req, status } : req));
    showToast("Status Updated", `Sell request marked as ${status}.`, "info");

    if (isSupabaseConfigured) {
      dbUpdateSellRequestStatus(id, status).catch(err => console.error("Supabase updateSellRequestStatus error:", err));
    }
  };

  const convertSellRequestToCar = (requestId) => {
    const req = sellRequests.find(r => r.id === requestId);
    if (!req) return;

    const photos = req.photos && req.photos.length >= 3 ? req.photos : [
      "/images/cars/tata-nexon/nexon-1.jpg",
      "/images/cars/tata-nexon/nexon-2.jpg",
      "/images/cars/tata-nexon/nexon-3.jpg"
    ];

    const newCar = {
      title: `${req.brand || 'Pre-Owned'} ${req.car_name || ''} (${req.model_year || ''})`.trim(),
      brand: req.brand || 'Pre-Owned',
      model: req.car_name || 'Car',
      model_year: Number(req.model_year) || new Date().getFullYear(),
      fuel: req.fuel || 'Petrol',
      transmission: 'Manual',
      range_driven: Number(req.range_driven) || 30000,
      ownership: req.ownership || '1st Owner',
      accidental: 'Inspection in Progress',
      mileage: '18.0 km/l',
      price: Number(req.expected_price) ? Number(req.expected_price) * 1.1 : 600000,
      starting_bid: Number(req.expected_price) || 500000,
      current_bid: Number(req.expected_price) || 500000,
      bid_enabled: true,
      status: "Available",
      photos,
      video: "",
      description: `Inbound verified vehicle from ${req.seller_name}. ${req.notes || ''}`,
      insurance_validity: "Valid",
      rc_status: "Verified",
    };

    addCar(newCar);
    updateSellRequestStatus(requestId, "Closed");
    showToast("Converted to Inventory", `${newCar.title} added to live stock!`, "success");
  };

  // --------------------------------------------------------------------------
  // AUTH HELPERS
  // --------------------------------------------------------------------------
  const login = (email, password) => {
    const cleanEmail = email?.toLowerCase().trim();
    if (cleanEmail === dealerInfo.email.toLowerCase() || cleanEmail === 'owner@shreekrishnamotors.com' || cleanEmail.includes('owner')) {
      const ownerUser = {
        id: "user-owner",
        full_name: "Abhishek Verma (Managing Director)",
        email: dealerInfo.email,
        role: "owner",
        phone: dealerInfo.phone
      };
      setCurrentUser(ownerUser);
      showToast("Welcome Owner", "Logged in with full Managing Director privileges.", "success");
      return ownerUser;
    } else if (cleanEmail.includes('admin')) {
      const adminUser = {
        id: "user-admin-1",
        full_name: "Rajesh Kumar (Dealership Admin)",
        email: cleanEmail,
        role: "admin",
        phone: dealerInfo.phone2
      };
      setCurrentUser(adminUser);
      showToast("Welcome Admin", "Logged in to Shri Krishna Motors portal.", "success");
      return adminUser;
    } else {
      const existing = users.find(u => u.email.toLowerCase() === cleanEmail || u.phone?.replace(/\D/g, '') === cleanEmail.replace(/\D/g, ''));
      const visitorUser = existing || {
        id: `user-${Date.now()}`,
        full_name: cleanEmail.split('@')[0],
        email: cleanEmail,
        role: "visitor",
        phone: "+91 98000 00000"
      };
      setCurrentUser(visitorUser);
      showToast("Welcome!", `Signed in as ${visitorUser.full_name}`, "success");
      return visitorUser;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    showToast("Logged Out", "You have been signed out.", "info");
  };

  const switchRole = (role) => {
    let name = "Visitor User";
    let email = "visitor@gmail.com";
    let phone = "+91 98351 44521";

    if (role === 'owner') {
      name = "Abhishek Verma (Owner)";
      email = dealerInfo.email;
      phone = dealerInfo.phone;
    } else if (role === 'admin') {
      name = "Rajesh Kumar (Admin)";
      email = "admin.daltonganj@shreekrishnamotors.com";
      phone = dealerInfo.phone2;
    }

    const newUser = {
      id: `user-${role}`,
      full_name: name,
      email,
      phone,
      role
    };

    setCurrentUser(newUser);
    showToast("Role Switched", `Active view perspective: ${role.toUpperCase()}`, "info");
  };

  // --------------------------------------------------------------------------
  // FORMATTING HELPERS
  // --------------------------------------------------------------------------
  const formatCurrency = (val) => {
    if (!val && val !== 0) return "₹0";
    return `₹${Number(val).toLocaleString('en-IN')}`;
  };

  const formatKM = (val) => {
    if (!val && val !== 0) return "0 km";
    return `${Number(val).toLocaleString('en-IN')} km`;
  };

  return (
    <DataContext.Provider value={{
      dealerInfo,
      cars,
      bids,
      sellRequests,
      users,
      currentUser,
      theme,
      setTheme,
      toast,
      showToast,
      addCar,
      updateCar,
      deleteCar,
      toggleAuction,
      placeBid,
      resetCarBids,
      resetAllBids,
      updateUserRole,
      registerUser,
      addUser,
      deleteUser,
      submitSellRequest,
      updateSellRequestStatus,
      convertSellRequestToCar,
      login,
      logout,
      switchRole,
      formatCurrency,
      formatKM,
      // Supabase database status & diagnostics
      isSupabaseConfigured,
      testSupabaseConnection
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
