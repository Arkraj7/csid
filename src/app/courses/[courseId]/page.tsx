'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, ChevronRight } from 'lucide-react';

interface ChapterInfo {
  id: string;
  number: number;
  title: string;
  duration: string;
  summary: string;
}

interface CourseInfo {
  title: string;
  description: string;
  chapters: ChapterInfo[];
}

const courseCatalog: Record<string, CourseInfo> = {
  'climate-mitigation': {
    title: 'Climate Change Mitigation',
    description: 'Understand the strategies, technologies, and policies driving the global transition to a low-carbon economy.',
    chapters: [
      { id: '1', number: 1, title: 'Introduction to Climate Mitigation', duration: '15 min', summary: 'Overview of climate mitigation — what it means, why it matters, and the global context.' },
      { id: '2', number: 2, title: 'Renewable Energy Transition', duration: '18 min', summary: 'Solar, wind, and other renewables — how they are reshaping energy systems worldwide.' },
      { id: '3', number: 3, title: 'Energy Efficiency & Buildings', duration: '15 min', summary: 'How improving energy efficiency in buildings and industry reduces emissions.' },
      { id: '4', number: 4, title: 'Transport Decarbonisation', duration: '16 min', summary: 'Electric vehicles, public transport, and the future of low-carbon mobility.' },
      { id: '5', number: 5, title: 'Industrial Decarbonisation', duration: '20 min', summary: 'Tackling emissions from heavy industry — steel, cement, chemicals, and more.' },
      { id: '6', number: 6, title: 'Carbon Markets & Pricing', duration: '18 min', summary: 'How carbon pricing mechanisms and markets incentivise emissions reductions.' },
    ],
  },
  'climate-adaptation': {
    title: 'Climate Adaptation Strategies',
    description: 'Learn how communities, governments, and businesses are adapting to the physical impacts of climate change.',
    chapters: [
      { id: '1', number: 1, title: 'Understanding Climate Adaptation', duration: '14 min', summary: 'What adaptation means and why it is essential alongside mitigation.' },
      { id: '2', number: 2, title: 'Water Security & Management', duration: '17 min', summary: 'Adapting water systems to droughts, floods, and changing precipitation patterns.' },
      { id: '3', number: 3, title: 'Food Systems & Agriculture', duration: '18 min', summary: 'Climate-resilient agriculture and food security strategies.' },
      { id: '4', number: 4, title: 'Coastal & Urban Adaptation', duration: '20 min', summary: 'Protecting coastal cities and urban areas from sea-level rise and extreme heat.' },
      { id: '5', number: 5, title: 'Health & Climate Change', duration: '15 min', summary: 'How climate change affects human health and adaptation responses.' },
    ],
  },
};

import { use } from 'react'; // <-- Make sure this is at the very top of your file

export default function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const unwrappedParams = use(params);
  const courseId = unwrappedParams.courseId;
  
  // ... leave the rest of your existing code exactly as it is!  const { courseId } = params;
  const course = courseCatalog[courseId];

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Course Not Found</h1>
          <Link href="/courses" className="text-primary hover:underline">← Back to Courses</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Course Header */}
      <section className="bg-gradient-to-br from-green-50 via-teal-50/60 to-emerald-50 dark:from-green-950/40 dark:via-teal-950/30 dark:to-emerald-950/20 border-b border-border py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/courses" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-5">
            <ArrowLeft size={14} />
            Back to Courses
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3">
            <BookOpen size={12} />
            Course Overview
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{course.title}</h1>
          <p className="text-muted-foreground max-w-2xl">{course.description}</p>
          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><BookOpen size={14} />{course.chapters.length} Chapters</span>
            <span className="flex items-center gap-1.5"><Clock size={14} />Self-paced</span>
          </div>
        </div>
      </section>

      {/* Chapter List */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-xl font-bold text-foreground mb-6">Course Chapters</h2>
        <div className="space-y-3">
          {course.chapters.map((chapter, index) => (
            <Link
              key={chapter.id}
              href={`/courses/${courseId}/chapters/${chapter.id}`}
              className="flex items-center gap-4 p-5 bg-card border border-border rounded-xl hover:border-primary/40 hover:bg-muted/30 transition-all duration-150 group"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <span className="text-sm font-bold text-primary">{chapter.number}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground mb-0.5">{chapter.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-1">{chapter.summary}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock size={12} />{chapter.duration}
                </span>
                <ChevronRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
