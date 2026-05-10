'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  PlayCircle,
  CheckCircle2,
  ChevronRight,
  Home,
  Lock,
  Moon,
  Sun,
  BarChart,
  Clock,
  ListChecks,
  Award,
  Globe,
  Link as LinkIcon,
  Check,
} from 'lucide-react';
import CourseHeader from './CourseHeader';
import { getCompletedCourseChapters } from '@/lib/progress';

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

type Chapter = {
  id: string;
  title: string;
  content: string;
  quiz: QuizQuestion[];
};

type Course = {
  id: string;
  title: string;
  description: string;
  image: string;
  level: string;
  duration: string;
  quizCount: number;
  certificate: string;
  language: string;
  chapters: Chapter[];
  finalAssessment: QuizQuestion[];
};

function getLocalProgressKey(courseId: string) {
  return `csid-course-progress:${courseId}`;
}

export default function CoursesPageClient({ course }: { course: Course }) {
  const router = useRouter();
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));

    const localProgress = localStorage.getItem(getLocalProgressKey(course.id));
    if (localProgress) {
      try {
        const parsedProgress = JSON.parse(localProgress);
        if (Array.isArray(parsedProgress)) {
          setCompletedChapters(parsedProgress);
        }
      } catch {
        localStorage.removeItem(getLocalProgressKey(course.id));
      }
    }

    getCompletedCourseChapters(course.id).then((remoteCompletedChapters) => {
      if (remoteCompletedChapters.length === 0) return;

      setCompletedChapters((current) => {
        const merged = Array.from(new Set([...current, ...remoteCompletedChapters]));
        localStorage.setItem(getLocalProgressKey(course.id), JSON.stringify(merged));
        return merged;
      });
    });
  }, [course.id]);

  const toggleDarkMode = () => {
    const nextIsDark = !isDarkMode;
    document.documentElement.classList.toggle('dark', nextIsDark);
    localStorage.theme = nextIsDark ? 'dark' : 'light';
    setIsDarkMode(nextIsDark);
  };

  const progressPercent = Math.round((completedChapters.length / course.chapters.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8ff] via-[#f5f3ff] to-[#ede9fe] dark:from-[#1a1625] dark:via-[#231d30] dark:to-[#2d2640] pb-12">
      <CourseHeader course={course} completedChapters={completedChapters} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => router.push('/')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-colors font-semibold text-sm bg-white/80 dark:bg-[#251f35]/80 backdrop-blur-sm"
            >
              <Home size={17} />
              Home
            </button>
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-colors font-semibold text-sm bg-white/80 dark:bg-[#251f35]/80 backdrop-blur-sm"
            >
              <ArrowLeft size={17} />
              Back
            </button>
          </div>

          <button
            onClick={toggleDarkMode}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 text-white hover:from-violet-600 hover:to-purple-600 transition-all font-semibold text-sm shadow-lg shadow-violet-500/20"
          >
            {isDarkMode ? <Sun size={17} /> : <Moon size={17} />}
            {isDarkMode ? 'Day Mode' : 'Night Mode'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/90 dark:bg-[#251f35]/90 backdrop-blur-xl rounded-2xl shadow-[0_4px_30px_rgba(139,92,246,0.08)] p-6 border border-violet-100 dark:border-violet-800/50">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                About this Course
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed text-justify whitespace-pre-wrap">
                {course.description}
              </p>
            </div>

            <div className="bg-white/90 dark:bg-[#251f35]/90 backdrop-blur-xl rounded-2xl shadow-[0_4px_30px_rgba(139,92,246,0.08)] border border-violet-100 dark:border-violet-800/50 overflow-hidden">
              <div className="p-6 border-b border-violet-100 dark:border-violet-800/50 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Course Content</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {course.chapters.length} Chapters - Final Assessment
                </p>
              </div>

              <div className="divide-y divide-violet-100 dark:divide-violet-800/50">
                {course.chapters.map((chapter, index) => {
                  const isCompleted = completedChapters.includes(chapter.id);
                  const isLocked =
                    index > 0 && !completedChapters.includes(course.chapters[index - 1].id);

                  return (
                    <div
                      key={chapter.id}
                      className={`p-6 transition-colors duration-200 ${
                        isLocked
                          ? 'bg-violet-50/50 dark:bg-violet-900/20'
                          : 'hover:bg-violet-50/50 dark:hover:bg-violet-900/20'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 mt-1">
                            {isCompleted ? (
                              <CheckCircle2 className="w-6 h-6 text-violet-500" />
                            ) : isLocked ? (
                              <Lock className="w-6 h-6 text-gray-400" />
                            ) : (
                              <PlayCircle className="w-6 h-6 text-violet-600" />
                            )}
                          </div>
                          <div>
                            <h3
                              className={`text-lg font-semibold ${
                                isLocked ? 'text-gray-500' : 'text-gray-900 dark:text-white'
                              }`}
                            >
                              {chapter.title}
                            </h3>
                            <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                              <span>{chapter.quiz?.length || 0} Quiz Questions</span>
                            </div>
                          </div>
                        </div>

                        {!isLocked && (
                          <Link
                            href={`/courses/${course.id}/chapters/${chapter.id}`}
                            className="inline-flex items-center px-4 py-2 bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 font-medium rounded-xl hover:bg-violet-100 dark:hover:bg-violet-900/50 transition-colors shrink-0"
                          >
                            {isCompleted ? 'Review' : 'Start'}
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/90 dark:bg-[#251f35]/90 backdrop-blur-xl rounded-2xl shadow-[0_4px_30px_rgba(139,92,246,0.08)] p-6 border border-violet-100 dark:border-violet-800/50 sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Your Progress
              </h3>

              <div className="mb-6">
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Course Completion</span>
                  <span className="text-violet-600">{progressPercent}%</span>
                </div>
                <div className="w-full bg-violet-100 dark:bg-violet-900/50 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-violet-500 to-purple-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-violet-500 mr-2" />
                  {completedChapters.length} of {course.chapters.length} chapters completed
                </p>
              </div>

              {completedChapters.length === course.chapters.length && (
                <div className="mt-8 pt-6 border-t border-violet-100 dark:border-violet-800/50">
                  <button className="w-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-violet-500/20">
                    Take Final Assessment
                  </button>
                </div>
              )}

              {/* Course Features Widget */}
              <div className="mt-6 pt-6 border-t border-violet-100 dark:border-violet-800/50">
                <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                  Course Features
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <BarChart className="w-4 h-4 text-violet-600 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Level</span>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {course.level || 'Beginner'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Duration</span>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {course.duration || '5 Modules'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ListChecks className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Quizzes</span>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {course.quizCount || course.chapters.length + 1}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Certificate</span>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {course.certificate || 'Yes, upon completion'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Language</span>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {course.language || 'English'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Share Course Widget */}
              <ShareCourseWidget courseTitle={course.title} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Share Course Widget Component
function ShareCourseWidget({ courseTitle }: { courseTitle: string }) {
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
    <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
      <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
        Share this Course
      </h4>
      <div className="flex items-center gap-3">
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
          aria-label="Share on LinkedIn"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>

        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-sky-500 hover:bg-sky-50 dark:hover:text-sky-400 dark:hover:bg-sky-900/30 rounded-lg transition-colors"
          aria-label="Share on Twitter"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.112z" />
          </svg>
        </a>

        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-blue-700 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
          aria-label="Share on Facebook"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </a>

        <a
          href={`https://www.instagram.com/`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-pink-600 hover:bg-pink-50 dark:hover:text-pink-400 dark:hover:bg-pink-900/30 rounded-lg transition-colors"
          aria-label="Share on Instagram"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 6.333 0 6.741 0 12c0 5.259.014 5.668.072 6.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.667-.014 6.947-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-6.948 0-5.259-.014-5.667-.072-6.947-.2-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
        </a>

        <button
          onClick={handleCopyLink}
          className="p-2.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:text-emerald-400 dark:hover:bg-emerald-900/30 rounded-lg transition-colors ml-auto flex items-center gap-1.5 text-xs font-medium"
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
