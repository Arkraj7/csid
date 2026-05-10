'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  PartyPopper,
  BookOpen,
  Award,
  Moon,
  Sun,
} from 'lucide-react';
import { getQuestionsByDifficulty, calculateScore, getScoreTitle } from '@/data/climate-quiz';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

function QuizContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const difficulty = searchParams.get('difficulty') as 'easy' | 'medium' | 'hard';

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (!difficulty || !['easy', 'medium', 'hard'].includes(difficulty)) {
      router.push('/climate-awareness');
      return;
    }

    // Check for saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDarkMode(initialDark);

    const quizQuestions = getQuestionsByDifficulty(difficulty);
    setQuestions(quizQuestions);
    setUserAnswers(new Array(quizQuestions.length).fill(-1));
    setIsLoading(false);
  }, [difficulty, router]);

  const toggleDarkMode = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    localStorage.setItem('theme', nextDark ? 'dark' : 'light');
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...userAnswers];
      newAnswers[currentQuestion] = selectedAnswer;
      setUserAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResults(true);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(userAnswers[currentQuestion - 1] ?? null);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setUserAnswers(new Array(questions.length).fill(null));
    setSelectedAnswer(null);
    setShowResults(false);
  };

  // Light mode classes
  const lightBg = 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50';
  const lightCardBg = 'bg-white/90 backdrop-blur-sm';
  const lightBorder = 'border-amber-200';
  const lightText = 'text-gray-800';
  const lightSubtext = 'text-gray-600';
  const lightMuted = 'text-amber-700';
  const lightProgressBar = 'bg-amber-200';
  const lightProgressFill = 'bg-gradient-to-r from-emerald-500 to-teal-500';
  const lightSelectedBg = 'bg-gradient-to-r from-emerald-100 to-teal-100';
  const lightSelectedBorder = 'border-emerald-500';
  const lightOptionHover = 'hover:bg-amber-50 hover:border-amber-300';

  // Dark mode classes (soothing night theme)
  const darkBg = 'bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950';
  const darkCardBg = 'bg-slate-800/60 backdrop-blur-sm';
  const darkBorder = 'border-indigo-700/50';
  const darkText = 'text-slate-100';
  const darkSubtext = 'text-slate-300';
  const darkMuted = 'text-indigo-300';
  const darkProgressBar = 'bg-slate-700';
  const darkProgressFill = 'bg-gradient-to-r from-indigo-500 to-purple-500';
  const darkSelectedBg = 'bg-gradient-to-r from-indigo-600/40 to-purple-600/40';
  const darkSelectedBorder = 'border-indigo-400';
  const darkOptionHover = 'hover:bg-slate-700/50 hover:border-indigo-600';

  // Select classes based on mode
  const bg = isDarkMode ? darkBg : lightBg;
  const cardBg = isDarkMode ? darkCardBg : lightCardBg;
  const border = isDarkMode ? darkBorder : lightBorder;
  const text = isDarkMode ? darkText : lightText;
  const subtext = isDarkMode ? darkSubtext : lightSubtext;
  const muted = isDarkMode ? darkMuted : lightMuted;
  const progressBar = isDarkMode ? darkProgressBar : lightProgressBar;
  const progressFill = isDarkMode ? darkProgressFill : lightProgressFill;
  const selectedBg = isDarkMode ? darkSelectedBg : lightSelectedBg;
  const selectedBorder = isDarkMode ? darkSelectedBorder : lightSelectedBorder;
  const optionHover = isDarkMode ? darkOptionHover : lightOptionHover;

  if (isLoading) {
    return (
      <div className={`min-h-screen ${bg} flex items-center justify-center`}>
        <div className="text-emerald-700 dark:text-indigo-300 text-xl font-medium">
          Loading quiz...
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore(
      userAnswers.map((a, idx) => (a === null ? '' : questions[idx].correctAnswer)),
      questions.map((q) => q.correctAnswer)
    );
    const scoreTitle = getScoreTitle(score, questions.length);
    const percentage = Math.round((score / questions.length) * 100);
    const shareText = `I just scored ${score}/${questions.length} (${percentage}%) on ${difficulty} Climate Awareness Test! Think you can beat my eco-score? Take the test here: https://csid.vercel.app/climate-awareness`;

    return (
      <div className={`min-h-screen ${bg}`}>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Dark Mode Toggle */}
            <div className="flex justify-end mb-6">
              <button
                onClick={toggleDarkMode}
                className={`p-3 rounded-full ${cardBg} ${border} shadow-lg hover:scale-110 transition-all duration-200`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-amber-400" />
                ) : (
                  <Moon className="w-5 h-5 text-indigo-600" />
                )}
              </button>
            </div>

            {/* Congratulations Card */}
            <div
              className={`${cardBg} backdrop-blur-sm rounded-3xl p-10 ${border} shadow-xl text-center`}
            >
              {/* Celebration Icon */}
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-amber-400 to-orange-500 dark:from-indigo-500 dark:to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                <PartyPopper className="w-12 h-12 text-white" />
              </div>

              {/* Congratulations Message */}
              <h1 className={`text-4xl font-bold ${text} mb-3`}>Congratulations! 🎉</h1>
              <p className={`text-lg ${muted} mb-8`}>
                You&apos;ve completed the {difficulty} climate awareness quiz!
              </p>

              {/* Score Display */}
              <div
                className={`rounded-2xl p-8 mb-8 border ${
                  isDarkMode
                    ? 'bg-indigo-900/30 border-indigo-700/50'
                    : 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200'
                }`}
              >
                <div
                  className={`text-7xl font-bold mb-3 ${
                    isDarkMode ? 'text-indigo-300' : 'text-emerald-600'
                  }`}
                >
                  {percentage}%
                </div>
                <div className={`text-2xl font-semibold mb-2 ${text}`}>
                  {score} out of {questions.length} correct
                </div>
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                    isDarkMode ? 'bg-indigo-800/50' : 'bg-emerald-100'
                  }`}
                >
                  <Award
                    className={`w-5 h-5 ${isDarkMode ? 'text-indigo-300' : 'text-emerald-600'}`}
                  />
                  <span
                    className={`font-medium ${isDarkMode ? 'text-indigo-200' : 'text-emerald-700'}`}
                  >
                    {scoreTitle}
                  </span>
                </div>
              </div>

              {/* Anti-Cheat Warning */}
              <div
                className={`rounded-xl p-4 mb-8 ${
                  isDarkMode
                    ? 'bg-indigo-900/30 border border-indigo-700/50'
                    : 'bg-amber-50 border border-amber-200'
                }`}
              >
                <p className={`text-sm leading-relaxed ${muted}`}>
                  <strong>Remember:</strong> Real climate action starts with knowledge, not just
                  scores. Apply what you&apos;ve learned in your daily life!
                </p>
              </div>

              {/* Browse Courses CTA */}
              <div
                className={`rounded-2xl p-6 mb-8 ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-500'
                }`}
              >
                <h3 className="text-white text-xl font-bold mb-3">Ready to Learn More?</h3>
                <p className={`mb-5 ${isDarkMode ? 'text-indigo-200' : 'text-emerald-100'}`}>
                  Explore our comprehensive courses and deepen your climate knowledge
                </p>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 bg-white text-emerald-600 dark:text-indigo-600 px-8 py-3 rounded-xl font-bold hover:bg-emerald-50 dark:hover:bg-indigo-100 transition-all shadow-lg"
                >
                  <BookOpen className="w-5 h-5" />
                  Browse Our Courses
                </Link>
              </div>

              {/* Social Sharing */}
              <div className="space-y-3 mb-8">
                <h3 className={`font-semibold mb-3 ${muted}`}>Share Your Results:</h3>

                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://csid.vercel.app/climate-awareness')}&summary=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-blue-600 hover:bg-blue-500 text-white py-3 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  Share on LinkedIn
                </a>

                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-black hover:bg-gray-800 text-white py-3 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.112z" />
                  </svg>
                  Share on X (Twitter)
                </a>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleRestart}
                  className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                    isDarkMode
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                      : 'bg-amber-500 hover:bg-amber-600 text-white'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Try Again
                </button>
                <Link
                  href="/climate-awareness"
                  className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-colors text-center flex items-center justify-center gap-2 ${
                    isDarkMode
                      ? 'bg-slate-700 hover:bg-slate-600 text-white'
                      : 'bg-slate-500 hover:bg-slate-600 text-white'
                  }`}
                >
                  Back to Selection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className={`min-h-screen ${bg}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/climate-awareness"
              className={`${muted} hover:text-emerald-600 dark:hover:text-indigo-400 transition-colors inline-flex items-center gap-2 font-medium`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Selection
            </Link>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-3 rounded-full ${cardBg} ${border} shadow-lg hover:scale-110 transition-all duration-200`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-600" />
              )}
            </button>

            <div
              className={`px-4 py-2 rounded-full font-semibold ${
                isDarkMode ? 'bg-indigo-900/50 text-indigo-300' : 'bg-white/80 text-amber-700'
              }`}
            >
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Quiz
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className={`flex justify-between text-sm mb-2 font-medium ${muted}`}>
              <span>
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className={`w-full ${progressBar} rounded-full h-3`}>
              <div
                className={`${progressFill} h-3 rounded-full transition-all duration-500 shadow-md`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className={`${cardBg} backdrop-blur-sm rounded-3xl p-8 ${border} shadow-xl`}>
            {/* Question Text */}
            <div className="text-center mb-8">
              <h2 className={`text-2xl font-bold ${text} leading-relaxed`}>{question.question}</h2>
            </div>

            {/* Answer Options */}
            <div className="space-y-4 mb-8">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 ${
                    selectedAnswer === index
                      ? `${selectedBg} ${selectedBorder} shadow-md transform scale-[1.02]`
                      : `${cardBg} ${border} ${subtext} ${optionHover} shadow-sm`
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold transition-all duration-200 ${
                        selectedAnswer === index
                          ? isDarkMode
                            ? 'bg-indigo-500 border-indigo-500 text-white'
                            : 'bg-emerald-500 border-emerald-500 text-white'
                          : isDarkMode
                            ? 'border-indigo-500 text-indigo-400 bg-indigo-900/50'
                            : 'border-amber-300 text-amber-600 bg-amber-50'
                      }`}
                    >
                      {selectedAnswer === index ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : (
                        String.fromCharCode(65 + index)
                      )}
                    </div>
                    <span className="flex-1 text-base font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div
              className={`flex justify-between items-center pt-4 border-t ${isDarkMode ? 'border-indigo-700/50' : 'border-amber-100'}`}
            >
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                  currentQuestion === 0
                    ? isDarkMode
                      ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : isDarkMode
                      ? 'bg-indigo-900/50 hover:bg-indigo-800/50 text-indigo-300'
                      : 'bg-amber-100 hover:bg-amber-200 text-amber-800'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>

              <button
                onClick={handleNext}
                disabled={selectedAnswer === null}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                  selectedAnswer === null
                    ? isDarkMode
                      ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : isDarkMode
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                {currentQuestion === questions.length - 1 ? (
                  <>
                    Submit
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
          <div className="text-emerald-700 text-xl font-medium">Loading quiz...</div>
        </div>
      }
    >
      <QuizContent />
    </Suspense>
  );
}
