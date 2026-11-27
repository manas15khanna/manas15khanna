import React, { useState } from 'react';
import { Aperture } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { SmartPortrait } from '../ui/SmartPortrait';
import { soundEngine } from '../../audio/soundEngine';

interface MediaGalleryProps {
  onUnlockWalterMitty: () => void;
}

export const MediaGallery: React.FC<MediaGalleryProps> = ({ onUnlockWalterMitty }) => {
  const [showMitty, setShowMitty] = useState(false);

  const handleApertureClick = () => {
    soundEngine.playRj45Snap();
    setShowMitty((prev) => !prev);
    onUnlockWalterMitty();
  };

  return (
    <section className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--accent-active)]">
            04 // VISUAL MEDIA &amp; LEADERSHIP
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#F4F5F7] sm:text-4xl">
            BEHIND THE LENS &amp; ON STAGE
          </h2>
        </div>

        {/* Walter Mitty Camera Aperture Trigger */}
        <button
          type="button"
          onClick={handleApertureClick}
          data-interactive="true"
          title="Click shutter aperture"
          className="inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 font-mono text-xs text-[#949BA8] transition-all hover:border-[var(--accent-active)] hover:text-white sm:self-auto"
        >
          <Aperture className="h-4 w-4 text-[var(--accent-active)]" />
          <span>SHUTTER // CONTACT SHEET</span>
        </button>
      </div>

      {/* Walter Mitty Secret Contact Strip */}
      <AnimatePresence>
        {showMitty && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden rounded-2xl border border-amber-400/30 bg-[#0C0E13] p-5"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-amber-400">
              LIFE MAGAZINE MOTTO // QUINTESSENCE
            </p>
            <p className="mt-2 font-display text-lg italic text-[#F4F5F7] sm:text-xl">
              &ldquo;To see the world, things dangerous to come to, to see behind walls, draw closer,
              to find each other, and to feel. That is the purpose of life.&rdquo;
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auto-Cropping SmartPortrait Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
        <div className="md:col-span-6">
          <SmartPortrait
            src="/images/about-candid.jpg"
            alt="Manas Khanna Engineering Candid"
            aspectClass="aspect-[16/10]"
            objectPosition="object-center"
            label="ENGINEERING CANDID // 16:10"
          />
        </div>
        <div className="md:col-span-6">
          <SmartPortrait
            src="/images/club-leadership.jpg"
            alt="Technometer Club Leadership"
            aspectClass="aspect-[16/10]"
            objectPosition="object-top"
            label="TECHNOMETER CLUB // 16:10"
          />
        </div>
        <div className="md:col-span-4">
          <SmartPortrait
            src="/images/gallery-1.jpg"
            alt="Event Photography Highlight 1"
            aspectClass="aspect-[4/5]"
            objectPosition="object-center"
            label="GALLERY 01 // 4:5"
          />
        </div>
        <div className="md:col-span-4">
          <SmartPortrait
            src="/images/gallery-2.jpg"
            alt="Event Photography Highlight 2"
            aspectClass="aspect-[4/5]"
            objectPosition="object-center"
            label="GALLERY 02 // 4:5"
          />
        </div>
        <div className="md:col-span-4">
          <SmartPortrait
            src="/images/gallery-3.jpg"
            alt="Event Photography Highlight 3"
            aspectClass="aspect-[4/5]"
            objectPosition="object-center"
            label="GALLERY 03 // 4:5"
          />
        </div>
      </div>
    </section>
  );
};
