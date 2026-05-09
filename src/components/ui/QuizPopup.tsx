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
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden relative w-[90%] max-w-sm mx-4">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors z-10"
            aria-label="Close popup"
          >
            <X size={16} />
          </button>

          {/* Content - Compact */}
          <div className="p-5 text-center">
            <h2
              id="quiz-popup-title"
              className="text-lg font-bold text-gray-900 dark:text-white mb-1.5"
            >
              Test Your Climate Knowledge!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-xs leading-relaxed">
              Quick 5-min quiz to discover where you stand.
            </p>

            {/* CTA Buttons */}
            <div className="space-y-2">
              <Link
                href="/climate-awareness/quiz"
                onClick={handleClose}
                className="block w-full py-2.5 px-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-md shadow-emerald-500/20"
              >
                Take the Test Now
              </Link>
              <button
                onClick={handleClose}
                className="w-full py-1.5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-xs font-medium transition-colors"
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
