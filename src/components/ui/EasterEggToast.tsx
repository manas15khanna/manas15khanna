import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import { ActiveToast } from '../../hooks/useEasterEggs';

interface EasterEggToastProps {
  toast: ActiveToast | null;
  onDismiss: () => void;
}

export const EasterEggToast: React.FC<EasterEggToastProps> = ({ toast, onDismiss }) => {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.96 }}
          className="fixed bottom-20 right-5 z-[85] w-[330px] max-w-[calc(100vw-2.5rem)] rounded-2xl border border-[var(--accent-active)]/50 bg-[#0C0E13]/95 p-4 shadow-[0_0_40px_-10px_rgba(var(--accent-rgb),0.5)] backdrop-blur-xl"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[rgba(var(--accent-rgb),0.15)] text-[var(--accent-active)]">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent-active)]">
                  EASTER EGG // {toast.category}
                </p>
                <p className="text-sm font-semibold text-[#F4F5F7]">{toast.title}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onDismiss}
              className="rounded-md p-1 text-[#949BA8] hover:bg-white/10 hover:text-white"
              aria-label="Close notification"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="mt-2 font-mono text-xs text-[#949BA8]">{toast.message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
