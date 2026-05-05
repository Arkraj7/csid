import React from 'react';
import CoursesPageClient from '../components/CoursesPageClient';
import { courseData } from '../components/courseData';

export default function CoursePage() {
  // We explicitly pass the courseData into the Client component here
  return <CoursesPageClient course={courseData} />;
}
