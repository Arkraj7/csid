import React from 'react';
import Link from 'next/link';
import { FlaskConical, Layers, BarChart2, Award, TrendingUp, BookOpen, ArrowRight } from 'lucide-react';

const features = [
  {
    id: 'feature-research',
    icon: FlaskConical,
    title: 'Research-Backed Learning',
    desc: 'Every module is grounded in real frameworks — including the Adaptive Thematic Framework™ by Arciteq Capital — and published climate finance research.',
    color: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    border: 'hover:border-green-300 dark:hover:border-green-700',
  },
  {
    id: 'feature-modules',
    icon: Layers,
    title: 'Bite-sized Climate Modules',
    desc: 'Each chapter is focused, digestible, and designed to be completed in 15–20 minutes. Learn at your own pace without overwhelm.',
    color: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400',
    border: 'hover:border-cyan-300 dark:hover:border-cyan-700',
  },
  {
    id: 'feature-visual',
    icon: BarChart2,
    title: 'Visual & Interactive Content',
    desc: 'Diagrams, data visualisations, and animated explainers make complex climate economy concepts tangible and memorable.',
    color: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
    border: 'hover:border-indigo-300 dark:hover:border-indigo-700',
  },
  {
    id: 'feature-cert',
    icon: Award,
    title: 'Verified Certificates',
    desc: 'Earn an industry-recognised certificate on course completion — gated behind a final assessment and a one-time ₹49 unlock fee.',
    color: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
    border: 'hover:border-amber-300 dark:hover:border-amber-700',
  },
  {
    id: 'feature-paths',
    icon: TrendingUp,
    title: 'Structured Learning Paths',
    desc: 'Courses are sequenced from foundational concepts to advanced frameworks, ensuring a coherent progression from beginner to expert.',
    color: 'bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400',
    border: 'hover:border-rose-300 dark:hover:border-rose-700',
  },
  {
    id: 'feature-simplified',
    icon: BookOpen,
    title: 'Simplified Concepts',
    desc: 'Climate finance, ESG frameworks, and economic modelling — explained in plain language without sacrificing academic rigour.',
    color: 'bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400',
    border: 'hover:border-teal-300 dark:hover:border-teal-700',
  },
];

export default function WhyChooseSection() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-16">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
            Platform Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Why Choose CSID?</h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Purpose-built for learners who want to understand the climate economy — not just read about it.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {features?.map((f) => (
            <div
              key={f?.id}
              className={`bg-card rounded-xl border border-border p-6 card-hover ${f?.border} transition-colors`}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${f?.color}`}>
                <f.icon size={20} />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">{f?.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f?.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all duration-150 active:scale-95 shadow-md shadow-primary/20"
          >
            Start Learning Today
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}