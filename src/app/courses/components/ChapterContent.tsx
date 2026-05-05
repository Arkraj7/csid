'use client';

import React, { useEffect, useState } from 'react';
import { Chapter } from '@/types/certificate';
import { CheckCircle, FileText, ChevronRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { updateUserProgress } from '@/lib/progress';

interface ChapterContentProps {
  chapter: Chapter;
  courseId: string;
}

export default function ChapterContent({ chapter, courseId }: ChapterContentProps) {
  const router = useRouter();
  const [isCompleting, setIsCompleting] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    return () => {
      const endTime = Date.now();
      const timeSpentMilliseconds = endTime - startTime;
      const hoursSpent = timeSpentMilliseconds / (1000 * 60 * 60);
      if (hoursSpent > 0.004) {
        updateUserProgress({ hoursLearned: Number(hoursSpent.toFixed(2)) });
      }
    };
  }, []);

  const handleCompleteAndContinue = async (
    e: React.MouseEvent,
    nextChapterId: string | undefined
  ) => {
    e.preventDefault();
    setIsCompleting(true);
    await updateUserProgress({ lessonsCompleted: 1 });

    if (nextChapterId) {
      router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
    } else {
      router.push(`/courses/${courseId}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
      <div className="mb-10 pb-8 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 font-semibold mb-4 text-sm tracking-wide uppercase">
          <FileText className="w-5 h-5" />
          <span>Chapter {chapter.order}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {chapter.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Estimated reading time: {chapter.duration} minutes
        </p>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-emerald-600">
        <div dangerouslySetInnerHTML={{ __html: chapter.content }} />
      </div>

      <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-6">
        {chapter.previousChapter ? (
          <Link
            href={`/courses/${courseId}/chapters/${chapter.previousChapter}`}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary font-medium transition-colors w-full sm:w-auto justify-center sm:justify-start"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous Chapter
          </Link>
        ) : (
          <div className="hidden sm:block w-32"></div>
        )}

        {chapter.nextChapter ? (
          <button
            onClick={(e) => handleCompleteAndContinue(e, chapter.nextChapter)}
            disabled={isCompleting}
            className="flex items-center justify-center gap-2 bg-primary hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 w-full sm:w-auto"
          >
            {isCompleting ? 'Saving...' : 'Complete & Continue'}
            <CheckCircle className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={(e) => handleCompleteAndContinue(e, undefined)}
            disabled={isCompleting}
            className="flex items-center justify-center gap-2 bg-[#0A192F] dark:bg-white text-white dark:text-[#0A192F] hover:bg-gray-800 dark:hover:bg-gray-100 px-8 py-4 rounded-xl font-bold transition-all shadow-lg w-full sm:w-auto"
          >
            {isCompleting ? 'Saving...' : 'Complete & Take Quiz'}
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
