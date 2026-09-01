"use client"

import React, { useEffect, useRef, useState } from 'react';

export type NetworkNode = {
  id: string;
  label: string;
  // x/y are percentages relative to the SVG viewBox (0-100 x, 0-120 y by default)
  x: number;
  y: number;
};

export type EgyptNetworkMapProps = {
  nodes?: NetworkNode[];
  activeConnections?: [string, string][]; // pairs of node ids
  className?: string; // wrapper tailwind class overrides
};

// NOTE: Node positions in the defaultNodes array are APPROXIMATE PLACEHOLDERS
// and should be replaced with accurate governorate coordinates when provided
// by the client.
const defaultNodes: NetworkNode[] = [
  { id: 'cairo', label: 'Cairo / Delta', x: 58, y: 28 },
  { id: 'alex', label: 'Alexandria', x: 36, y: 22 },
  { id: 'upper', label: "Upper Egypt (Sa'id)", x: 62, y: 62 },
  { id: 'redsea', label: 'Red Sea Coast', x: 82, y: 58 },
  { id: 'western', label: 'Western Desert', x: 18, y: 50 },
];

const defaultConnections: [string, string][] = [
  ['cairo', 'alex'],
  ['cairo', 'upper'],
  ['upper', 'redsea'],
  ['cairo', 'western'],
];

export default function EgyptNetworkMap({
  nodes = defaultNodes,
  activeConnections = defaultConnections,
  className = 'w-full h-64',
}: EgyptNetworkMapProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState<null | { node: NetworkNode; x: number; y: number }>(null);

  // Convert viewBox coords (0..100, 0..120) to pixels
  const toScreen = (x: number, y: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const rect = svg.getBoundingClientRect();
    const vx = 100; // viewBox width
    const vy = 120; // viewBox height
    return { x: rect.left + (x / vx) * rect.width, y: rect.top + (y / vy) * rect.height };
  };

  useEffect(() => {
    if (!hovered) return;
    const onScroll = () => {
      // reposition tooltip on scroll
      const p = toScreen(hovered.node.x, hovered.node.y);
      setHovered({ node: hovered.node, x: p.x, y: p.y });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [hovered]);

  // Find node by id
  const findNode = (id: string) => nodes.find((n) => n.id === id) || null;

  // Create a smooth quadratic bezier path between two points
  const connectorPath = (a: NetworkNode, b: NetworkNode) => {
    // control point mid-way with slight offset for curve
    const cx = (a.x + b.x) / 2;
    const cy = (a.y + b.y) / 2 - Math.abs(a.x - b.x) * 0.15; // offset to create a nice arc
    return `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`;
  };

  return (
    <div ref={wrapperRef} className={className} style={{ position: 'relative' }}>
      <svg
        ref={svgRef}
        viewBox="0 0 100 120"
        preserveAspectRatio="xMidYMid meet"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <filter id="egypt-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background shape: simplified Egypt silhouette - single path, low-detail */}
        <path
          d={`M10 20
              L18 18
              L28 16
              L36 14
              L44 13
              L54 12
              L64 14
              L70 20
              L74 28
              L76 40
              L78 54
              L80 70
              L76 86
              L68 96
              L56 102
              L40 106
              L26 104
              L16 96
              L12 84
              L10 64
              L10 42
              Z`}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth={1.2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Connectors: draw first so they sit underneath nodes */}
        <g className="connectors" fill="none" stroke="#9be3b8" strokeWidth={0.8} strokeLinecap="round">
          {activeConnections.map((pair, idx) => {
            const a = findNode(pair[0]);
            const b = findNode(pair[1]);
            if (!a || !b) return null;
            return (
              <path
                key={`conn-${pair[0]}-${pair[1]}-${idx}`}
                d={connectorPath(a, b)}
                className="egypt-connector"
                style={{
                  strokeDasharray: '6 6',
                  animation: 'egypt-dash 2.5s linear infinite',
                }}
              />
            );
          })}
        </g>

        {/* Nodes */}
        <g>
          {nodes.map((node, i) => {
            const delay = (i % 5) * 0.35; // stagger pulses
            return (
              <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                <circle
                  r={1.6}
                  fill="#bff7d0"
                  style={{ filter: 'url(#egypt-glow)', transformOrigin: 'center', animation: `egypt-pulse 2.6s ${delay}s infinite` }}
                  onMouseEnter={(e) => {
                    const p = toScreen(node.x, node.y);
                    setHovered({ node, x: p.x, y: p.y });
                  }}
                  onMouseLeave={() => setHovered(null)}
                />
                <circle
                  r={0.7}
                  fill="#fff"
                  style={{ mixBlendMode: 'screen' }}
                  onMouseEnter={(e) => {
                    const p = toScreen(node.x, node.y);
                    setHovered({ node, x: p.x, y: p.y });
                  }}
                  onMouseLeave={() => setHovered(null)}
                />
              </g>
            );
          })}
        </g>

        <style>{`\n          /* Scoped styles for EgyptNetworkMap */\n          @keyframes egypt-pulse {\n            0% { transform: scale(0.9); opacity: 0.85; }\n            50% { transform: scale(1.18); opacity: 0.5; }\n            100% { transform: scale(0.9); opacity: 0.85; }\n          }\n\n          @keyframes egypt-dash {\n            from { stroke-dashoffset: 0; }\n            to { stroke-dashoffset: -24; }\n          }\n\n          /* Slightly different dash speed for variety */\n          .connectors path:nth-child(2) { animation-duration: 3s; }\n          .connectors path:nth-child(3) { animation-duration: 2.2s; }\n          .connectors path:nth-child(4) { animation-duration: 3.4s; }\n        `}</style>
      </svg>

      {/* Tooltip - simple absolutely-positioned box */}
      {hovered && (
        <div
          role="tooltip"
          style={{
            position: 'absolute',
            left: hovered.x - (wrapperRef.current?.getBoundingClientRect().left || 0) + 8,
            top: hovered.y - (wrapperRef.current?.getBoundingClientRect().top || 0) - 28,
            background: 'rgba(10,31,20,0.96)',
            color: '#dfffe6',
            padding: '6px 8px',
            borderRadius: 6,
            fontSize: 12,
            pointerEvents: 'none',
            boxShadow: '0 4px 14px rgba(0,0,0,0.6)',
            whiteSpace: 'nowrap',
            transform: 'translateY(-4px)',
          }}
        >
          {hovered.node.label}
        </div>
      )}
    </div>
  );
}
