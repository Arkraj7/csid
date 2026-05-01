import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Leaf, Target, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar currentPath="/about" />
      <main>
        {/* Header */}
        <section className="bg-gradient-to-br from-green-50 via-teal-50/60 to-emerald-50 dark:from-green-950/40 dark:via-teal-950/30 dark:to-emerald-950/20 border-b border-border py-14 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
              <Leaf size={12} />
              About CSID
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">About Us</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn about our mission, our team, and our commitment to sustainability education.
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
          {/* Mission */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Target, title: 'Our Mission', desc: 'The Center for Sustainability & Inclusive Development (CSID) is dedicated to advancing knowledge and action for a sustainable, climate-resilient, and equitable future.' },
              { icon: Leaf, title: 'Our Approach', desc: 'We deliver structured, research-backed courses on climate mitigation, adaptation, resilience, and recovery — designed for learners and professionals at every level.' },
              { icon: Users, title: 'Our Community', desc: 'CSID brings together learners, researchers, and practitioners from across the globe committed to driving meaningful change in sustainability and inclusive development.' },
            ]?.map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6">
                <div className="p-2.5 rounded-xl bg-primary/10 w-fit mb-4">
                  <item.icon size={20} className="text-primary" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{item?.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item?.desc}</p>
              </div>
            ))}
          </section>

          {/* Founder Profile */}
          <section className="bg-card border border-border rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Founder&apos;s Profile</h2>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Users size={32} className="text-primary" />
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-lg font-bold text-foreground">[Founder Name]</p>
                  <p className="text-sm text-primary font-medium">Founder &amp; Director, CSID</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  [Short introductory bio — focusing on background in environmental science, agricultural sciences, and experience in environmental governance. Please replace this placeholder with your actual bio.]
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {['Environmental Science', 'Agricultural Sciences', 'Environmental Governance', 'Climate Policy']?.map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
