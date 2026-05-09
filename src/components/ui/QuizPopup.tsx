'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { X, Sparkles } from 'lucide-react';

export default function QuizPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenQuizPopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        // Small delay for animation
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Wait for animation to complete
    setTimeout(() => {
      setIsOpen(false);
      localStorage.setItem('hasSeenQuizPopup', 'true');
    }, 300);
  };

  const handleTakeTest = () => {
    handleClose();
    // The Link will handle navigation
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90%] max-w-md transition-all duration-300 ${
          isVisible
            ? 'opacity-100 scale-100 translate-y-1/2'
            : 'opacity-0 scale-95 translate-y-[60%]'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quiz-popup-title"
      >
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden relative">
          {/* Pixel Art Image Header */}
          <div className="relative h-32 bg-gradient-to-b from-emerald-400 to-emerald-500 flex items-center justify-center overflow-hidden">
            {/* Animated Pixel Characters */}
            <PixelArtScene />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
              aria-label="Close popup"
            >
              <X size={20} />
            </button>

            {/* Sparkle decoration */}
            <Sparkles className="absolute top-4 left-4 w-6 h-6 text-white/50 animate-pulse" />
            <Sparkles
              className="absolute bottom-4 right-8 w-5 h-5 text-white/40 animate-pulse"
              style={{ animationDelay: '0.5s' }}
            />
          </div>

          {/* Content */}
          <div className="p-6 text-center">
            <h2
              id="quiz-popup-title"
              className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
            >
              Test Your Climate Knowledge!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">
              Are you a climate novice or an eco-expert? Take our quick 5-minute awareness test and
              discover where you stand.
            </p>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <Link
                href="/climate-awareness/quiz"
                onClick={handleTakeTest}
                className="block w-full py-3 px-6 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.02]"
              >
                Take the Test Now
              </Link>
              <button
                onClick={handleClose}
                className="w-full py-2 px-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm font-medium transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Pixel Art Scene Component
function PixelArtScene() {
  return (
    <svg
      width="280"
      height="100"
      viewBox="0 0 280 100"
      className="pixel-art"
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Background elements */}
      <rect x="0" y="70" width="280" height="30" fill="#2d5a3a" />

      {/* Sun */}
      <circle cx="250" cy="20" r="12" fill="#FFD93D" className="animate-pulse" />

      {/* Tree 1 */}
      <rect x="20" y="50" width="6" height="25" fill="#8B4513" />
      <rect x="10" y="30" width="26" height="25" fill="#228B22" />
      <rect x="14" y="25" width="18" height="10" fill="#32CD32" />

      {/* Tree 2 */}
      <rect x="240" y="55" width="5" height="20" fill="#8B4513" />
      <rect x="232" y="40" width="21" height="20" fill="#228B22" />

      {/* Student 1 (left) - sitting */}
      <g className="animate-bounce" style={{ animationDuration: '1.5s' }}>
        {/* Body */}
        <rect x="80" y="45" width="20" height="25" fill="#4a90d9" />
        {/* Head */}
        <rect x="82" y="35" width="16" height="14" fill="#FFDAB9" />
        {/* Hair */}
        <rect x="82" y="32" width="16" height="5" fill="#4a3728" />
        {/* Eyes */}
        <rect x="85" y="38" width="3" height="3" fill="#333" />
        <rect x="92" y="38" width="3" height="3" fill="#333" />
        {/* Desk */}
        <rect x="70" y="68" width="40" height="5" fill="#8B4513" />
        {/* Paper on desk */}
        <rect x="80" y="62" width="20" height="8" fill="white" />
        <rect x="82" y="64" width="16" height="2" fill="#333" opacity="0.3" />
        <rect x="82" y="67" width="12" height="2" fill="#333" opacity="0.3" />
      </g>

      {/* Student 2 (center) - raising hand */}
      <g className="animate-bounce" style={{ animationDuration: '1.5s', animationDelay: '0.3s' }}>
        {/* Body */}
        <rect x="125" y="42" width="22" height="28" fill="#e74c3c" />
        {/* Head */}
        <rect x="128" y="32" width="16" height="14" fill="#FFDAB9" />
        {/* Hair */}
        <rect x="126" y="28" width="20" height="6" fill="#2c1810" />
        {/* Eyes - excited */}
        <rect x="131" y="36" width="4" height="4" fill="#333" />
        <rect x="139" y="36" width="4" height="4" fill="#333" />
        {/* Mouth - smile */}
        <rect x="134" y="42" width="6" height="2" fill="#333" />
        {/* Raised arm */}
        <rect x="145" y="35" width="5" height="20" fill="#FFDAB9" />
        <rect x="143" y="25" width="8" height="12" fill="#FFDAB9" />
        {/* Desk */}
        <rect x="115" y="68" width="40" height="5" fill="#8B4513" />
      </g>

      {/* Student 3 (right) - writing */}
      <g className="animate-bounce" style={{ animationDuration: '1.5s', animationDelay: '0.6s' }}>
        {/* Body */}
        <rect x="175" y="48" width="18" height="22" fill="#9b59b6" />
        {/* Head */}
        <rect x="177" y="38" width="14" height="14" fill="#FFDAB9" />
        {/* Hair - pigtails */}
        <rect x="175" y="35" width="6" height="10" fill="#1a1a1a" />
        <rect x="184" y="35" width="6" height="10" fill="#1a1a1a" />
        <rect x="175" y="32" width="18" height="6" fill="#1a1a1a" />
        {/* Eyes */}
        <rect x="180" y="40" width="3" height="3" fill="#333" />
        <rect x="186" y="40" width="3" height="3" fill="#333" />
        {/* Desk */}
        <rect x="165" y="68" width="40" height="5" fill="#8B4513" />
        {/* Pencil */}
        <rect x="192" y="60" width="15" height="3" fill="#FFD700" transform="rotate(-30 192 60)" />
        <rect x="192" y="60" width="4" height="3" fill="#FFA500" transform="rotate(-30 192 60)" />
      </g>

      {/* Climate icon floating */}
      <g className="animate-float" style={{ animationDuration: '2s' }}>
        <text x="140" y="15" fontSize="16" fill="white" textAnchor="middle">
          🌍
        </text>
      </g>

      {/* Floating elements */}
      <circle
        cx="60"
        cy="25"
        r="3"
        fill="#87CEEB"
        className="animate-ping"
        style={{ animationDuration: '2s' }}
      />
      <circle
        cx="220"
        cy="30"
        r="2"
        fill="#FFD700"
        className="animate-ping"
        style={{ animationDuration: '2.5s' }}
      />

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .animate-float {
          animation: float 2s ease-in-out infinite;
        }
      `}</style>
    </svg>
  );
}
