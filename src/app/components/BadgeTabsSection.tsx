'use client';
import React, { useState } from 'react';
import { FlaskConical, Sparkles, Gift, CheckCircle } from 'lucide-react';

const tabs = [
  {
    id: 'tab-research',
    icon: FlaskConical,
    label: 'Research Backed',
    badge: 'Peer-Reviewed',
    heading: 'Built on Published Climate Frameworks',
    body: 'All CSID courses are derived from the Adaptive Thematic Framework™ — a proprietary capital allocation model developed by Arciteq Capital and first published in April 2026. The framework synthesises data from the Climate Policy Initiative, UNEP Adaptation Gap Report 2024, and leading academic climate finance literature.',
    points: [
      'Adaptive Thematic Framework™ by Arciteq Capital',
      'Climate Policy Initiative — Global Landscape Report 2024',
      'UNEP Adaptation Gap Report 2024',
      'Peer-reviewed climate economics literature',
    ],
    accentColor: 'text-primary',
    bgColor: 'bg-primary/5',
    borderColor: 'border-primary/30',
  },
  {
    id: 'tab-interactive',
    icon: Sparkles,
    label: 'Fun & Interactive',
    badge: 'Engaging',
    heading: 'Learn by Doing, Not Just Reading',
    body: 'Every chapter ends with a 5–10 question quiz. Score ≥70% to unlock the next chapter. Unlimited retries — so you can keep learning until it clicks. The final assessment tests mastery across all 9 chapters with 15 questions.',
    points: [
      '5–10 MCQs per chapter quiz',
      '≥70% to proceed — unlimited retries',
      '15-question final assessment',
      'Instant score feedback with explanations',
    ],
    accentColor: 'text-secondary',
    bgColor: 'bg-secondary/5',
    borderColor: 'border-secondary/30',
  },
  {
    id: 'tab-benefits',
    icon: Gift,
    label: 'Additional Benefits',
    badge: 'Exclusive',
    heading: 'Certificates, Progress Tracking & More',
    body: 'Track your chapter-by-chapter progress, monitor quiz scores, and earn a verified CSID certificate on course completion. Certificates are unlocked after passing the final assessment and a one-time ₹49 payment — making them genuinely earned.',
    points: [
      'Verified CSID certificate (₹49 unlock)',
      'Per-chapter progress tracking',
      'Quiz score history',
      'English & Hindi language support',
    ],
    accentColor: 'text-earth',
    bgColor: 'bg-amber-50 dark:bg-amber-900/10',
    borderColor: 'border-amber-300/50',
  },
];

export default function BadgeTabsSection() {
  const [active, setActive] = useState('tab-research');
  const current = tabs.find((t) => t.id === active)!;

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-16">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">What Makes CSID Different</h2>
          <p className="text-muted-foreground text-base max-w-lg mx-auto">
            Three pillars that set our platform apart from generic online courses.
          </p>
        </div>

        {/* Tab buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 active:scale-95 ${
                active === tab.id
                  ? `${tab.bgColor} ${tab.borderColor} ${tab.accentColor}`
                  : 'bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/30'
              }`}
            >
              <tab.icon size={15} />
              {tab.label}
              {active === tab.id && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tab.bgColor} ${tab.accentColor} border ${tab.borderColor}`}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className={`bg-card rounded-2xl border ${current.borderColor} p-6 md:p-8 animate-fade-in`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${current.bgColor} ${current.accentColor} text-xs font-semibold mb-4 border ${current.borderColor}`}>
                <current.icon size={12} />
                {current.badge}
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">{current.heading}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm mb-6">{current.body}</p>
              <ul className="space-y-2.5">
                {current.points.map((point) => (
                  <li key={`tab-point-${point.slice(0, 20)}`} className="flex items-start gap-2.5 text-sm text-foreground">
                    <CheckCircle size={16} className={`mt-0.5 flex-shrink-0 ${current.accentColor}`} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            {/* Visual side */}
            <div className={`rounded-xl ${current.bgColor} border ${current.borderColor} p-6 flex items-center justify-center min-h-40`}>
              <div className="text-center">
                <current.icon size={48} className={`mx-auto mb-3 ${current.accentColor}`} />
                <div className={`text-4xl font-bold font-tabular ${current.accentColor} mb-1`}>
                  {active === 'tab-research' ? '9' : active === 'tab-interactive' ? '70%' : '₹49'}
                </div>
                <div className="text-sm text-muted-foreground">
                  {active === 'tab-research' ? 'Chapters sourced from ATF™' : active === 'tab-interactive' ? 'Pass threshold per quiz' : 'Certificate unlock fee'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}