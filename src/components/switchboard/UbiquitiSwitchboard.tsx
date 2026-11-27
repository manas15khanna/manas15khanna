import React, { useCallback, useRef, useState } from 'react';
import { SWITCHBOARD_ROLES } from '../../data/portfolioData';
import { soundEngine } from '../../audio/soundEngine';
import { LcmScreen } from './LcmScreen';
import { LanCable, Point } from './LanCable';
import { RoleDossier } from './RoleDossier';
import { Cable } from 'lucide-react';

interface UbiquitiSwitchboardProps {
  activeRoleId: number;
  onSelectRole: (roleId: number) => void;
}

// Coordinate system inside the 920 x 240 SVG patch-bay canvas
const PORT_CENTERS: Record<number, Point> = {
  1: { x: 250, y: 26 },
  2: { x: 390, y: 26 },
  3: { x: 530, y: 26 },
  4: { x: 670, y: 26 },
  5: { x: 810, y: 26 }
};

const ANCHOR_STARTS: Record<number, Point> = {
  1: { x: 250, y: 232 },
  2: { x: 390, y: 232 },
  3: { x: 530, y: 232 },
  4: { x: 670, y: 232 },
  5: { x: 810, y: 232 }
};

const REST_ENDS: Record<number, Point> = {
  1: { x: 250, y: 146 },
  2: { x: 390, y: 146 },
  3: { x: 530, y: 146 },
  4: { x: 670, y: 146 },
  5: { x: 810, y: 146 }
};

