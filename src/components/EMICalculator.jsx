import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Calculator, IndianRupee, Clock, Percent, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export const EMICalculator = ({ carPrice = 1000000 }) => {
  const { formatCurrency } = useData();

  const [price, setPrice] = useState(carPrice);
  const [downPayment, setDownPayment] = useState(Math.round(carPrice * 0.2));
  const [tenureYears, setTenureYears] = useState(4);
  const [interestRate, setInterestRate] = useState(9.5);

  const loanAmount = Math.max(0, price - downPayment);
  const totalMonths = tenureYears * 12;
  const monthlyRate = interestRate / 12 / 100;

  // EMI Formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const calculateEMI = () => {
    if (loanAmount <= 0 || totalMonths <= 0 || monthlyRate <= 0) return 0;
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    return Math.round(emi);
  };

  const monthlyEMI = calculateEMI();
  const totalPayment = monthlyEMI * totalMonths;
  const totalInterest = Math.max(0, totalPayment - loanAmount);

  return (
    <div className="premium-card p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[var(--theme-accent-bg)] text-[var(--theme-primary)] border border-[var(--theme-accent-border)] shrink-0">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-base sm:text-lg text-white">Car Loan & EMI Estimator</h3>
            <p className="text-xs text-neutral-400">Easy finance options with SBI, HDFC, ICICI & leading Jharkhand banks</p>
          </div>
        </div>
        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full theme-pill-badge text-[11px] font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[var(--theme-primary)]" />
          <span>Quick Approval</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Sliders Input Column */}
        <div className="space-y-6">
          {/* Down Payment Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-neutral-300">
              <span>Down Payment Amount</span>
              <span className="text-[var(--theme-primary)] font-black text-sm">{formatCurrency(downPayment)} ({Math.round((downPayment / price) * 100)}%)</span>
            </div>
            <input
              type="range"
              min="0"
              max={price * 0.9}
              step="10000"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full h-2.5 bg-neutral-950 rounded-lg appearance-none cursor-pointer accent-[var(--theme-primary)] border border-white/5"
            />
            <div className="flex justify-between text-[11px] text-neutral-500 font-mono">
              <span>₹0 Down</span>
              <span>Max {formatCurrency(price * 0.9)}</span>
            </div>
          </div>

          {/* Tenure Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-neutral-300">
              <span>Loan Duration</span>
              <span className="text-[var(--theme-primary)] font-black text-sm">{tenureYears} Years ({totalMonths} Months)</span>
            </div>
            <input
              type="range"
              min="1"
              max="7"
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full h-2.5 bg-neutral-950 rounded-lg appearance-none cursor-pointer accent-[var(--theme-primary)] border border-white/5"
            />
            <div className="flex justify-between text-[11px] text-neutral-500 font-mono">
              <span>1 Year</span>
              <span>7 Years</span>
            </div>
          </div>

          {/* Interest Rate Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-neutral-300">
              <span>Interest Rate (p.a.)</span>
              <span className="text-[var(--theme-primary)] font-black text-sm">{interestRate}%</span>
            </div>
            <input
              type="range"
              min="7.5"
              max="15.0"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2.5 bg-neutral-950 rounded-lg appearance-none cursor-pointer accent-[var(--theme-primary)] border border-white/5"
            />
            <div className="flex justify-between text-[11px] text-neutral-500 font-mono">
              <span>7.5% (Prime Rate)</span>
              <span>15.0%</span>
            </div>
          </div>
        </div>

        {/* Output Column */}
        <div className="flex flex-col justify-between p-6 rounded-2xl bg-neutral-950/90 border border-white/10 space-y-5 shadow-inner">
          <div>
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-neutral-400 uppercase tracking-widest font-bold">
                Estimated Monthly EMI
              </p>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Low Interest Tier
              </span>
            </div>
            <p className="text-3xl sm:text-4xl font-black text-luxury-gradient mt-2 tracking-tight">
              {formatCurrency(monthlyEMI)} <span className="text-sm font-normal text-neutral-400">/ mo</span>
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
            <div className="flex justify-between text-neutral-400">
              <span>Principal Loan Amount:</span>
              <span className="text-white font-bold">{formatCurrency(loanAmount)}</span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>Total Interest Payable:</span>
              <span className="text-white font-bold">{formatCurrency(totalInterest)}</span>
            </div>
            <div className="flex justify-between text-neutral-200 font-bold pt-2 border-t border-white/5">
              <span>Total Repayment:</span>
              <span className="text-[var(--theme-primary)] font-black text-sm">{formatCurrency(totalPayment)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 pt-2 text-[11px] text-neutral-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Instant paperless loan approval assistance at Shri Krishna Motors</span>
          </div>
        </div>
      </div>
    </div>
  );
};
