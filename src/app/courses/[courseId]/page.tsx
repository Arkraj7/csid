import React from 'react';
import CoursesPageClient from '../components/CoursesPageClient';
import { courseData } from '../components/courseData';

export default function CoursePage() {
  return <CoursesPageClient course={courseData} />;
}
