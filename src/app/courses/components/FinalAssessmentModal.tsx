'use client';
import React, { useState } from 'react';
import { X, CheckCircle, XCircle, RotateCcw, ChevronRight, Award, AlertCircle } from 'lucide-react';
import { finalAssessmentQuestions } from './courseData';
import { toast } from 'sonner';

interface Props {
  onPass: () => void;
  onClose: () => void;
}

type Phase = 'intro' | 'questions' | 'result';

export default function FinalAssessmentModal({ onPass, onClose }: Props) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(finalAssessmentQuestions.map(() => null));
  const [submitted, setSubmitted] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const totalQ = finalAssessmentQuestions.length;
  const question = finalAssessmentQuestions[currentQ];

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
      const correct = answers.filter((a, i) => a === finalAssessmentQuestions[i].correctIndex).length;
      const score = Math.round((correct / totalQ) * 100);
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setPhase('result');
      if (score >= 70) {
        toast.success('Final Assessment Passed! Your certificate is now available.');
        onPass();
      } else {
        toast.error(`Score: ${score}% — you need ≥70% to pass. Try again!`);
      }
    }
  }

  function handleRetry() {
    setPhase('questions');
    setCurrentQ(0);
    setSelected(null);
    setAnswers(finalAssessmentQuestions.map(() => null));
    setSubmitted(false);
  }

  const correctCount = answers.filter((a, i) => a === finalAssessmentQuestions[i]?.correctIndex).length;
  const score = Math.round((correctCount / totalQ) * 100);
  const passed = score >= 70;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-card rounded-2xl border border-border shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border px-5 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div className="flex items-center gap-2">
            <Award size={18} className="text-amber-500" />
            <div>
              <div className="text-xs text-muted-foreground mb-0.5">Final Assessment</div>
              <h3 className="text-sm font-semibold text-foreground">Understanding the Climate Economy: ATF™</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Close final assessment"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-5 md:p-6">
          {/* Intro */}
          {phase === 'intro' && (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-4">
                <Award size={28} className="text-amber-500" />
              </div>
              <h4 className="text-lg font-bold text-foreground mb-2">Final Assessment</h4>
              <p className="text-sm text-muted-foreground mb-1">{totalQ} questions across all 9 chapters</p>
              <p className="text-sm text-muted-foreground mb-5">
                Score <span className="text-primary font-semibold">≥70%</span> (11/15) to earn your CSID certificate.
              </p>
              <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto mb-6">
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="text-base font-bold text-foreground font-tabular">{totalQ}</div>
                  <div className="text-xs text-muted-foreground">Questions</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="text-base font-bold text-primary font-tabular">70%</div>
                  <div className="text-xs text-muted-foreground">Pass mark</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="text-base font-bold text-foreground font-tabular">∞</div>
                  <div className="text-xs text-muted-foreground">Retries</div>
                </div>
              </div>
              <button
                onClick={() => setPhase('questions')}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all active:scale-95"
              >
                Begin Final Assessment
                <ChevronRight size={15} />
              </button>
            </div>
          )}

          {/* Questions */}
          {phase === 'questions' && (
            <div>
              {/* Progress */}
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                <span>Question {currentQ + 1} of {totalQ}</span>
                <span className="font-tabular">{currentQ}/{totalQ} answered</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full mb-5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300"
                  style={{ width: `${(currentQ / totalQ) * 100}%` }}
                />
              </div>

              <p className="text-sm font-semibold text-foreground mb-4 leading-relaxed">
                {question.question}
              </p>

              <div className="space-y-2.5 mb-5">
                {question.options.map((opt, idx) => {
                  let optClass = 'border border-border bg-background text-foreground hover:border-primary/50 hover:bg-primary/5';
                  if (submitted) {
                    if (idx === question.correctIndex) {
                      optClass = 'border-2 border-primary bg-green-50 dark:bg-green-900/20 text-primary';
                    } else if (idx === selected && idx !== question.correctIndex) {
                      optClass = 'border-2 border-danger bg-red-50 dark:bg-red-900/20 text-danger';
                    } else {
                      optClass = 'border border-border bg-background text-muted-foreground opacity-50';
                    }
                  } else if (selected === idx) {
                    optClass = 'border-2 border-primary bg-primary/5 text-foreground';
                  }

                  return (
                    <button
                      key={`fa-opt-${currentQ}-${idx}`}
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
                  {selected !== null && selected !== question.correctIndex && (
                    <div className="px-3 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-xs text-danger">
                      Incorrect. Correct answer: <span className="font-semibold">{question.options[question.correctIndex]}</span>
                    </div>
                  )}
                  {selected === question.correctIndex && (
                    <div className="px-3 py-2 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-xs text-primary">
                      Correct!
                    </div>
                  )}
                  <button
                    onClick={handleNext}
                    className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    {currentQ < totalQ - 1 ? 'Next Question' : 'View Results'}
                    <ChevronRight size={15} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Result */}
          {phase === 'result' && (
            <div className="text-center py-6">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${passed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                {passed ? (
                  <Award size={28} className="text-amber-500" />
                ) : (
                  <AlertCircle size={28} className="text-danger" />
                )}
              </div>
              <h4 className={`text-3xl font-bold font-tabular mb-1 ${passed ? 'text-primary' : 'text-danger'}`}>
                {score}%
              </h4>
              <p className="text-base font-semibold text-foreground mb-1">
                {passed ? '🎉 Assessment Passed!' : 'Not quite — you need ≥70%'}
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                {correctCount} of {totalQ} correct · Attempt {attempts}
              </p>

              <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto mb-6">
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="text-base font-bold text-primary font-tabular">{correctCount}</div>
                  <div className="text-xs text-muted-foreground">Correct</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="text-base font-bold text-danger font-tabular">{totalQ - correctCount}</div>
                  <div className="text-xs text-muted-foreground">Incorrect</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="text-base font-bold text-foreground font-tabular">{attempts}</div>
                  <div className="text-xs text-muted-foreground">Attempts</div>
                </div>
              </div>

              {passed ? (
                <div className="space-y-3">
                  <div className="px-4 py-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-sm text-primary font-medium">
                    Your certificate is now available — unlock it for ₹49
                  </div>
                  <button
                    onClick={onClose}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all active:scale-95"
                  >
                    <Award size={14} />
                    Unlock Certificate
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleRetry}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all active:scale-95"
                >
                  <RotateCcw size={14} />
                  Retry Assessment
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}