export const UbiquitiSwitchboard: React.FC<UbiquitiSwitchboardProps> = ({
  activeRoleId,
  onSelectRole
}) => {
  const activeRole =
    SWITCHBOARD_ROLES.find((r) => r.id === activeRoleId) || SWITCHBOARD_ROLES[0];

  const svgRef = useRef<SVGSVGElement | null>(null);
  const [draggingRoleId, setDraggingRoleId] = useState<number | null>(null);
  const [dragPoint, setDragPoint] = useState<Point | null>(null);

  const patchRole = useCallback(
    (roleId: number) => {
      soundEngine.playRj45Snap();
      onSelectRole(roleId);
    },
    [onSelectRole]
  );

  const toSvgCoords = (clientX: number, clientY: number): Point | null => {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 920;
    const y = ((clientY - rect.top) / rect.height) * 240;
    return { x, y };
  };

  const handlePointerDownPlug = (roleId: number, e: React.PointerEvent<SVGGElement>) => {
    e.stopPropagation();
    const target = e.currentTarget;
    target.setPointerCapture?.(e.pointerId);
    setDraggingRoleId(roleId);
    const pt = toSvgCoords(e.clientX, e.clientY);
    if (pt) setDragPoint(pt);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (draggingRoleId === null) return;
    const pt = toSvgCoords(e.clientX, e.clientY);
    if (pt) setDragPoint(pt);
  };

  const handlePointerUp = () => {
    if (draggingRoleId === null) return;
    if (dragPoint) {
      // Check proximity to any port (magnetic snap within 65px)
      let closestId: number | null = null;
      let minDist = 65;
      for (const role of SWITCHBOARD_ROLES) {
        const pc = PORT_CENTERS[role.id];
        const d = Math.hypot(dragPoint.x - pc.x, dragPoint.y - pc.y);
        if (d < minDist) {
          minDist = d;
          closestId = role.id;
        }
      }
      if (closestId !== null) {
        // Auto-route dragged cable or snap directly to the hovered port
        patchRole(closestId);
      }
    }
    setDraggingRoleId(null);
    setDragPoint(null);
  };

  return (
    <section id="switchboard" className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--accent-active)]">
            01 // HARDWARE PATCH-BAY ROUTING
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#F4F5F7] sm:text-5xl">
            THE SWITCHBOARD
          </h2>
        </div>
        <p className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-[11px] text-[#949BA8]">
          <Cable className="h-3.5 w-3.5 text-[var(--accent-active)]" />
          DRAG OR CLICK ANY ETHERLIGHTING™ PATCH CABLE TO ROUTE PROFILE
        </p>
      </div>

      {/* 1U Brushed Titanium Rack-Mount Ubiquiti Switch Chassis */}
      <div className="brushed-titanium relative overflow-hidden rounded-2xl border border-white/15 p-4 shadow-titanium sm:p-6">
        {/* Rack-ear mounting hex bolts */}
        <div className="pointer-events-none absolute left-2.5 top-3 h-2.5 w-2.5 rounded-full border border-white/25 bg-[#090B10]" />
        <div className="pointer-events-none absolute bottom-3 left-2.5 h-2.5 w-2.5 rounded-full border border-white/25 bg-[#090B10]" />
        <div className="pointer-events-none absolute right-2.5 top-3 h-2.5 w-2.5 rounded-full border border-white/25 bg-[#090B10]" />
        <div className="pointer-events-none absolute bottom-3 right-2.5 h-2.5 w-2.5 rounded-full border border-white/25 bg-[#090B10]" />

        {/* Chassis Top Label */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 px-3 font-mono text-[10px] tracking-widest text-[#949BA8]">
          <span>MANAS-USW-PRO-MAX-5 // ETHERLIGHTING™</span>
          <span className="text-[#525866]">1U ANODIZED TITANIUM // PoE++</span>
        </div>

        {/* Switch Faceplate: Left LCM + Right 5 RJ45 Ports */}
        <div className="flex flex-col items-center justify-between gap-6 rounded-xl border border-white/10 bg-[#0B0D13]/90 p-4 sm:flex-row sm:px-6">
          <LcmScreen activeRole={activeRole} />

          {/* 5 Glowing RJ45 Etherlighting Ports */}
          <div className="grid w-full grid-cols-5 gap-2 sm:gap-4">
            {SWITCHBOARD_ROLES.map((role) => {
              const isActive = role.id === activeRole.id;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => patchRole(role.id)}
                  data-interactive="true"
                  className="group relative flex flex-col items-center gap-2 rounded-lg border border-white/10 bg-[#06070A] p-2.5 transition-all hover:border-white/25"
                  style={{
                    boxShadow: isActive
                      ? `0 0 22px -4px ${role.color}, inset 0 0 12px ${role.color}33`
                      : undefined,
                    borderColor: isActive ? role.color : undefined
                  }}
                >
                  <span className="font-mono text-[9px] tracking-wider text-[#949BA8]">
                    {role.portLabel}
                  </span>

                  {/* RJ45 Female Jack Cutout */}
                  <div
                    className="relative flex h-9 w-11 items-center justify-center rounded border bg-[#030406] transition-all"
                    style={{
                      borderColor: isActive ? role.color : 'rgba(255,255,255,0.18)'
                    }}
                  >
                    {/* 8 Gold Pins at top */}
                    <div className="absolute top-1 flex gap-[2px]">
                      {Array.from({ length: 6 }).map((_, idx) => (
                        <span key={idx} className="h-2 w-[2px] rounded-full bg-amber-400/80" />
                      ))}
                    </div>
                    {/* Etherlighting LED Bar */}
                    <span
                      className={`mt-3 h-1.5 w-6 rounded-full transition-all ${
                        isActive ? 'opacity-100' : 'opacity-30 group-hover:opacity-75'
                      }`}
                      style={{
                        backgroundColor: role.color,
                        boxShadow: isActive ? `0 0 10px ${role.color}` : undefined
                      }}
                    />
                  </div>

                  <span
                    className="truncate font-mono text-[9px] font-bold"
                    style={{ color: isActive ? role.color : '#949BA8' }}
                  >
                    {role.shortName}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive SVG Physics Patch-Bay Canvas */}
        <div className="relative mt-2 w-full overflow-hidden rounded-b-xl border-x border-b border-white/[0.06] bg-[#06070A]/80">
          <svg
            ref={svgRef}
            viewBox="0 0 920 240"
            className="h-[190px] w-full touch-none sm:h-[240px]"
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            {/* Port Alignment Guides */}
            {SWITCHBOARD_ROLES.map((role) => {
              const pc = PORT_CENTERS[role.id];
              const isActive = role.id === activeRole.id;
              return (
                <g key={`port-guide-${role.id}`}>
                  <circle
                    cx={pc.x}
                    cy={pc.y}
                    r={14}
                    fill={isActive ? `${role.color}22` : 'rgba(255,255,255,0.03)'}
                    stroke={isActive ? role.color : 'rgba(255,255,255,0.15)'}
                    strokeWidth={1.5}
                    className="cursor-pointer"
                    onClick={() => patchRole(role.id)}
                  />
                  <text
                    x={pc.x}
                    y={pc.y + 3}
                    textAnchor="middle"
                    fill={isActive ? role.color : '#525866'}
                    fontSize="8.5"
                    fontFamily="JetBrains Mono, monospace"
                    fontWeight="700"
                    className="pointer-events-none"
                  >
                    0{role.id}
                  </text>
                </g>
              );
            })}

            {/* Bottom Cable Management Brush Bar */}
            <rect x={160} y={224} width={730} height={16} rx={4} fill="#11141C" />
            <line
              x1={160}
              y1={224}
              x2={890}
              y2={224}
              stroke="rgba(255,255,255,0.12)"
              strokeWidth={1}
            />

            {/* 5 Braided Cat6A Cables (render active cable last so it sits on top) */}
            {[...SWITCHBOARD_ROLES]
              .sort((a, b) => (a.id === activeRole.id ? 1 : b.id === activeRole.id ? -1 : 0))
              .map((role) => (
                <LanCable
                  key={role.id}
                  role={role}
                  anchorStart={ANCHOR_STARTS[role.id]}
                  restEnd={REST_ENDS[role.id]}
                  portCenter={PORT_CENTERS[role.id]}
                  isPlugged={role.id === activeRole.id}
                  isDragging={draggingRoleId === role.id}
                  dragPoint={draggingRoleId === role.id ? dragPoint : null}
                  onPointerDownPlug={handlePointerDownPlug}
                  onClickPlug={patchRole}
                />
              ))}
          </svg>
        </div>
      </div>

      {/* Dynamic Morphing Role Dossier */}
      <div className="mt-6">
        <RoleDossier role={activeRole} />
      </div>
    </section>
  );
};
