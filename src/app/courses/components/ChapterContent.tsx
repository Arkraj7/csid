import React from 'react';
import { BookOpen, BarChart2, ChevronRight, Award, Lock, Star, AlertCircle, CheckCircle } from 'lucide-react';
import type { Chapter } from './courseData';
import type { ChapterProgress } from './CoursesPageClient';

interface Props {
  chapter: Chapter;
  progress: ChapterProgress | undefined;
  onOpenQuiz: () => void;
  onOpenFinal: () => void;
  isLastChapter: boolean;
  allChaptersPassed: boolean;
  finalPassed: boolean;
  certUnlocked: boolean;
  onUnlockCert: () => void;
}

const pillarColors: Record<string, string> = {
  'All Pillars': 'bg-primary/10 text-primary',
  Mitigation: 'pillar-mitigation',
  Adaptation: 'pillar-adaptation',
  Resilience: 'pillar-resilience',
  Recovery: 'pillar-recovery',
};

export default function ChapterContent({
  chapter,
  progress,
  onOpenQuiz,
  onOpenFinal,
  isLastChapter,
  allChaptersPassed,
  finalPassed,
  certUnlocked,
  onUnlockCert,
}: Props) {
  const quizPassed = progress?.quizPassed ?? false;
  const quizScore = progress?.quizScore;
  const attempts = progress?.quizAttempts ?? 0;

  return (
    <div className="space-y-5">
      {/* Chapter header */}
      <div className="bg-card rounded-xl border border-border p-5 md:p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${pillarColors[chapter.pillar] ?? 'bg-muted text-muted-foreground'}`}>
            {chapter.pillar}
          </span>
          <span className="text-xs text-muted-foreground">Chapter {chapter.number} of 9</span>
          <span className="text-xs text-muted-foreground">· {chapter.duration}</span>
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2">{chapter.title}</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{chapter.summary}</p>

        {/* Key stats */}
        <div className="flex flex-wrap gap-3 mt-4">
          {chapter.keyStats.map((stat) => (
            <div key={`stat-${stat.label}`} className="px-3 py-2 rounded-lg bg-muted/50 border border-border">
              <div className={`text-base font-bold font-tabular ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Chapter content */}
      <div className="bg-card rounded-xl border border-border p-5 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen size={16} className="text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Chapter Content</h3>
        </div>
        <div className="space-y-4">
          {chapter.content.map((para, i) => (
            <p key={`para-${chapter.id}-${i}`} className="text-sm text-foreground leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* Quiz status banner */}
      {quizPassed ? (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
          <CheckCircle size={18} className="text-primary flex-shrink-0" />
          <div className="flex-1">
            <div className="text-sm font-semibold text-primary">Chapter Quiz Passed</div>
            <div className="text-xs text-muted-foreground">
              Score: {quizScore}% — {attempts} attempt{attempts !== 1 ? 's' : ''}
            </div>
          </div>
          {isLastChapter && allChaptersPassed && !finalPassed && (
            <button
              onClick={onOpenFinal}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all active:scale-95"
            >
              <Award size={13} />
              Take Final Assessment
            </button>
          )}
        </div>
      ) : attempts > 0 && quizScore !== null ? (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <AlertCircle size={18} className="text-danger flex-shrink-0" />
          <div className="flex-1">
            <div className="text-sm font-semibold text-danger">Quiz not passed — score {quizScore}%</div>
            <div className="text-xs text-muted-foreground">You need ≥70% to proceed. Unlimited retries allowed.</div>
          </div>
          <button
            onClick={onOpenQuiz}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-danger text-white text-xs font-semibold hover:bg-danger/90 transition-all active:scale-95"
          >
            Retry Quiz
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/50 border border-border">
          <BarChart2 size={18} className="text-primary flex-shrink-0" />
          <div className="flex-1">
            <div className="text-sm font-semibold text-foreground">
              Chapter Quiz — {chapter.quiz.length} questions
            </div>
            <div className="text-xs text-muted-foreground">Score ≥70% to unlock the next chapter. Unlimited retries.</div>
          </div>
          <button
            onClick={onOpenQuiz}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all active:scale-95"
          >
            Start Quiz
            <ChevronRight size={13} />
          </button>
        </div>
      )}

      {/* Final assessment section — shown after all chapters passed */}
      {allChaptersPassed && !finalPassed && (
        <div className="bg-card rounded-xl border border-primary/30 p-5 md:p-6">
          <div className="flex items-center gap-2 mb-3">
            <Award size={18} className="text-amber-500" />
            <h3 className="text-base font-semibold text-foreground">Final Assessment Unlocked</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            You have completed all 9 chapters. Take the final assessment — 15 questions across all pillars. Score ≥70% to earn your CSID certificate.
          </p>
          <button
            onClick={onOpenFinal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all active:scale-95"
          >
            <Award size={15} />
            Begin Final Assessment
          </button>
        </div>
      )}

      {/* Certificate section — shown after final passed */}
      {finalPassed && (
        <div className="bg-card rounded-xl border border-amber-300/50 p-5 md:p-6">
          <div className="flex items-center gap-2 mb-3">
            <Award size={18} className="text-amber-500" />
            <h3 className="text-base font-semibold text-foreground">
              {certUnlocked ? 'Certificate Issued!' : 'Final Assessment Passed — Certificate Available'}
            </h3>
          </div>
          {certUnlocked ? (
            <div className="flex items-center gap-3">
              <CheckCircle size={16} className="text-primary" />
              <span className="text-sm text-foreground">Your certificate has been issued. Download it from your profile.</span>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                Unlock your verified CSID certificate for ₹49 via Razorpay. Shareable on LinkedIn, verifiable with a unique certificate ID.
              </p>
              {/* Backend integration point: trigger Razorpay payment flow here */}
              <button
                onClick={onUnlockCert}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600 transition-all active:scale-95"
              >
                <Lock size={14} />
                Unlock Certificate — ₹49
              </button>
            </>
          )}
        </div>
      )}

      {/* Course review — shown after cert unlocked */}
      {certUnlocked && (
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-2 mb-3">
            <Star size={16} className="text-amber-400" />
            <h3 className="text-sm font-semibold text-foreground">Rate This Course</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-3">Help other learners by sharing your experience.</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={`rate-${n}`} className="p-1 hover:scale-110 transition-transform">
                <Star size={22} className="text-amber-300 hover:fill-amber-400 hover:text-amber-400 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}