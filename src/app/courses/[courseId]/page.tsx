import { use } from 'react';
import CoursesPageClient from '../components/CoursesPageClient';

export default function CoursePage(props: { params: Promise<{ courseId: string }> }) {
  // In Next.js 15, we must unwrap the params Promise using the use() hook
  const params = use(props.params);
  
  return <CoursesPageClient courseId={params.courseId} />;
}
