'use client';

import React, { useState } from 'react';
import { X, CheckCircle, XCircle, RotateCcw, ChevronRight, Award, AlertCircle, Download } from 'lucide-react';
import { finalAssessmentQuestions } from './courseData';
import { downloadCertificate, CertificateData } from '@/lib/certificate';
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
  const [isDownloading, setIsDownloading] = useState(false);

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
    setPhase('intro');
    setCurrentQ(0);
    setSelected(null);
    setAnswers(finalAssessmentQuestions.map(() => null));
    setSubmitted(false);
  }

  async function handleDownloadCertificate() {
    try {
      setIsDownloading(true);
      
      // Generate a certificate ID based on timestamp
      const timestamp = new Date().getTime();
      const certificateId = `ATF-2026-${String(timestamp).slice(-6)}`;
      
      // Certificate data
      const certData: CertificateData = {
        studentName: 'Your Name', // In production, get from user profile/session
        courseName: 'Understanding the Climate Economy: The Adaptive Thematic Framework™',
        completionDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        certificateId,
        score: correctCount,
        maxScore: totalQ,
      };
      
      // Download certificate
      await downloadCertificate('result-certificate', certData);
      toast.success('Certificate downloaded successfully!');
    } catch (error) {
      console.error('Error downloading certificate:', error);
      toast.error('Failed to download certificate. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  }

  const correctCount = answers.filter((a, i) => a === finalAssessmentQuestions[i]?.correctIndex).length;
  const score = Math.round((correctCount / totalQ) * 100);
  const passed = score >= 70;
  const [answers, setAnswers] = useState<(number | null)[]>(finalAssessmentQuestions.map(() => null));
  const [submitted, setSubmitted] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

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
>>>>>>> 26d98b0 (Added Certificate Template and PDF generation logic)
      }
    }
  }, []);

  if (!isOpen) return null;

  const correctCount = answers.filter((a, i) => a === finalAssessmentQuestions[i]?.correctIndex).length;
  const score = Math.round((correctCount / totalQ) * 100);
  const passed = score >= 70;
    try {
      setIsDownloading(true);
      
      // Generate a certificate ID based on timestamp
      const timestamp = new Date().getTime();
      const certificateId = `ATF-2026-${String(timestamp).slice(-6)}`;
      
      // Certificate data
      const certData: CertificateData = {
        studentName: 'Your Name', // In production, get from user profile/session
        courseName: 'Understanding the Climate Economy: The Adaptive Thematic Framework™',
        completionDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        certificateId,
        score: correctCount,
        maxScore: totalQ,
      };
      
      // Download certificate
      await downloadCertificate('result-certificate', certData);
      toast.success('Certificate downloaded successfully!');
    } catch (error) {
      console.error('Error downloading certificate:', error);
      toast.error('Failed to download certificate. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  }

  const correctCount = answers.filter((a, i) => a === finalAssessmentQuestions[i]?.correctIndex).length;
  const score = Math.round((correctCount / totalQ) * 100);
  const passed = score >= 70;
>>>>>>> 26d98b0 (Added Certificate Template and PDF generation logic)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
        >
          <X size={16} />
        </button>

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
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleDownloadCertificate}
                      disabled={isDownloading}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Download size={14} />
                      {isDownloading ? 'Downloading...' : 'Download Certificate'}
                    </button>
                    <button
                      onClick={onClose}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-muted text-foreground text-sm font-semibold hover:bg-muted/80 transition-all active:scale-95"
                    >
                      <Award size={14} />
                      Unlock Certificate
                    </button>
                  </div>
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

        {/* Hidden certificate for PDF generation */}
        {passed && (
          <div id="result-certificate" className="hidden">
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/30 p-8 w-full max-w-4xl" style={{ aspectRatio: '1.4' }}>
              {/* Certificate header */}
              <div className="bg-gradient-to-r from-primary to-secondary p-5 text-white text-center mb-6 rounded -mx-8 -mt-8 -mb-6">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Award size={24} />
                  <span className="text-xl font-bold tracking-wide">CSID</span>
                </div>
                <div className="text-xs opacity-80 tracking-widest uppercase">Center for Sustainability and Inclusive Development</div>
              </div>

              {/* Certificate body */}
              <div className="text-center px-6 py-8">
                <div className="text-xs uppercase tracking-widest text-gray-600 mb-3">This certifies that</div>
                <div className="text-3xl font-bold text-gray-900 mb-2 font-serif italic">
                  Your Name Here
                </div>
                <div className="w-32 h-1 bg-primary mx-auto mb-4" />
                <div className="text-xs text-gray-600 mb-3">has successfully completed</div>
                <div className="text-lg font-semibold text-gray-900 mb-2 leading-snug">
                  Understanding the Climate Economy: The Adaptive Thematic Framework™
                </div>
                <div className="text-xs text-gray-600 mb-6">Issued by CSID — Center for Sustainability and Inclusive Development</div>

                {/* Meta row */}
                <div className="flex flex-wrap justify-center gap-12 text-xs text-gray-600 border-t border-gray-300 pt-6 mb-6">
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Date of Completion</div>
                    <div>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Certificate ID</div>
                    <div className="font-mono">CSID-ATF-2026-{String(new Date().getTime()).slice(-5)}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Final Score</div>
                    <div>{Math.round((correctCount / totalQ) * 100)}% ({correctCount}/{totalQ})</div>
                  </div>
                </div>

                {/* Signature line */}
                <div className="flex items-end justify-center gap-12">
                  <div className="text-center">
                    <div className="h-8 border-b border-gray-400 mb-2 w-32 mx-auto" />
                    <div className="text-xs text-gray-600">Course Director, CSID</div>
                  </div>
                  <div className="text-center">
                    <Award size={32} className="text-primary mx-auto mb-1" />
                    <div className="text-xs text-gray-600">CSID Verified</div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-100 px-6 py-3 text-center absolute bottom-0 left-0 right-0 rounded-b text-xs text-gray-600">
                <p>
                  Verify at <span className="font-semibold">csid.education/verify</span> using Certificate ID
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
            
            <button
              onClick={onClose}
              className={`w-full py-3 px-4 rounded-xl font-semibold transition-colors ${
                passed 
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                  : 'bg-primary text-white hover:bg-primary/90'
              }`}
            >
              {passed ? 'Return to Course' : 'Try Again'}
            </button>
          </div>
        </div>

        </div>

        {/* Hidden certificate for PDF generation */}
        {passed && (
          <div id="result-certificate" className="hidden">
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/30 p-8 w-full max-w-4xl" style={{ aspectRatio: '1.4' }}>
              {/* Certificate header */}
              <div className="bg-gradient-to-r from-primary to-secondary p-5 text-white text-center mb-6 rounded -mx-8 -mt-8 -mb-6">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Award size={24} />
                  <span className="text-xl font-bold tracking-wide">CSID</span>
                </div>
                <div className="text-xs opacity-80 tracking-widest uppercase">Center for Sustainability and Inclusive Development</div>
              </div>

              {/* Certificate body */}
              <div className="text-center px-6 py-8">
                <div className="text-xs uppercase tracking-widest text-gray-600 mb-3">This certifies that</div>
                <div className="text-3xl font-bold text-gray-900 mb-2 font-serif italic">
                  Your Name Here
                </div>
                <div className="w-32 h-1 bg-primary mx-auto mb-4" />
                <div className="text-xs text-gray-600 mb-3">has successfully completed</div>
                <div className="text-lg font-semibold text-gray-900 mb-2 leading-snug">
                  Understanding the Climate Economy: The Adaptive Thematic Framework™
                </div>
                <div className="text-xs text-gray-600 mb-6">Issued by CSID — Center for Sustainability and Inclusive Development</div>

                {/* Meta row */}
                <div className="flex flex-wrap justify-center gap-12 text-xs text-gray-600 border-t border-gray-300 pt-6 mb-6">
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Date of Completion</div>
                    <div>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Certificate ID</div>
                    <div className="font-mono">CSID-ATF-2026-{String(new Date().getTime()).slice(-5)}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Final Score</div>
                    <div>{Math.round((correctCount / totalQ) * 100)}% ({correctCount}/{totalQ})</div>
                  </div>
                </div>

                {/* Signature line */}
                <div className="flex items-end justify-center gap-12">
                  <div className="text-center">
                    <div className="h-8 border-b border-gray-400 mb-2 w-32 mx-auto" />
                    <div className="text-xs text-gray-600">Course Director, CSID</div>
                  </div>
                  <div className="text-center">
                    <Award size={32} className="text-primary mx-auto mb-1" />
                    <div className="text-xs text-gray-600">CSID Verified</div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-100 px-6 py-3 text-center absolute bottom-0 left-0 right-0 rounded-b text-xs text-gray-600">
                <p>
                  Verify at <span className="font-semibold">csid.education/verify</span> using Certificate ID
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
