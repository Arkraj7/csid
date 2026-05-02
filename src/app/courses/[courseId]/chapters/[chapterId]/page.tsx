// src/app/courses/[courseId]/chapters/[chapterId]/page.tsx

'use client';

import { use } from 'react';
import Link from 'next/link';

// Mock data structure - replace with your actual data fetching/loading
const courseContent = {
  'climate-101': {
    title: 'Climate Change Mitigation',
    chapters: {
      '1': { title: 'Introduction to Mitigation', content: '[Add Your 1200-1800 word content here]' },
      '2': { title: 'Renewable Energy Solutions', content: '[Add Your 1200-1800 word content here]' },
    },
    quiz: [
      { question: 'Placeholder Question 1?', options: ['A', 'B', 'C', 'D'], answer: 'A' },
      { question: 'Placeholder Question 2?', options: ['A', 'B', 'C', 'D'], answer: 'B' },
    ]
  }
};

// 1. In Next.js 15, params is a Promise
export default function ChapterPage({ params }: { params: Promise<{ courseId: string; chapterId: string }> }) {
  // 2. We must "unwrap" the Promise using React's `use()` hook
  const unwrappedParams = use(params);
  const { courseId, chapterId } = unwrappedParams;

  const course = courseContent[courseId as keyof typeof courseContent];
  const chapter = course?.chapters[chapterId as keyof typeof course.chapters];

  if (!course || !chapter) return <main className="p-8 text-center">Chapter not found.</main>;

  return (
    <main className="container mx-auto py-12 px-4 max-w-5xl">
      <div className="mb-6">
        <Link href={`/courses/${courseId}`} className="text-blue-600 hover:underline">
          &larr; Back to Course Overview
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
      <h2 className="text-xl text-gray-700 mb-8">Chapter {chapterId}: {chapter.title}</h2>

      <section className="prose prose-lg max-w-none text-gray-800 mb-12">
        <p>{chapter.content}</p>
        <p className="bg-gray-100 p-4 rounded border text-sm italic mt-4">
          Founder note: Please manually replace this placeholder with your 1200-1800 word, originally written chapter content.
        </p>
      </section>

      <section className="chapter-quiz bg-white p-8 rounded-lg shadow-sm border">
        <h3 className="text-2xl font-semibold mb-6">Chapter {chapterId} Quiz</h3>
        {course.quiz.map((q, index) => (
          <div key={index} className="quiz-question mb-8 pb-6 border-b last:border-0">
            <p className="font-medium text-lg mb-3">{index + 1}. {q.question}</p>
            <div className="options space-y-3 ml-4">
              {q.options.map((option) => (
                <label key={option} className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name={`question-${index}`} value={option} className="w-4 h-4 text-blue-600" />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
