import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy, Cpu, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { RoleProfile } from '../../data/portfolioData';
import { soundEngine } from '../../audio/soundEngine';

interface RoleDossierProps {
  role: RoleProfile;
}

export const RoleDossier: React.FC<RoleDossierProps> = ({ role }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyPitch = async () => {
    soundEngine.playHoverTick();
    const text = `Manas Khanna — ${role.roleTitle}\n${role.headline}\n\n${role.pitch}\n\nCore Stack: ${role.coreStack.join(', ')}\nFlagship Proof: ${role.flagshipProof}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={role.id}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0C0E13]/90 p-6 shadow-titanium backdrop-blur-xl sm:p-8"
        style={{
          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.08), 0 0 50px -24px ${role.color}`
        }}
      >
        {/* Top Accent Hairline */}
        <div
          className="absolute inset-x-0 top-0 h-[2px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${role.color}, transparent)`
          }}
        />

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          {/* Left Column: Pitch & Stack */}
          <div className="max-w-2xl space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] font-bold tracking-wider"
                style={{
                  borderColor: `${role.color}55`,
                  backgroundColor: `${role.color}18`,
                  color: role.color
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: role.color }}
                />
                {role.portLabel} // {role.roleTitle.toUpperCase()}
              </span>
            </div>

            <h3 className="font-display text-2xl font-bold tracking-tight text-[#F4F5F7] sm:text-3xl">
              {role.headline}
            </h3>

            <p className="text-sm leading-relaxed text-[#949BA8] sm:text-base">{role.pitch}</p>

            {/* Core Stack Pills */}
            <div className="pt-1">
              <p className="mb-2.5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-[#525866]">
                <Cpu className="h-3.5 w-3.5" style={{ color: role.color }} />
                Active Specialization Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {role.coreStack.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-[#F4F5F7]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Metrics & Proof */}
          <div className="flex w-full flex-col justify-between gap-4 rounded-xl border border-white/10 bg-[#07080C] p-5 lg:w-[340px] lg:shrink-0">
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#949BA8]">
                <ShieldCheck className="h-4 w-4" style={{ color: role.color }} />
                Flagship Proof-of-Work
              </div>
              <p className="text-sm font-semibold leading-snug text-[#F4F5F7]">
                {role.flagshipProof}
              </p>

              <div className="grid grid-cols-1 gap-2 pt-2">
                {role.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2"
                  >
                    <span className="font-mono text-[11px] text-[#949BA8]">{m.label}</span>
                    <span className="font-mono text-xs font-semibold" style={{ color: role.color }}>
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={handleCopyPitch}
                data-interactive="true"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2.5 font-mono text-xs font-medium text-[#F4F5F7] transition-colors hover:border-white/30 hover:bg-white/[0.08]"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Pitch Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Tailored Pitch</span>
                  </>
                )}
              </button>
              <a
                href="#projects"
                data-interactive="true"
                className="flex items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] p-2.5 text-[#949BA8] transition-colors hover:border-white/30 hover:text-white"
                title="View Projects"
              >
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
