import CoursesPageClient from '../components/CoursesPageClient';

// 1. Tell Next.js exactly what courses exist so it can build them statically
export function generateStaticParams() {
  return [
    { courseId: 'climate-101' },
    // Add future course IDs here
  ];
}

// 2. Use a standard Async Server Component for Next.js 15
export default async function CoursePage(props: { params: Promise<{ courseId: string }> }) {
  const params = await props.params;
  
  return <CoursesPageClient courseId={params.courseId} />;
}
