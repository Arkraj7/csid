import React from 'react';
import Link from 'next/link';
import { BookOpen, Clock, BarChart2, ArrowRight, Leaf, Droplets, Shield, Hammer, Lock } from 'lucide-react';

const previewCourses = [
  {
    id: 'course-atf-001',
    title: 'Understanding the Climate Economy: The Adaptive Thematic Framework™',
    subtitle: 'A structured exploration of mitigation, adaptation, resilience, and recovery',
    pillar: 'All Pillars',
    pillarIcon: BookOpen,
    pillarClass: 'bg-primary/10 text-primary',
    chapters: 9,
    level: 'Beginner to Intermediate',
    duration: '3–4 hours',
    status: 'available',
    description: 'Learn how the global climate economy is structured across four pillars — and why $1.7 trillion of annual investment is concentrated in just one of them.',
  },
  {
    id: 'course-mit-002',
    title: 'Climate Mitigation Fundamentals',
    subtitle: 'Renewable energy, EVs, hydrogen, and industrial decarbonisation',
    pillar: 'Mitigation',
    pillarIcon: Leaf,
    pillarClass: 'pillar-mitigation',
    chapters: 7,
    level: 'Beginner',
    duration: '2–3 hours',
    status: 'coming-soon',
    description: 'A deep dive into the dominant pillar of climate investment — the technologies, policies, and capital flows driving the energy transition.',
  },
  {
    id: 'course-ada-003',
    title: 'Adaptation Strategies for Infrastructure',
    subtitle: 'Flood management, water systems, and coastal protection',
    pillar: 'Adaptation',
    pillarIcon: Droplets,
    pillarClass: 'pillar-adaptation',
    chapters: 6,
    level: 'Intermediate',
    duration: '2–3 hours',
    status: 'coming-soon',
    description: 'Explore the underfunded pillar — how infrastructure must adapt to a changed climate, and the $307B annual financing gap that needs to be closed.',
  },
  {
    id: 'course-res-004',
    title: 'Building Climate Resilience',
    subtitle: 'Grid hardening, wildfire systems, storm-resistant infrastructure',
    pillar: 'Resilience',
    pillarIcon: Shield,
    pillarClass: 'pillar-resilience',
    chapters: 6,
    level: 'Intermediate',
    duration: '2–3 hours',
    status: 'coming-soon',
    description: 'Understand how risk-driven capital is being deployed to harden systems against climate shocks — and why this pillar is structurally underrepresented.',
  },
  {
    id: 'course-rec-005',
    title: 'Climate Recovery & Reconstruction',
    subtitle: 'Disaster response, rebuilding frameworks, insurance-linked finance',
    pillar: 'Recovery',
    pillarIcon: Hammer,
    pillarClass: 'pillar-recovery',
    chapters: 5,
    level: 'Advanced',
    duration: '2 hours',
    status: 'coming-soon',
    description: 'The event-driven pillar — how communities and economies rebuild after climate disasters, and the role of insurance-linked capital in financing recovery.',
  },
];

export default function CoursePreviewSection() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-16">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
              Course Catalog
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Explore Our Courses</h2>
            <p className="text-muted-foreground text-base max-w-lg">
              Start with the flagship ATF™ course — more courses covering each climate pillar are coming soon.
            </p>
          </div>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            View All Courses
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Course cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {previewCourses?.map((course) => {
            const isAvailable = course?.status === 'available';
            return (
              <div
                key={course?.id}
                className={`bg-card rounded-xl border border-border overflow-hidden card-hover ${!isAvailable ? 'opacity-80' : ''}`}
              >
                {/* Card header */}
                <div className={`p-4 ${isAvailable ? 'bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/20 dark:to-teal-950/20' : 'bg-muted/50'}`}>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${course?.pillarClass}`}>
                      <course.pillarIcon size={11} />
                      {course?.pillar}
                    </span>
                    {!isAvailable && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                        <Lock size={10} />
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-foreground text-sm leading-snug mb-1 line-clamp-2">{course?.title}</h3>
                  <p className="text-xs text-muted-foreground">{course?.subtitle}</p>
                </div>
                {/* Card body */}
                <div className="p-4">
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">{course?.description}</p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <BookOpen size={12} />
                      {course?.chapters} chapters
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {course?.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BarChart2 size={12} />
                      {course?.level}
                    </span>
                  </div>

                  {isAvailable ? (
                    <Link
                      href="/courses"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all duration-150 active:scale-95"
                    >
                      Start Course
                      <ArrowRight size={14} />
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-muted text-muted-foreground text-sm font-medium cursor-not-allowed"
                    >
                      <Lock size={13} />
                      Coming Soon
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}