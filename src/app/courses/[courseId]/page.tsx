import CoursesPageClient from '../components/CoursesPageClient';

export function generateStaticParams() {
  return [
    { courseId: 'climate-101' },
    // Add any other course IDs you create here
  ];
}

type Props = {
  params: Promise<{ courseId: string }>;
};

export default async function CoursePage({ params }: Props) {
  // We resolve the params just to satisfy Next.js 15 routing rules
  const resolvedParams = await params;
  
  // We removed the courseId prop because CoursesPageClient doesn't need it!
  return <CoursesPageClient />;
}
