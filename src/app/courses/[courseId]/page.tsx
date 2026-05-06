import { notFound } from 'next/navigation';
import CoursesPageClient from '../components/CoursesPageClient';
import { courses } from '@/app/courses/components/data';

export function generateStaticParams() {
  return courses.map((course) => ({ courseId: course.id }));
}

// In Next.js 15+, dynamic route params must be typed as a Promise
export default async function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const resolvedParams = await params;

  const course = courses.find((c) => c.id === resolvedParams.courseId);

  if (!course) {
    notFound();
  }

  return <CoursesPageClient course={course} />;
}
