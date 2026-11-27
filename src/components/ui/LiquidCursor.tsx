import React, { useEffect, useRef, useState } from 'react';

export const LiquidCursor: React.FC = () => {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) return;
    setIsEnabled(true);
    document.documentElement.classList.add('has-liquid-cursor');

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX - 3}px, ${targetY - 3}px, 0)`;
      }

      const target = e.target as HTMLElement | null;
      const interactive = target?.closest('a, button, [data-interactive="true"]');
      setIsHovering(Boolean(interactive));
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;
      if (ringRef.current) {
        const size = isHovering ? 46 : 26;
        ringRef.current.style.transform = `translate3d(${currentX - size / 2}px, ${currentY - size / 2}px, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove('has-liquid-cursor');
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, [isHovering]);

  if (!isEnabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        className={`pointer-events-none fixed left-0 top-0 z-[90] rounded-full border transition-[width,height,background-color,border-color] duration-200 ${
          isHovering
            ? 'liquid-distort h-[46px] w-[46px] border-[var(--accent-active)] bg-[rgba(var(--accent-rgb),0.12)]'
            : 'h-[26px] w-[26px] border-white/30 bg-transparent'
        }`}
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[91] h-1.5 w-1.5 rounded-full bg-[var(--accent-active)]"
        aria-hidden="true"
      />
    </>
  );
};
