import React from 'react';
import { Leaf, Droplets, Shield, Hammer, BookOpen, Lock, Clock } from 'lucide-react';

const comingSoon = [
  {
    id: 'coming-mit',
    title: 'Climate Mitigation Fundamentals',
    pillar: 'Mitigation',
    icon: Leaf,
    pillarClass: 'pillar-mitigation',
    chapters: 7,
    duration: '2–3 hours',
    level: 'Beginner',
    desc: 'Renewable energy, EVs, hydrogen, and industrial decarbonisation — the dominant pillar of climate investment.',
  },
  {
    id: 'coming-ada',
    title: 'Adaptation Strategies for Infrastructure',
    pillar: 'Adaptation',
    icon: Droplets,
    pillarClass: 'pillar-adaptation',
    chapters: 6,
    duration: '2–3 hours',
    level: 'Intermediate',
    desc: 'Flood management, water systems, and coastal protection — the underfunded pillar with a $307B annual gap.',
  },
  {
    id: 'coming-res',
    title: 'Building Climate Resilience',
    pillar: 'Resilience',
    icon: Shield,
    pillarClass: 'pillar-resilience',
    chapters: 6,
    duration: '2–3 hours',
    level: 'Intermediate',
    desc: 'Grid hardening, wildfire systems, and storm-resistant infrastructure — the risk-driven pillar.',
  },
  {
    id: 'coming-rec',
    title: 'Climate Recovery & Reconstruction',
    pillar: 'Recovery',
    icon: Hammer,
    pillarClass: 'pillar-recovery',
    chapters: 5,
    duration: '2 hours',
    level: 'Advanced',
    desc: 'Disaster response, rebuilding frameworks, and insurance-linked finance — the event-driven pillar.',
  },
  {
    id: 'coming-imb',
    title: 'The Climate Capital Imbalance',
    pillar: 'All Pillars',
    icon: BookOpen,
    pillarClass: 'bg-primary/10 text-primary',
    chapters: 5,
    duration: '1.5 hours',
    level: 'Beginner',
    desc: 'Why mitigation dominates and what structural changes are needed to close the adaptation and resilience gap.',
  },
];

export default function ComingSoonCourses() {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-foreground">Coming Soon</h2>
          <p className="text-sm text-muted-foreground mt-0.5">More pillar-specific courses launching in 2026</p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-xs font-medium">
          <Lock size={11} />
          In Development
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-4">
        {comingSoon?.map((course) => (
          <div key={course?.id} className="bg-card rounded-xl border border-border p-4 opacity-75 hover:opacity-90 transition-opacity">
            <div className="flex items-center justify-between mb-3">
              <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold ${course?.pillarClass}`}>
                <course.icon size={10} />
                {course?.pillar}
              </span>
              <Lock size={12} className="text-muted-foreground" />
            </div>
            <h4 className="text-sm font-semibold text-foreground mb-1 leading-snug">{course?.title}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">{course?.desc}</p>
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><BookOpen size={10} />{course?.chapters} ch</span>
              <span className="flex items-center gap-1"><Clock size={10} />{course?.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}