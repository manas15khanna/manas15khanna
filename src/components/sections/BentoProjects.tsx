import React, { useRef, useState } from 'react';
import { ArrowUpRight, Award, MessageSquareQuote } from 'lucide-react';
import { PROJECTS } from '../../data/portfolioData';
import { soundEngine } from '../../audio/soundEngine';

interface BentoProjectsProps {
  tarsHumorActive: boolean;
  onTriggerDexter: () => void;
}

export const BentoProjects: React.FC<BentoProjectsProps> = ({
  tarsHumorActive,
  onTriggerDexter
}) => {
  const [filter, setFilter] = useState<'ALL' | 'AI & Retrieval' | 'Security & OSINT'>('ALL');
  const [dexterWhisper, setDexterWhisper] = useState(false);
  const dexterTimerRef = useRef<number | null>(null);

  const filtered =
    filter === 'ALL' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  const handleVigilantEnter = () => {
    dexterTimerRef.current = window.setTimeout(() => {
      setDexterWhisper(true);
      onTriggerDexter();
    }, 1450);
  };

  const handleVigilantLeave = () => {
    if (dexterTimerRef.current) {
      window.clearTimeout(dexterTimerRef.current);
      dexterTimerRef.current = null;
    }
    setDexterWhisper(false);
  };

  return (
    <section id="projects" className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--accent-active)]">
            02 // SELECTED ENGINEERING
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#F4F5F7] sm:text-5xl">
            PROOF OF WORK
          </h2>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {(['ALL', 'AI & Retrieval', 'Security & OSINT'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                soundEngine.playHoverTick();
                setFilter(cat);
              }}
              data-interactive="true"
              className={`rounded-full border px-4 py-1.5 font-mono text-xs transition-all ${
                filter === cat
                  ? 'border-[var(--accent-active)] bg-[rgba(var(--accent-rgb),0.15)] text-[var(--accent-active)]'
                  : 'border-white/10 bg-white/[0.03] text-[#949BA8] hover:border-white/25 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Asymmetric Luxury Bento Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
        {filtered.map((project, idx) => {
          const isWide = filter === 'ALL' && (idx === 0 || idx === 3);
          const isVigilant = project.id === 'vigilanteye';

          return (
            <article
              key={project.id}
              onMouseEnter={() => {
                soundEngine.playHoverTick();
                if (isVigilant) handleVigilantEnter();
              }}
              onMouseLeave={() => {
                if (isVigilant) handleVigilantLeave();
              }}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0C0E13]/90 p-6 shadow-titanium backdrop-blur-xl transition-all duration-300 hover:border-[var(--accent-active)]/60 sm:p-7 ${
                isWide ? 'md:col-span-7' : 'md:col-span-5'
              }`}
            >
              {/* Subtle liquid-metal top edge sheen */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-40 transition-opacity group-hover:opacity-100" />

              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  {project.badge && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent-active)]/35 bg-[rgba(var(--accent-rgb),0.1)] px-3 py-1 font-mono text-[10px] font-bold tracking-wider text-[var(--accent-active)]">
                      {project.id === 'hexawipe' && <Award className="h-3.5 w-3.5" />}
                      {project.badge}
                    </span>
                  )}

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-interactive="true"
                    className="ml-auto flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[#949BA8] transition-all group-hover:border-[var(--accent-active)] group-hover:text-[var(--accent-active)]"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>

                <h3 className="mt-4 font-display text-2xl font-bold text-[#F4F5F7] sm:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-1 font-mono text-xs text-[var(--accent-active)]">
                  {project.subtitle}
                </p>
                <p className="mt-1 font-mono text-[11px] text-[#525866]">{project.context}</p>

                <p className="mt-4 text-sm leading-relaxed text-[#949BA8]">
                  {project.description}
                </p>

                {/* Dexter / You Easter Egg Whisper on VigilantEye */}
                {isVigilant && dexterWhisper && (
                  <div className="mt-3 rounded-lg border border-[#FF2A5F]/40 bg-[#FF2A5F]/10 px-3 py-2 font-mono text-xs italic text-[#FF2A5F]">
                    "Hello, you. Tonight&apos;s the night... for a clean OSINT audit."
                  </div>
                )}

                {/* TARS 100% Humor Annotation */}
                {tarsHumorActive && (
                  <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-400/25 bg-amber-400/[0.06] p-3 font-mono text-xs text-amber-200/90">
                    <MessageSquareQuote className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                    <span>
                      <strong className="text-amber-400">TARS (100%):</strong> {project.tarsNote}
                    </span>
                  </div>
                )}
              </div>

              {/* Tech Stack Tags */}
              <div className="mt-6 flex flex-wrap gap-1.5 pt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-[#949BA8]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
