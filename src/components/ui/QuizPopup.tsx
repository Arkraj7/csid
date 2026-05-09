'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function QuizPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenQuizPopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsOpen(false);
      localStorage.setItem('hasSeenQuizPopup', 'true');
    }, 300);
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

      {/* Modal - Centered */}
      <div
        className={`fixed inset-0 z-[101] flex items-center justify-center transition-all duration-300 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quiz-popup-title"
      >
        <div className="bg-white/95 dark:bg-[#251f35]/95 backdrop-blur-xl rounded-2xl shadow-[0_8px_40px_rgba(139,92,246,0.15)] overflow-hidden relative w-[90%] max-w-sm mx-4 border border-violet-100 dark:border-violet-800/50">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-violet-50 dark:bg-violet-900/50 hover:bg-violet-100 dark:hover:bg-violet-900 text-violet-400 dark:text-violet-400 hover:text-violet-600 dark:hover:text-violet-300 transition-colors z-10"
            aria-label="Close popup"
          >
            <X size={16} />
          </button>

          {/* Content - Compact */}
          <div className="p-6 text-center">
            <h2
              id="quiz-popup-title"
              className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-purple-400 mb-2"
            >
              Test Your Climate Knowledge!
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-5 text-sm leading-relaxed">
              Quick 5-min quiz to discover where you stand.
            </p>

            {/* CTA Buttons */}
            <div className="space-y-2">
              <Link
                href="/climate-awareness/quiz"
                onClick={handleClose}
                className="block w-full py-2.5 px-4 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/25"
              >
                Take the Test Now
              </Link>
              <button
                onClick={handleClose}
                className="w-full py-1.5 text-violet-400 dark:text-violet-500 hover:text-violet-600 dark:hover:text-violet-300 text-xs font-medium transition-colors"
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
