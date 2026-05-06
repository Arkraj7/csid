'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { getCompletedCourseChapters, markCourseChapterComplete } from '@/lib/progress';
import ChapterSidebar from './ChapterSidebar';
import ChapterContent from './ChapterContent';

type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

type CourseChapter = {
  id: string;
  title: string;
  content: string;
  quiz?: QuizQuestion[];
};

type Course = {
  id: string;
  title: string;
  description: string;
  duration: string;
  chapters: CourseChapter[];
};

type CourseReaderClientProps = {
  course: Course;
  chapter: CourseChapter;
};

function getLocalProgressKey(courseId: string) {
  return `csid-course-progress:${courseId}`;
}

export default function CourseReaderClient({ course, chapter }: CourseReaderClientProps) {
  const [completedChapterIds, setCompletedChapterIds] = useState<string[]>([]);

  useEffect(() => {
    const localProgress = localStorage.getItem(getLocalProgressKey(course.id));
    if (localProgress) {
      setCompletedChapterIds(JSON.parse(localProgress));
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      const remoteCompletedChapters = await getCompletedCourseChapters(course.id);
      setCompletedChapterIds((current) => {
        const merged = Array.from(new Set([...current, ...remoteCompletedChapters]));
        localStorage.setItem(getLocalProgressKey(course.id), JSON.stringify(merged));
        return merged;
      });
    });

    return () => unsubscribe();
  }, [course.id]);

  const handleChapterComplete = async (chapterId: string) => {
    const optimisticCompleted = Array.from(new Set([...completedChapterIds, chapterId]));
    setCompletedChapterIds(optimisticCompleted);
    localStorage.setItem(getLocalProgressKey(course.id), JSON.stringify(optimisticCompleted));

    if (auth.currentUser) {
      const savedCompleted = await markCourseChapterComplete(course.id, chapterId);
      if (savedCompleted.length > 0) {
        setCompletedChapterIds(savedCompleted);
        localStorage.setItem(getLocalProgressKey(course.id), JSON.stringify(savedCompleted));
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="w-full md:w-80 flex-shrink-0 md:sticky md:top-20 md:h-[calc(100vh-5rem)] overflow-hidden">
        <ChapterSidebar
          course={course}
          currentChapterId={chapter.id}
          completedChapterIds={completedChapterIds}
        />
      </div>

      <div className="flex-grow overflow-y-auto">
        <ChapterContent
          course={course}
          chapter={chapter}
          completedChapterIds={completedChapterIds}
          onChapterComplete={handleChapterComplete}
        />
      </div>
    </div>
  );
}
