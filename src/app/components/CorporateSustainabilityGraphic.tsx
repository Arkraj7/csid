'use client';

import React from 'react';

export default function CorporateSustainabilityGraphic({
  className = 'w-full h-full min-h-[300px]',
}: {
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl flex items-center justify-center bg-gradient-to-br from-slate-50 to-emerald-50/30 dark:from-slate-950 dark:to-teal-950/20 ${className}`}
    >
      <svg
        viewBox="0 0 800 600"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-4xl"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Soothing Emerald & Teal Gradients */}
          <linearGradient id="emeraldTeal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0d9488" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="tealCyan" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#0891b2" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="trendLineGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="1" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
          </linearGradient>

          {/* Soft Glow Filter for that modern, floating feel */}
          <filter id="abstractGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="24" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* --- BACKGROUND: Carbon Accounting Grid & Frameworks --- */}
        <g
          stroke="currentColor"
          className="text-slate-400 dark:text-slate-600"
          strokeWidth="1"
          opacity="0.2"
        >
          {/* Horizontal Grid */}
          <line x1="0" y1="150" x2="800" y2="150" strokeDasharray="6,12" />
          <line x1="0" y1="300" x2="800" y2="300" strokeDasharray="6,12" />
          <line x1="0" y1="450" x2="800" y2="450" strokeDasharray="6,12" />
          {/* Vertical Grid */}
          <line x1="200" y1="0" x2="200" y2="600" strokeDasharray="6,12" />
          <line x1="400" y1="0" x2="400" y2="600" strokeDasharray="6,12" />
          <line x1="600" y1="0" x2="600" y2="600" strokeDasharray="6,12" />
          {/* Concentric Framework Rings */}
          <circle cx="400" cy="300" r="120" fill="none" strokeDasharray="4,8" />
          <circle cx="400" cy="300" r="240" fill="none" strokeDasharray="4,8" />
        </g>

        {/* --- FOREGROUND: Fluid Sustainability Orbs --- */}
        <g filter="url(#abstractGlow)">
          {/* Emerald Orb */}
          <ellipse cx="400" cy="300" rx="180" ry="130" fill="url(#emeraldTeal)">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 400 300"
              to="360 400 300"
              dur="25s"
              repeatCount="indefinite"
            />
            <animateTransform
              attributeName="transform"
              type="scale"
              values="1; 1.1; 1"
              dur="12s"
              repeatCount="indefinite"
              additive="sum"
            />
          </ellipse>

          {/* Cyan Orb */}
          <ellipse cx="400" cy="300" rx="140" ry="190" fill="url(#tealCyan)">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="360 400 300"
              to="0 400 300"
              dur="30s"
              repeatCount="indefinite"
            />
            <animateTransform
              attributeName="transform"
              type="scale"
              values="1; 1.15; 1"
              dur="15s"
              repeatCount="indefinite"
              additive="sum"
            />
          </ellipse>
        </g>

        {/* --- DYNAMIC ELEMENTS: Net-Zero Transition --- */}
        {/* The Transition Journey Line */}
        <path
          d="M 0 500 Q 250 500 400 300 T 800 100"
          fill="none"
          stroke="url(#trendLineGrad)"
          strokeWidth="6"
          opacity="0.9"
        />

        {/* Central Net-Zero Target Ring */}
        <g transform="translate(400, 300)">
          {/* Pulsing inner core */}
          <circle cx="0" cy="0" r="60" fill="none" stroke="#10b981" strokeWidth="2" opacity="0.5">
            <animateTransform
              attributeName="transform"
              type="scale"
              values="1; 1.2; 1"
              dur="6s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.5; 0; 0.5"
              dur="6s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Solid Framework Boundary */}
          <circle
            cx="0"
            cy="0"
            r="80"
            fill="none"
            stroke="currentColor"
            className="text-emerald-500 dark:text-emerald-300"
            strokeWidth="1.5"
            strokeDasharray="12,6"
          />

          {/* Orbiting Data Nodes (GHG Protocol, Scope 1, 2, 3) */}
          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0"
              to="360"
              dur="18s"
              repeatCount="indefinite"
            />
            {/* Scope Node 1 */}
            <circle cx="80" cy="0" r="6" fill="#10b981" filter="url(#nodeGlow)" />
            {/* Scope Node 2 */}
            <circle cx="-40" cy="69.28" r="4" fill="#0ea5e9" filter="url(#nodeGlow)" />
            {/* Scope Node 3 */}
            <circle cx="-40" cy="-69.28" r="8" fill="#34d399" filter="url(#nodeGlow)" />
          </g>
        </g>
      </svg>
    </div>
  );
}
