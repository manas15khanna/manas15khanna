import React, { useEffect, useRef } from 'react';

interface SmokeCanvasProps {
  accentRgb: string;
  velocityMultiplier?: number;
}

interface SmokePuff {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  angle: number;
  spin: number;
  tint: 'charcoal' | 'silver' | 'accent';
  noiseSeed: number;
}

export const SmokeCanvas: React.FC<SmokeCanvasProps> = ({
  accentRgb,
  velocityMultiplier = 1
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const accentRef = useRef(accentRgb);
  const multRef = useRef(velocityMultiplier);

  useEffect(() => {
    accentRef.current = accentRgb;
  }, [accentRgb]);

  useEffect(() => {
    multRef.current = velocityMultiplier;
  }, [velocityMultiplier]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const mouse = { x: width * 0.5, y: height * 0.4, px: width * 0.5, py: height * 0.4, vx: 0, vy: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.vx = (e.clientX - mouse.x) * 0.5;
      mouse.vy = (e.clientY - mouse.y) * 0.5;
      mouse.px = mouse.x;
      mouse.py = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const PUFF_COUNT = 52;
    const puffs: SmokePuff[] = Array.from({ length: PUFF_COUNT }, (_, i) => {
      const tintPool: SmokePuff['tint'][] = ['charcoal', 'charcoal', 'silver', 'accent'];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: -0.15 - Math.random() * 0.3,
        radius: 170 + Math.random() * 240,
        baseAlpha: 0.035 + Math.random() * 0.08,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.004,
        tint: tintPool[i % tintPool.length],
        noiseSeed: Math.random() * 100
      };
    });

    let rafId = 0;
    let time = 0;

    const render = () => {
      time += 0.008 * multRef.current;
      ctx.clearRect(0, 0, width, height);

      // Decay cursor velocity smoothly
      mouse.vx *= 0.92;
      mouse.vy *= 0.92;

      for (let i = 0; i < puffs.length; i++) {
        const p = puffs[i];

        // Curl-like organic drift
        const curlX = Math.sin(time + p.noiseSeed + p.y * 0.0025) * 0.28 * multRef.current;
        const curlY = Math.cos(time * 0.9 + p.noiseSeed + p.x * 0.0025) * 0.22 * multRef.current;

        p.vx += curlX * 0.025;
        p.vy += curlY * 0.02;

        // Cursor vortex + repulsion within 260px
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 260 && dist > 1) {
          const falloff = 1 - dist / 260;
          const speedBoost = Math.min(2.5, 0.5 + Math.hypot(mouse.vx, mouse.vy) * 0.08);
          const nx = dx / dist;
          const ny = dy / dist;
          // Repel + tangential curl swirl
          p.vx += (nx * 0.35 - ny * 0.45) * falloff * speedBoost * 0.28;
          p.vy += (ny * 0.35 + nx * 0.45) * falloff * speedBoost * 0.28;
        }

        // Damping
        p.vx *= 0.965;
        p.vy *= 0.965;
        p.x += p.vx;
        p.y += p.vy - 0.14 * multRef.current;
        p.angle += p.spin;

        // Wrap around viewport smoothly
        if (p.x < -p.radius) p.x = width + p.radius;
        if (p.x > width + p.radius) p.x = -p.radius;
        if (p.y < -p.radius) p.y = height + p.radius;
        if (p.y > height + p.radius) p.y = -p.radius;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        if (p.tint === 'charcoal') {
          grad.addColorStop(0, `rgba(38, 42, 54, ${p.baseAlpha * 1.4})`);
          grad.addColorStop(0.55, `rgba(24, 27, 36, ${p.baseAlpha * 0.55})`);
          grad.addColorStop(1, 'rgba(5, 6, 8, 0)');
        } else if (p.tint === 'silver') {
          grad.addColorStop(0, `rgba(180, 190, 210, ${p.baseAlpha * 0.55})`);
          grad.addColorStop(0.5, `rgba(120, 130, 150, ${p.baseAlpha * 0.2})`);
          grad.addColorStop(1, 'rgba(5, 6, 8, 0)');
        } else {
          grad.addColorStop(0, `rgba(${accentRef.current}, ${p.baseAlpha * 0.65})`);
          grad.addColorStop(0.5, `rgba(${accentRef.current}, ${p.baseAlpha * 0.18})`);
          grad.addColorStop(1, 'rgba(5, 6, 8, 0)');
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-90"
      aria-hidden="true"
    />
  );
};
