import React, { useRef } from 'react';
import { ArrowUpRight, MapPin, Shield } from 'lucide-react';
import { PROFILE_IDENTITY } from '../../data/portfolioData';
import { LiquidButton } from '../ui/LiquidButton';
import { SmartPortrait } from '../ui/SmartPortrait';

interface HeroSectionProps {
  onTriggerSekiro: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onTriggerSekiro }) => {
  const hoverTimerRef = useRef<number | null>(null);

  const handleKanjiEnter = () => {
    hoverTimerRef.current = window.setTimeout(() => {
      onTriggerSekiro();
    }, 1150);
  };

  const handleKanjiLeave = () => {
    if (hoverTimerRef.current) {
      window.clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  return (
    <section className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        {/* Left: Monumental Typography & CTAs */}
        <div className="space-y-7 lg:col-span-7">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-[11px] text-[#949BA8]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--accent-active)]" />
              ONLINE // B.TECH CSE (CLOUD) @ AMITY PUNJAB
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#525866]">
              <MapPin className="h-3.5 w-3.5 text-[var(--accent-active)]" />
              {PROFILE_IDENTITY.location}
            </span>
          </div>

          <h1 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-[#F4F5F7] sm:text-7xl lg:text-[5.25rem]">
            MANAS
            <br />
            <span className="bg-gradient-to-r from-[#F4F5F7] via-[#F4F5F7] to-[var(--accent-active)] bg-clip-text text-transparent">
              KHANNA
            </span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-[#949BA8] sm:text-lg">
            {PROFILE_IDENTITY.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <LiquidButton href="#switchboard" variant="primary">
              Explore Switchboard
            </LiquidButton>
            <LiquidButton
              href={PROFILE_IDENTITY.github}
              target="_blank"
              rel="noreferrer"
              variant="secondary"
            >
              GitHub <ArrowUpRight className="inline h-4 w-4" />
            </LiquidButton>
            <LiquidButton
              href={PROFILE_IDENTITY.linkedin}
              target="_blank"
              rel="noreferrer"
              variant="ghost"
            >
              LinkedIn <ArrowUpRight className="inline h-4 w-4" />
            </LiquidButton>
          </div>

          {/* Subtle Telemetry Strip + Hidden Sekiro Kanji */}
          <div className="flex flex-wrap items-center gap-6 border-t border-white/[0.08] pt-6 font-mono text-[11px] text-[#525866]">
            <div>
              <span className="block text-[9px] uppercase tracking-widest">PREVIOUS R&D</span>
              <span className="text-[#949BA8]">SCL (MeitY, Govt. of India)</span>
            </div>
            <div>
              <span className="block text-[9px] uppercase tracking-widest">SIH 2025</span>
              <span className="text-[#949BA8]">2nd Place Internal Round</span>
            </div>
            <div>
              <span className="block text-[9px] uppercase tracking-widest">DAILY DRIVER</span>
              <span className="text-[#949BA8]">Omarchy (Arch + Hyprland)</span>
            </div>
            {/* Subtle Sekiro Kanji Easter Egg */}
            <button
              type="button"
              onMouseEnter={handleKanjiEnter}
              onMouseLeave={handleKanjiLeave}
              onClick={onTriggerSekiro}
              data-interactive="true"
              title="Hold hover 1.2s..."
              className="ml-auto flex items-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-[#FF2A5F]/45 transition-all hover:border-[#FF2A5F]/40 hover:text-[#FF2A5F]"
            >
              <Shield className="h-3 w-3 opacity-50" />
              <span className="text-xs font-bold tracking-widest">忍殺</span>
            </button>
          </div>
        </div>

        {/* Right: Hero SmartPortrait Frame */}
        <div className="mx-auto w-full max-w-[380px] lg:col-span-5 lg:max-w-none">
          <div className="relative">
            <div
              className="pointer-events-none absolute -inset-4 rounded-3xl opacity-25 blur-2xl"
              style={{ backgroundColor: 'var(--accent-active)' }}
            />
            <SmartPortrait
              src="/images/hero-portrait.jpg"
              alt="Manas Khanna Portrait"
              aspectClass="aspect-[4/5]"
              objectPosition="object-top"
              label="HERO PORTRAIT // 4:5"
            />
            <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-[#525866]">
              <span>FRAME: 4:5 // TOP-CENTER LOCK</span>
              <span className="text-[var(--accent-active)]">STATUS: READY</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
