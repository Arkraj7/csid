'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Brain, Flame, Zap } from 'lucide-react';

interface Difficulty {
  id: string;
  name: string;
  questions: number;
  description: string;
  icon: React.ReactNode;
  color: string;
  hoverColor: string;
}

const difficulties: Difficulty[] = [
  {
    id: 'easy',
    name: 'Easy',
    questions: 10,
    description:
      'A gentle breeze. Perfect if your idea of climate action is occasionally remembering your reusable grocery bag.',
    icon: <Brain className="w-8 h-8" />,
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-400',
  },
  {
    id: 'medium',
    name: 'Medium',
    questions: 25,
    description:
      'Heating up! For those who actually know what ESG stands for and have yelled at someone for putting greasy pizza boxes in the recycling.',
    icon: <Flame className="w-8 h-8" />,
    color: 'bg-orange-500',
    hoverColor: 'hover:bg-orange-400',
  },
  {
    id: 'hard',
    name: 'Hard',
    questions: 50,
    description:
      'Category 5 Hurricane. Warning: May induce severe eco-anxiety. Only for absolute climate nerds and Greta Thunberg.',
    icon: <Zap className="w-8 h-8" />,
    color: 'bg-red-500',
    hoverColor: 'hover:bg-red-400',
  },
];

export default function ClimateAwarenessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6 font-serif">
            Climate Awareness Challenge
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Choose your difficulty level and test your knowledge about climate change,
            sustainability, and environmental action.
          </p>
        </div>

        {/* Difficulty Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {difficulties.map((difficulty) => (
            <div
              key={difficulty.id}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-emerald-500 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className={`${difficulty.color} p-4 rounded-full text-white`}>
                  {difficulty.icon}
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">{difficulty.name}</h3>
                <div className="text-emerald-400 font-semibold mb-4">
                  {difficulty.questions} Questions
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {difficulty.description}
                </p>
              </div>

              {/* Button */}
              <Link
                href={`/climate-awareness/quiz?difficulty=${difficulty.id}`}
                className={`${difficulty.color} ${difficulty.hoverColor} w-full py-3 px-6 rounded-lg text-white font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg`}
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
            className="text-slate-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-2"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
