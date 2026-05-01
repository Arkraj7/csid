import React from 'react';
import { BookOpen, CheckCircle, Trophy } from 'lucide-react';

interface Props {
  overallProgress: number;
  completedCount: number;
  totalChapters: number;
}

export default function CourseHeader({ overallProgress, completedCount, totalChapters }: Props) {
  return (
    <div className="bg-card rounded-xl border border-border p-5 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              <BookOpen size={11} />
              All Pillars
            </span>
            <span className="text-xs text-muted-foreground">Beginner to Intermediate</span>
          </div>
          <h1 className="text-lg md:text-xl font-bold text-foreground leading-snug mb-1">
            Understanding the Climate Economy: The Adaptive Thematic Framework™
          </h1>
          <p className="text-sm text-muted-foreground">
            A structured exploration of mitigation, adaptation, resilience, and recovery — 9 chapters
          </p>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="text-center">
            <div className="flex items-center gap-1 text-sm font-semibold text-foreground font-tabular">
              <CheckCircle size={14} className="text-primary" />
              {completedCount}/{totalChapters}
            </div>
            <div className="text-xs text-muted-foreground">Chapters done</div>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-1 text-sm font-semibold text-foreground font-tabular">
              <Trophy size={14} className="text-amber-500" />
              {overallProgress}%
            </div>
            <div className="text-xs text-muted-foreground">Complete</div>
          </div>
        </div>
      </div>
      {/* Progress bar */}
      <div className="mt-4">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
}