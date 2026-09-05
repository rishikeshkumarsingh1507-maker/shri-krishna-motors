import React from 'react';
import { useData } from '../context/DataContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = () => {
  const { toast } = useData();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error' || toast.type === 'destructive';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-bounce-in pointer-events-auto">
      <div className={`p-4 rounded-2xl shadow-2xl border flex items-start gap-3 backdrop-blur-xl ${
        isSuccess ? 'border-[var(--theme-accent-border)] bg-neutral-950/95 text-neutral-100 shadow-[0_10px_30px_var(--theme-primary-glow)]' :
        isError ? 'border-red-500/40 bg-neutral-950/95 text-neutral-100 shadow-red-950/50' :
        'border-white/10 bg-neutral-950/95 text-neutral-100'
      }`}>
        <div className="mt-0.5 shrink-0">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-[var(--theme-primary)]" />}
          {isError && <AlertCircle className="w-5 h-5 text-red-400" />}
          {!isSuccess && !isError && <Info className="w-5 h-5 text-blue-400" />}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm text-neutral-100">{toast.title}</h4>
          {toast.message && <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">{toast.message}</p>}
        </div>
      </div>
    </div>
  );
};
