import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Clock, BarChart, ShieldCheck, Library, Leaf } from 'lucide-react';

export default function CoursePreviewSection() {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Section */}
        <div className="flex flex-col lg:flex-row gap-12 lg:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built on Published Climate Frameworks
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              All CSID courses are built on published climate frameworks, research papers, and global policy documents. The curriculum synthesises data from leading academic climate finance literature to provide actionable, real-world knowledge.
            </p>
            
            <div className="flex flex-wrap gap-3 mt-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background border border-border text-xs font-medium text-muted-foreground shadow-sm">
                <Library size={14} className="text-primary" />
                Published Climate Frameworks
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background border border-border text-xs font-medium text-muted-foreground shadow-sm">
                <ShieldCheck size={14} className="text-primary" />
                Peer-Reviewed Research
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background border border-border text-xs font-medium text-muted-foreground shadow-sm">
                <BookOpen size={14} className="text-primary" />
                Global Policy Documents
              </span>
            </div>
          </div>

          <div className="flex-shrink-0">
            <p className="text-sm font-semibold text-foreground mb-2">Explore Our Courses</p>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              Start with our flagship curriculum — more courses covering each climate pillar are coming soon.
            </p>
            <Link 
              href="/courses" 
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              View All Courses <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Featured Course Card */}
        <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            
            {/* Course Info */}
            <div className="p-8 md:p-10 lg:col-span-3 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6 w-max">
                All Pillars
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                Climate Finance &amp; Investing
              </h3>
              
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Explore our new standalone curriculum covering carbon markets, ESG frameworks, and the future of global climate finance. Learn how the global climate economy is structured and how capital is mobilized for the net-zero transition.
              </p>
              
              <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-muted-foreground font-medium">
                <div className="flex items-center gap-2">
                  <BookOpen size={18} className="text-primary" />
                  <span>6 Chapters</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-primary" />
                  <span>4–5 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart size={18} className="text-primary" />
                  <span>Intermediate to Advanced</span>
                </div>
              </div>
              
              <div>
                <a 
                  href="/csid/climate-finance.html" 
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all shadow-md active:scale-95"
                >
                  Start Course Now <ArrowRight size={16} />
                </a>
              </div>
            </div>
            
            {/* Visual/Feature side */}
            <div className="bg-primary/5 lg:col-span-2 p-8 md:p-10 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-border relative overflow-hidden">
              <div className="absolute -right-12 -bottom-12 opacity-5">
                <Leaf size={250} />
              </div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6 text-primary">
                  <ShieldCheck size={24} />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-3">Research-Backed Learning</h4>
                <p className="text-muted-foreground mb-6">
                  Every module is grounded in real frameworks and published climate finance research curated by the Center for Sustainability &amp; Inclusive Development (CSID).
                </p>
                
                <ul className="space-y-3">
                  {['Comprehensive Modules', 'Interactive Assessments', 'Verifiable Certificate'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-foreground">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}
