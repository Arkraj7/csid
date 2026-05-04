import React from 'react';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';

export default function CoursePreviewSection() {
  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ONLY SECTION: "Recent Uploads" Banner */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 bg-card p-8 md:p-10 rounded-[2rem] border border-border shadow-md">
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
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full md:w-auto justify-center items-center gap-2 px-8 py-3.5 rounded-xl border-2 border-primary text-primary font-bold text-sm hover:bg-primary/5 transition-all active:scale-95"
            >
              View All Courses <ArrowRight size={16} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
