import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BookOpen, Clock, BarChart, Lock, Play } from 'lucide-react';

export default function CoursesPage() {
  const courses = [
    {
      title: 'Climate Finance & Investing',
      description:
        'Explore our standalone curriculum covering carbon markets, ESG frameworks, and the future of global climate finance.',
      modules: '6 Modules',
      duration: '4-5 Hours',
      level: 'Advanced',
      available: true,
      link: '/csid/climate-finance.html',
    },
    {
      title: 'Urban Climate Adaptation',
      description:
        'Learn how modern cities are building resilient infrastructure to handle extreme weather, heatwaves, and rising sea levels.',
      modules: '5 Modules',
      duration: '3-4 Hours',
      level: 'Intermediate',
      available: false,
      link: '#',
    },
    {
      title: 'Corporate ESG & Materiality',
      description:
        'Master the European Sustainability Reporting Standards (ESRS) and the global transition to mandatory climate disclosures.',
      modules: '4 Modules',
      duration: '3 Hours',
      level: 'Intermediate',
      available: false,
      link: '#',
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar currentPath="/courses" />

      <main className="flex-grow pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            CSID Course Catalog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master the climate economy with our research-backed, structured curriculums designed for
            modern professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, idx) => (
            <div
              key={idx}
              className={`bg-card rounded-3xl p-8 flex flex-col h-full transition-all duration-300 ${course.available ? 'border-2 border-primary/40 shadow-xl hover:shadow-primary/20 hover:-translate-y-1' : 'border border-border shadow-sm opacity-80'}`}
            >
              {/* Badges */}
              <div className="mb-6">
                {!course.available ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-xs font-bold uppercase tracking-wider">
                    <Lock size={14} /> Coming Soon
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                    New Release
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-bold text-foreground mb-4">{course.title}</h3>
              <p className="text-muted-foreground mb-8 flex-grow leading-relaxed">
                {course.description}
              </p>

              {/* Course Meta Info */}
              <div className="space-y-3 mb-8 bg-muted/30 p-4 rounded-xl">
                <div className="flex items-center gap-3 text-sm text-foreground font-medium">
                  <BookOpen size={18} className="text-primary" /> {course.modules}
                </div>
                <div className="flex items-center gap-3 text-sm text-foreground font-medium">
                  <Clock size={18} className="text-primary" /> {course.duration}
                </div>
                <div className="flex items-center gap-3 text-sm text-foreground font-medium">
                  <BarChart size={18} className="text-primary" /> {course.level}
                </div>
              </div>

              {/* Button */}
              {course.available ? (
                <a
                  href={course.link}
                  className="w-full py-4 px-4 bg-primary text-primary-foreground text-center rounded-xl font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  Start Course <Play size={18} className="fill-current" />
                </a>
              ) : (
                <button
                  disabled
                  className="w-full py-4 px-4 bg-muted text-muted-foreground text-center rounded-xl font-bold cursor-not-allowed border border-border"
                >
                  Currently Locked
                </button>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
