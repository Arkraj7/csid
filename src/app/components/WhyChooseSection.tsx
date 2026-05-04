import React from 'react';
import { CheckCircle2, BookOpen, BookMarked } from 'lucide-react';

export default function WhyChooseSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* NEW "Built on Frameworks" Text ONLY */}
        <div className="bg-card border border-border rounded-[2rem] p-8 md:p-12 lg:p-16 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Side: New Text and Checks */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs font-semibold mb-6">
                <BookMarked size={14} />
                Peer-Reviewed
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                Built on Published Climate Frameworks
              </h2>
              
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
                  <li key={idx} className="flex items-center gap-3 text-foreground font-medium text-base md:text-lg">
                    <CheckCircle2 className="text-primary flex-shrink-0" size={24} />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Side: The "6 Modules" Box */}
            <div className="bg-primary/5 border border-primary/10 rounded-3xl p-10 md:p-14 text-center flex flex-col items-center justify-center h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <BookOpen size={200} />
              </div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 mx-auto">
                  <BookOpen size={32} />
                </div>
                <div className="text-7xl md:text-8xl font-bold text-primary mb-4">6</div>
                <p className="text-xl md:text-2xl text-foreground font-semibold mb-3">
                  Comprehensive Modules
                </p>
                <p className="text-sm md:text-base text-muted-foreground max-w-[280px] mx-auto">
                  Carefully structured and curated by the Center for Sustainability &amp; Inclusive Development (CSID)
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
