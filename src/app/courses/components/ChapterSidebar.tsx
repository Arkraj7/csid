import React from 'react';
import { CheckCircle, Lock, ChevronRight, Circle } from 'lucide-react';
import type { Chapter } from './courseData';
import type { ChapterProgress } from './CoursesPageClient';

interface Props {
  chapters: Chapter[];
  activeChapterId: string;
  progress: Record<string, ChapterProgress>;
  onSelect: (id: string) => void;
  isChapterUnlocked: (idx: number) => boolean;
}

export default function ChapterSidebar({ chapters, activeChapterId, progress, onSelect, isChapterUnlocked }: Props) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="px-4 py-3 border-b border-border bg-muted/30">
        <h3 className="text-sm font-semibold text-foreground">Course Chapters</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Complete each chapter quiz to unlock the next</p>
      </div>
      <div className="divide-y divide-border">
        {chapters.map((chapter, idx) => {
          const isActive = chapter.id === activeChapterId;
          const prog = progress[chapter.id];
          const unlocked = isChapterUnlocked(idx);

          return (
            <button
              key={chapter.id}
              onClick={() => onSelect(chapter.id)}
              disabled={!unlocked}
              className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors ${
                isActive
                  ? 'bg-primary/5 border-l-2 border-primary'
                  : unlocked
                  ? 'hover:bg-muted/50 cursor-pointer' :'opacity-50 cursor-not-allowed'
              }`}
            >
              {/* Status icon */}
              <div className="mt-0.5 flex-shrink-0">
                {prog?.quizPassed ? (
                  <CheckCircle size={16} className="text-primary" />
                ) : !unlocked ? (
                  <Lock size={16} className="text-muted-foreground" />
                ) : isActive ? (
                  <ChevronRight size={16} className="text-primary" />
                ) : (
                  <Circle size={16} className="text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className={`text-xs font-semibold ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                    Ch {chapter.number}
                  </span>
                  <span className="text-xs text-muted-foreground">· {chapter.duration}</span>
                </div>
                <div className={`text-xs font-medium leading-snug ${isActive ? 'text-foreground' : 'text-foreground/80'} line-clamp-2`}>
                  {chapter.title}
                </div>
                {prog?.quizPassed && prog.quizScore !== null && (
                  <div className="text-xs text-primary mt-1 font-tabular">
                    Quiz: {prog.quizScore}% ✓
                  </div>
                )}
                {prog && !prog.quizPassed && prog.quizScore !== null && (
                  <div className="text-xs text-danger mt-1 font-tabular">
                    Last: {prog.quizScore}% — retry needed
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}