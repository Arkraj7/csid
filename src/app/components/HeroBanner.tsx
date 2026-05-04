import React from 'react';
import Link from 'next/link';
import { ArrowRight, Leaf, Droplets, Shield, Hammer, Play } from 'lucide-react';

const pillars = [
  { icon: Leaf, label: 'Mitigation', color: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' },
  { icon: Droplets, label: 'Adaptation', color: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300' },
  { icon: Shield, label: 'Resilience', color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300' },
  { icon: Hammer, label: 'Recovery', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' },
];

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-hero-pattern">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-teal-50/60 to-emerald-50 dark:from-green-950/40 dark:via-teal-950/30 dark:to-emerald-950/20" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />
      
      <div className="relative max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-16 py-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Text */}
          <div className="animate-fade-in">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-5">
              <Leaf size={12} />
              Center for Sustainability &amp; Inclusive Development
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight mb-5 text-balance">
              Empowering Action for a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Sustainable and Inclusive
              </span>
              {' '}Future.
            </h1>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6 max-w-xl">
              CSID delivers structured, research-backed courses on climate mitigation, adaptation, resilience, and recovery — empowering learners and professionals to drive meaningful change.
            </p>

            {/* Pillars row */}
            <div className="flex flex-wrap gap-2 mb-8">
              {pillars?.map((p) => (
                <span
                  key={`hero-pillar-${p?.label}`}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${p?.color}`}
                >
                  <p.icon size={12} />
                  {p?.label}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all duration-150 active:scale-95 shadow-md shadow-primary/20 animate-pulse-green"
              >
                Start Learning Today
                <ArrowRight size={16} />
              </Link>
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-muted transition-all duration-150 active:scale-95">
                <Play size={14} className="text-primary" />
                Watch Demo
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-5 mt-8 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                500+ active learners
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-secondary inline-block" />
                150+ research modules
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accent inline-block" />
                ₹49 certificate
              </span>
            </div>
          </div>

          {/* Right: Visual Graphic (The Bouncing Books) */}
          <div className="hidden lg:flex items-center justify-center relative">
            <div className="hero-graphic-container">
              <img 
                src="/csid/assets/images/hero-books.png" 
                alt="Students learning on stacked books" 
                className="hero-image-bouncing" 
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
