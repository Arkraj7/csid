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

          {/* Right: Visual card */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Main card */}
              <div className="bg-card rounded-2xl border border-border shadow-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-foreground">Climate Economy Investment Cycle</span>
                  <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-0.5 rounded-full">Live Data</span>
                </div>
                {/* Visual bars */}
                <div className="space-y-3">
                  {[
                    { label: 'Mitigation Capital', value: 94, color: 'bg-green-500', amount: '$1.7T' },
                    { label: 'Adaptation Finance', value: 5, color: 'bg-cyan-500', amount: '$76B' },
                    { label: 'Resilience Capital', value: 2, color: 'bg-indigo-500', amount: 'Fragmented' },
                    { label: 'Recovery Capital', value: 1, color: 'bg-amber-500', amount: 'Reactive' },
                  ]?.map((item) => (
                    <div key={`hero-bar-${item?.label}`}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">{item?.label}</span>
                        <span className="font-medium text-foreground font-tabular">{item?.amount}</span>
                      </div>
                      <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${item?.color}`}
                          style={{ width: `${Math.max(item?.value, 3)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-4 italic">Source: Climate Policy Initiative, 2024</p>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-card rounded-xl border border-border shadow-lg px-3 py-2">
                <div className="text-xs text-muted-foreground">Adaptation Gap</div>
                <div className="text-lg font-bold text-danger font-tabular">$307B</div>
                <div className="text-xs text-muted-foreground">annual shortfall</div>
              </div>

              {/* Bottom floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-card rounded-xl border border-border shadow-lg px-3 py-2">
                <div className="text-xs text-muted-foreground">Course Progress</div>
                <div className="text-lg font-bold text-primary font-tabular">73%</div>
                <div className="text-xs text-muted-foreground">avg completion</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}