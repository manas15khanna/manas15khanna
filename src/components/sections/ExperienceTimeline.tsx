import React, { useState } from 'react';
import { Award, BookOpen, ChevronDown, Wind } from 'lucide-react';
import { CERTIFICATIONS, CORE_STACK, EDUCATION, EXPERIENCE } from '../../data/portfolioData';
import { soundEngine } from '../../audio/soundEngine';

interface ExperienceTimelineProps {
  onUnlockDrs: () => void;
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ onUnlockDrs }) => {
  const [drsOpen, setDrsOpen] = useState(false);

  const toggleDrs = () => {
    soundEngine.playRj45Snap();
    const next = !drsOpen;
    setDrsOpen(next);
    if (next) {
      onUnlockDrs();
    }
  };

  return (
    <section id="experience" className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      {/* Header + F1 DRS Flap Toggle */}
      <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--accent-active)]">
            03 // TELEMETRY &amp; CREDENTIALS
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#F4F5F7] sm:text-5xl">
            EXPERIENCE &amp; LEADERSHIP
          </h2>
        </div>

        <button
          type="button"
          onClick={toggleDrs}
          data-interactive="true"
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs font-bold transition-all ${
            drsOpen
              ? 'border-emerald-400 bg-emerald-400/15 text-emerald-300 shadow-[0_0_24px_-4px_rgba(16,185,129,0.5)]'
              : 'border-white/15 bg-white/[0.04] text-[#949BA8] hover:border-[var(--accent-active)] hover:text-white'
          }`}
        >
          <Wind className={`h-4 w-4 ${drsOpen ? 'animate-pulse text-emerald-400' : ''}`} />
          <span>DRS: {drsOpen ? 'OPEN // DEEP LOGS' : 'CLOSED // CLICK TO EXPAND'}</span>
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-300 ${drsOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {/* Experience Cards */}
      <div className="space-y-4">
        {EXPERIENCE.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-white/10 bg-[#0C0E13]/85 p-6 shadow-titanium backdrop-blur-xl transition-colors hover:border-white/20"
          >
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-display text-xl font-bold text-[#F4F5F7]">{item.role}</h3>
                <p className="font-mono text-xs text-[var(--accent-active)]">{item.organization}</p>
              </div>
              <div className="font-mono text-xs text-[#949BA8] sm:text-right">
                <p>{item.period}</p>
                <p className="text-[11px] text-[#525866]">{item.location}</p>
              </div>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-[#949BA8]">{item.summary}</p>

            {drsOpen && (
              <ul className="mt-4 space-y-2 border-t border-white/[0.08] pt-4 text-sm text-[#F4F5F7]/90">
                {item.drsDetails.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-active)]" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 font-mono text-[10px] text-[#949BA8]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Education & Cisco Certifications Grid */}
      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Education */}
        <div className="rounded-2xl border border-white/10 bg-[#0C0E13]/85 p-6 shadow-titanium lg:col-span-6">
          <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--accent-active)]">
            <BookOpen className="h-4 w-4" />
            Education
          </div>
          <div className="space-y-4">
            {EDUCATION.map((edu) => (
              <div key={edu.degree} className="border-l-2 border-white/10 pl-4">
                <p className="text-sm font-semibold text-[#F4F5F7]">{edu.degree}</p>
                <p className="text-xs text-[#949BA8]">{edu.institution}</p>
                <div className="mt-1 flex items-center justify-between font-mono text-[11px] text-[#525866]">
                  <span>{edu.period}</span>
                  <span className="text-[var(--accent-active)]">{edu.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cisco Certifications & Core Stack */}
        <div className="rounded-2xl border border-white/10 bg-[#0C0E13]/85 p-6 shadow-titanium lg:col-span-6">
          <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--accent-active)]">
            <Award className="h-4 w-4" />
            Cisco Networking Academy Certifications
          </div>
          <div className="space-y-3">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.title}
                className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-[#F4F5F7]">{cert.title}</p>
                  <p className="font-mono text-[11px] text-[#949BA8]">{cert.issuer}</p>
                </div>
                <span className="font-mono text-[11px] text-[var(--accent-active)]">
                  {cert.issued}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 border-t border-white/[0.08] pt-4">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[#525866]">
              Systems &amp; Languages
            </p>
            <div className="flex flex-wrap gap-1.5">
              {[...CORE_STACK.languages, ...CORE_STACK.systemsAndSecurity.slice(0, 6)].map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-white/[0.07] bg-white/[0.02] px-2 py-0.5 font-mono text-[10px] text-[#949BA8]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
