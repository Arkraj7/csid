'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import {
  getQuestionsByDifficulty,
  calculateScore,
  getScoreTitle,
  QuizQuestion,
} from '@/data/climate-quiz';

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
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!difficulty || !['easy', 'medium', 'hard'].includes(difficulty)) {
      router.push('/climate-awareness');
      return;
    }

    const quizQuestions = getQuestionsByDifficulty(difficulty);
    setQuestions(quizQuestions);
    setUserAnswers(new Array(quizQuestions.length).fill(-1));
    setIsLoading(false);
  }, [difficulty, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading quiz...</div>
      </div>
    );
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(questions[answerIndex].correctAnswer);
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
      setSelectedAnswer(userAnswers[currentQuestion - 1]);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setUserAnswers(new Array(questions.length).fill(-1));
    setSelectedAnswer(null);
    setShowResults(false);
  };

  if (showResults) {
    const score = calculateScore(
      userAnswers,
      questions.map((q) => q.correctAnswer)
    );
    const scoreTitle = getScoreTitle(score, questions.length);
    const shareText = `I just scored ${score}/${questions.length} on ${difficulty} Climate Awareness Test! Think you can beat my eco-score? Take the test here: https://csid.vercel.app/climate-awareness`;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Results Card */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
              {/* Score Display */}
              <div className="text-center mb-8">
                <div className="text-6xl font-bold text-emerald-400 mb-2">
                  {score}/{questions.length}
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">{scoreTitle}</h1>
                <p className="text-slate-300">You completed {difficulty} climate awareness quiz!</p>
              </div>

              {/* Anti-Cheat Warning */}
              <div className="bg-yellow-500/20 border border-yellow-500 rounded-lg p-4 mb-8">
                <p className="text-yellow-300 text-sm leading-relaxed">
                  <strong>Wait... did you just use AI to answer these?</strong> Look, ChatGPT
                  can&apos;t save the ice caps for you. Don&apos;t use AI to cheat your way to
                  environmental enlightenment!
                </p>
              </div>

              {/* Social Sharing */}
              <div className="space-y-4 mb-8">
                <h3 className="text-white font-semibold text-center mb-4">Share Your Results:</h3>

                {/* LinkedIn Share */}
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://csid.vercel.app/climate-awareness')}&summary=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-blue-600 hover:bg-blue-500 text-white py-3 px-6 rounded-lg text-center font-semibold transition-colors"
                >
                  Share on LinkedIn
                </a>

                {/* X (Twitter) Share */}
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-black hover:bg-gray-800 text-white py-3 px-6 rounded-lg text-center font-semibold transition-colors"
                >
                  Share on X (Twitter)
                </a>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleRestart}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200"
                >
                  Try Again
                </button>
                <Link
                  href="/climate-awareness"
                  className="flex-1 bg-slate-600 hover:bg-slate-500 text-white py-3 px-6 rounded-lg font-semibold transition-colors text-center"
                >
                  Back to Difficulty Selection
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/climate-awareness"
              className="text-slate-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Difficulty Selection
            </Link>
            <div className="text-slate-300">
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Quiz
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-slate-400 mb-2">
              <span>
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            {/* Score Display */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white leading-relaxed">{question.question}</h2>
            </div>

            {/* Answer Options */}
            <div className="space-y-4 mb-8">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                    selectedAnswer === option
                      ? 'bg-emerald-500/20 border-emerald-500 text-white'
                      : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswer === option ? 'border-emerald-500' : 'border-slate-500'
                      }`}
                    >
                      {selectedAnswer === option && (
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      )}
                    </div>
                    <span className="flex-1">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
                  currentQuestion === 0
                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                    : 'bg-slate-600 hover:bg-slate-500 text-white'
                }`}
              >
                Previous
              </button>

              <button
                onClick={handleNext}
                disabled={selectedAnswer === null}
                className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
                  selectedAnswer === null
                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-white'
                }`}
              >
                {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
                <ArrowRight className="w-4 h-4" />
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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 flex items-center justify-center">
          <div className="text-white text-xl">Loading quiz...</div>
        </div>
      }
    >
      <QuizContent />
    </Suspense>
  );
}
