import React, { useState } from 'react';
import { Check, Copy, Mail, Phone, Sparkles, X } from 'lucide-react';
import { EASTER_EGGS, PROFILE_IDENTITY } from '../../data/portfolioData';
import { soundEngine } from '../../audio/soundEngine';

interface FooterProps {
  discoveredIds: string[];
  totalEggs: number;
  tarsHumorActive: boolean;
  onToggleTars: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  discoveredIds,
  totalEggs,
  tarsHumorActive,
  onToggleTars
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showEggModal, setShowEggModal] = useState(false);

  const copyEmail = async () => {
    soundEngine.playHoverTick();
    try {
      await navigator.clipboard.writeText(PROFILE_IDENTITY.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <footer className="relative z-10 border-t border-white/[0.08] bg-[#050608]/95 pb-20 pt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div className="space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--accent-active)]">
              ESTABLISH UPLINK
            </p>
            <h2 className="font-display text-3xl font-extrabold text-[#F4F5F7] sm:text-5xl">
              LET&apos;S BUILD SOMETHING
              <br />
              AIR-TIGHT.
            </h2>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={copyEmail}
                data-interactive="true"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2.5 font-mono text-xs text-[#F4F5F7] transition-colors hover:border-[var(--accent-active)]"
              >
                {copiedEmail ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5 text-[var(--accent-active)]" />
                )}
                <span>{copiedEmail ? 'COPIED!' : PROFILE_IDENTITY.email}</span>
              </button>

              <a
                href={`mailto:${PROFILE_IDENTITY.email}`}
                data-interactive="true"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 font-mono text-xs text-[#949BA8] hover:text-white"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Send Mail</span>
              </a>

              <a
                href={`tel:${PROFILE_IDENTITY.phone.replace(/\s+/g, '')}`}
                data-interactive="true"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 font-mono text-xs text-[#949BA8] hover:text-white"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>{PROFILE_IDENTITY.phone}</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 md:items-end">
            {/* TARS Honesty / Humor Setting */}
            <button
              type="button"
              onClick={() => {
                soundEngine.playHoverTick();
                onToggleTars();
              }}
              data-interactive="true"
              className={`rounded-full border px-4 py-2 font-mono text-xs transition-all ${
                tarsHumorActive
                  ? 'border-amber-400/60 bg-amber-400/15 text-amber-300'
                  : 'border-white/10 bg-white/[0.03] text-[#949BA8] hover:border-white/30'
              }`}
            >
              TARS // HUMOR: {tarsHumorActive ? '100%' : '75%'}
            </button>

            {/* Easter Egg Tracker Pill */}
            <button
              type="button"
              onClick={() => {
                soundEngine.playHoverTick();
                setShowEggModal(true);
              }}
              data-interactive="true"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-xs text-[#949BA8] transition-colors hover:border-[var(--accent-active)] hover:text-white"
            >
              <Sparkles className="h-3.5 w-3.5 text-[var(--accent-active)]" />
              <span>
                EASTER EGGS: {discoveredIds.length} / {totalEggs}
              </span>
            </button>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 font-mono text-[11px] text-[#525866] sm:flex-row">
          <span>
            &copy; {new Date().getFullYear()} Manas Khanna • Built on Arch/Omarchy Linux
          </span>
          <div className="flex items-center gap-5">
            <a
              href={PROFILE_IDENTITY.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#F4F5F7]"
            >
              GitHub
            </a>
            <a
              href={PROFILE_IDENTITY.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#F4F5F7]"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Easter Egg Checklist Modal */}
      {showEggModal && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-2xl border border-white/15 bg-[#0C0E13] p-6 shadow-titanium">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent-active)]">
                  CURATED SECRETS
                </p>
                <h3 className="font-display text-xl font-bold text-[#F4F5F7]">
                  Easter Eggs ({discoveredIds.length}/{totalEggs})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowEggModal(false)}
                className="rounded-lg p-1.5 text-[#949BA8] hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 max-h-[60vh] space-y-2.5 overflow-y-auto pr-1">
              {EASTER_EGGS.map((egg) => {
                const found = discoveredIds.includes(egg.id);
                return (
                  <div
                    key={egg.id}
                    className={`rounded-xl border p-3 ${
                      found
                        ? 'border-emerald-500/40 bg-emerald-500/[0.06]'
                        : 'border-white/10 bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#F4F5F7]">
                        {found ? `✓ ${egg.title}` : `🔒 ${egg.title}`}
                      </span>
                      <span className="font-mono text-[10px] text-[#949BA8]">{egg.category}</span>
                    </div>
                    <p className="mt-1 font-mono text-[11px] text-[#949BA8]">{egg.hint}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
