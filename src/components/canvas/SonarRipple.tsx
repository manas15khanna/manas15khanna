import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export interface SonarWave {
  id: number;
  x: number;
  y: number;
}

interface SonarRippleProps {
  waves: SonarWave[];
}

export const SonarRipple: React.FC<SonarRippleProps> = ({ waves }) => {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {waves.map((w) => (
          <React.Fragment key={w.id}>
            {/* Expanding crimson echolocation ring */}
            <motion.div
              initial={{ scale: 0.05, opacity: 0.9 }}
              animate={{ scale: 18, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                left: w.x - 60,
                top: w.y - 60,
                width: 120,
                height: 120
              }}
              className="absolute rounded-full border border-[#FF2A5F] shadow-[0_0_40px_rgba(255,42,95,0.65)]"
            />
            {/* Secondary inner pulse */}
            <motion.div
              initial={{ scale: 0.05, opacity: 0.7 }}
              animate={{ scale: 12, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.08, ease: 'easeOut' }}
              style={{
                left: w.x - 60,
                top: w.y - 60,
                width: 120,
                height: 120
              }}
              className="absolute rounded-full border border-dashed border-[#FF2A5F]/60"
            />
            {/* Brief architectural wireframe flash */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.25, 0] }}
              transition={{ duration: 1.1 }}
              className="cyber-grid absolute inset-0 border border-[#FF2A5F]/20"
            />
          </React.Fragment>
        ))}
      </AnimatePresence>
    </div>
  );
};
