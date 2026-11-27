import React from 'react';
import { RoleProfile } from '../../data/portfolioData';

export interface Point {
  x: number;
  y: number;
}

interface LanCableProps {
  role: RoleProfile;
  anchorStart: Point;
  restEnd: Point;
  portCenter: Point;
  isPlugged: boolean;
  isDragging: boolean;
  dragPoint: Point | null;
  onPointerDownPlug: (roleId: number, e: React.PointerEvent<SVGGElement>) => void;
  onClickPlug: (roleId: number) => void;
}

export const LanCable: React.FC<LanCableProps> = ({
  role,
  anchorStart,
  restEnd,
  portCenter,
  isPlugged,
  isDragging,
  dragPoint,
  onPointerDownPlug,
  onClickPlug
}) => {
  const end: Point = isDragging && dragPoint ? dragPoint : isPlugged ? portCenter : restEnd;

  // Physics-inspired cubic Bezier control points
  // When unplugged: sags downward naturally; when plugged: smooth taut S-curve into port
  const sag = isPlugged ? -38 : isDragging ? 35 : 82;
  const cx1 = anchorStart.x + (end.x - anchorStart.x) * 0.25;
  const cy1 = anchorStart.y + sag;
  const cx2 = end.x;
  const cy2 = isPlugged ? end.y + 68 : end.y + 44;

  const pathD = `M ${anchorStart.x} ${anchorStart.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${end.x} ${end.y}`;

  return (
    <g className="select-none">
      {/* Outer Ambient Glow when plugged or dragging */}
      {(isPlugged || isDragging) && (
        <path
          d={pathD}
          fill="none"
          stroke={role.color}
          strokeWidth={16}
          strokeLinecap="round"
          opacity={isPlugged ? 0.16 : 0.12}
          style={{ filter: 'blur(6px)' }}
        />
      )}

      {/* Braided Carbon-Black Cat6A Sheath */}
      <path
        d={pathD}
        fill="none"
        stroke="#151821"
        strokeWidth={10}
        strokeLinecap="round"
      />
      <path
        d={pathD}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={10}
        strokeDasharray="3 5"
        strokeLinecap="round"
      />

      {/* Inner Translucent RGB Light-Pipe Core */}
      <path
        d={pathD}
        fill="none"
        stroke={role.color}
        strokeWidth={isPlugged ? 3 : 1.5}
        strokeLinecap="round"
        opacity={isPlugged ? 0.85 : 0.35}
      />

      {/* Animated Data Light Pulse shooting up into the switch port */}
      {isPlugged && (
        <path
          d={pathD}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeDasharray="14 64"
          opacity={0.9}
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-156"
            dur="1.15s"
            repeatCount="indefinite"
          />
        </path>
      )}

      {/* Interactive RJ45 Male Plug Assembly */}
      <g
        transform={`translate(${end.x}, ${end.y})`}
        onPointerDown={(e) => onPointerDownPlug(role.id, e)}
        onClick={(e) => {
          e.stopPropagation();
          onClickPlug(role.id);
        }}
        data-interactive="true"
        className="cursor-grab active:cursor-grabbing"
      >
        {/* Hit area */}
        <circle cx={0} cy={8} r={24} fill="transparent" />

        {/* Strain-relief boot */}
        <path
          d="M -7 12 L 7 12 L 5 26 L -5 26 Z"
          fill="#1B1F2A"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth={1}
        />

        {/* Glowing RGB LED Collar */}
        <rect
          x={-9}
          y={7}
          width={18}
          height={5}
          rx={2}
          fill={role.color}
          opacity={isPlugged || isDragging ? 1 : 0.55}
        />

        {/* Translucent Polycarbonate RJ45 Housing */}
        <rect
          x={-10}
          y={-10}
          width={20}
          height={18}
          rx={3}
          fill="rgba(220, 230, 245, 0.14)"
          stroke={isPlugged || isDragging ? role.color : 'rgba(255,255,255,0.35)'}
          strokeWidth={1.3}
        />

        {/* 6 Gold Contact Pins */}
        {[-6, -3.5, -1, 1.5, 4, 6.5].map((px, idx) => (
          <line
            key={idx}
            x1={px}
            y1={-9}
            x2={px}
            y2={-3}
            stroke="#F5B942"
            strokeWidth={1.3}
            strokeLinecap="round"
          />
        ))}

        {/* Floating Port Tag below boot when unplugged */}
        {!isPlugged && (
          <g transform="translate(0, 42)">
            <rect
              x={-36}
              y={-10}
              width={72}
              height={18}
              rx={5}
              fill="#0C0E13"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth={1}
            />
            <text
              x={0}
              y={2}
              textAnchor="middle"
              fill={role.color}
              fontSize="8.5"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="700"
            >
              {role.shortName}
            </text>
          </g>
        )}
      </g>
    </g>
  );
};
