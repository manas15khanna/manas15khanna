import React from 'react';
import { Gamepad2, Terminal, Volume2, VolumeX } from 'lucide-react';
import { soundEngine } from '../../audio/soundEngine';

export type TireCompound = 'SOFT' | 'MEDIUM' | 'HARD';

interface NavbarProps {
  tire: TireCompound;
  onChangeTire: (t: TireCompound) => void;
  sfxEnabled: boolean;
  onToggleSfx: () => void;
  onOpenTerminal: () => void;
  onOpenGame: () => void;
}

const TIRE_META: Record<TireCompound, { color: string; code: string }> = {
  SOFT: { color: '#FF3333', code: 'C5' },
  MEDIUM: { color: '#FF8000', code: 'C3' },
  HARD: { color: '#E2E8F0', code: 'C1' }
};

export const Navbar: React.FC<NavbarProps> = ({
  tire,
  onChangeTire,
  sfxEnabled,
  onToggleSfx,
  onOpenTerminal,
  onOpenGame
}) => {
  const nextTire = () => {
    soundEngine.playHoverTick();
    const order: TireCompound[] = ['MEDIUM', 'SOFT', 'HARD'];
    const next = order[(order.indexOf(tire) + 1) % order.length];
    onChangeTire(next);
  };

  return (
    <header className="fixed inset-x-0 top-4 z-50 mx-auto max-w-6xl px-4 sm:px-6">
      <nav className="flex items-center justify-between rounded-full border border-white/10 bg-[#0C0E13]/80 px-4 py-2.5 shadow-titanium backdrop-blur-xl sm:px-6">
        {/* Monogram */}
        <a
          href="#"
          data-interactive="true"
          className="flex items-center gap-2.5 font-mono text-xs font-bold tracking-widest text-[#F4F5F7]"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-[var(--accent-active)]">
            MK
          </span>
          <span className="hidden sm:inline">MANAS.KHANNA</span>
        </a>

        {/* Nav Links */}
        <div className="hidden items-center gap-6 text-xs font-medium text-[#949BA8] md:flex">
          <a href="#switchboard" data-interactive="true" className="transition-colors hover:text-white">
            Switchboard
          </a>
          <a href="#projects" data-interactive="true" className="transition-colors hover:text-white">
            Engineering
          </a>
          <a href="#experience" data-interactive="true" className="transition-colors hover:text-white">
            Timeline
          </a>
          <a href="#lab" data-interactive="true" className="transition-colors hover:text-white">
            Lab
          </a>
        </div>

        {/* Telemetry Controls */}
        <div className="flex items-center gap-2">
          {/* F1 Pirelli Tire Compound Selector */}
          <button
            type="button"
            onClick={nextTire}
            data-interactive="true"
            title="Switch F1 Tire Compound (Scroll & Telemetry Curve)"
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1.5 font-mono text-[10px] font-semibold text-[#F4F5F7] transition-colors hover:border-white/25"
          >
            <span
              className="h-2.5 w-2.5 rounded-full border-2"
              style={{ borderColor: TIRE_META[tire].color }}
            />
            <span className="hidden sm:inline">{tire}</span>
            <span className="text-[#525866]">{TIRE_META[tire].code}</span>
          </button>

          {/* Packet Parry Mini-Game Trigger */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playHoverTick();
              onOpenGame();
            }}
            data-interactive="true"
            title="Play Packet Parry // Zero-Day Defender"
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1.5 font-mono text-[10px] text-[#949BA8] transition-colors hover:border-[var(--accent-active)] hover:text-white"
          >
            <Gamepad2 className="h-3.5 w-3.5 text-[var(--accent-active)]" />
            <span className="hidden lg:inline">PARRY</span>
          </button>

          {/* Omarchy Terminal Trigger */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playHoverTick();
              onOpenTerminal();
            }}
            data-interactive="true"
            title="Open Omarchy Terminal (~ or Ctrl+K)"
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1.5 font-mono text-[10px] text-[#949BA8] transition-colors hover:border-white/30 hover:text-white"
          >
            <Terminal className="h-3.5 w-3.5" />
            <span className="hidden lg:inline">~</span>
          </button>

          {/* Audio Toggle */}
          <button
            type="button"
            onClick={onToggleSfx}
            data-interactive="true"
            title="Toggle Procedural Web Audio SFX"
            className={`flex items-center gap-1 rounded-full border px-2.5 py-1.5 font-mono text-[10px] transition-colors ${
              sfxEnabled
                ? 'border-[var(--accent-active)]/50 bg-[rgba(var(--accent-rgb),0.12)] text-[var(--accent-active)]'
                : 'border-white/10 bg-white/[0.03] text-[#525866] hover:text-[#949BA8]'
            }`}
          >
            {sfxEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{sfxEnabled ? 'SFX ON' : 'SFX'}</span>
          </button>
        </div>
      </nav>
    </header>
  );
};
