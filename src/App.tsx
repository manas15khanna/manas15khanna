import React, { useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { AnimatePresence, motion } from 'framer-motion';
import { SWITCHBOARD_ROLES } from './data/portfolioData';
import { soundEngine } from './audio/soundEngine';
import { useEasterEggs } from './hooks/useEasterEggs';
import { useKonamiCode } from './hooks/useKonamiCode';
import { SmokeCanvas } from './components/canvas/SmokeCanvas';
import { SonarRipple, SonarWave } from './components/canvas/SonarRipple';
import { LiquidCursor } from './components/ui/LiquidCursor';
import { Preloader } from './components/ui/Preloader';
import { EasterEggToast } from './components/ui/EasterEggToast';
import { Navbar, TireCompound } from './components/sections/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { UbiquitiSwitchboard } from './components/switchboard/UbiquitiSwitchboard';
import { BentoProjects } from './components/sections/BentoProjects';
import { ExperienceTimeline } from './components/sections/ExperienceTimeline';
import { MediaGallery } from './components/sections/MediaGallery';
import { PacketParryGame } from './components/interactive/PacketParryGame';
import { OmarchyTerminal } from './components/interactive/OmarchyTerminal';
import { Footer } from './components/sections/Footer';

export function App() {
  const [activeRoleId, setActiveRoleId] = useState<number>(1);
  const [tire, setTire] = useState<TireCompound>('MEDIUM');
  const [sfxEnabled, setSfxEnabled] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [tarsHumorActive, setTarsHumorActive] = useState(false);
  const [sekiroBanner, setSekiroBanner] = useState(false);
  const [wantedStars, setWantedStars] = useState(false);
  const [sonarWaves, setSonarWaves] = useState<SonarWave[]>([]);

  const labRef = useRef<HTMLDivElement | null>(null);
  const { discoveredIds, totalCount, unlockEgg, toast, dismissToast } = useEasterEggs();

  const activeRole =
    SWITCHBOARD_ROLES.find((r) => r.id === activeRoleId) || SWITCHBOARD_ROLES[0];

  // Dynamic CSS accent variable driven by Switchboard cable OR Soft Tire override
  const effectiveAccent = tire === 'SOFT' ? '#FF3B30' : activeRole.color;
  const effectiveRgb = tire === 'SOFT' ? '255, 59, 48' : activeRole.rgb;

  useEffect(() => {
    document.documentElement.style.setProperty('--accent-active', effectiveAccent);
    document.documentElement.style.setProperty('--accent-rgb', effectiveRgb);
  }, [effectiveAccent, effectiveRgb]);

  // Lenis inertial scrolling tuned by F1 Tire Compound
  useEffect(() => {
    const lerp = tire === 'SOFT' ? 0.14 : tire === 'HARD' ? 0.06 : 0.095;
    const lenis = new Lenis({ lerp, smoothWheel: true });
    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [tire]);

  // Global keyboard shortcuts (~ or Ctrl/Cmd+K for Omarchy Terminal)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;

      if (e.key === '`' || e.key === '~' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Konami Code -> GTA 5-Star Wanted Level
  const triggerKonami = useCallback(() => {
    soundEngine.playParryClang();
    setWantedStars(true);
    unlockEgg('gta-wanted');
    setTimeout(() => setWantedStars(false), 6000);
  }, [unlockEgg]);

  useKonamiCode(triggerKonami);

  const handleChangeTire = (t: TireCompound) => {
    setTire(t);
    if (t === 'SOFT') {
      unlockEgg('papaya-soft');
    }
  };

  const handleToggleSfx = () => {
    const next = soundEngine.toggle();
    setSfxEnabled(next);
  };

  const handleTriggerSekiro = useCallback(() => {
    soundEngine.playParryClang();
    setSekiroBanner(true);
    unlockEgg('sekiro-deathblow');
    setTimeout(() => setSekiroBanner(false), 2600);
  }, [unlockEgg]);

  const handleToggleTars = () => {
    setTarsHumorActive((prev) => {
      const next = !prev;
      if (next) unlockEgg('tars-humor');
      return next;
    });
  };

  // Daredevil Double-Click Sonar Pulse on empty background
  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement | null;
    if (target?.closest('button, a, input, svg, article')) return;
    soundEngine.playSonarPing();
    const waveId = Date.now();
    setSonarWaves((prev) => [...prev, { id: waveId, x: e.clientX, y: e.clientY }]);
    unlockEgg('daredevil-sonar');
    setTimeout(() => {
      setSonarWaves((prev) => prev.filter((w) => w.id !== waveId));
    }, 1600);
  };

  return (
    <div
      onDoubleClick={handleDoubleClick}
      className="relative min-h-screen bg-[#050608] text-[#F4F5F7]"
    >
      <Preloader onComplete={() => {}} />
      <LiquidCursor />
      <SmokeCanvas accentRgb={effectiveRgb} velocityMultiplier={tire === 'SOFT' ? 1.65 : 1} />
      <SonarRipple waves={sonarWaves} />

      <Navbar
        tire={tire}
        onChangeTire={handleChangeTire}
        sfxEnabled={sfxEnabled}
        onToggleSfx={handleToggleSfx}
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenGame={() => labRef.current?.scrollIntoView({ behavior: 'smooth' })}
      />

      {/* GTA 5-Star Wanted Level Overlay */}
      <AnimatePresence>
        {wantedStars && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            className="fixed right-5 top-20 z-[88] rounded-xl border border-amber-400/50 bg-[#0C0E13]/95 px-4 py-2.5 font-mono text-xs shadow-glow backdrop-blur-xl"
          >
            <span className="animate-pulse text-base tracking-widest text-amber-400">
              ★★★★★
            </span>
            <span className="ml-2 text-[#F4F5F7]">// FULL-STACK WANTED LEVEL</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sekiro Shinobi Execution Banner */}
      <AnimatePresence>
        {sekiroBanner && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            className="pointer-events-none fixed inset-x-0 top-1/3 z-[89] flex flex-col items-center justify-center bg-black/75 py-8 backdrop-blur-md"
          >
            <p className="text-5xl font-black tracking-[0.35em] text-[#FF2A5F] sm:text-7xl">
              忍殺
            </p>
            <p className="mt-2 font-mono text-xs tracking-[0.4em] text-amber-300">
              SHINOBI EXECUTION
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <HeroSection onTriggerSekiro={handleTriggerSekiro} />
        <UbiquitiSwitchboard activeRoleId={activeRoleId} onSelectRole={setActiveRoleId} />
        <BentoProjects
          tarsHumorActive={tarsHumorActive}
          onTriggerDexter={() => unlockEgg('dexter-monologue')}
        />
        <ExperienceTimeline onUnlockDrs={() => unlockEgg('f1-drs')} />
        <MediaGallery onUnlockWalterMitty={() => unlockEgg('walter-mitty')} />
        <div ref={labRef}>
          <PacketParryGame
            onUnlockSekiro={handleTriggerSekiro}
            onOpenTerminal={() => setTerminalOpen(true)}
          />
        </div>
      </main>

      <Footer
        discoveredIds={discoveredIds}
        totalEggs={totalCount}
        tarsHumorActive={tarsHumorActive}
        onToggleTars={handleToggleTars}
      />

      <OmarchyTerminal
        isOpen={terminalOpen}
        onOpen={() => setTerminalOpen(true)}
        onClose={() => setTerminalOpen(false)}
        onSwitchPort={setActiveRoleId}
        onLaunchGame={() => labRef.current?.scrollIntoView({ behavior: 'smooth' })}
        onTriggerDexter={() => unlockEgg('dexter-monologue')}
      />

      <EasterEggToast toast={toast} onDismiss={dismissToast} />
    </div>
  );
}

export default App;
