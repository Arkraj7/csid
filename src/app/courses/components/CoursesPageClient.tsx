'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PlayCircle, CheckCircle2, ChevronRight, Lock } from 'lucide-react';
import CourseHeader from './CourseHeader';

// 1. Define the Types directly here so the build doesn't fail looking for the old file
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

export default function CoursesPageClient({ course }: { course: Course }) {
  const [completedChapters] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <CourseHeader course={course} completedChapters={completedChapters} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Course Overview & Chapters */}
          <div className="lg:col-span-2 space-y-8">
            {/* About This Course Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this Course</h2>
              <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">
                {course.description}
              </p>
            </div>

            {/* Course Content / Chapters List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <h2 className="text-xl font-bold text-gray-900">Course Content</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {course.chapters.length} Chapters • Final Assessment
                </p>
              </div>

              <div className="divide-y divide-gray-100">
                {course.chapters.map((chapter, index) => {
                  const isCompleted = completedChapters.includes(chapter.id);
                  // Lock chapter if previous chapter exists and is NOT completed
                  const isLocked =
                    index > 0 && !completedChapters.includes(course.chapters[index - 1].id);

                  return (
                    <div
                      key={chapter.id}
                      className={`p-6 transition-colors duration-200 ${
                        isLocked ? 'bg-gray-50/50' : 'hover:bg-green-50/30'
                      }`}
                    >
                      <div className="flex items-start justify-between">
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
                              className={`text-lg font-semibold ${isLocked ? 'text-gray-500' : 'text-gray-900'}`}
                            >
                              {chapter.title}
                            </h3>
                            <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                              <span>{chapter.quiz?.length || 0} Quiz Questions</span>
                            </div>
                          </div>
                        </div>

                        {!isLocked && (
                          <Link
                            href={`/courses/${course.id}/chapters/${chapter.id}`}
                            className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 font-medium rounded-lg hover:bg-green-100 transition-colors"
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

          {/* Right Column: Sidebar / Progress */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Your Progress</h3>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span className="text-gray-600">Course Completion</span>
                  <span className="text-green-600">
                    {Math.round((completedChapters.length / course.chapters.length) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div
                    className="bg-green-600 h-2.5 rounded-full transition-all duration-500"
                    style={{
                      width: `${(completedChapters.length / course.chapters.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-gray-600 flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                  {completedChapters.length} of {course.chapters.length} chapters completed
                </p>
              </div>

              {/* Show Final Assessment Button ONLY if all chapters are done */}
              {completedChapters.length === course.chapters.length && (
                <div className="mt-8 pt-6 border-t border-gray-100">
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
