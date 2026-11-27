import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Play, RotateCcw, ShieldAlert, Swords, Terminal } from 'lucide-react';
import { soundEngine } from '../../audio/soundEngine';

interface PacketParryGameProps {
  onUnlockSekiro: () => void;
  onOpenTerminal: () => void;
}

interface PacketNode {
  id: number;
  lane: 0 | 1 | 2;
  y: number; // 0 (top) to 100 (bottom)
  label: string;
  speed: number;
}

const LABELS = ['SYN_FLOOD', 'ZERO_DAY', 'ROOTKIT', 'SQL_INJ', 'XSS_PAYLOAD'];
const HIGH_SCORE_KEY = 'manas_packet_parry_best_v1';

export const PacketParryGame: React.FC<PacketParryGameProps> = ({
  onUnlockSekiro,
  onOpenTerminal
}) => {
  const [playing, setPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [posture, setPosture] = useState(100);
  const [feedback, setFeedback] = useState<string>('READY // DEFLECT INCOMING PACKETS');
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      return Number(localStorage.getItem(HIGH_SCORE_KEY) || 0);
    } catch {
      return 0;
    }
  });
  const [packets, setPackets] = useState<PacketNode[]>([]);

  const packetsRef = useRef<PacketNode[]>([]);
  const scoreRef = useRef(0);
  const postureRef = useRef(100);
  const playingRef = useRef(false);
  const lastSpawnRef = useRef(0);
  const sekiroUnlockedRef = useRef(false);

  const startGame = () => {
    soundEngine.playRj45Snap();
    packetsRef.current = [];
    scoreRef.current = 0;
    postureRef.current = 100;
    playingRef.current = true;
    lastSpawnRef.current = performance.now();
    setPackets([]);
    setScore(0);
    setCombo(0);
    setPosture(100);
    setGameOver(false);
    setPlaying(true);
    setFeedback('WAVE 1 // PARRY IN THE GOLDEN ZONE');
  };

  const parryLane = useCallback(
    (lane: 0 | 1 | 2) => {
      if (!playingRef.current) return;

      // Golden parry zone: y between 70 and 92
      const idx = packetsRef.current.findIndex(
        (p) => p.lane === lane && p.y >= 64 && p.y <= 95
      );

      if (idx !== -1) {
        const target = packetsRef.current[idx];
        packetsRef.current.splice(idx, 1);

        const isPerfect = target.y >= 73 && target.y <= 89;
        const pts = isPerfect ? 150 : 50;
        scoreRef.current += pts;
        setScore(scoreRef.current);

        if (isPerfect) {
          soundEngine.playParryClang();
          setCombo((c) => c + 1);
          postureRef.current = Math.min(100, postureRef.current + 6);
          setPosture(postureRef.current);
          setFeedback(`PERFECT PARRY! +${pts} PTS (${target.label})`);
        } else {
          soundEngine.playHoverTick();
          setCombo((c) => c + 1);
          postureRef.current = Math.max(0, postureRef.current - 5);
          setPosture(postureRef.current);
          setFeedback(`BLOCKED +${pts} PTS`);
        }

        if (scoreRef.current >= 1500 && !sekiroUnlockedRef.current) {
          sekiroUnlockedRef.current = true;
          onUnlockSekiro();
        }

        if (scoreRef.current > highScore) {
          setHighScore(scoreRef.current);
          try {
            localStorage.setItem(HIGH_SCORE_KEY, String(scoreRef.current));
          } catch {
            // ignore
          }
        }
      } else {
        // Early whiff drains posture slightly
        postureRef.current = Math.max(0, postureRef.current - 8);
        setPosture(postureRef.current);
        setCombo(0);
        setFeedback('WHIFF! POSTURE DRAINED');
      }
    },
    [highScore, onUnlockSekiro]
  );

  // Keyboard controls A/S/D and ArrowLeft/ArrowDown/ArrowRight
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!playingRef.current) return;
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;

      const k = e.key.toLowerCase();
      if (k === 'a' || e.key === 'ArrowLeft') {
        e.preventDefault();
        parryLane(0);
      } else if (k === 's' || e.key === 'ArrowDown') {
        e.preventDefault();
        parryLane(1);
      } else if (k === 'd' || e.key === 'ArrowRight') {
        e.preventDefault();
        parryLane(2);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [parryLane]);

  // Game Loop
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let prevTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - prevTime) / 1000);
      prevTime = now;

      // Escalate spawn rate & speed with score
      const difficulty = 1 + Math.min(1.2, scoreRef.current / 2200);
      const spawnInterval = Math.max(420, 920 / difficulty);

      if (now - lastSpawnRef.current > spawnInterval) {
        lastSpawnRef.current = now;
        const lane = Math.floor(Math.random() * 3) as 0 | 1 | 2;
        packetsRef.current.push({
          id: now + Math.random(),
          lane,
          y: -5,
          label: LABELS[Math.floor(Math.random() * LABELS.length)],
          speed: (36 + Math.random() * 14) * difficulty
        });
      }

      const surviving: PacketNode[] = [];
      for (const p of packetsRef.current) {
        p.y += p.speed * dt;
        if (p.y > 98) {
          // Missed packet hits firewall core
          postureRef.current = Math.max(0, postureRef.current - 22);
          setPosture(postureRef.current);
          setCombo(0);
          setFeedback(`BREACH! ${p.label} HIT CORE (-22 POSTURE)`);
        } else {
          surviving.push(p);
        }
      }
      packetsRef.current = surviving;
      setPackets([...surviving]);

      if (postureRef.current <= 0) {
        playingRef.current = false;
        setPlaying(false);
        setGameOver(true);
        setFeedback('POSTURE BROKEN // FIREWALL COMPROMISED');
        return;
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  return (
    <section id="lab" className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--accent-active)]">
            05 // INTERACTIVE LAB
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#F4F5F7] sm:text-5xl">
            OMARCHY &amp; PACKET PARRY
          </h2>
        </div>

        <button
          type="button"
          onClick={onOpenTerminal}
          data-interactive="true"
          className="inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 font-mono text-xs text-[#F4F5F7] transition-colors hover:border-[var(--accent-active)] sm:self-auto"
        >
          <Terminal className="h-4 w-4 text-[var(--accent-active)]" />
          <span>OPEN OMARCHY ZSH TERMINAL (~)</span>
        </button>
      </div>

      {/* Packet Parry Arcade Cabinet */}
      <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#0C0E13]/90 p-5 shadow-titanium backdrop-blur-xl sm:p-7">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--accent-active)]/40 bg-[rgba(var(--accent-rgb),0.12)] text-[var(--accent-active)]">
              <Swords className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-lg font-bold text-[#F4F5F7]">
                PACKET PARRY // ZERO-DAY DEFENDER
              </h3>
              <p className="font-mono text-[11px] text-[#949BA8]">
                Hit <code className="text-white">A / S / D</code>, Arrow Keys, or tap lanes in the
                golden zone. Reach 1,500 pts for Shinobi Mastery.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 font-mono text-xs">
            <div>
              <span className="block text-[9px] text-[#525866]">SCORE</span>
              <span className="text-base font-bold text-[var(--accent-active)]">{score}</span>
            </div>
            <div>
              <span className="block text-[9px] text-[#525866]">COMBO</span>
              <span className="text-base font-bold text-[#F4F5F7]">{combo}x</span>
            </div>
            <div>
              <span className="block text-[9px] text-[#525866]">BEST</span>
              <span className="text-base font-bold text-amber-400">{highScore}</span>
            </div>
          </div>
        </div>

        {/* Posture Bar */}
        <div className="mb-4 space-y-1.5">
          <div className="flex items-center justify-between font-mono text-[10px]">
            <span className="text-[#949BA8]">FIREWALL POSTURE</span>
            <span className={posture < 35 ? 'text-[#FF2A5F]' : 'text-emerald-400'}>
              {posture}%
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full transition-all duration-150"
              style={{
                width: `${posture}%`,
                backgroundColor: posture < 35 ? '#FF2A5F' : '#10B981'
              }}
            />
          </div>
        </div>

        {/* 3 Fiber Lanes Arena */}
        <div className="relative h-[300px] overflow-hidden rounded-xl border border-white/10 bg-[#050608]">
          {/* Golden Parry Zone */}
          <div
            className="pointer-events-none absolute inset-x-0 border-y border-amber-400/50 bg-amber-400/[0.08]"
            style={{ top: '73%', height: '16%' }}
          >
            <span className="absolute right-3 top-1 font-mono text-[9px] tracking-widest text-amber-300/70">
              PARRY ZONE
            </span>
          </div>

          {/* 3 Clickable Lanes */}
          <div className="grid h-full grid-cols-3 divide-x divide-white/[0.07]">
            {[0, 1, 2].map((laneIdx) => {
              const keyLabel = laneIdx === 0 ? 'A / ←' : laneIdx === 1 ? 'S / ↓' : 'D / →';
              return (
                <button
                  key={laneIdx}
                  type="button"
                  onClick={() => parryLane(laneIdx as 0 | 1 | 2)}
                  className="relative h-full w-full text-left transition-colors active:bg-white/[0.04]"
                >
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded border border-white/15 bg-black/70 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#949BA8]">
                    {keyLabel}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Falling Threat Packets */}
          {packets.map((p) => (
            <div
              key={p.id}
              className="pointer-events-none absolute flex w-1/3 -translate-y-1/2 justify-center px-2"
              style={{
                left: `${p.lane * 33.333}%`,
                top: `${p.y}%`
              }}
            >
              <div className="flex items-center gap-1.5 rounded-lg border border-[#FF2A5F]/60 bg-[#FF2A5F]/20 px-2.5 py-1 font-mono text-[10px] font-bold text-[#FF2A5F] shadow-[0_0_16px_rgba(255,42,95,0.4)]">
                <ShieldAlert className="h-3 w-3" />
                <span className="truncate">{p.label}</span>
              </div>
            </div>
          ))}

          {/* Start / Game Over Overlay */}
          {!playing && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050608]/80 backdrop-blur-sm">
              <p className="mb-3 font-mono text-xs text-[#949BA8]">
                {gameOver ? `FINAL SCORE: ${score}` : 'DEFEND THE CORE FIREWALL'}
              </p>
              <button
                type="button"
                onClick={startGame}
                data-interactive="true"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-active)] px-6 py-2.5 font-mono text-xs font-bold text-[#050608] shadow-glow transition-transform hover:scale-105"
              >
                {gameOver ? <RotateCcw className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                <span>{gameOver ? 'RETRY DEFENSE' : 'START PARRY RUN'}</span>
              </button>
            </div>
          )}
        </div>

        <p className="mt-3 text-center font-mono text-[11px] text-[#949BA8]">{feedback}</p>
      </div>
    </section>
  );
};
