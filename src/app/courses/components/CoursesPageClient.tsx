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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-12">
      <CourseHeader course={course} completedChapters={completedChapters} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => router.push('/')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-900 transition-colors font-semibold text-sm"
            >
              <Home size={17} />
              Home
            </button>
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-900 transition-colors font-semibold text-sm"
            >
              <ArrowLeft size={17} />
              Back
            </button>
          </div>

          <button
            onClick={toggleDarkMode}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 transition-colors font-semibold text-sm"
          >
            {isDarkMode ? <Sun size={17} /> : <Moon size={17} />}
            {isDarkMode ? 'Day Mode' : 'Night Mode'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                About this Course
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed text-justify whitespace-pre-wrap">
                {course.description}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Course Content</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {course.chapters.length} Chapters - Final Assessment
                </p>
              </div>

              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {course.chapters.map((chapter, index) => {
                  const isCompleted = completedChapters.includes(chapter.id);
                  const isLocked =
                    index > 0 && !completedChapters.includes(course.chapters[index - 1].id);

                  return (
                    <div
                      key={chapter.id}
                      className={`p-6 transition-colors duration-200 ${
                        isLocked
                          ? 'bg-gray-50/50 dark:bg-gray-900/50'
                          : 'hover:bg-green-50/30 dark:hover:bg-green-900/10'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 mt-1">
                            {isCompleted ? (
                              <CheckCircle2 className="w-6 h-6 text-green-500" />
                            ) : isLocked ? (
                              <Lock className="w-6 h-6 text-gray-400" />
                            ) : (
                              <PlayCircle className="w-6 h-6 text-green-600" />
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
                            className="inline-flex items-center px-4 py-2 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-medium rounded-lg hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors shrink-0"
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
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-800 sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Your Progress
              </h3>

              <div className="mb-6">
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Course Completion</span>
                  <span className="text-green-600">{progressPercent}%</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5">
                  <div
                    className="bg-green-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                  {completedChapters.length} of {course.chapters.length} chapters completed
                </p>
              </div>

              {completedChapters.length === course.chapters.length && (
                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-sm shadow-green-200">
                    Take Final Assessment
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
