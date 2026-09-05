import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { FloatingActions } from './components/FloatingActions';
import { LuxuryBackground } from './components/LuxuryBackground';

// Pages
import { Home } from './pages/Home';
import { Stock } from './pages/Stock';
import { CarDetail } from './pages/CarDetail';
import { SellCar } from './pages/SellCar';
import { AIAssistant } from './pages/AIAssistant';
import { Gallery } from './pages/Gallery';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Auth } from './pages/Auth';
import { AdminDashboard } from './pages/AdminDashboard';
import { NotFound } from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function App() {
  return (
    <DataProvider>
      <div className="relative flex flex-col min-h-screen text-neutral-100 selection:bg-[var(--theme-primary)] selection:text-neutral-950">
        <LuxuryBackground />
        <ScrollToTop />
        <Navbar />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/car/:id" element={<CarDetail />} />
            <Route path="/sell-your-car" element={<SellCar />} />
            <Route path="/assistant" element={<AIAssistant />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Auth />} />
            <Route path="/forgot-password" element={<Auth />} />
            <Route path="/reset-password" element={<Auth />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
        <FloatingActions />
        <Toast />
      </div>
    </DataProvider>
  );
}

export default App;
