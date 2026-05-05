import React from 'react';
import CoursesPageClient from '../components/CoursesPageClient';
import { courseData } from '../components/courseData';

export default function CoursePage() {
  // We are now passing the course data perfectly to the client!
  return <CoursesPageClient course={courseData} />;
}
