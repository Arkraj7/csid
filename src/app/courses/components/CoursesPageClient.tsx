'use client';

import React, { useState } from 'react';
import { Course } from './courseData';
import { Chapter } from '@/types/certificate';
import ChapterSidebar from './ChapterSidebar';
import ChapterContent from './ChapterContent';

interface Props {
  course: Course;
}

export default function CoursesPageClient({ course }: Props) {
  const [activeChapterId, setActiveChapterId] = useState<string>(course.chapters[0].id);

  const activeChapter =
    course.chapters.find((c: Chapter) => c.id === activeChapterId) || course.chapters[0];

  return (
    <div className="flex flex-col md:flex-row min-h-screen pt-20 bg-gray-50 dark:bg-[#0A192F]">
      <ChapterSidebar
        chapters={course.chapters}
        activeChapterId={activeChapterId}
        onSelectChapter={setActiveChapterId}
      />
      <div className="flex-1 min-w-0">
        <ChapterContent chapter={activeChapter} courseId={course.id} />
      </div>
    </div>
  );
}
