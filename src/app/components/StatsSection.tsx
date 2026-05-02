import React from 'react';
import { Users, BookOpen, Award, Globe } from 'lucide-react';

const stats = [
  { icon: Users, value: '500+', label: 'Active Learners', color: 'text-primary' },
  { icon: BookOpen, value: '150+', label: 'Research Modules', color: 'text-secondary' },
  { icon: Award, value: '25+', label: 'Global Experts', color: 'text-accent' },
  { icon: Globe, value: '200+', label: 'Certifications Issued', color: 'text-earth' },
];

export default function StatsSection() {
  return (
    <section className="bg-card border-b border-border">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-16 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats?.map((stat) => (
            <div key={`stat-${stat?.label}`} className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl bg-muted ${stat?.color}`}>
                <stat.icon size={20} />
              </div>
              <div>
                <div className={`text-xl font-bold font-tabular ${stat?.color}`}>{stat?.value}</div>
                <div className="text-xs text-muted-foreground">{stat?.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}