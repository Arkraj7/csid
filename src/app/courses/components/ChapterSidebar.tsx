'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Volume2,
  CheckCircle2,
  Circle,
  FileText,
  Signal,
  Clock,
  ListChecks,
  Award,
  Globe,
  Share2,
  Link as LinkIcon,
  Check,
} from 'lucide-react';

type CourseChapter = {
  id: string;
  title: string;
};

type Course = {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  quizCount: number;
  certificate: string;
  language: string;
  chapters: CourseChapter[];
};

type ChapterSidebarProps = {
  course: Course;
  currentChapterId: string;
  completedChapterIds: string[];
};

export default function ChapterSidebar({
  course,
  currentChapterId,
  completedChapterIds,
}: ChapterSidebarProps) {
  const completedCount = completedChapterIds.length;
  const completionPercent = Math.round((completedCount / course.chapters.length) * 100);

  const handleSpeech = (text: string, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
    }
  };

  return (
    <aside className="h-full flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
          {course.title}
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
          {course.description}
        </p>
        <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-bold">
          {course.duration}
        </div>
        <div className="mt-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xs font-black uppercase text-gray-400 dark:text-gray-500 tracking-wider mb-3">
            Course Information
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Signal size={16} className="text-green-600 dark:text-green-400 shrink-0" />
              <div className="min-w-0 flex-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">Level</span>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {course.level}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={16} className="text-green-600 dark:text-green-400 shrink-0" />
              <div className="min-w-0 flex-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">Duration</span>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {course.duration}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ListChecks size={16} className="text-green-600 dark:text-green-400 shrink-0" />
              <div className="min-w-0 flex-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">Quizzes</span>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {course.quizCount}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Award size={16} className="text-green-600 dark:text-green-400 shrink-0" />
              <div className="min-w-0 flex-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">Certificate</span>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {course.certificate}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Globe size={16} className="text-green-600 dark:text-green-400 shrink-0" />
              <div className="min-w-0 flex-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">Language</span>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {course.language}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs font-bold text-gray-500 dark:text-gray-400 mb-2">
            <span>Progress</span>
            <span>{completionPercent}%</span>
          </div>
          <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-green-600 transition-all duration-500"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {completedCount} of {course.chapters.length} chapters complete
          </p>
        </div>

        {/* Share Course Section */}
        <ShareCourseCard courseTitle={course.title} />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <h3 className="text-xs font-black uppercase text-gray-400 tracking-wider mb-4 px-2">
          Course Modules
        </h3>
        {course.chapters.map((chapter, index) => {
          const isActive = chapter.id === currentChapterId;
          const isComplete = completedChapterIds.includes(chapter.id);

          return (
            <Link
              key={chapter.id}
              href={`/courses/${course.id}/chapters/${chapter.id}`}
              className={`flex items-center justify-between gap-3 p-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-400 border border-green-200 dark:border-green-800/50'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {isComplete || isActive ? (
                  <CheckCircle2 size={18} className="shrink-0" />
                ) : (
                  <Circle size={18} className="shrink-0" />
                )}
                <span className="text-sm font-medium truncate">Chapter {index + 1}</span>
              </div>

              <button
                onClick={(event) => handleSpeech(chapter.title, event)}
                className="p-1.5 text-gray-400 hover:text-green-600 dark:hover:text-green-400 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors shrink-0"
                title="Listen to title"
                aria-label={`Listen to ${chapter.title}`}
              >
                <Volume2 size={16} />
              </button>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-3 px-4 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
          <FileText size={18} />
          Assessment
        </button>
      </div>
    </aside>
  );
}

// Share Course Card Component
function ShareCourseCard({ courseTitle }: { courseTitle: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(`Check out this course: ${courseTitle}`);

  return (
    <div className="p-4 border-t border-gray-100 dark:border-gray-800">
      <h3 className="text-xs font-black uppercase text-gray-400 dark:text-gray-500 tracking-wider mb-3">
        Share this course
      </h3>
      <div className="flex items-center gap-2">
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
          aria-label="Share on LinkedIn"
        >
          <Share2 className="w-4 h-4" />
        </a>

        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-sky-500 hover:bg-sky-50 dark:hover:text-sky-400 dark:hover:bg-sky-900/30 rounded-lg transition-colors"
          aria-label="Share on Twitter"
        >
          <Share2 className="w-4 h-4" />
        </a>

        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-blue-700 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
          aria-label="Share on Facebook"
        >
          <Share2 className="w-4 h-4" />
        </a>

        <button
          onClick={handleCopyLink}
          className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:text-emerald-400 dark:hover:bg-emerald-900/30 rounded-lg transition-colors ml-auto flex items-center gap-1.5 text-xs font-medium"
          aria-label={copied ? 'Link copied' : 'Copy link'}
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <LinkIcon className="w-4 h-4" />
          )}
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>
    </div>
  );
}
