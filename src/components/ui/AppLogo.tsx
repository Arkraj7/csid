import React from 'react';

export default function AppLogo({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      // The multiply blend mode gives it that authentic overlapping shadow effect
      style={{ mixBlendMode: 'normal' }}
    >
      {/* Left Circle (Teal / Mitigation) */}
      <g style={{ mixBlendMode: 'multiply' }}>
        <circle cx="60" cy="60" r="60" fill="#014241" />
        <circle cx="60" cy="60" r="48" fill="#03726f" />
        <circle cx="60" cy="60" r="36" fill="#109e99" />
        <circle cx="60" cy="60" r="24" fill="#32ded6" />
        <circle cx="60" cy="60" r="12" fill="#c2ffff" />
      </g>

      {/* Right Circle (Gold / Finance) */}
      <g style={{ mixBlendMode: 'multiply' }}>
        <circle cx="140" cy="60" r="60" fill="#4f3000" />
        <circle cx="140" cy="60" r="48" fill="#8a5400" />
        <circle cx="140" cy="60" r="36" fill="#cc8200" />
        <circle cx="140" cy="60" r="24" fill="#ffb300" />
        <circle cx="140" cy="60" r="12" fill="#ffee99" />
      </g>
    </svg>
  );
}
