'use client';
import React, { useState } from 'react';
import ChapterSidebar from './ChapterSidebar';
import ChapterContent from './ChapterContent';
import QuizModal from './QuizModal';
import FinalAssessmentModal from './FinalAssessmentModal';
import CourseHeader from './CourseHeader';
import ComingSoonCourses from './ComingSoonCourses';
import { chapters, type Chapter } from './courseData';

export type QuizState = 'idle' | 'in-progress' | 'passed' | 'failed';

export interface ChapterProgress {
  completed: boolean;
  quizPassed: boolean;
  quizScore: number | null;
  quizAttempts: number;
}

export default function CoursesPageClient() {
  const [activeChapterId, setActiveChapterId] = useState<string>(chapters[0].id);
  const [quizOpen, setQuizOpen] = useState(false);
  const [finalOpen, setFinalOpen] = useState(false);
  const [progress, setProgress] = useState<Record<string, ChapterProgress>>(() => {
    const init: Record<string, ChapterProgress> = {};
    chapters.forEach((c) => {
      init[c.id] = { completed: false, quizPassed: false, quizScore: null, quizAttempts: 0 };
    });
    // Simulate some prior progress
    init['chapter-1'] = { completed: true, quizPassed: true, quizScore: 100, quizAttempts: 1 };
    init['chapter-2'] = { completed: true, quizPassed: true, quizScore: 80, quizAttempts: 2 };
    init['chapter-3'] = { completed: false, quizPassed: false, quizScore: 60, quizAttempts: 1 };
    return init;
  });
  const [finalPassed, setFinalPassed] = useState(false);
  const [certUnlocked, setCertUnlocked] = useState(false);

  const activeChapter = chapters.find((c) => c.id === activeChapterId) ?? chapters[0];

  const completedCount = Object.values(progress).filter((p) => p.quizPassed).length;
  const totalChapters = chapters.length;
  const overallProgress = Math.round((completedCount / totalChapters) * 100);

  function handleChapterSelect(id: string) {
    // Check if chapter is locked
    const idx = chapters.findIndex((c) => c.id === id);
    if (idx === 0) { setActiveChapterId(id); return; }
    const prevChapter = chapters[idx - 1];
    if (progress[prevChapter.id]?.quizPassed) {
      setActiveChapterId(id);
    }
  }

  function handleQuizPass(chapterId: string, score: number, attempts: number) {
    setProgress((prev) => ({
      ...prev,
      [chapterId]: { completed: true, quizPassed: true, quizScore: score, quizAttempts: attempts },
    }));
    setQuizOpen(false);
    // Auto-advance to next chapter
    const idx = chapters.findIndex((c) => c.id === chapterId);
    if (idx < chapters.length - 1) {
      setActiveChapterId(chapters[idx + 1].id);
    }
  }

  function handleQuizFail(chapterId: string, score: number, attempts: number) {
    setProgress((prev) => ({
      ...prev,
      [chapterId]: { ...prev[chapterId], quizScore: score, quizAttempts: attempts },
    }));
  }

  function isChapterUnlocked(idx: number): boolean {
    if (idx === 0) return true;
    return progress[chapters[idx - 1].id]?.quizPassed ?? false;
  }

  const allChaptersPassed = chapters.every((c) => progress[c.id]?.quizPassed);

  return (
    <div>
      <CourseHeader overallProgress={overallProgress} completedCount={completedCount} totalChapters={totalChapters} />

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        {/* Sidebar */}
        <aside className="lg:w-72 xl:w-80 flex-shrink-0">
          <ChapterSidebar
            chapters={chapters}
            activeChapterId={activeChapterId}
            progress={progress}
            onSelect={handleChapterSelect}
            isChapterUnlocked={isChapterUnlocked}
          />
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <ChapterContent
            chapter={activeChapter}
            progress={progress[activeChapterId]}
            onOpenQuiz={() => setQuizOpen(true)}
            onOpenFinal={() => setFinalOpen(true)}
            isLastChapter={activeChapterId === chapters[chapters.length - 1].id}
            allChaptersPassed={allChaptersPassed}
            finalPassed={finalPassed}
            certUnlocked={certUnlocked}
            onUnlockCert={() => setCertUnlocked(true)}
          />
        </div>
      </div>

      {/* Coming soon courses */}
      <div className="mt-12">
        <ComingSoonCourses />
      </div>

      {/* Quiz Modal */}
      {quizOpen && (
        <QuizModal
          chapter={activeChapter}
          attempts={progress[activeChapterId]?.quizAttempts ?? 0}
          onPass={(score, attempts) => handleQuizPass(activeChapterId, score, attempts)}
          onFail={(score, attempts) => handleQuizFail(activeChapterId, score, attempts)}
          onClose={() => setQuizOpen(false)}
        />
      )}

      {/* Final Assessment Modal */}
      {finalOpen && (
        <FinalAssessmentModal
          onPass={() => { setFinalPassed(true); setFinalOpen(false); }}
          onClose={() => setFinalOpen(false)}
        />
      )}
    </div>
  );
}