import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CoursesPageClient from '@/app/courses/components/CoursesPageClient';

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar currentPath="/courses" />
      <main className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-16 py-8">
        <CoursesPageClient />
      </main>
      <Footer />
    </div>
  );
}