import { notFound } from 'next/navigation';
import { courses } from '@/app/courses/components/data';
import CourseReaderClient from '../../../components/CourseReaderClient';

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

  const chapter = course.chapters.find((ch) => ch.id === resolvedParams.chapterId);
  if (!chapter) {
    notFound();
  }

  return <CourseReaderClient course={course} chapter={chapter} />;
}
