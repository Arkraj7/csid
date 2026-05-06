'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { courses } from '@/app/courses/components/data';
import { TrendingUp, BookOpen, Star, Clock, CheckCircle, BarChart2, Award } from 'lucide-react';

type UserProgress = {
  certificatesEarned?: number;
  lessonsCompleted?: number;
  hoursLearned?: number;
  coursesEnrolled?: number;
  courseProgress?: Record<
    string,
    {
      completedChapters?: string[];
    }
  >;
};

function getLocalCompletedChapters(courseId: string) {
  if (typeof window === 'undefined') return [];

  try {
    const rawProgress = localStorage.getItem(`csid-course-progress:${courseId}`);
    const parsedProgress = rawProgress ? JSON.parse(rawProgress) : [];
    return Array.isArray(parsedProgress) ? parsedProgress : [];
  } catch {
    return [];
  }
}

export default function ProgressPage() {
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<UserProgress>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (!currentUser) {
        setProgress({});
        setIsLoading(false);
        return;
      }

      try {
        const snapshot = await getDoc(doc(db, 'users', currentUser.uid));
        setProgress((snapshot.data() as UserProgress | undefined) ?? {});
      } catch (error) {
        console.error('Failed to load progress dashboard:', error);
        setProgress({});
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const courseRows = useMemo(() => {
    return courses.map((course) => {
      const remoteCompleted = progress.courseProgress?.[course.id]?.completedChapters ?? [];
      const localCompleted = getLocalCompletedChapters(course.id);
      const completedChapters = Array.from(new Set([...remoteCompleted, ...localCompleted]));
      const percent = Math.round((completedChapters.length / course.chapters.length) * 100);

      return {
        id: course.id,
        title: course.title,
        chapters: course.chapters.length,
        completed: completedChapters.length,
        progress: percent,
      };
    });
  }, [progress.courseProgress]);

  const chaptersDone = courseRows.reduce((total, course) => total + course.completed, 0);
  const coursesStarted = courseRows.filter((course) => course.completed > 0).length;
  const coursesCompleted = courseRows.filter((course) => course.progress === 100).length;
  const hoursLearned = Number(progress.hoursLearned ?? 0);
  const totalMinutes = Math.round(hoursLearned * 60);

  const stats = [
    {
      icon: BookOpen,
      label: 'Courses Started',
      value: String(Math.max(coursesStarted, progress.coursesEnrolled ?? 0)),
      color: 'text-primary',
    },
    {
      icon: CheckCircle,
      label: 'Chapters Done',
      value: String(chaptersDone),
      color: 'text-secondary',
    },
    { icon: Clock, label: 'Hours Learned', value: hoursLearned.toFixed(1), color: 'text-accent' },
    {
      icon: Award,
      label: 'Certificates',
      value: String(progress.certificatesEarned ?? coursesCompleted),
      color: 'text-earth',
    },
  ];

  const maxCourseProgress = Math.max(...courseRows.map((course) => course.progress), 1);

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentPath="/progress" />
      <main>
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
              {user
                ? `Welcome back, ${user.displayName || user.email?.split('@')[0] || 'learner'}.`
                : 'Sign in to sync your learning progress across devices.'}
            </p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-10">
          {!user && (
            <div className="mb-8 bg-card border border-border rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-foreground">Progress sync is off</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Local chapter progress can show here, but signing in saves time spent and course
                  completion to your account.
                </p>
              </div>
              <Link
                href="/sign-up-login"
                className="inline-flex justify-center px-5 py-2.5 rounded-lg bg-primary text-white font-bold hover:bg-green-700 transition-colors"
              >
                Sign in
              </Link>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-card border border-border rounded-xl p-4 flex items-center gap-3"
              >
                <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                  <stat.icon size={18} />
                </div>
                <div>
                  <div className={`text-xl font-bold font-tabular ${stat.color}`}>
                    {isLoading ? '...' : stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <BarChart2 size={18} className="text-primary" />
                  Course Progress
                </h2>
                <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                  {totalMinutes} minutes learned
                </span>
              </div>
              <div className="flex items-end gap-4 h-36">
                {courseRows.map((course) => (
                  <div key={course.id} className="flex-1 flex flex-col items-center gap-2 min-w-0">
                    <div
                      className="w-full flex items-end justify-center"
                      style={{ height: '104px' }}
                    >
                      <div
                        className="w-full rounded-t-lg bg-primary/80 hover:bg-primary transition-colors"
                        style={{
                          height: `${Math.max((course.progress / maxCourseProgress) * 104, 8)}px`,
                        }}
                        title={`${course.progress}% complete`}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground text-center line-clamp-2">
                      {course.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-5">
                <BookOpen size={18} className="text-secondary" />
                My Courses
              </h2>
              <div className="space-y-4">
                {courseRows.map((course) => (
                  <div key={course.id} className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-foreground leading-tight">
                        {course.title}
                      </p>
                      <span className="text-xs font-tabular text-muted-foreground flex-shrink-0">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {course.completed} of {course.chapters} chapters completed
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                  Complete all chapters to unlock course completion.
                </p>
              </div>
            </div>

            <div className="lg:col-span-3 bg-card border border-border rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-5">
                <Star size={18} className="text-accent" />
                Keep Learning
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {courseRows.map((course) => (
                  <Link
                    key={course.id}
                    href={`/courses/${course.id}`}
                    className="border border-border rounded-xl p-4 hover:border-primary/40 hover:bg-muted/30 transition-all duration-150"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-sm font-semibold text-foreground">{course.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 bg-primary/10 text-primary">
                        {course.progress === 100 ? 'Complete' : 'Continue'}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {course.progress === 100
                        ? 'Review your completed course or prepare for assessment.'
                        : 'Pick up from your next available chapter.'}
                    </p>
                  </Link>
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
