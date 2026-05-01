'use client';
import React, { useState } from 'react';
import { X, CheckCircle, XCircle, RotateCcw, ChevronRight, AlertCircle } from 'lucide-react';
import type { Chapter } from './courseData';

interface Props {
  chapter: Chapter;
  attempts: number;
  onPass: (score: number, attempts: number) => void;
  onFail: (score: number, attempts: number) => void;
  onClose: () => void;
}

type QuizPhase = 'intro' | 'questions' | 'result';

export default function QuizModal({ chapter, attempts, onPass, onFail, onClose }: Props) {
  const [phase, setPhase] = useState<QuizPhase>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(chapter.quiz.map(() => null));
  const [submitted, setSubmitted] = useState(false);
  const [currentAttempts, setCurrentAttempts] = useState(attempts);

  const totalQ = chapter.quiz.length;
  const question = chapter.quiz[currentQ];

  function handleSelect(idx: number) {
    if (submitted) return;
    setSelected(idx);
  }

  function handleSubmitAnswer() {
    if (selected === null) return;
    const newAnswers = [...answers];
    newAnswers[currentQ] = selected;
    setAnswers(newAnswers);
    setSubmitted(true);
  }

  function handleNext() {
    if (currentQ < totalQ - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(answers[currentQ + 1]);
      setSubmitted(answers[currentQ + 1] !== null);
    } else {
      // Calculate score
      const correct = answers.filter((a, i) => a === chapter.quiz[i].correctIndex).length;
      const score = Math.round((correct / totalQ) * 100);
      const newAttempts = currentAttempts + 1;
      setCurrentAttempts(newAttempts);
      setPhase('result');
      if (score >= 70) {
        onPass(score, newAttempts);
      } else {
        onFail(score, newAttempts);
      }
    }
  }

  function handleRetry() {
    setPhase('questions');
    setCurrentQ(0);
    setSelected(null);
    setAnswers(chapter.quiz.map(() => null));
    setSubmitted(false);
  }

  const correctCount = answers.filter((a, i) => a === chapter.quiz[i]?.correctIndex).length;
  const score = Math.round((correctCount / totalQ) * 100);
  const passed = score >= 70;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-card rounded-2xl border border-border shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border px-5 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div>
            <div className="text-xs text-muted-foreground mb-0.5">Chapter {chapter.number} Quiz</div>
            <h3 className="text-sm font-semibold text-foreground line-clamp-1">{chapter.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Close quiz"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-5">
          {/* Intro phase */}
          {phase === 'intro' && (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={24} className="text-primary" />
              </div>
              <h4 className="text-base font-bold text-foreground mb-2">Chapter Quiz</h4>
              <p className="text-sm text-muted-foreground mb-1">{totalQ} multiple-choice questions</p>
              <p className="text-sm text-muted-foreground mb-5">
                Score <span className="text-primary font-semibold">≥70%</span> to unlock the next chapter. Unlimited retries.
              </p>
              {currentAttempts > 0 && (
                <div className="mb-4 px-3 py-2 rounded-lg bg-muted/50 text-xs text-muted-foreground">
                  Previous attempts: {currentAttempts}
                </div>
              )}
              <button
                onClick={() => setPhase('questions')}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all active:scale-95"
              >
                Begin Quiz
                <ChevronRight size={15} />
              </button>
            </div>
          )}

          {/* Questions phase */}
          {phase === 'questions' && (
            <div>
              {/* Progress */}
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                <span>Question {currentQ + 1} of {totalQ}</span>
                <span className="font-tabular">{Math.round(((currentQ) / totalQ) * 100)}% complete</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full mb-5 overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${((currentQ) / totalQ) * 100}%` }}
                />
              </div>

              {/* Question */}
              <p className="text-sm font-semibold text-foreground mb-4 leading-relaxed">
                {question.question}
              </p>

              {/* Options */}
              <div className="space-y-2.5 mb-5">
                {question.options.map((opt, idx) => {
                  let optClass = 'border border-border bg-background text-foreground hover:border-primary/50 hover:bg-primary/5';
                  if (submitted) {
                    if (idx === question.correctIndex) {
                      optClass = 'border-2 border-primary bg-green-50 dark:bg-green-900/20 text-primary';
                    } else if (idx === selected && idx !== question.correctIndex) {
                      optClass = 'border-2 border-danger bg-red-50 dark:bg-red-900/20 text-danger';
                    } else {
                      optClass = 'border border-border bg-background text-muted-foreground opacity-60';
                    }
                  } else if (selected === idx) {
                    optClass = 'border-2 border-primary bg-primary/5 text-foreground';
                  }

                  return (
                    <button
                      key={`opt-${chapter.id}-q${currentQ}-${idx}`}
                      onClick={() => handleSelect(idx)}
                      disabled={submitted}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-150 flex items-center gap-3 ${optClass}`}
                    >
                      <span className={`w-6 h-6 rounded-full border flex-shrink-0 flex items-center justify-center text-xs font-semibold ${
                        submitted && idx === question.correctIndex
                          ? 'border-primary bg-primary text-white'
                          : submitted && idx === selected && idx !== question.correctIndex
                          ? 'border-danger bg-danger text-white'
                          : selected === idx
                          ? 'border-primary bg-primary text-white' :'border-border text-muted-foreground'
                      }`}>
                        {submitted && idx === question.correctIndex ? (
                          <CheckCircle size={12} />
                        ) : submitted && idx === selected && idx !== question.correctIndex ? (
                          <XCircle size={12} />
                        ) : (
                          String.fromCharCode(65 + idx)
                        )}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Action button */}
              {!submitted ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selected === null}
                  className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95 ${
                    selected !== null
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  }`}
                >
                  Submit Answer
                </button>
              ) : (
                <div className="space-y-2">
                  {submitted && selected !== null && selected !== question.correctIndex && (
                    <div className="px-3 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-xs text-danger">
                      Incorrect. The correct answer is: <span className="font-semibold">{question.options[question.correctIndex]}</span>
                    </div>
                  )}
                  {submitted && selected === question.correctIndex && (
                    <div className="px-3 py-2 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-xs text-primary">
                      Correct!
                    </div>
                  )}
                  <button
                    onClick={handleNext}
                    className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    {currentQ < totalQ - 1 ? 'Next Question' : 'See Results'}
                    <ChevronRight size={15} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Result phase */}
          {phase === 'result' && (
            <div className="text-center py-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${passed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                {passed ? (
                  <CheckCircle size={28} className="text-primary" />
                ) : (
                  <XCircle size={28} className="text-danger" />
                )}
              </div>
              <h4 className={`text-2xl font-bold font-tabular mb-1 ${passed ? 'text-primary' : 'text-danger'}`}>
                {score}%
              </h4>
              <p className="text-sm font-semibold text-foreground mb-1">
                {passed ? '🎉 Quiz Passed!' : 'Not quite — keep going!'}
              </p>
              <p className="text-xs text-muted-foreground mb-5">
                {correctCount} of {totalQ} correct · {passed ? 'Next chapter unlocked' : 'Score ≥70% required to proceed'}
              </p>

              {/* Score breakdown */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="text-base font-bold text-foreground font-tabular">{correctCount}</div>
                  <div className="text-xs text-muted-foreground">Correct</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="text-base font-bold text-foreground font-tabular">{totalQ - correctCount}</div>
                  <div className="text-xs text-muted-foreground">Incorrect</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="text-base font-bold text-foreground font-tabular">{currentAttempts}</div>
                  <div className="text-xs text-muted-foreground">Attempts</div>
                </div>
              </div>

              {!passed && (
                <button
                  onClick={handleRetry}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all active:scale-95"
                >
                  <RotateCcw size={14} />
                  Retry Quiz
                </button>
              )}
              {passed && (
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all active:scale-95"
                >
                  <CheckCircle size={14} />
                  Continue to Next Chapter
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}