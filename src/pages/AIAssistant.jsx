import React, { useState, useRef, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Car, 
  Gavel, 
  Phone, 
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

export const AIAssistant = () => {
  const { cars, dealerInfo, formatCurrency } = useData();

  const promptSuggestions = [
    "What cars are available right now?",
    "Show me SUVs under ₹15 lakh",
    "How does live bidding work?",
    "I want to sell my car, what do I do?"
  ];

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hello! I am your AI Car Specialist for **${dealerInfo.name}** in Daltonganj. How can I assist you today? You can ask me about our certified pre-owned stock, live auctions, vehicle trade-in valuation, or showroom visiting hours!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const generateAIResponse = (userQuery) => {
    const query = userQuery.toLowerCase();

    // 1. Check for available stock inquiry
    if (query.includes('available') || query.includes('stock') || query.includes('what cars') || query.includes('inventory')) {
      const avail = cars.filter(c => c.status === 'Available');
      const carListText = avail.slice(0, 4).map(c => `• **${c.title}** (${c.fuel}, ${c.model_year}) - ${formatCurrency(c.current_bid || c.price)}`).join('\n');
      return {
        text: `We currently have **${avail.length} certified pre-owned vehicles** available at our Daltonganj showroom:\n\n${carListText}\n\nYou can browse full specifications and start live bidding on our [Stock Page](/stock).`,
        recommendedCars: avail.slice(0, 2)
      };
    }

    // 2. Check for SUV or budget inquiry
    if (query.includes('suv') || query.includes('creta') || query.includes('scorpio') || query.includes('lakh') || query.includes('under') || query.includes('fortuner')) {
      const suvs = cars.filter(c => c.title.toLowerCase().includes('creta') || c.title.toLowerCase().includes('scorpio') || c.title.toLowerCase().includes('fortuner') || c.title.toLowerCase().includes('nexon'));
      return {
        text: `Here are top SUV options currently in stock in Daltonganj:\n\n` +
          suvs.map(s => `• **${s.title}** (${s.model_year}) - ${formatCurrency(s.price)} [${s.accidental || 'Inspected'}]`).join('\n') +
          `\n\nAll our SUVs undergo 100% non-accidental certification with 120-point mechanical check. Would you like to schedule a test drive on Ranchi Road?`,
        recommendedCars: suvs.slice(0, 2)
      };
    }

    // 3. Check for bidding rules
    if (query.includes('bid') || query.includes('auction') || query.includes('how does bidding work')) {
      return {
        text: `### How Live Bidding Works at Shri Krishna Motors:\n\n1. **Select an Active Car:** Cars with the **Live Auction** tag are open for public offers.\n2. **Sign In & Phone Verification:** Login and verify your mobile number to unlock live bidding.\n3. **Place Your Bid:** Enter an offer higher than the current highest bid (minimum ₹5,000 increment).\n4. **Deal Finalization:** The highest verified bid is reviewed by the owner for immediate handover.\n\nExplore live bidding on our [Stock Page](/stock).`
      };
    }

    // 4. Check for selling / valuation
    if (query.includes('sell') || query.includes('valuation') || query.includes('exchange') || query.includes('trade')) {
      return {
        text: `Selling or exchanging your car at **${dealerInfo.name}** is fast and transparent!\n\n1. Go to our [Sell Your Car](/sell-your-car) portal.\n2. Enter your car model, registration year, km driven, and expected price.\n3. Managing Director **${dealerInfo.md}** and our appraisal team will provide a fair market valuation within 2 hours.\n4. Instant bank payment and free RC transfer handled directly at our showroom.`
      };
    }

    // 5. Check for address, contact, timing
    if (query.includes('address') || query.includes('location') || query.includes('where') || query.includes('timing') || query.includes('phone') || query.includes('contact')) {
      return {
        text: `### Shri Krishna Motors Showroom Information:\n\n• **Address:** ${dealerInfo.address}\n• **Landmark:** In front of Chiyanki, Ranchi Road, Daltonganj, Palamu, Jharkhand\n• **Operating Hours:** ${dealerInfo.hours}\n• **Phone:** ${dealerInfo.phone} / ${dealerInfo.phone2}\n• **Email:** ${dealerInfo.email}\n\nVisit us anytime during business hours for an in-person test drive!`
      };
    }

    // Generic helpful fallback
    return {
      text: `Thank you for reaching out! At **${dealerInfo.name}**, we specialize in certified pre-owned car sales, live auctions, and vehicle exchanges in Daltonganj. You can:\n\n• Explore our [Certified Stock](/stock)\n• Submit your car for [Valuation](/sell-your-car)\n• Or contact our helpline directly at **${dealerInfo.phone}**.`
    };
  };

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMsg = {
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAIResponse(query);
      const aiMsg = {
        role: 'assistant',
        content: response.text,
        recommendedCars: response.recommendedCars,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      
      {/* Header */}
      <div className="premium-card p-6 rounded-3xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[var(--theme-gradient)] text-neutral-950 flex items-center justify-center font-bold shadow-lg shadow-[var(--theme-primary-glow)] shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-lg sm:text-xl font-black text-white">AI Dealership Advisor</h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Live 24/7</span>
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Instant answers on inventory, bidding rules, finance estimates & trade-in value.
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-400 bg-neutral-950/60 px-3.5 py-2 rounded-xl border border-white/5">
          <ShieldCheck className="w-4 h-4 text-[var(--theme-primary)]" />
          <span>Daltonganj Verified Data</span>
        </div>
      </div>

      {/* Chat Container */}
      <div className="premium-card rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[620px]">
        
        {/* Messages Scroll Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          
          {messages.map((msg, idx) => {
            const isAI = msg.role === 'assistant';
            return (
              <div
                key={idx}
                className={`flex items-start gap-3.5 ${isAI ? 'justify-start' : 'justify-end'}`}
              >
                {isAI && (
                  <div className="w-8 h-8 rounded-xl bg-[var(--theme-accent-bg)] text-[var(--theme-primary)] border border-[var(--theme-accent-border)] flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] sm:max-w-[78%] space-y-3 ${isAI ? 'text-left' : 'text-right'}`}>
                  <div
                    className={`inline-block p-4 sm:p-5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isAI
                        ? 'bg-neutral-950/90 border border-white/10 text-neutral-200 shadow-lg'
                        : 'btn-luxury text-neutral-950 font-medium shadow-md'
                    }`}
                  >
                    <div className="whitespace-pre-line prose prose-invert max-w-none">
                      {msg.content}
                    </div>
                  </div>

                  {/* Optional Recommended Car Pills */}
                  {msg.recommendedCars && msg.recommendedCars.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left pt-1">
                      {msg.recommendedCars.map(c => (
                        <Link
                          key={c.id}
                          to={`/car/${c.id}`}
                          className="p-3 rounded-2xl bg-neutral-950/90 border border-white/10 hover:border-[var(--theme-accent-border)] transition-all flex items-center gap-3 group shadow-md"
                        >
                          <img src={c.photos[0]} alt="" className="w-12 h-10 rounded-xl object-cover" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-white truncate group-hover:text-[var(--theme-primary)]">{c.title}</p>
                            <p className="text-[11px] text-[var(--theme-primary)] font-semibold mt-0.5">{formatCurrency(c.current_bid || c.price)}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:translate-x-1 group-hover:text-[var(--theme-primary)] transition-all" />
                        </Link>
                      ))}
                    </div>
                  )}

                  <p className="text-[10px] text-neutral-500 px-1 font-mono">{msg.timestamp}</p>
                </div>

                {!isAI && (
                  <div className="w-8 h-8 rounded-xl bg-neutral-800 text-neutral-300 flex items-center justify-center shrink-0 mt-1 border border-white/10">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[var(--theme-accent-bg)] text-[var(--theme-primary)] border border-[var(--theme-accent-border)] flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl bg-neutral-950 border border-white/10 flex items-center gap-1.5 shadow-md">
                <span className="w-2 h-2 rounded-full bg-[var(--theme-primary)] animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-[var(--theme-primary)] animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-[var(--theme-primary)] animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Suggested Quick Prompt Chips */}
        <div className="px-6 py-3 bg-neutral-950/90 border-t border-white/5 flex items-center gap-2 overflow-x-auto">
          <span className="text-[11px] font-bold text-neutral-400 shrink-0 uppercase tracking-wider">Quick:</span>
          {promptSuggestions.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700/80 text-neutral-300 hover:text-white hover:border-[var(--theme-accent-border)] text-xs font-semibold whitespace-nowrap transition-all shadow-sm"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-4 bg-neutral-950/95 border-t border-white/10 flex items-center gap-3"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about inventory in Daltonganj, auctions, prices..."
            className="flex-1 px-4 py-3.5 rounded-xl bg-neutral-900/90 border border-neutral-700/80 text-white text-sm focus:border-[var(--theme-primary)] outline-none transition-all placeholder:text-neutral-500"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="p-3.5 rounded-xl btn-luxury disabled:opacity-40 disabled:hover:scale-100 text-neutral-950 font-bold transition-all shadow-md"
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>

      </div>

    </div>
  );
};
