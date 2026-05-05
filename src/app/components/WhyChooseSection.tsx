'use client';

import React from 'react';
import { BookOpen, Sparkles, Award, CheckCircle2 } from 'lucide-react';

export default function WhyChooseSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#f4faf7] to-white dark:from-[#0A192F] dark:to-[#0d1b2a] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight transition-colors">
            What Makes CSID Different
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 transition-colors">
            Three pillars that set our platform apart from generic online courses.
          </p>
        </div>

        {/* 3 PANES GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* PANE 1: Research Backed (Updated with your exact text) */}
          <div className="bg-white dark:bg-[#112240] rounded-2xl p-8 lg:p-10 shadow-lg shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:z-10 transition-all duration-300 cursor-default group flex flex-col h-full">
            <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
              <BookOpen className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
              Built on Published Climate Frameworks
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-10 flex-grow transition-colors">
              All CSID courses are built on published climate frameworks, research papers, and
              global policy documents. The curriculum synthesises data from leading academic climate
              finance literature to provide actionable, real-world knowledge.
            </p>
            <ul className="space-y-4 mt-auto">
              {[
                'Published Climate Frameworks',
                'Peer-Reviewed Research',
                'Global Policy Documents',
                'Multilateral Fund Guidelines',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                  <span className="text-base font-medium text-gray-800 dark:text-gray-300 transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* PANE 2: Fun & Interactive */}
          <div className="bg-white dark:bg-[#112240] rounded-2xl p-8 lg:p-10 shadow-lg shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:z-10 transition-all duration-300 cursor-default group flex flex-col h-full">
            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
              Fun & Interactive
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-10 flex-grow transition-colors">
              Learning shouldn&apos;t be boring. Our courses feature interactive case studies,
              real-time knowledge checks, and dynamic modules designed to keep you engaged and help
              you retain complex climate concepts.
            </p>
            <ul className="space-y-4 mt-auto">
              {[
                'Interactive Quizzes & Assessments',
                'Real-World Case Studies',
                'Dynamic Video Modules',
                'Self-Paced Learning Path',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0" />
                  <span className="text-base font-medium text-gray-800 dark:text-gray-300 transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* PANE 3: Additional Benefits */}
          <div className="bg-white dark:bg-[#112240] rounded-2xl p-8 lg:p-10 shadow-lg shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:z-10 transition-all duration-300 cursor-default group flex flex-col h-full">
            <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
              <Award className="w-7 h-7 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
              Additional Benefits
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-10 flex-grow transition-colors">
              We go beyond the curriculum. Gain tools and recognition that instantly boost your
              professional profile, from verifiable certificates to direct access to a community of
              like-minded sustainability leaders.
            </p>
            <ul className="space-y-4 mt-auto">
              {[
                'Verifiable Digital Certificate',
                'Lifetime Access to Updates',
                'Professional Networking',
                'Career Advancement Tools',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-purple-500 shrink-0" />
                  <span className="text-base font-medium text-gray-800 dark:text-gray-300 transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
