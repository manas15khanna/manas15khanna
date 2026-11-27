import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const start = performance.now();
    const duration = 1150;
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (elapsed < duration) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setVisible(false);
          onComplete();
        }, 120);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050608] px-6"
        >
          <div className="w-full max-w-md space-y-4">
            <div className="flex items-center justify-between font-mono text-[11px] tracking-widest text-[#949BA8]">
              <span>INITIALIZING OMARCHY KERNEL</span>
              <span className="text-[var(--accent-active)]">{progress}%</span>
            </div>

            <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[var(--accent-active)] transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between font-mono text-[10px] text-[#525866]">
              <span>ESTABLISHING UPLINK // MANAS-USW-PRO-MAX</span>
              <span>PORT 01 READY</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
