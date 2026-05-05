import React from 'react';
import CoursesPageClient from '../components/CoursesPageClient';
import { courseData } from '../components/courseData';

// THE FIX: We tell Next.js exactly which course IDs to pre-build for GitHub Pages
export function generateStaticParams() {
  return [
    { courseId: 'climate-finance-101' } // Matches the ID in your courseData.ts
    // If you add more courses later, just add their IDs here!
  ];
}

export default function CoursePage() {
  // We pass the course data perfectly to the client
  return <CoursesPageClient course={courseData} />;
}
