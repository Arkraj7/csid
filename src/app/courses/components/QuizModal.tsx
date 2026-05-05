'use client';

import React, { useState } from 'react';
import { X, CheckCircle, XCircle, RotateCcw, ChevronRight, AlertCircle } from 'lucide-react';
// THE FIX IS HERE: Import Chapter from the global types file!
import { Chapter } from '@/types/certificate';
import { updateUserProgress } from '@/lib/progress';

interface Props {
  chapter: Chapter;
  isOpen: boolean;
  onClose: () => void;
  onPass: () => void;
}

export default function QuizModal({ chapter, isOpen, onClose, onPass }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fallback questions if the chapter doesn't have specific ones defined
  const questions = [
    {
      question: 'What is the primary goal of Climate Finance?',
      options: [
        'To maximize short-term corporate profits',
        'To support mitigation and adaptation actions addressing climate change',
        'To fund exclusive real estate development',
        'To reduce global trading tariffs',
      ],
      correct: 1,
    },
    {
      question:
        'According to the Adaptive Thematic Framework, capital allocation should be based on:',
      options: [
        'Historical stock market trends only',
        'Political affiliations and lobbying',
        'Data synthesis from leading climate policy and economics literature',
        'Randomized algorithm selection',
      ],
      correct: 2,
    },
    {
      question: 'Why are Multilateral Fund Guidelines important?',
      options: [
        'They determine the color scheme of project presentations',
        'They are suggestions that can usually be ignored',
        'They set the rules for securing project funding in the climate economy',
        'They dictate national tax rates',
      ],
      correct: 2,
    },
  ];

  const handleSelect = (index: number) => {
    if (showResults) return; // Prevent changing answers after submission
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: index,
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    let calculatedScore = 0;

    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correct) {
        calculatedScore += 1;
      }
    });

    const percentage = Math.round((calculatedScore / questions.length) * 100);
    setScore(percentage);
    setShowResults(true);

    // If they passed (score >= 66%), update their progress!
    if (percentage >= 66) {
      await updateUserProgress({
        certificatesEarned: 1, // Grant 1 certificate for passing
      });
    }

    setIsSubmitting(false);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  if (!isOpen) return null;

  const passed = score >= 66;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#0A192F] w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-[#112240]">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Knowledge Check</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Chapter {chapter.order}: {chapter.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 overflow-y-auto flex-grow">
          {!showResults ? (
            // QUIZ STATE
            <div className="space-y-8">
              {/* Progress Bar */}
              <div className="flex justify-between items-center text-sm font-medium text-gray-500 mb-2">
                <span>
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 mb-8 overflow-hidden">
                <div
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>

              {/* Question */}
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                {questions[currentQuestion].question}
              </h3>

              {/* Options */}
              <div className="space-y-3 mt-6">
                {questions[currentQuestion].options.map((option, index) => {
                  const isSelected = selectedAnswers[currentQuestion] === index;
                  return (
                    <button
                      key={index}
                      onClick={() => handleSelect(index)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-4 group ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                          : 'border-gray-200 dark:border-gray-800 hover:border-emerald-200 dark:hover:border-emerald-800 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isSelected
                            ? 'border-emerald-500'
                            : 'border-gray-300 dark:border-gray-600 group-hover:border-emerald-300'
                        }`}
                      >
                        {isSelected && <div className="w-3 h-3 bg-emerald-500 rounded-full" />}
                      </div>
                      <span
                        className={`text-base font-medium ${isSelected ? 'text-emerald-900 dark:text-emerald-300' : 'text-gray-700 dark:text-gray-300'}`}
                      >
                        {option}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            // RESULTS STATE
            <div className="text-center py-8">
              <div className="mb-6 relative inline-block">
                {passed ? (
                  <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-12 h-12 text-emerald-500" />
                  </div>
                ) : (
                  <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto">
                    <XCircle className="w-12 h-12 text-red-500" />
                  </div>
                )}

                {/* Score Badge */}
                <div
                  className={`absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-sm font-bold text-white border-4 border-white dark:border-[#0A192F] ${passed ? 'bg-emerald-500' : 'bg-red-500'}`}
                >
                  {score}%
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                {passed ? 'Outstanding Work!' : 'Almost There!'}
              </h2>

              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                {passed
                  ? 'You have successfully demonstrated your understanding of this material. A certificate has been added to your profile.'
                  : "You need a score of 66% or higher to pass. Review the material and try again when you're ready."}
              </p>

              {/* Result Details */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 text-left space-y-4 mb-8">
                <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                  <AlertCircle className="w-5 h-5 text-blue-500" />
                  Performance Review
                </h4>
                {questions.map((q, i) => {
                  const userAnswer = selectedAnswers[i];
                  const isCorrect = userAnswer === q.correct;
                  return (
                    <div key={i} className="flex gap-3 text-sm">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                      )}
                      <div>
                        <p
                          className={`font-medium mb-1 ${isCorrect ? 'text-gray-900 dark:text-white' : 'text-gray-900 dark:text-white'}`}
                        >
                          {q.question}
                        </p>
                        {!isCorrect && (
                          <p className="text-emerald-600 dark:text-emerald-400 mt-1">
                            Correct answer: {q.options[q.correct]}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-[#112240] flex justify-end gap-4">
          {!showResults ? (
            <>
              {currentQuestion > 0 && (
                <button
                  onClick={() => setCurrentQuestion((curr) => curr - 1)}
                  className="px-6 py-3 font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-xl transition-colors"
                >
                  Back
                </button>
              )}

              {currentQuestion < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestion((curr) => curr + 1)}
                  disabled={selectedAnswers[currentQuestion] === undefined}
                  className="flex items-center gap-2 bg-[#0A192F] dark:bg-white text-white dark:text-[#0A192F] px-8 py-3 rounded-xl font-bold transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-lg"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={selectedAnswers[currentQuestion] === undefined || isSubmitting}
                  className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-lg shadow-emerald-500/30"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Answers'}
                </button>
              )}
            </>
          ) : (
            <div className="flex w-full gap-4">
              {passed ? (
                <>
                  <button
                    onClick={onClose}
                    className="flex-1 px-6 py-4 font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-xl transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={onPass}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/30"
                  >
                    Claim Certificate
                  </button>
                </>
              ) : (
                <button
                  onClick={resetQuiz}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#0A192F] dark:bg-white text-white dark:text-[#0A192F] px-6 py-4 rounded-xl font-bold transition-all shadow-lg hover:bg-gray-800 dark:hover:bg-gray-100"
                >
                  <RotateCcw className="w-5 h-5" />
                  Try Again
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
