'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Brain, Flame, Zap, Moon, Sun } from 'lucide-react';

interface Difficulty {
  id: string;
  name: string;
  questions: number;
  description: string;
  icon: React.ReactNode;
  color: string;
  hoverColor: string;
  borderColor: string;
}

const difficulties: Difficulty[] = [
  {
    id: 'easy',
    name: 'Easy',
    questions: 10,
    description:
      'A gentle breeze. Perfect if your idea of climate action is occasionally remembering your reusable grocery bag.',
    icon: <Brain className="w-8 h-8" />,
    color: 'bg-emerald-500',
    hoverColor: 'hover:bg-emerald-600',
    borderColor: 'border-emerald-300',
  },
  {
    id: 'medium',
    name: 'Medium',
    questions: 25,
    description:
      'Heating up! For those who actually know what ESG stands for and have yelled at someone for putting greasy pizza boxes in the recycling.',
    icon: <Flame className="w-8 h-8" />,
    color: 'bg-orange-500',
    hoverColor: 'hover:bg-orange-600',
    borderColor: 'border-orange-300',
  },
  {
    id: 'hard',
    name: 'Hard',
    questions: 50,
    description:
      'Category 5 Hurricane. Warning: May induce severe eco-anxiety. Only for absolute climate nerds and Greta Thunberg.',
    icon: <Zap className="w-8 h-8" />,
    color: 'bg-red-500',
    hoverColor: 'hover:bg-red-600',
    borderColor: 'border-red-300',
  },
];

export default function ClimateAwarenessPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));

    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const toggleDarkMode = () => {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDarkMode(!isDark);
  };

  // Light mode classes
  const lightBg = 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50';
  const lightCardBg = 'bg-white/90';
  const lightText = 'text-emerald-800';
  const lightSubtext = 'text-gray-600';
  const lightMuted = 'text-amber-700';

  // Dark mode classes
  const darkBg = 'bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950';
  const darkCardBg = 'bg-slate-800/60';
  const darkText = 'text-slate-100';
  const darkSubtext = 'text-slate-300';
  const darkMuted = 'text-indigo-300';

  const bg = isDarkMode ? darkBg : lightBg;
  const cardBg = isDarkMode ? darkCardBg : lightCardBg;
  const text = isDarkMode ? darkText : lightText;
  const subtext = isDarkMode ? darkSubtext : lightSubtext;
  const muted = isDarkMode ? darkMuted : lightMuted;

  return (
    <div className={`min-h-screen ${bg}`}>
      <div className="container mx-auto px-4 py-16">
        {/* Dark Mode Toggle */}
        <div className="flex justify-end mb-8">
          <button
            onClick={toggleDarkMode}
            className={`p-3 rounded-full ${cardBg} ${isDarkMode ? 'border border-indigo-700/50' : 'border border-amber-200'} shadow-lg hover:scale-110 transition-all duration-200`}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-600" />
            )}
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className={`text-5xl font-bold ${text} mb-6 font-serif`}>
            Climate Awareness Challenge
          </h1>
          <p className={`text-xl ${muted} max-w-3xl mx-auto leading-relaxed`}>
            Choose your difficulty level and test your knowledge about climate change,
            sustainability, and environmental action.
          </p>
        </div>

        {/* Difficulty Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {difficulties.map((difficulty) => (
            <div
              key={difficulty.id}
              className={`${cardBg} backdrop-blur-sm rounded-2xl p-8 border ${difficulty.borderColor} shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105`}
            >
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className={`${difficulty.color} p-4 rounded-full text-white shadow-md`}>
                  {difficulty.icon}
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className={`text-2xl font-bold mb-2 ${text}`}>{difficulty.name}</h3>
                <div
                  className={`font-semibold mb-4 ${isDarkMode ? 'text-indigo-300' : 'text-emerald-600'}`}
                >
                  {difficulty.questions} Questions
                </div>
                <p className={`${subtext} text-sm leading-relaxed mb-6`}>
                  {difficulty.description}
                </p>
              </div>

              {/* Button */}
              <Link
                href={`/climate-awareness/quiz?difficulty=${difficulty.id}`}
                className={`${difficulty.color} ${difficulty.hoverColor} w-full py-3 px-6 rounded-xl text-white font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg`}
              >
                Start Challenge
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Back Link */}
        <div className="text-center mt-16">
          <Link
            href="/"
            className={`${muted} hover:text-emerald-600 dark:hover:text-indigo-400 transition-colors inline-flex items-center gap-2 font-medium`}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
