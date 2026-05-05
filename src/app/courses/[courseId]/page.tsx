import React from 'react';
import CoursesPageClient from '../components/CoursesPageClient';
import { courseData } from '../components/courseData';

// This tells Next.js which course pages to build
export function generateStaticParams() {
  return [
    { courseId: 'climate-finance-101' }
  ];
}

export default function CoursePage() {
  return <CoursesPageClient course={courseData} />;
}
