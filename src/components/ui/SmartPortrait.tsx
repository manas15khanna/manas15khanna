import React, { useState } from 'react';
import { Camera } from 'lucide-react';

interface SmartPortraitProps {
  src: string;
  alt: string;
  aspectClass?: string;
  objectPosition?: string;
  label: string;
  className?: string;
}

export const SmartPortrait: React.FC<SmartPortraitProps> = ({
  src,
  alt,
  aspectClass = 'aspect-[4/5]',
  objectPosition = 'object-top',
  label,
  className = ''
}) => {
  const [hasError, setHasError] = useState(false);
  const cleanFile = src.startsWith('/') ? `public${src}` : `public/${src}`;

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0C0E13] shadow-titanium ${aspectClass} ${className}`}
    >
      {!hasError ? (
        <img
          src={`.${src}`}
          alt={alt}
          onError={() => setHasError(true)}
          className={`h-full w-full object-cover ${objectPosition} transition-transform duration-700 ease-out group-hover:scale-105`}
        />
      ) : (
        <div className="cyber-grid relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#080A0F] p-5 text-center">
          {/* Scanning laser line */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] animate-scanline bg-gradient-to-r from-transparent via-[var(--accent-active)] to-transparent opacity-40" />

          {/* Corner viewfinder crop marks */}
          <span className="absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-white/30" />
          <span className="absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-white/30" />
          <span className="absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-white/30" />
          <span className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-white/30" />

          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[var(--accent-active)]">
            <Camera className="h-5 w-5" />
          </div>

          <p className="font-mono text-[11px] font-semibold tracking-widest text-[#F4F5F7]">
            {label}
          </p>
          <p className="mt-2 rounded-md border border-white/10 bg-black/50 px-2.5 py-1 font-mono text-[10px] text-[#949BA8]">
            ADD FILE: <span className="text-[var(--accent-active)]">{cleanFile}</span>
          </p>
          <p className="mt-2 max-w-[210px] text-[11px] text-[#525866]">
            Auto-crops with <code className="text-[#949BA8]">object-cover</code> on drop-in.
          </p>
        </div>
      )}

      {/* Subtle luxury vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050608]/70 via-transparent to-transparent" />
    </div>
  );
};
