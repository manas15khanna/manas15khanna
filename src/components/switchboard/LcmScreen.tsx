import React, { useEffect, useState } from 'react';
import { RoleProfile } from '../../data/portfolioData';

interface LcmScreenProps {
  activeRole: RoleProfile;
}

export const LcmScreen: React.FC<LcmScreenProps> = ({ activeRole }) => {
  const [throughput, setThroughput] = useState<number[]>([28, 46, 39, 64, 52, 78, 60, 84, 71, 90]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setThroughput((prev) => [
        ...prev.slice(1),
        Math.floor(32 + Math.random() * 64)
      ]);
    }, 900);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="relative flex h-[76px] w-[184px] shrink-0 flex-col justify-between overflow-hidden rounded-lg border border-white/15 bg-[#04060A] p-2.5 shadow-[inset_0_2px_12px_rgba(0,0,0,0.95)]">
      {/* Subtle OLED glass sheen */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent" />

      {/* Top row: OS + Sparkline */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <span className="font-mono text-[9px] font-medium tracking-wider text-[#949BA8]">
          MANAS-OS // 99.98%
        </span>
        <div className="flex h-3 items-end gap-[2px]" aria-hidden="true">
          {throughput.map((v, i) => (
            <span
              key={i}
              className="w-[2px] rounded-t-sm transition-all duration-300"
              style={{
                height: `${Math.max(20, v)}%`,
                backgroundColor: i > 6 ? activeRole.color : 'rgba(148,155,168,0.45)'
              }}
            />
          ))}
        </div>
      </div>

      {/* Middle row: Active Port Tag */}
      <div className="relative z-10 truncate font-mono text-[11px] font-bold tracking-tight" style={{ color: activeRole.color }}>
        {activeRole.lcmTag}
      </div>

      {/* Bottom row: Link Status */}
      <div className="relative z-10 flex items-center justify-between font-mono text-[9px] text-[#525866]">
        <span className="flex items-center gap-1.5 text-emerald-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          LINK: UP
        </span>
        <span>10G SFP+</span>
      </div>
    </div>
  );
};
