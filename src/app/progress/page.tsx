'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TrendingUp, BookOpen, Star, Clock, CheckCircle, BarChart2, Award } from 'lucide-react';

const mockCourses = [
  {
    id: 1,
    title: 'Climate Change Mitigation',
    progress: 73,
    chapters: 9,
    completed: 6,
    color: 'bg-green-500',
  },
  {
    id: 2,
    title: 'Adaptation Strategies',
    progress: 40,
    chapters: 7,
    completed: 3,
    color: 'bg-cyan-500',
  },
];

const recommendedCourses = [
  {
    id: 1,
    title: 'Resilience & Recovery',
    desc: 'Build systems that withstand climate shocks',
    tag: 'New',
    tagColor: 'bg-primary/10 text-primary',
  },
  {
    id: 2,
    title: 'Inclusive Development',
    desc: 'Equity-centered approaches to sustainability',
    tag: 'Popular',
    tagColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  },
  {
    id: 3,
    title: 'Climate Finance',
    desc: 'Understanding investment flows in the climate economy',
    tag: 'Trending',
    tagColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
  },
];

const activityData = [
  { day: 'Mon', minutes: 25 },
  { day: 'Tue', minutes: 45 },
  { day: 'Wed', minutes: 15 },
  { day: 'Thu', minutes: 60 },
  { day: 'Fri', minutes: 30 },
  { day: 'Sat', minutes: 50 },
  { day: 'Sun', minutes: 20 },
];

export default function ProgressPage() {
  const [activeView] = useState<'week'>('week');
  const maxMinutes = Math.max(...(activityData?.map((d) => d?.minutes) || []));

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentPath="/progress" />
      <main>
        {/* Header */}
        <section className="bg-gradient-to-br from-green-50 via-teal-50/60 to-emerald-50 dark:from-green-950/40 dark:via-teal-950/30 dark:to-emerald-950/20 border-b border-border py-10 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3">
              <TrendingUp size={12} />
              My Progress
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Learning Dashboard
            </h1>
            <p className="text-muted-foreground">
              Track your journey through CSID&apos;s sustainability curriculum.
            </p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-10">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: BookOpen, label: 'Courses Enrolled', value: '2', color: 'text-primary' },
              { icon: CheckCircle, label: 'Chapters Done', value: '9', color: 'text-secondary' },
              { icon: Clock, label: 'Hours Learned', value: '12.5', color: 'text-accent' },
              { icon: Award, label: 'Certificates', value: '0', color: 'text-earth' },
            ]?.map((stat) => (
              <div
                key={stat?.label}
                className="bg-card border border-border rounded-xl p-4 flex items-center gap-3"
              >
                <div className={`p-2 rounded-lg bg-muted ${stat?.color}`}>
                  <stat.icon size={18} />
                </div>
                <div>
                  <div className={`text-xl font-bold font-tabular ${stat?.color}`}>
                    {stat?.value}
                  </div>
                  <div className="text-xs text-muted-foreground">{stat?.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Course Activity Chart */}
            <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <BarChart2 size={18} className="text-primary" />
                  Weekly Activity
                </h2>
                <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                  This Week
                </span>
              </div>
              <div className="flex items-end gap-3 h-32">
                {activityData?.map((d) => (
                  <div key={d?.day} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full flex items-end justify-center"
                      style={{ height: '96px' }}
                    >
                      <div
                        className="w-full rounded-t-lg bg-primary/80 hover:bg-primary transition-colors cursor-default"
                        style={{ height: `${(d?.minutes / maxMinutes) * 96}px` }}
                        title={`${d?.minutes} min`}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{d?.day}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Minutes of learning per day (mock data)
              </p>
            </div>

            {/* Previous / Enrolled Courses */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-5">
                <BookOpen size={18} className="text-secondary" />
                My Courses
              </h2>
              <div className="space-y-4">
                {mockCourses?.map((course) => (
                  <div key={course?.id} className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-foreground leading-tight">
                        {course?.title}
                      </p>
                      <span className="text-xs font-tabular text-muted-foreground flex-shrink-0">
                        {course?.progress}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${course?.color}`}
                        style={{ width: `${course?.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {course?.completed} of {course?.chapters} chapters completed
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                  Complete courses to earn certificates
                </p>
              </div>
            </div>

            {/* Recommended Courses */}
            <div className="lg:col-span-3 bg-card border border-border rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-5">
                <Star size={18} className="text-accent" />
                Recommended for You
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {recommendedCourses?.map((course) => (
                  <div
                    key={course?.id}
                    className="border border-border rounded-xl p-4 hover:border-primary/40 hover:bg-muted/30 transition-all duration-150 cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-sm font-semibold text-foreground">{course?.title}</h3>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${course?.tagColor}`}
                      >
                        {course?.tag}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{course?.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
