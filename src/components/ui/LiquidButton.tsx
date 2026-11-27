import React, { useRef, useState } from 'react';
import { soundEngine } from '../../audio/soundEngine';

interface LiquidButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  target?: string;
  rel?: string;
}

export const LiquidButton: React.FC<LiquidButtonProps> = ({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  target,
  rel
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = Math.max(-12, Math.min(12, (e.clientX - cx) * 0.25));
    const dy = Math.max(-12, Math.min(12, (e.clientY - cy) * 0.25));
    setOffset({ x: dx, y: dy });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    soundEngine.playHoverTick();
  };

  const baseStyles =
    'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 ease-out select-none';

  const variantStyles = {
    primary:
      'bg-[var(--accent-active)] text-[#050608] shadow-[0_0_24px_-4px_rgba(var(--accent-rgb),0.5)] hover:shadow-[0_0_36px_-2px_rgba(var(--accent-rgb),0.8)]',
    secondary:
      'border border-white/15 bg-white/[0.04] text-[#F4F5F7] backdrop-blur-md hover:border-[var(--accent-active)] hover:text-[#050608]',
    ghost:
      'border border-white/10 bg-transparent text-[#949BA8] hover:border-white/30 hover:text-[#F4F5F7]'
  }[variant];

  const innerContent = (
    <>
      {/* Liquid wave fill on hover for secondary */}
      {variant === 'secondary' && (
        <span
          aria-hidden="true"
          className="absolute inset-0 translate-y-[102%] rounded-full bg-[var(--accent-active)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
        />
      )}
      <span className="relative z-10 kinetic-wrap">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
    </>
  );

  const style: React.CSSProperties = {
    transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`
  };

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onClick={onClick}
        style={style}
        data-interactive="true"
        className={`${baseStyles} ${variantStyles} ${className}`}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
      style={style}
      data-interactive="true"
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {innerContent}
    </button>
  );
};
