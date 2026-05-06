import { notFound } from 'next/navigation';
import { courses } from '@/app/courses/components/data';
import ChapterSidebar from '../../../components/ChapterSidebar';
import ChapterContent from '../../../components/ChapterContent';
import { Chapter } from '@/types/certificate';

export function generateStaticParams() {
  const paths: { courseId: string; chapterId: string }[] = [];

  courses.forEach((course) => {
    course.chapters.forEach((chapter) => {
      paths.push({
        courseId: course.id,
        chapterId: chapter.id,
      });
    });
  });

  return paths;
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ courseId: string; chapterId: string }>;
}) {
  const resolvedParams = await params;

  const course = courses.find((c) => c.id === resolvedParams.courseId);
  if (!course) {
    notFound();
  }

  const chapters: Chapter[] = course.chapters.map((chapter, index) => ({
    ...chapter,
    order: index + 1,
    duration: 15,
    previousChapter: course.chapters[index - 1]?.id,
    nextChapter: course.chapters[index + 1]?.id,
  }));

  const chapter = chapters.find((ch) => ch.id === resolvedParams.chapterId);
  if (!chapter) {
    notFound();
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-[#0A192F]">
      <ChapterSidebar chapters={chapters} activeChapterId={chapter.id} courseId={course.id} />

      <div className="flex-grow">
        <ChapterContent chapter={chapter} courseId={course.id} />
      </div>
    </div>
  );
}
