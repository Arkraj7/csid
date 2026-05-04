import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, CheckCircle2, Play, BookMarked } from 'lucide-react';

export default function CoursePreviewSection() {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* TOP SECTION: "Recent Uploads" (From your sketch) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 bg-card p-8 md:p-10 rounded-3xl border border-border shadow-md">
          <div>
            <p className="text-primary font-bold tracking-widest text-sm uppercase mb-3">
              Recent Uploads
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Climate Finance &amp; Investing
            </h2>
            <a
              href="/csid/climate-finance.html"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 active:scale-95"
            >
              Start Now <Play size={16} className="fill-current" />
            </a>
          </div>
          
          <div className="w-full md:w-auto md:text-right border-t md:border-t-0 md:border-l border-border pt-6 md:pt-0 md:pl-10">
            <p className="text-sm text-muted-foreground mb-4 max-w-[200px] hidden md:block ml-auto">
              Explore our full curriculum covering every pillar of the climate economy.
            </p>
            <Link
              href="/courses"
              target="_blank"  // Opens the courses page in a new tab!
              rel="noopener noreferrer"
              className="inline-flex w-full md:w-auto justify-center items-center gap-2 px-8 py-3.5 rounded-xl border-2 border-primary text-primary font-bold text-sm hover:bg-primary/5 transition-all active:scale-95"
            >
              View All Courses <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* BOTTOM SECTION: "Built on Published Frameworks" */}
        <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Side: Text and Checkmarks */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6">
                <BookMarked size={14} />
                Peer-Reviewed
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-5">
                Built on Published Climate Frameworks
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                All CSID courses are built on published climate frameworks, research papers, and global policy documents. The curriculum synthesises data from leading academic climate finance literature to provide actionable, real-world knowledge.
              </p>

              <ul className="space-y-4">
                {[
                  'Published Climate Frameworks',
                  'Peer-Reviewed Research',
                  'Global Policy Documents',
                  'Multilateral Fund Guidelines'
                ].map((text, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-foreground font-medium text-lg">
                    <CheckCircle2 className="text-primary flex-shrink-0" size={24} />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Side: The "6 Modules" Box */}
            <div className="bg-background border border-border shadow-sm rounded-3xl p-10 md:p-14 text-center flex flex-col items-center justify-center">
              <div className="mb-6 text-primary">
                <BookOpen size={64} strokeWidth={1.5} />
              </div>
              <div className="text-7xl font-bold text-primary mb-6">6</div>
              <p className="text-xl text-foreground font-semibold mb-3">
                Comprehensive Modules
              </p>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                Carefully structured and curated by the Center for Sustainability &amp; Inclusive Development (CSID)
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
