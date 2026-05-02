'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Briefcase, GraduationCap, Mail, AlertTriangle, Clock, MapPin } from 'lucide-react';

type TabId = 'internship' | 'jobs';

export default function CareersPage() {
  const [activeTab, setActiveTab] = useState<TabId>('internship');

  const tabs = [
    { id: 'internship' as TabId, label: 'Internships', icon: GraduationCap },
    { id: 'jobs' as TabId, label: 'Job Openings', icon: Briefcase },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentPath="/careers" />
      <main>
        {/* Page Header */}
        <section className="bg-gradient-to-br from-green-50 via-teal-50/60 to-emerald-50 dark:from-green-950/40 dark:via-teal-950/30 dark:to-emerald-950/20 border-b border-border py-14 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
              <Briefcase size={12} />
              Join Our Team
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Careers at CSID</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Be part of a mission-driven team advancing knowledge and action for a sustainable, climate-resilient, and equitable future.
            </p>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="border-b border-border bg-card sticky top-16 z-10">
          <div className="max-w-4xl mx-auto px-4 flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-6 text-sm font-medium border-b-2 transition-all duration-150 ${
                  activeTab === tab.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Internship Content */}
          {activeTab === 'internship' && (
            <section className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">Internship Opportunities</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We have intern positions open on a regular and rolling basis. If you are interested in an internship with CSID, kindly mail your application to{' '}
                  <a href="mailto:careers@csid.org" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors">
                    careers@csid.org
                  </a>.
                </p>
              </div>

              {/* Application Requirements */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <GraduationCap size={18} className="text-primary" />
                  Application Requirements
                </h3>
                <ul className="space-y-3">
                  {[
                    'Your current CV',
                    'A one-page Statement of Purpose (SOP)',
                    'A brief writing sample on your field or topic (1,200–1,800 words)',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {i + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Non-AI Policy */}
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={20} className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-base font-semibold text-amber-900 dark:text-amber-200 mb-2">
                      Strict Non-AI Policy
                    </h3>
                    <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
                      No AI should be used while generating or writing any application materials, including the SOP and writing sample. Plagiarism and AI findings at any stage will be taken seriously, and the position may be terminated at any time.
                    </p>
                  </div>
                </div>
              </div>

              {/* Internship Terms */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Internship Terms</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Clock size={16} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Duration</div>
                      <div className="text-sm font-medium text-foreground">1 – 3 months</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-secondary/10">
                      <MapPin size={16} className="text-secondary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Mode</div>
                      <div className="text-sm font-medium text-foreground">Remote</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Mail size={16} className="text-accent" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Compensation</div>
                      <div className="text-sm font-medium text-foreground">Unpaid</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Apply CTA */}
              <div className="text-center pt-4">
                <a
                  href="mailto:careers@csid.org"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all duration-150 active:scale-95 shadow-md shadow-primary/20"
                >
                  <Mail size={16} />
                  Apply via Email
                </a>
              </div>
            </section>
          )}

          {/* Jobs Content */}
          {activeTab === 'jobs' && (
            <section className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6">
                <Briefcase size={28} className="text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">No Current Openings</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                There are no job openings at the moment. Please check back later or follow us on social media for updates.
              </p>
              <div className="bg-card border border-border rounded-2xl p-6 max-w-sm mx-auto">
                <p className="text-sm text-muted-foreground mb-3">Get notified when positions open</p>
                <a
                  href="mailto:careers@csid.org?subject=Job%20Opportunity%20Interest"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors"
                >
                  <Mail size={14} />
                  Express Interest
                </a>
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
